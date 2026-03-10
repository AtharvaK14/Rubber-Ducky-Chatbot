#!/usr/bin/env node
/**
 * ducky-cli.js — Terminal interface for Ducky: Rubber Duck Debugger
 *
 * Shares rule files with the web app. No separate rule maintenance needed.
 * Requires Node.js 14+. No npm packages — stdlib only.
 *
 * Usage:
 *   node ducky-cli.js              (interactive REPL, quacky tone)
 *   node ducky-cli.js --pro        (professional tone)
 *   node ducky-cli.js --lang py    (Python rules prioritized)
 *   node ducky-cli.js --pro --lang js
 *
 * Language flags:  --lang py | js | cpp | all (default: all)
 * Tone flags:      --pro  (default: quacky)
 */

'use strict';

const readline = require('readline');
const path     = require('path');

// ─── Load rule files (same files the browser uses) ───────────────────────────
const RULES_GENERAL    = require('./rules-general.js');
const RULES_PYTHON     = require('./rules-python.js');
const RULES_JAVASCRIPT = require('./rules-javascript.js');
const RULES_CPP        = require('./rules-cpp.js');

// ─── ANSI color helpers ───────────────────────────────────────────────────────
const C = {
  reset:  '\x1b[0m',
  bold:   '\x1b[1m',
  dim:    '\x1b[2m',
  yellow: '\x1b[33m',
  cyan:   '\x1b[36m',
  green:  '\x1b[32m',
  red:    '\x1b[31m',
  white:  '\x1b[37m',
  gray:   '\x1b[90m',
};

function yellow(s)  { return C.yellow + C.bold + s + C.reset; }
function cyan(s)    { return C.cyan + s + C.reset; }
function gray(s)    { return C.gray + s + C.reset; }
function bold(s)    { return C.bold + s + C.reset; }
function green(s)   { return C.green + s + C.reset; }
function duck(s)    { return yellow('🦆 Ducky: ') + s; }
function you(s)     { return cyan('   You: ') + s; }

// ─── Parse CLI args ───────────────────────────────────────────────────────────
const args     = process.argv.slice(2);
let tone       = args.includes('--pro') ? 'pro' : 'quack';
let activeLang = 'all';

const langIdx = args.indexOf('--lang');
if (langIdx !== -1 && args[langIdx + 1]) {
  const flag = args[langIdx + 1].toLowerCase();
  const map  = { py: 'python', python: 'python', js: 'javascript',
                 javascript: 'javascript', cpp: 'cpp', 'c++': 'cpp', all: 'all' };
  activeLang = map[flag] || 'all';
}

// ─── Rule assembly (mirrors ducky.js buildRuleSet) ────────────────────────────
function buildRuleSet() {
  if (activeLang === 'all') {
    return [...RULES_PYTHON, ...RULES_JAVASCRIPT, ...RULES_CPP, ...RULES_GENERAL];
  }
  const langRules = { python: RULES_PYTHON, javascript: RULES_JAVASCRIPT, cpp: RULES_CPP };
  return [...(langRules[activeLang] || []), ...RULES_GENERAL];
}

// ─── Matching engine (mirrors ducky.js getResponse) ──────────────────────────
function getResponse(userInput) {
  const trimmed = userInput.trim();
  const ruleSet = buildRuleSet();

  for (const rule of ruleSet) {
    const match = trimmed.match(rule.pattern);
    if (!match) continue;

    const pool = (tone === 'pro' && rule.proResponses)
      ? rule.proResponses
      : rule.responses;

    let response = pool[Math.floor(Math.random() * pool.length)];

    // Substitute capture groups — BEFORE any quack suffix (bug fix from ducky6.py)
    response = response.replace(/\{(\d+)\}/g, (_, i) => match[parseInt(i) + 1] || '');

    if (tone === 'quack' && !response.includes('🦆') && Math.random() < 0.4) {
      response += ' Quack!';
    }

    return { text: response, label: rule.label, matchedRule: rule };
  }

  return { text: 'Quack! 🦆 Tell me more!', label: 'Catch-All', matchedRule: null };
}

// ─── Alternate response ───────────────────────────────────────────────────────
function getAltResponse(userInput, matchedRule) {
  if (!matchedRule) return null;

  const pool = (tone === 'pro' && matchedRule.proResponses)
    ? matchedRule.proResponses
    : matchedRule.responses;

  if (pool.length <= 1) return null;

  const match = userInput.match(matchedRule.pattern);
  let r = pool[Math.floor(Math.random() * pool.length)];
  r = r.replace(/\{(\d+)\}/g, (_, i) => match ? (match[parseInt(i) + 1] || '') : '');
  if (tone === 'quack' && !r.includes('🦆') && Math.random() < 0.4) r += ' Quack!';
  return r;
}

