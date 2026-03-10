/**
 * ducky.js — Engine & UI
 * Ducky: Rubber Duck Debugger
 * Ported & expanded from ducky6.py (CS4811, Prof Leo Ureel)
 *
 * Rule files (loaded via <script> tags before this file):
 *   rules-general.js    → RULES_GENERAL
 *   rules-python.js     → RULES_PYTHON
 *   rules-javascript.js → RULES_JAVASCRIPT
 *   rules-cpp.js        → RULES_CPP
 *
 * Architecture:
 *   - Language filter narrows which language-specific rules are searched first.
 *   - General rules are always searched last as fallback.
 *   - Catch-All is the final fallback and always matches.
 *
 * Bug fixes from ducky6.py:
 *   - quack suffix appended AFTER group substitution (was corrupting {0} placeholders)
 *   - "another solution" loop replaced with a one-shot UI button (was random() < 1 = always true)
 */

// ═══════════════════════════════════════════════════════════
// STATE
// ═══════════════════════════════════════════════════════════

let tone          = 'quack';   // 'quack' | 'pro'
let activeLang    = 'all';     // 'all' | 'python' | 'javascript' | 'cpp'
let statsMessages = 0;
let lastUserInput = '';

// ═══════════════════════════════════════════════════════════
// RULE ASSEMBLY
// Build the active rule list based on selected language.
// Order: language-specific rules first, then general rules.
// The Catch-All inside RULES_GENERAL is always last.
// ═══════════════════════════════════════════════════════════

function buildRuleSet() {
  const langRules = {
    python:     RULES_PYTHON,
    javascript: RULES_JAVASCRIPT,
    cpp:        RULES_CPP,
  };

  if (activeLang === 'all') {
    return [
      ...RULES_PYTHON,
      ...RULES_JAVASCRIPT,
      ...RULES_CPP,
      ...RULES_GENERAL,
    ];
  }

  return [
    ...(langRules[activeLang] || []),
    ...RULES_GENERAL,
  ];
}

// ═══════════════════════════════════════════════════════════
// MATCHING ENGINE
// ═══════════════════════════════════════════════════════════

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

    // Substitute capture groups {0}, {1}, {2}... BEFORE appending quack
    // Bug fix: original appended 'quack!' before substitution, corrupting {n} placeholders
    response = response.replace(/\{(\d+)\}/g, (_, i) => match[parseInt(i) + 1] || '');

    // Quack suffix: only in quack tone, 40% chance, only if not already quacking
    if (tone === 'quack' && !response.includes('🦆') && Math.random() < 0.4) {
      response += ' Quack!';
    }

    return { text: response, label: rule.label, matchedRule: rule };
  }

  return { text: 'Quack! 🦆 Tell me more!', label: 'Catch-All', matchedRule: null };
}

// ═══════════════════════════════════════════════════════════
// TONE CONTROLS
// ═══════════════════════════════════════════════════════════

function setTone(t) {
  tone = t;
  document.getElementById('btn-quack').classList.toggle('active', t === 'quack');
  document.getElementById('btn-pro').classList.toggle('active', t === 'pro');
  appendDuckMessage(
    t === 'quack'
      ? "Quack! Switching to fun mode. Let's squash some bugs! 🦆"
      : "Switching to professional mode. Responses will be concise and technical.",
    null, null
  );
}

// ═══════════════════════════════════════════════════════════
// LANGUAGE FILTER CONTROLS
// ═══════════════════════════════════════════════════════════

function setLang(lang) {
  activeLang = lang;

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });

  document.querySelectorAll('.quick-chip').forEach(chip => {
    const chipLang = chip.dataset.lang;
    chip.style.display = (lang === 'all' || chipLang === lang || chipLang === 'general')
      ? 'block'
      : 'none';
  });

  const langLabels = {
    all: 'All', python: 'Python', javascript: 'JavaScript', cpp: 'C / C++',
  };
  document.getElementById('stat-lang').textContent = langLabels[lang] || 'All';

  const msgs = {
    all:        "Quack! All languages active. Ask me anything! 🦆",
    python:     "Python mode! 🐍 Ask about any Python error or concept.",
    javascript: "JavaScript mode! ⚡ Ask about JS, Node.js, React, or TypeScript.",
    cpp:        "C/C++ mode! ⚙️ Ask about segfaults, memory leaks, linker errors, and more.",
  };
  const proMsgs = {
    all:        "All language rules active.",
    python:     "Python rule set active. General rules remain available as fallback.",
    javascript: "JavaScript/Node.js rule set active. General rules remain available as fallback.",
    cpp:        "C/C++ rule set active. General rules remain available as fallback.",
  };

  appendDuckMessage(tone === 'pro' ? proMsgs[lang] : msgs[lang], null, null);
}

// ═══════════════════════════════════════════════════════════
// UI: MESSAGES
// ═══════════════════════════════════════════════════════════

