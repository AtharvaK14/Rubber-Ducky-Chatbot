# 🦆 Ducky — Rubber Duck Debugger

> *"Explain your bug to a rubber duck. The act of explanation often reveals the solution."*

A conversational debugging assistant built for **CS4811** (Prof. Leo Ureel). Originally a Python terminal chatbot, expanded into a full web app and Node.js CLI that share the same rule files — add a rule once, both interfaces pick it up immediately.

---

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Error Coverage](#error-coverage)
- [Web App — Deployment](#web-app--deployment)
- [CLI — Setup and Usage](#cli--setup-and-usage)
  - [Prerequisites](#prerequisites)
  - [Step 1: Navigate to the project folder](#step-1--navigate-to-the-project-folder)
  - [Step 2: Run Ducky](#step-2--run-ducky)
  - [Startup Options](#startup-options)
  - [Mid-Session Commands](#mid-session-commands)
  - [Example Session](#example-session)
  - [Troubleshooting](#troubleshooting)
- [Adding New Rules](#adding-new-rules)
- [Architecture Notes](#architecture-notes)
- [Origin](#origin)

---

## Features

- **107 pattern-matching rules** across Python, JavaScript/Node.js, and C/C++
- **Tone toggle** — Quacky 🦆 personality or Professional mode
- **Language filter button** — focus rules on Python, JS, or C++ for faster, more relevant matches
- **"Try another answer"** — alternate responses per rule without repeating yourself
- **Quick prompts sidebar** — one-click shortcuts for the most common errors
- **Node.js CLI** — runs in any terminal or VS Code integrated terminal; zero npm dependencies
- **Shared rule files** — web and CLI read identical rules; one source of truth, no drift
- **No build step** — pure HTML/CSS/JS for the web app; Node.js stdlib only for the CLI

---

## Project Structure

```
ducky-project/
├── index.html              # Web app UI
├── ducky.css               # All styles, variables, animations
├── ducky.js                # Web engine: rule assembly, matching, UI logic
├── ducky-cli.js            # Terminal CLI — start here for terminal use
├── rules-general.js        # 43 rules: conversation, git, performance, APIs, fallbacks
├── rules-python.js         # 28 rules: Python-specific errors and debugging
├── rules-javascript.js     # 20 rules: JavaScript, Node.js, React, TypeScript
├── rules-cpp.js            # 16 rules: C and C++ errors
└── README.md
```

**All eight files must be in the same folder.** The CLI uses `require()` to load the rule files at startup. Missing any one of the `rules-*.js` files causes a `Cannot find module` error.

---

## Error Coverage

| Language | Rules | Errors Covered |
|---|:---:|---|
| **Python** | 28 | TypeError, NameError, SyntaxError, IndentationError, ImportError, ModuleNotFoundError, IndexError, KeyError, FileNotFoundError, ZeroDivisionError, RecursionError, MemoryError, ValueError, AttributeError, RuntimeError, AssertionError, UnicodeError, OSError, OverflowError, NotImplementedError, StopIteration, async/await, venv/pip |
| **JavaScript** | 20 | Uncaught TypeError, ReferenceError, SyntaxError, Unhandled Promise Rejection, CORS, Maximum call stack exceeded, Module not found, ENOENT, EADDRINUSE, null/undefined guards, event listeners, fetch errors, closure/scope, `this` context, JSON.parse, npm, Webpack/Vite, React hooks, TypeScript |
| **C / C++** | 16 | Segfault, memory leak, undefined behavior, stack overflow, linker errors, null pointer dereference, compilation errors, buffer overflow, use-after-free, race conditions, template errors, smart pointers, STL/iterators, Makefile/CMake, casting, Rule of Five |
| **General** | 43 | Greetings, jokes, git/merge conflicts, testing, performance, deployment, API requests, SQL queries, regex, security vulnerabilities, dependency issues, code refactoring, and conversation fallbacks |

---

## Web App — Deployment

### GitHub Pages

1. Create a new GitHub repository
2. Push all files to the root of the `main` branch
3. Go to **Settings → Pages → Source**: set branch `main`, folder `/ (root)`
4. Site goes live at `https://<username>.github.io/<repo-name>/`

No server needed — the entire app runs in the browser.

### Local (no server)

Just open `index.html` directly in any browser. All assets are local; no network requests are made during chat.

---

## CLI — Setup and Usage

### Prerequisites

| Requirement | How to verify |
|---|---|
| Node.js 14 or higher | Run `node --version` — should print `v14.x.x` or higher |
| All project files present | Run `ls` (Mac/Linux) or `dir` (Windows) — all 8 files should be listed |

No `npm install` required. The CLI uses only Node.js built-in modules (`readline`, `path`).

> **Don't have Node.js?**
> Download the LTS version from [nodejs.org](https://nodejs.org).
> The installer includes both `node` and `npm`. Restart VS Code after installing.

---

### Step 1 — Navigate to the project folder

Open a terminal and `cd` into your project directory.

**Windows:**
```bash
cd C:\Users\YourName\Documents\ducky-project
```

**Mac / Linux:**
```bash
cd ~/Documents/ducky-project
```

**VS Code shortcut:** Right-click the project folder in the Explorer panel → **Open in Integrated Terminal**. VS Code cds into it automatically.

**Open the VS Code terminal:**
- Menu bar: **Terminal → New Terminal**
- Keyboard: `` Ctrl+` `` (Windows/Linux) or `` Cmd+` `` (Mac)

Verify you're in the right place:
```bash
# Mac / Linux
ls ducky-cli.js

# Windows
dir ducky-cli.js
```

You should see `ducky-cli.js` listed. If you see "No such file", you're in the wrong folder.

---

### Step 2 — Run Ducky

```bash
node ducky-cli.js
```

You'll see the banner and a `You:` prompt. Type your error or question and press **Enter**.

---

### Startup Options

These flags are passed when launching — they set the initial tone and language mode:

| Command | Description |
|---|---|
| `node ducky-cli.js` | Default: quacky tone, all languages active |
| `node ducky-cli.js --pro` | Professional tone — concise, technical responses |
| `node ducky-cli.js --lang py` | Python rules prioritized (also accepts `--lang python`) |
| `node ducky-cli.js --lang js` | JavaScript rules prioritized (also accepts `--lang javascript`) |
| `node ducky-cli.js --lang cpp` | C/C++ rules prioritized (also accepts `--lang c++`) |
| `node ducky-cli.js --lang all` | All language rules active (the default) |
| `node ducky-cli.js --pro --lang py` | Combine flags freely |

---

### Mid-Session Commands

Type these at the `You:` prompt without restarting Ducky:

| Type this | What happens |
|---|---|
| `another` | Get a different response for your last question |
| `lang py` | Switch to Python mode |
| `lang js` | Switch to JavaScript mode |
| `lang cpp` | Switch to C/C++ mode |
| `lang all` | Switch back to all-languages mode |
| `tone quack` | Switch to quacky personality |
| `tone pro` | Switch to professional tone |
| `quit` | Exit Ducky (also: `exit` or `bye`) |

---

### Example Session

```
$ node ducky-cli.js --lang py

  🦆  DUCKY — Rubber Duck Debugger
  Rules: 107+  |  Tone: Quacky 🦆  |  Language: Python
  ────────────────────────────────────────────────────────────
  Commands:  another · lang py/js/cpp/all · tone quack/pro · quit
  ────────────────────────────────────────────────────────────

🦆 Ducky: Hello! I'm Ducky, your rubber duck debugger! Quack! 🦆
          Describe your bug and I'll help you squash it!

   You: I have a NameError name x is not defined

🦆 Ducky: Check for typos in the name. Python is case-sensitive! Quack!
          ↳ Rule: PY: NameError
          ↳ Type "another" for a different answer

   You: another

🦆 Ducky: Make sure it's defined before the line where it's used.

   You: tone pro

🦆 Ducky: Professional mode activated. Responses will be concise and technical.

   You: I have an ImportError No module named requests

🦆 Ducky: Run pip install requests in your active environment. Verify with pip list.
          ↳ Rule: PY: ImportError / ModuleNotFoundError

   You: lang js

🦆 Ducky: Switched to JavaScript mode! ⚡

   You: I have a CORS error in my fetch request

🦆 Ducky: CORS is enforced by the browser. The server must respond
          with Access-Control-Allow-Origin.
          ↳ Rule: JS: CORS Error

   You: quit

🦆 Ducky: Goodbye! Keep quacking at those bugs! 🦆
```

---

### Troubleshooting

| Error | Fix |
|---|---|
| `node: command not found` | Node.js is not installed. Download from [nodejs.org](https://nodejs.org) and restart VS Code. |
| `Cannot find module './rules-python.js'` | Wrong folder. Run `cd path/to/your/project` so all 8 files are present. |
| `SyntaxError: Unexpected token 'export'` | Running in a bundler context. Use plain `node ducky-cli.js`, not via webpack/vite. |
| Colors not showing on Windows | Use VS Code Terminal or Windows Terminal. The legacy `cmd.exe` does not support ANSI colors. |
| Blank output | Run `node ducky-cli.js > test.txt` to inspect raw output without color codes. |

---

## Adding New Rules

Open the appropriate rule file and add your rule **before** the closing `];`:

```js
{
  lang: 'python',                             // 'python' | 'javascript' | 'cpp' | 'general'
  label: 'PY: My Custom Error',              // shown in UI and CLI as "↳ Rule: ..."
  pattern: /^(.*)(my error keyword)(.*)$/i,  // regex, case-insensitive, first match wins
  responses: [
    "Quacky response here! 🦆",
    "Another quacky option."
  ],
  proResponses: [                            // optional — used when Pro tone is active
    "Professional response here.",
    "Another professional option."
  ]
},
```

**Tips:**
- Rules match **top-to-bottom** — put more specific patterns above general ones
- The `Catch-All` at the bottom of `rules-general.js` always fires as the final fallback
- After saving, **refresh the browser** or **restart `node ducky-cli.js`** to load the change

---

## Architecture Notes

### How one rule file works in both browser and Node.js

Each rule file ends with a single compatibility shim:

```js
if (typeof module !== 'undefined') module.exports = RULES_PYTHON;
```

- **Browser:** `module` is undefined — the line is silently skipped. The array loads as a global via `<script>` tag.
- **Node.js:** `module` exists — `require('./rules-python.js')` returns the array.

No bundler, no transpiler, no build step needed.

### Language filter — rule search order

| Mode | Search order |
|---|---|
| `all` (default) | Python → JavaScript → C++ → General |
| `--lang py` | Python → General |
| `--lang js` | JavaScript → General |
| `--lang cpp` | C++ → General |

General rules (including Catch-All) are always appended last as fallback regardless of mode.

### Bug fixes from the original `ducky6.py`

| Bug | Original code | Fix |
|---|---|---|
| Quack suffix corrupted responses | `quack!` appended before `.format()`, breaking `{0}` group substitutions | Groups substituted first; quack appended after |
| Infinite "another answer" loop | `while random.random() < 1:` — always `True` | Replaced with a one-shot button (web) and single `another` command (CLI) |

---

## Origin

Built for **CS4811 — Intelligent Systems** (Master's program, Prof. Leo Ureel) as an ELIZA-style pattern-matching chatbot in Python. Ported to JavaScript, expanded with multi-language error rules, and restructured into a modular web app + shared CLI.

---

## License

MIT