// ─── Print helpers ────────────────────────────────────────────────────────────
function printDivider() {
  console.log(gray('  ' + '─'.repeat(60)));
}

function printDuckResponse(text, label, matchedRule) {
  console.log('');
  console.log(duck(text));
  if (label) {
    console.log(gray(`   ↳ Rule: ${label}`));
  }

  // Offer alternate if rule has multiple responses — fixed: no infinite loop
  if (matchedRule) {
    const pool = (tone === 'pro' && matchedRule.proResponses)
      ? matchedRule.proResponses
      : matchedRule.responses;
    if (pool.length > 1) {
      console.log(gray('   ↳ Type "another" for a different answer'));
    }
  }
  console.log('');
}

// ─── Banner ───────────────────────────────────────────────────────────────────
function printBanner() {
  const totalRules = RULES_GENERAL.length + RULES_PYTHON.length +
                     RULES_JAVASCRIPT.length + RULES_CPP.length;

  const langLabel = { all: 'All Languages', python: 'Python', javascript: 'JavaScript', cpp: 'C / C++' };

  console.log('');
  console.log(yellow('  🦆  DUCKY — Rubber Duck Debugger'));
  console.log(gray('  Ported from ducky6.py · CS4811, Prof Leo Ureel'));
  printDivider();
  console.log(gray(`  Rules: ${totalRules}+  |  Tone: ${tone === 'pro' ? 'Professional' : 'Quacky 🦆'}  |  Language: ${langLabel[activeLang]}`));
  printDivider();
  console.log(gray('  Commands:  another · lang py/js/cpp/all · tone quack/pro · quit'));
  printDivider();
  console.log('');
  console.log(duck(
    tone === 'quack'
      ? "Hello! I'm Ducky, your rubber duck debugger! Quack! 🦆\n   Describe your bug and I'll help you squash it!"
      : "Hello. I'm Ducky, a debugging assistant.\n   Describe your error and I'll help you resolve it."
  ));
  console.log('');
}

// ─── REPL ─────────────────────────────────────────────────────────────────────
function startREPL() {
  printBanner();

  const rl = readline.createInterface({
    input:  process.stdin,
    output: process.stdout,
    prompt: cyan('   You: '),
  });

  rl.prompt();

  let lastUserInput   = '';
  let lastMatchedRule = null;

  rl.on('line', (line) => {
    const input = line.trim();

    if (!input) {
      rl.prompt();
      return;
    }

    // ── Built-in REPL commands ──────────────────────────────────────────────

    if (/^(quit|exit|bye)$/i.test(input)) {
      console.log('');
      console.log(duck("Goodbye! Keep quacking at those bugs! 🦆"));
      console.log('');
      rl.close();
      process.exit(0);
    }

    // "another" — get alternate response for last matched rule (no infinite loop)
    if (/^another$/i.test(input) && lastMatchedRule) {
      const alt = getAltResponse(lastUserInput, lastMatchedRule);
      if (alt) {
        console.log('');
        console.log(duck(alt));
        console.log('');
      } else {
        console.log('');
        console.log(duck("That's the only response I have for that one! Try a different question."));
        console.log('');
      }
      rl.prompt();
      return;
    }

    // "lang py|js|cpp|all" — switch language filter mid-session
    const langMatch = input.match(/^lang\s+(py|python|js|javascript|cpp|c\+\+|all)$/i);
    if (langMatch) {
      const flag = langMatch[1].toLowerCase();
      const map  = { py: 'python', python: 'python', js: 'javascript',
                     javascript: 'javascript', cpp: 'cpp', 'c++': 'cpp', all: 'all' };
      activeLang = map[flag] || 'all';
      const langLabel = { all: 'All Languages', python: 'Python', javascript: 'JavaScript', cpp: 'C / C++' };
      console.log('');
      console.log(duck(`Switched to ${langLabel[activeLang]} mode! 🦆`));
      console.log('');
      rl.prompt();
      return;
    }

    // "tone quack|pro" — switch tone mid-session
    const toneMatch = input.match(/^tone\s+(quack|pro|professional|fun)$/i);
    if (toneMatch) {
      tone = /pro|professional/.test(toneMatch[1]) ? 'pro' : 'quack';
      console.log('');
      console.log(duck(
        tone === 'quack'
          ? "Quack mode activated! Let's squash some bugs! 🦆"
          : "Professional mode activated. Responses will be concise and technical."
      ));
      console.log('');
      rl.prompt();
      return;
    }

    // ── Normal message ──────────────────────────────────────────────────────

    lastUserInput = input;
    const { text, label, matchedRule } = getResponse(input);
    lastMatchedRule = matchedRule;

    printDuckResponse(text, label, matchedRule);
    rl.prompt();
  });

  rl.on('close', () => {
    console.log('');
    process.exit(0);
  });
}

// ─── Entry point ─────────────────────────────────────────────────────────────
startREPL();