function appendDuckMessage(text, ruleLabel, matchedRule) {
  const box = document.getElementById('chat-box');

  const msg = document.createElement('div');
  msg.className = 'message duck-msg';

  const av = document.createElement('div');
  av.className = 'avatar duck';
  av.textContent = '🦆';

  const bub = document.createElement('div');
  bub.className = 'bubble';
  bub.innerHTML = escapeHtml(text);

  if (ruleLabel) {
    const tag = document.createElement('span');
    tag.className = 'rule-tag';
    tag.textContent = '↳ ' + ruleLabel;
    bub.appendChild(tag);
  }

  msg.appendChild(av);
  msg.appendChild(bub);
  box.appendChild(msg);

  // "Try another answer" — one-shot button per response
  // Bug fix: original used while(random() < 1) which is always true = infinite loop
  if (matchedRule) {
    const pool = (tone === 'pro' && matchedRule.proResponses)
      ? matchedRule.proResponses
      : matchedRule.responses;

    if (pool.length > 1) {
      const wrap = document.createElement('div');
      wrap.style.paddingLeft = '48px';

      const btn = document.createElement('button');
      btn.className = 'another-btn';
      btn.textContent = '↻ Try another answer';
      btn.onclick = () => {
        const altPool = (tone === 'pro' && matchedRule.proResponses)
          ? matchedRule.proResponses
          : matchedRule.responses;
        let r = altPool[Math.floor(Math.random() * altPool.length)];
        r = r.replace(/\{(\d+)\}/g, (_, i) => {
          const m = lastUserInput.match(matchedRule.pattern);
          return m ? (m[parseInt(i) + 1] || '') : '';
        });
        if (tone === 'quack' && !r.includes('🦆') && Math.random() < 0.4) r += ' Quack!';
        appendDuckMessage(r, ruleLabel, null);
        btn.remove();
        scrollChat();
      };

      wrap.appendChild(btn);
      box.appendChild(wrap);
    }
  }

  scrollChat();
}

function appendUserMessage(text) {
  const box = document.getElementById('chat-box');

  const msg = document.createElement('div');
  msg.className = 'message user';

  const av = document.createElement('div');
  av.className = 'avatar user-av';
  av.textContent = 'you';

  const bub = document.createElement('div');
  bub.className = 'bubble';
  bub.textContent = text;

  msg.appendChild(bub);
  msg.appendChild(av);
  box.appendChild(msg);
  scrollChat();

  statsMessages++;
  document.getElementById('stat-msgs').textContent = statsMessages;
}

// ═══════════════════════════════════════════════════════════
// UI: TYPING INDICATOR
// ═══════════════════════════════════════════════════════════

function showTyping() {
  const box = document.getElementById('chat-box');
  const t = document.createElement('div');
  t.className = 'message duck-msg';
  t.id = 'typing-indicator';

  const av = document.createElement('div');
  av.className = 'avatar duck';
  av.textContent = '🦆';

  const bub = document.createElement('div');
  bub.className = 'bubble typing';
  bub.innerHTML = '<div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>';

  t.appendChild(av);
  t.appendChild(bub);
  box.appendChild(t);
  scrollChat();
}

function removeTyping() {
  const el = document.getElementById('typing-indicator');
  if (el) el.remove();
}

// ═══════════════════════════════════════════════════════════
// UI: HELPERS
// ═══════════════════════════════════════════════════════════

function scrollChat() {
  document.getElementById('chat-box').scrollTop = 999999;
}

function escapeHtml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function updateRuleStat(label) {
  document.getElementById('stat-matched').textContent = label || '—';
}

// ═══════════════════════════════════════════════════════════
// SEND LOGIC
// ═══════════════════════════════════════════════════════════

function handleSend() {
  const input = document.getElementById('user-input');
  const text = input.value.trim();
  if (!text) return;

  if (/^(quit|exit|bye)$/i.test(text)) {
    appendUserMessage(text);
    setTimeout(() => appendDuckMessage("Goodbye! Keep quacking at those bugs! 🦆", null, null), 400);
    input.value = '';
    return;
  }

  lastUserInput = text;
  appendUserMessage(text);
  input.value = '';
  showTyping();

  setTimeout(() => {
    removeTyping();
    const { text: response, label, matchedRule } = getResponse(text);
    appendDuckMessage(response, label, matchedRule);
    updateRuleStat(label);
  }, 300 + Math.random() * 400);
}

function sendQuick(text) {
  document.getElementById('user-input').value = text;
  handleSend();
}

// ═══════════════════════════════════════════════════════════
// KEYBOARD
// ═══════════════════════════════════════════════════════════

document.getElementById('user-input').addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    handleSend();
  }
});

// ═══════════════════════════════════════════════════════════
// INIT
// ═══════════════════════════════════════════════════════════

(function init() {
  const totalRules = RULES_GENERAL.length + RULES_PYTHON.length + RULES_JAVASCRIPT.length + RULES_CPP.length;
  document.getElementById('stat-rules').textContent = totalRules + '+';
  document.getElementById('stat-lang').textContent = 'All';

  appendDuckMessage(
    tone === 'quack'
      ? "Hello! I'm Ducky, your rubber duck debugger! 🦆 Select a language below or just describe your bug!"
      : "Hello. I'm Ducky, a debugging assistant. Select a language filter or describe your error.",
    null, null
  );
})();
