# 🦆 Ducky — Rubber Duck Debugger

A conversational debugging assistant, originally developed for CS4811 (Prof. Leo Ureel). Now deployed as a static web app on GitHub Pages.

## Live Demo

Deploy via GitHub Pages: `https://<your-username>.github.io/<repo-name>/`

## Features

- **50+ pattern rules** covering Python, JavaScript/Node.js, and C/C++ errors
- **Tone toggle**: Quacky (rubber duck personality) or Professional mode
- **"Try another answer"** button for alternative suggestions per rule
- **Quick prompts** sidebar for common errors
- **Zero dependencies** — pure HTML/CSS/JS, no build step required

## Deploying to GitHub Pages

1. Create a new GitHub repo (e.g., `ducky-debugger`)
2. Upload `index.html` and `ducky.js` to the root of the `main` branch
3. Go to **Settings → Pages → Source**: set to `main` branch, `/ (root)`
4. Your site will be live at `https://<username>.github.io/ducky-debugger/`

## Error Coverage

| Language | Errors Covered |
|---|---|
| Python | TypeError, NameError, SyntaxError, ImportError, IndexError, KeyError, FileNotFoundError, ZeroDivisionError, RecursionError, MemoryError, ValueError, AttributeError, RuntimeError, AssertionError, UnicodeError, OSError, OverflowError, NotImplementedError, ModuleNotFoundError |
| JavaScript / Node.js | Uncaught TypeError, ReferenceError, SyntaxError, Unhandled Promise Rejection, CORS, non-function calls, Maximum call stack, Module not found, ENOENT, EADDRINUSE, null/undefined, event listeners, fetch/HTTP errors |
| C / C++ | Segmentation fault, memory leak, undefined behavior, stack overflow, linker errors, null pointer dereference, compilation errors, buffer overflow, use-after-free, race conditions/deadlocks |

## Bug Fixes from ducky6.py

- **Quack suffix bug**: In the original, `quack!` was appended before `.format()` was called, corrupting `{0}`, `{1}` group substitutions. Fixed by substituting groups first, then appending.
- **Infinite "another solution" loop**: Original used `while random.random() < 1:` which is always True. Replaced with a single-use button in the UI.

## Adding New Rules

Edit `ducky.js` and add an entry to the `rules` array:

```js
{
  label: 'MY: Custom Error',
  pattern: /^(.*)(my error pattern)(.*)$/i,
  responses: [
    "Quacky response here! 🦆",
    "Another quacky option."
  ],
  proResponses: [
    "Professional response here.",
    "Another professional option."
  ]
}
```

Rules are matched top-to-bottom — more specific rules should come before general ones.

## Project Structure

```
/
├── index.html   # UI shell (header, sidebar, chat layout)
└── ducky.js     # Rule engine + all patterns + UI logic
```

## Original Author

Developed during Master's program, CS4811 — Prof. Leo Ureel.
