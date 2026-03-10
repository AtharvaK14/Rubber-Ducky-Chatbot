/**
 * Ducky — Rubber Duck Debugger
 * Ported & expanded from ducky6.py (CS4811, Prof Leo Ureel)
 *
 * Changes from Python original:
 *  - BUG FIX: quack suffix now appended AFTER format substitution (was corrupting {0} groups)
 *  - BUG FIX: "another solution" loop no longer uses random() < 1 (was always true = infinite loop)
 *  - ADDED: JavaScript/Node.js error rules (Rules JS-1 through JS-15)
 *  - ADDED: C/C++ error rules (Rules CPP-1 through CPP-12)
 *  - ADDED: Tone toggle (Quacky vs Professional)
 *  - ADDED: Named rule labels for UI display
 */

// ===== STATE =====
let tone = 'quack';         // 'quack' | 'pro'
let msgCount = 0;
let lastMatchedPattern = null;
let lastUserInput = '';

// ===== TONE SWITCHER =====
function setTone(t) {
  tone = t;
  document.getElementById('btn-quack').classList.toggle('active', t === 'quack');
  document.getElementById('btn-pro').classList.toggle('active', t === 'pro');
  appendDuckMessage(
    t === 'quack'
      ? "Quack! Switching to fun mode. Let's squash some bugs! 🦆"
      : "Switching to professional mode. I'll keep responses concise and technical.",
    null
  );
}

// ===== RULE ENGINE =====
// Each rule: { pattern, label, responses, proResponses? }
// responses     = quacky tone
// proResponses  = professional tone (falls back to responses if absent)

const rules = [

  // ── GENERAL CONVERSATION ──────────────────────────────────────────────────

  {
    label: 'Name Introduction',
    pattern: /^(.*)my name is (\w+)(.*)$/i,
    responses: [
      "Nice to meet you, {1}! 🦆 Quack! What bug are we hunting today?",
      "Hello, {1}! I'm Ducky. Ready to debug together?"
    ],
    proResponses: [
      "Hello, {1}. What can I help you with today?",
      "Nice to meet you, {1}. What are you debugging?"
    ]
  },

  {
    label: 'Greeting',
    pattern: /^(hello|hi|hey)$/i,
    responses: ['Hello! Quack! 🦆', 'Hey there! Ready to debug?', 'Hi! What bug are we squashing?'],
    proResponses: ['Hello. How can I assist you?', 'Hi. What are you working on?']
  },

  {
    label: 'How Are You',
    pattern: /^(how are you|how are you doing)$/i,
    responses: ["I'm doing ducky-fine, thanks! How about you?", "Floating along nicely! What's your bug today?"],
    proResponses: ["Doing well, thanks. What can I help you with?"]
  },

  {
    label: 'How Was Your Day',
    pattern: /^(.*)how was your day(.*)$/i,
    responses: ["I'm just code — no days for me! But how was yours? Any bugs to report?"],
    proResponses: ["I'm a program without days, but thanks for asking. What can I help you with?"]
  },

  {
    label: 'Age Query',
    pattern: /^(.*)how old are you(.*)$/i,
    responses: [
      "In digital years I'm fresh off the press! My ancestor ELIZA was born in 1966 at MIT.",
      "Age is for humans. I exist in code and rubber duck wisdom. 🦆"
    ],
    proResponses: [
      "I'm a chatbot. My lineage traces to ELIZA (MIT, 1966). What can I help you debug?"
    ]
  },

  {
    label: 'Mood — Feeling X',
    pattern: /^(.*)i feel (\w+)(.*)$/i,
    responses: [
      "Feeling {1}? Tell me more. Sometimes explaining a bug out loud is all you need!",
      "I hear you. Being {1} is valid. What's going on with your code?"
    ],
    proResponses: [
      "Understood. What's causing you to feel {1}? Let's work through it."
    ]
  },

  {
    label: 'Positive Mood',
    pattern: /^(.*) (happy|excited|glad|not sad)(.*)$/i,
    responses: ["That's great! 🎉 Quack! Happy debugging!", "Love the energy! What can Ducky help with?"],
    proResponses: ["Good to hear. What are you working on?"]
  },

  {
    label: 'Negative Mood',
    pattern: /^(.*) (sad|unhappy|upset|frustrated|angry)(.*)$/i,
    responses: [
      "Debugging blues? I've heard it all! Tell me more. 🦆",
      "Don't worry — even the best devs get stuck. What's the issue?"
    ],
    proResponses: [
      "I understand the frustration. Let's work through the problem systematically."
    ]
  },

  {
    label: 'Identity Query',
    pattern: /^(who are you|what are you)$/i,
    responses: [
      "I'm BATMAN! ...Just kidding. I'm Ducky, your rubber duck debugger! 🦆 Quack!",
      "I'm Ducky — a chatbot designed to help you talk through your code problems!"
    ],
    proResponses: [
      "I'm Ducky, a pattern-based debugging assistant. Describe your error and I'll help."
    ]
  },

  {
    label: 'Name Query',
    pattern: /^what is your name$/i,
    responses: ["You can call me Ducky. 🦆 Quack!", "Ducky — at your service!"],
    proResponses: ["I'm Ducky, a debugging assistant."]
  },

  {
    label: 'Feeling Fine',
    pattern: /^(i am|i'm) (fine|good|great|alright)$/i,
    responses: ["Great! 🦆 Now, any bugs to squash?", "Glad to hear it! What are we debugging?"],
    proResponses: ["Good. What can I help you with today?"]
  },

  {
    label: 'Apology',
    pattern: /^(.*) (sorry|apologies|forgive me)(.*)$/i,
    responses: ["No worries! We're all learning. 🦆", "Don't sweat it. Let's keep debugging!"],
    proResponses: ["No need to apologize. Let's continue."]
  },

  {
    label: 'Request to Elaborate',
    pattern: /^(.*) (tell me more|expand|explain)(.*)$/i,
    responses: ["Sure thing! Go ahead and give me more details. 🦆", "I'm all ears — lay it on me!"],
    proResponses: ["Please provide more details."]
  },

  {
    label: 'Favorites Query',
    pattern: /^(.*)your favorite(.*)$/i,
    responses: ["I'm just code — no favorites! My only love is debugging. 🦆", "That's classified duck intel!"],
    proResponses: ["I'm a program and don't have preferences. What can I help you debug?"]
  },

  {
    label: 'Joke Request',
    pattern: /^(.*)(tell me a joke|another joke|tell me another joke)(.*)$/i,
    responses: [
      "Why did the scarecrow win an award? Because he was outstanding in his field!",
      "How does a penguin build its house? Igloos it together!",
      "What do you call a fake spaghetti? An impasta!",
      "Why do Indian restaurants cut bread in half? Firm believers of naan-violence!",
      "I got an email saying 'At Google Earth we can read maps backwards'... that's just spam.",
      "What did the green grape say to the purple grape? Breathe, you idiot!",
      "Why do programmers prefer dark mode? Because light attracts bugs! 🦆",
      "A SQL query walks into a bar, walks up to two tables and asks... 'Can I JOIN you?'"
    ]
  },

  {
    label: 'Music & Movies',
    pattern: /^(.*)(love|like) (music|movies)(.*)$/i,
    responses: [
      "Nice! {1}s are a great way to unwind after a brutal debug session. Any favorites?",
      "Great taste! I'd recommend 'The Matrix' — it's basically about debugging reality."
    ],
    proResponses: [
      "That's great. What can I help you with technically?"
    ]
  },

  {
    label: 'Weather',
    pattern: /^(.*)(weather|rain|sunny|cloudy)(.*)$/i,
    responses: [
      "No real-time weather for me, but I hope it's sunny enough to see your code clearly! ☀️",
      "It's always sunny in the digital world! What bug are we solving today?"
    ],
    proResponses: ["I don't have weather access. What technical issue can I help with?"]
  },

  {
    label: 'Hobbies',
    pattern: /^(.*)(hobby|hobbies)(.*)$/i,
    responses: [
      "My hobby? Squashing bugs, obviously. 🦆 What's yours?",
      "Everyone needs a hobby. What are yours?"
    ],
    proResponses: ["What can I help you with today?"]
  },

  {
    label: 'How Do You Work',
    pattern: /^(how do you work)$/i,
    responses: [
      "I match your text against a big list of patterns and pick the best response. ELIZA-style, baby! 🦆",
      "Pattern matching! You type, I match, I respond. Simple and effective."
    ],
    proResponses: [
      "I use regex pattern matching against a rule set to generate context-aware responses."
    ]
  },

  {
    label: 'Can You Learn',
    pattern: /^can you learn$/i,
    responses: [
      "Not in the ML sense — I'm rule-based! But you can teach me by giving Ducky more rules. 🦆",
      "I don't learn between sessions, but I remember everything within our conversation!"
    ],
    proResponses: [
      "No. I'm a rule-based system, not a learning model."
    ]
  },

  {
    label: 'Time Query',
    pattern: /^what time is it$/i,
    responses: ["Check your device — I live outside of time! 🦆 Quack!"],
    proResponses: ["I don't have real-time access. Please check your device."]
  },

  {
    label: 'Flip a Coin',
    pattern: /^flip a coin$/i,
    responses: ["Heads! 🦆", "Tails!"]
  },

  {
    label: 'Compliment to Ducky',
    pattern: /^(you are|you're) (great|awesome|amazing|good|helpful)(.*)$/i,
    responses: ["Aw shucks! 🦆 Quack! You're pretty great yourself!", "Thanks! Now let's squash some bugs!"],
    proResponses: ["Thank you. How else can I assist you?"]
  },

  // ── PYTHON ERRORS ─────────────────────────────────────────────────────────

  {
    label: 'PY: Program Not Working',
    pattern: /^(my|the) program is (not working|broken|failing|giving an error)(.*)$/i,
    responses: [
      "Oh no! 🦆 Quack! Can you share the error message or the section of code?",
      "Let's debug together! What error are you seeing?",
      "Programming can be tricky. Tell me more — what's happening?"
    ],
    proResponses: [
      "What error message or unexpected behavior are you observing?",
      "Please share the error message or the relevant code section."
    ]
  },

  {
    label: 'PY: Infinite Loop',
    pattern: /^(.*)infinite loop(.*)$/i,
    responses: [
      "Quack! Check your loop — does it have a proper exit condition? 🦆",
      "Infinite loops usually mean a loop condition is never becoming false. Check your variables.",
      "Look for a missing break, or a condition that never evaluates to False."
    ],
    proResponses: [
      "Verify your loop's termination condition. Ensure the loop variable is modified each iteration.",
      "Check for missing break statements or conditions that never evaluate to False."
    ]
  },

  {
    label: 'PY: Indentation/Braces Error',
    pattern: /^(.*)(indentation|braces)(.*)(error|issue|problem)(.*)$/i,
    responses: [
      "Quack! Python is whitespace-sensitive. Make sure you're not mixing tabs and spaces! 🦆",
      "Consistent indentation is key. Try running your file through a linter.",
      "Check for any mixed tabs/spaces — use your editor's 'convert tabs to spaces' feature."
    ],
    proResponses: [
      "Ensure consistent indentation throughout. Python requires 4 spaces per level (PEP 8).",
      "Run: python -m py_compile yourfile.py to catch indentation errors early."
    ]
  },

  {
    label: 'PY: Undefined Variable',
    pattern: /^(.*)(variable|name)(.*)(not defined|undefined)(.*)$/i,
    responses: [
      "Quack! Did you declare that variable before using it? 🦆",
      "Check the scope — the variable might not exist in this context.",
      "Typo? Variable names are case-sensitive in Python!"
    ],
    proResponses: [
      "Ensure the variable is declared before the point of use and within the correct scope.",
      "Check for typos; Python is case-sensitive. Use your IDE's 'Find References' feature."
    ]
  },

  {
    label: 'PY: Programming Tips',
    pattern: /^(.*)(programming|coding)(.*)(tips|advice|help)(.*)$/i,
    responses: [
      "Tip: Break big problems into small functions! 🦆 Quack!",
      "Comment your code — future-you will thank you.",
      "When stuck, try explaining the problem out loud to a rubber duck. (That's me!) 🦆"
    ],
    proResponses: [
      "Best practices: single-responsibility functions, meaningful variable names, consistent commenting.",
      "Use a linter (flake8, pylint) and type hints to catch issues early."
    ]
  },

  {
    label: 'PY: ZeroDivisionError',
    pattern: /^(.*)(ZeroDivisionError|division by zero)(.*)$/i,
    responses: [
      "Quack! You can't divide by zero — that's math, not just Python! 🦆",
      "Add a guard: if denominator != 0: before your division.",
      "ZeroDivisionError: check that your denominator can never be zero."
    ],
    proResponses: [
      "Add a pre-condition check: assert denominator != 0 or use try/except ZeroDivisionError.",
      "Validate inputs before division operations to prevent ZeroDivisionError."
    ]
  },

  {
    label: 'PY: TypeError',
    pattern: /^(.*)(TypeError|type error)(.*)$/i,
    responses: [
      "Quack! Type mismatch! Make sure you're not mixing strings and ints without conversion. 🦆",
      "TypeError usually means you're calling something that isn't callable, or mixing incompatible types.",
      "Use type() or isinstance() to check what you're actually working with."
    ],
    proResponses: [
      "Inspect variable types with type() at the error line. Ensure function signatures match call arguments.",
      "Common causes: concatenating str + int, calling a non-callable, or wrong number of arguments."
    ]
  },

  {
    label: 'PY: SyntaxError',
    pattern: /^(.*)(SyntaxError|invalid syntax)(.*)$/i,
    responses: [
      "Quack! Syntax error! Check the line above the highlighted one — Python reports one line late. 🦆",
      "Look for missing colons, unmatched parentheses, or misquoted strings.",
      "Run python -m py_compile yourfile.py for a faster syntax check."
    ],
    proResponses: [
      "Check the line prior to the reported error — Python's SyntaxError often points one line late.",
      "Common causes: missing colon after if/for/def, unmatched brackets, or invalid string quotes."
    ]
  },

  {
    label: 'PY: NameError',
    pattern: /^(.*)(NameError|name.*not defined)(.*)$/i,
    responses: [
      "Quack! NameError — that variable or function doesn't exist yet! 🦆",
      "Check for typos in the name. Python is case-sensitive!",
      "Make sure it's defined before the line where it's used."
    ],
    proResponses: [
      "NameError indicates an undefined identifier. Verify spelling, scope, and declaration order.",
      "Ensure imports are at the top and variables are initialized before use."
    ]
  },

  {
    label: 'PY: ImportError',
    pattern: /^(.*)(ImportError|No module named)(.*)$/i,
    responses: [
      "Quack! Module not found! Try: pip install <modulename> 🦆",
      "Make sure you're in the right virtual environment. Run: which python to check.",
      "Typo in the module name? Check PyPI for the exact package name."
    ],
    proResponses: [
      "Run pip install <package> in your active environment. Verify with pip list.",
      "If using venv, ensure it's activated: source venv/bin/activate (Unix) or venv\\Scripts\\activate (Win)."
    ]
  },

  {
    label: 'PY: RuntimeError',
    pattern: /^(.*)(RuntimeError|run time error|runtime error)(.*)$/i,
    responses: [
      "Quack! RuntimeError is Python's way of saying 'something unexpected happened'. 🦆",
      "Share the full traceback — the cause is usually a few lines up.",
      "Check your program's state at the point of failure."
    ],
    proResponses: [
      "Examine the full traceback. RuntimeError is generic — the root cause is typically in the stack above.",
      "Add logging before the failure point to inspect variable state."
    ]
  },

  {
    label: 'PY: AttributeError',
    pattern: /^(.*)(AttributeError|attribute error)(.*)$/i,
    responses: [
      "Quack! That object doesn't have that attribute! Maybe it's None? 🦆",
      "Use dir(obj) to see what attributes an object actually has.",
      "Check you're not accidentally calling a method on None."
    ],
    proResponses: [
      "Use dir(obj) or help(obj) to verify available attributes. Check for None before attribute access.",
      "Common cause: a function returned None unexpectedly and you chained a method call on it."
    ]
  },

  {
    label: 'PY: KeyError',
    pattern: /^(.*)(KeyError|key error)(.*)$/i,
    responses: [
      "Quack! That key doesn't exist in your dictionary! 🦆",
      "Use dict.get(key, default) instead of dict[key] to avoid KeyError.",
      "Check the key name for typos — keys are case-sensitive!"
    ],
    proResponses: [
      "Use dict.get(key, default) for safe access. Or check with: if key in dict: before accessing.",
      "Print dict.keys() to verify the exact key names available."
    ]
  },

  {
    label: 'PY: FileNotFoundError',
    pattern: /^(.*)(FileNotFoundError|file not found)(.*)$/i,
    responses: [
      "Quack! Can't find the file! Double-check the path. 🦆",
      "Use os.path.exists(path) to verify the file before opening it.",
      "Relative paths depend on where you run the script from. Try an absolute path first."
    ],
    proResponses: [
      "Use pathlib.Path(path).exists() to validate before open(). Prefer absolute paths in production.",
      "Check working directory with os.getcwd() — relative paths resolve from there."
    ]
  },

  {
    label: 'PY: MemoryError',
    pattern: /^(.*)(MemoryError|memory error)(.*)$/i,
    responses: [
      "Quack! Out of memory! 🦆 Are you loading a huge file all at once?",
      "Try using generators or chunked reading instead of loading everything into RAM.",
      "Profile with memory_profiler to find the culprit."
    ],
    proResponses: [
      "Use generators or streaming I/O instead of loading full datasets into memory.",
      "Profile with: pip install memory-profiler, then @profile decorator on your function."
    ]
  },

  {
    label: 'PY: ValueError',
    pattern: /^(.*)(ValueError|value error)(.*)$/i,
    responses: [
      "Quack! The value is the right type but wrong content. 🦆",
      "Check what you're passing — int('abc') gives ValueError, for example.",
      "Validate input data before passing it to functions."
    ],
    proResponses: [
      "ValueError: the type is correct but the value is out of range or invalid for the operation.",
      "Add input validation before the operation. Use try/except ValueError to handle gracefully."
    ]
  },

  {
    label: 'PY: AssertionError',
    pattern: /^(.*)(AssertionError|assertion error)(.*)$/i,
    responses: [
      "Quack! An assertion failed — your assumption about the program state was wrong! 🦆",
      "Check what the assert was checking and why that condition is false.",
      "Assertions are great for catching bugs early. Trust them!"
    ],
    proResponses: [
      "An assert statement evaluated to False. Examine the asserted condition and the actual values.",
      "Use assert x == expected, f'Got {x}' to get informative failure messages."
    ]
  },

  {
    label: 'PY: KeyboardInterrupt',
    pattern: /^(.*)(KeyboardInterrupt|keyboard interrupt)(.*)$/i,
    responses: [
      "Quack! You pressed Ctrl+C! Or your program has an infinite loop. 🦆",
      "Wrap your main loop with try/except KeyboardInterrupt to exit gracefully.",
      "If it happened unexpectedly, look for a blocking call or infinite loop."
    ],
    proResponses: [
      "Handle gracefully with try/except KeyboardInterrupt: ... sys.exit(0).",
      "Unexpected KeyboardInterrupt often indicates a blocking I/O or infinite loop."
    ]
  },

  {
    label: 'PY: IndexError',
    pattern: /^(.*)(IndexError|index error|index out of range)(.*)$/i,
    responses: [
      "Quack! List index out of range! Remember Python is zero-indexed. 🦆",
      "Print len(yourlist) to see how many items are in it, then check your index.",
      "Use enumerate() when iterating instead of manual index management."
    ],
    proResponses: [
      "Verify index is in range [0, len(sequence)-1]. Use len() checks or try/except IndexError.",
      "Consider using enumerate() for index-aware iteration to avoid off-by-one errors."
    ]
  },

  {
    label: 'PY: RecursionError',
    pattern: /^(.*)(RecursionError|maximum recursion depth exceeded)(.*)$/i,
    responses: [
      "Quack! Too deep! 🦆 Your recursive function has no base case, or it's never reached.",
      "Every recursive function needs a base case that stops the recursion.",
      "You can raise the limit with sys.setrecursionlimit(), but fix the base case first!"
    ],
    proResponses: [
      "Ensure your recursive function has a reachable base case. Default stack depth is 1000.",
      "Consider refactoring with an explicit stack (iterative approach) to avoid recursion limits."
    ]
  },

  {
    label: 'PY: NotImplementedError',
    pattern: /^(.*)(NotImplementedError|not implemented)(.*)$/i,
    responses: [
      "Quack! Stub alert! Someone left a NotImplementedError as a placeholder. 🦆",
      "This means a method was declared but never actually written. Time to implement it!",
    ],
    proResponses: [
      "NotImplementedError indicates an abstract method stub. Implement the method in the subclass.",
    ]
  },

  {
    label: 'PY: OverflowError',
    pattern: /^(.*)(OverflowError|numeric overflow)(.*)$/i,
    responses: [
      "Quack! Number too big for the data type! 🦆 Python ints are arbitrary precision, but floats aren't.",
      "Use the decimal module for high-precision arithmetic to avoid overflow.",
    ],
    proResponses: [
      "Python int is unbounded, but float has limits (~1.8e308). Use decimal.Decimal for precision.",
    ]
  },

  {
    label: 'PY: OSError',
    pattern: /^(.*)(OSError|operating system error)(.*)$/i,
    responses: [
      "Quack! OS-level error! 🦆 Check file permissions, disk space, and paths.",
      "OSError is a catch-all for file system and OS issues. Check errno for details.",
    ],
    proResponses: [
      "Inspect the errno attribute for the specific OS error code. Common causes: permissions, disk full.",
      "Use pathlib or os.access() to check permissions before file operations."
    ]
  },

  {
    label: 'PY: UnicodeError',
    pattern: /^(.*)(UnicodeError|unicode error)(.*)$/i,
    responses: [
      "Quack! Encoding issues! 🦆 Try specifying encoding='utf-8' when opening files.",
      "Use str.encode() and bytes.decode() with explicit encoding names.",
    ],
    proResponses: [
      "Always specify encoding explicitly: open(file, encoding='utf-8'). Use errors='replace' for tolerance.",
      "For mixed encodings, chardet library can auto-detect: pip install chardet"
    ]
  },

  {
    label: 'PY: ModuleNotFoundError',
    pattern: /^(.*)(ModuleNotFoundError)(.*)$/i,
    responses: [
      "Quack! Module missing! Run: pip install <module_name> 🦆",
      "Make sure your virtual environment is activated!"
    ],
    proResponses: [
      "pip install <package> in the active environment. Check pip list to verify installation.",
    ]
  },

  // ── JAVASCRIPT / NODE.JS ERRORS ──────────────────────────────────────────

  {
    label: 'JS: Uncaught TypeError',
    pattern: /^(.*)(uncaught typeerror|cannot read propert|cannot read properties of (null|undefined))(.*)$/i,
    responses: [
      "Quack! Classic JS gotcha! 🦆 Something is null or undefined when you tried to access it.",
      "Add a null check: if (obj && obj.property) before accessing. Or use optional chaining: obj?.property",
      "Use the browser devtools to check the exact line and what the null value is."
    ],
    proResponses: [
      "Use optional chaining (obj?.prop) and nullish coalescing (obj ?? default) to guard access.",
      "Check the call stack — the null value is usually set a few frames above the error."
    ]
  },

  {
    label: 'JS: ReferenceError',
    pattern: /^(.*)(uncaught referenceerror|referenceerror|is not defined)(.*)$/i,
    responses: [
      "Quack! Variable not defined! 🦆 Did you forget to declare it with let, const, or var?",
      "Scope issue? Variables declared with let/const inside a block aren't visible outside it.",
      "Check for typos — JavaScript is case-sensitive!"
    ],
    proResponses: [
      "Ensure the variable is declared in the accessible scope. Avoid var; prefer const/let for block scoping.",
      "Check for temporal dead zone issues with let/const — they aren't hoisted like var."
    ]
  },

  {
    label: 'JS: Uncaught SyntaxError',
    pattern: /^(.*)(uncaught syntaxerror|unexpected token|unexpected end of input)(.*)$/i,
    responses: [
      "Quack! JavaScript syntax error! 🦆 Check for missing brackets, commas, or semicolons.",
      "Unexpected token often means a missing closing bracket from a few lines up.",
      "Use a linter like ESLint — it will catch these before you run the code!"
    ],
    proResponses: [
      "Inspect the line and lines above it for unmatched brackets or missing commas in object literals.",
      "ESLint with an IDE plugin will highlight syntax errors in real time."
    ]
  },

  {
    label: 'JS: Promise Rejection / Async Error',
    pattern: /^(.*)(unhandled promise rejection|promise rejection|async.*error|await.*error)(.*)$/i,
    responses: [
      "Quack! Unhandled promise rejection! 🦆 Wrap your await in try/catch!",
      "Every async function should have error handling: try { await ... } catch(e) { console.error(e) }",
      "Or chain .catch() onto your promise: fetch(url).catch(err => console.error(err))"
    ],
    proResponses: [
      "Add try/catch around all await expressions. For promise chains, append .catch(handler).",
      "In Node.js, listen to process.on('unhandledRejection') to catch missed rejections globally."
    ]
  },

  {
    label: 'JS: CORS Error',
    pattern: /^(.*)(cors error|cors|cross-origin|access-control-allow-origin)(.*)$/i,
    responses: [
      "Quack! CORS is blocking your request! 🦆 The server needs to allow your origin.",
      "You can't fix CORS from the frontend alone — the server needs to set Access-Control-Allow-Origin.",
      "During development, try a proxy or CORS browser extension. In production, fix the server headers."
    ],
    proResponses: [
      "CORS is enforced by the browser. The server must respond with Access-Control-Allow-Origin: *  or a specific origin.",
      "In Express: use the cors npm package. In other backends, add the appropriate response header."
    ]
  },

  {
    label: 'JS: Cannot Call Non-Function',
    pattern: /^(.*)(\w+ is not a function|not a function)(.*)$/i,
    responses: [
      "Quack! You're calling something that isn't a function! 🦆",
      "Check if you accidentally overwrote a function with a variable of the same name.",
      "console.log(typeof myThing) to verify it's actually a function."
    ],
    proResponses: [
      "Use typeof x === 'function' before calling. Check for naming collisions with built-ins.",
      "Common cause: const arr = []; arr.map is overridden, or you called arr.map without parentheses."
    ]
  },

  {
    label: 'JS: Stack Overflow',
    pattern: /^(.*)maximum call stack size exceeded(.*)$/i,
    responses: [
      "Quack! Infinite recursion in JavaScript! 🦆 Same as Python's RecursionError.",
      "Your recursive function's base case is never reached. Check the termination condition.",
      "Can you convert this to an iterative approach? JS has a smaller stack than most languages."
    ],
    proResponses: [
      "Maximum call stack exceeded = infinite recursion. Verify base case is reachable.",
      "Use trampolining or iterative approaches for deep recursion in JavaScript."
    ]
  },

  {
    label: 'JS: Module / Import Error',
    pattern: /^(.*)(cannot find module|module not found|failed to resolve import|es module|require is not defined)(.*)$/i,
    responses: [
      "Quack! Module not found! 🦆 Run npm install first.",
      "Check your import path — relative paths need ./ prefix in Node.js.",
      "Mixing CommonJS (require) and ES modules (import) in the same project causes this."
    ],
    proResponses: [
      "Run npm install. Verify path casing (Linux is case-sensitive). Check package.json 'type' field for ESM vs CJS.",
      "For ESM: use import/export. For CJS: use require/module.exports. Don't mix."
    ]
  },

  {
    label: 'JS: Node.js ENOENT',
    pattern: /^(.*)(ENOENT|no such file or directory)(.*)$/i,
    responses: [
      "Quack! File not found at that path! 🦆",
      "Check if you're running the script from the right directory. Use __dirname to build absolute paths.",
      "Use path.join(__dirname, 'file.txt') instead of relative strings."
    ],
    proResponses: [
      "Use path.join(__dirname, relativePath) for reliable file resolution in Node.js.",
      "Verify the file exists with fs.existsSync() before attempting to read it."
    ]
  },

  {
    label: 'JS: Node.js EADDRINUSE',
    pattern: /^(.*)(EADDRINUSE|address already in use|port.*in use)(.*)$/i,
    responses: [
      "Quack! Port already taken! 🦆 Another process is using that port.",
      "On Mac/Linux: lsof -i :3000 to find and kill the process. On Windows: netstat -ano | findstr :3000",
      "Or just change your port in the config!"
    ],
    proResponses: [
      "Kill the process: lsof -ti :PORT | xargs kill (Unix) or use Task Manager on Windows.",
      "Set PORT via environment variable to avoid hardcoded conflicts."
    ]
  },

  {
    label: 'JS: Null / Undefined Check',
    pattern: /^(.*)(null|undefined)(.*)(error|issue|problem|TypeError)(.*)$/i,
    responses: [
      "Quack! null/undefined strikes again! 🦆 Use optional chaining: obj?.prop",
      "The nullish coalescing operator ?? is your friend: value ?? 'fallback'",
      "Always validate API responses before accessing nested properties."
    ],
    proResponses: [
      "Use optional chaining (obj?.prop) and nullish coalescing (val ?? default) for safe access.",
      "Validate API response shapes with a schema validator like Zod or Yup."
    ]
  },

  {
    label: 'JS: Event Listener Issue',
    pattern: /^(.*)(event listener|addeventlistener|event not firing|click not working)(.*)$/i,
    responses: [
      "Quack! Event not firing? 🦆 Make sure the element exists in the DOM when you attach the listener!",
      "Move your script to the bottom of the body, or use DOMContentLoaded.",
      "Check if another listener is calling event.stopPropagation()."
    ],
    proResponses: [
      "Attach listeners after DOMContentLoaded or place scripts at end of body.",
      "Use event delegation for dynamically created elements: document.addEventListener('click', e => e.target.matches('.btn') && ...)."
    ]
  },

  {
    label: 'JS: Fetch / HTTP Error',
    pattern: /^(.*)(fetch error|http request|404|500|network error|failed to fetch)(.*)$/i,
    responses: [
      "Quack! HTTP request failed! 🦆 Check the URL, method, and headers.",
      "fetch() doesn't throw on 4xx/5xx — check response.ok before using the data!",
      "Open the Network tab in DevTools to see the actual request and response."
    ],
    proResponses: [
      "Always check response.ok after fetch(). 4xx/5xx do not throw by default.",
      "Use the Network tab in browser DevTools or Postman to inspect the raw HTTP exchange."
    ]
  },

  // ── C / C++ ERRORS ───────────────────────────────────────────────────────

  {
    label: 'C++: Segmentation Fault',
    pattern: /^(.*)(segmentation fault|segfault|seg fault|access violation)(.*)$/i,
    responses: [
      "Quack! Segfault! 🦆 You accessed memory you shouldn't have. Classic C/C++ villain!",
      "Common causes: null pointer dereference, array out of bounds, use after free.",
      "Run with valgrind: valgrind --leak-check=full ./yourprogram for detailed analysis."
    ],
    proResponses: [
      "Compile with: g++ -g -fsanitize=address,undefined -o prog prog.cpp then run to pinpoint the fault.",
      "Use Valgrind: valgrind --track-origins=yes ./prog. Common causes: null ptr, out-of-bounds, use-after-free."
    ]
  },

  {
    label: 'C++: Memory Leak',
    pattern: /^(.*)(memory leak|leaking memory)(.*)$/i,
    responses: [
      "Quack! Memory leak! 🦆 Every new needs a delete — or better yet, use smart pointers!",
      "Prefer std::unique_ptr or std::shared_ptr over raw pointers in modern C++.",
      "Valgrind will show you exactly where the leaked memory was allocated."
    ],
    proResponses: [
      "Use RAII: prefer std::unique_ptr<T> over raw new/delete. Run valgrind --leak-check=full.",
      "Compile with -fsanitize=address to detect leaks at runtime with AddressSanitizer."
    ]
  },

  {
    label: 'C++: Undefined Behavior',
    pattern: /^(.*)(undefined behavior|UB|uninitialized variable|uninitialized memory)(.*)$/i,
    responses: [
      "Quack! Undefined behavior — the most chaotic bug in C/C++! 🦆",
      "Always initialize your variables. Reading uninitialized memory is UB.",
      "Compile with: g++ -Wall -Wextra -Wuninitialized to catch these."
    ],
    proResponses: [
      "Compile with -fsanitize=undefined to detect UB at runtime. Always initialize variables.",
      "Use tools: Clang-Tidy, cppcheck, or PVS-Studio for static analysis of UB."
    ]
  },

  {
    label: 'C++: Stack Overflow (C++)',
    pattern: /^(.*)(stack overflow|stack smashing|stack.*corrupt)(.*)$/i,
    responses: [
      "Quack! Stack overflow in C++! 🦆 This is often deep recursion or a huge local array.",
      "Avoid declaring large arrays on the stack — use heap allocation (new or vector) instead.",
      "Compile with -fstack-protector for canary-based detection."
    ],
    proResponses: [
      "Allocate large buffers on the heap: use std::vector instead of C-style arrays on stack.",
      "Compile with -fstack-protector-strong. For recursion, ensure your base case is correct."
    ]
  },

  {
    label: 'C++: Linker Error',
    pattern: /^(.*)(linker error|undefined reference|undefined symbol|unresolved external)(.*)$/i,
    responses: [
      "Quack! Linker error! 🦆 You declared a function but didn't define it, or forgot to link a library.",
      "Make sure all .cpp files are compiled together: g++ main.cpp utils.cpp -o myapp",
      "If using a library, add -l<name>: like -lm for math, -lpthread for threads."
    ],
    proResponses: [
      "Undefined reference = missing definition or missing object file in link step. Add all .cpp files.",
      "For external libraries: link with -l<library>. Use nm or objdump to inspect symbol tables."
    ]
  },

  {
    label: 'C++: Null Pointer Dereference',
    pattern: /^(.*)(null pointer|nullptr|null dereference|dereferencing null)(.*)$/i,
    responses: [
      "Quack! Null pointer! 🦆 You dereferenced a pointer that was never set!",
      "Always check: if (ptr != nullptr) before dereferencing.",
      "In modern C++, prefer references over pointers when nullability isn't needed."
    ],
    proResponses: [
      "Add nullptr checks before dereferencing. Consider std::optional<T> for nullable values in C++17.",
      "Enable AddressSanitizer: -fsanitize=address to catch null dereferences at runtime."
    ]
  },

  {
    label: 'C++: Compilation Error',
    pattern: /^(.*)(compilation error|compile error|does not compile|g\+\+ error|gcc error|clang error)(.*)$/i,
    responses: [
      "Quack! Compilation failed! 🦆 Read the first error — fix that, then recompile.",
      "Compilers can produce cascading errors from a single root cause. Top-down!",
      "Add -Wall -Wextra to your compile flags to get more helpful warnings."
    ],
    proResponses: [
      "Address errors top-to-bottom; cascading errors often stem from the first. Use -Wall -Wextra.",
      "Clang often produces more actionable error messages than GCC for beginners."
    ]
  },

  {
    label: 'C++: Buffer Overflow',
    pattern: /^(.*)(buffer overflow|out of bounds|array.*overflow|heap overflow)(.*)$/i,
    responses: [
      "Quack! Buffer overflow — C's most famous bug! 🦆 Always bounds-check your arrays.",
      "Use std::vector or std::array instead of C-style arrays for automatic bounds safety.",
      "Compile with -fsanitize=address for runtime bounds checking."
    ],
    proResponses: [
      "Use std::vector with .at(i) (bounds-checked) instead of raw arrays and operator[].",
      "Enable AddressSanitizer: -fsanitize=address. Also use static analysis: cppcheck or Clang-Tidy."
    ]
  },

  {
    label: 'C++: Use After Free',
    pattern: /^(.*)(use after free|dangling pointer|freed memory|double free)(.*)$/i,
    responses: [
      "Quack! Use-after-free is a serious bug! 🦆 After delete, set the pointer to nullptr.",
      "Better yet, use std::unique_ptr — it automatically prevents use-after-free.",
      "Valgrind or AddressSanitizer will pinpoint exactly where this happens."
    ],
    proResponses: [
      "Adopt RAII with smart pointers (unique_ptr, shared_ptr) to eliminate use-after-free.",
      "Detect with: -fsanitize=address. After manual delete, immediately set ptr = nullptr."
    ]
  },

  {
    label: 'C++: Concurrency / Race Condition',
    pattern: /^(.*)(race condition|deadlock|thread safety|mutex|data race)(.*)$/i,
    responses: [
      "Quack! Concurrency bugs are the hardest to reproduce! 🦆",
      "Protect shared data with std::mutex. Use std::lock_guard for automatic unlock.",
      "ThreadSanitizer can detect data races: compile with -fsanitize=thread"
    ],
    proResponses: [
      "Use std::mutex with std::lock_guard<std::mutex> for RAII locking. Run with -fsanitize=thread.",
      "Consider lock-free structures or std::atomic for simple counters to reduce lock contention."
    ]
  },

  // ── GENERAL PROGRAMMING ──────────────────────────────────────────────────

  {
    label: 'API Request Issue',
    pattern: /^(.*)(api request|api error|http request)(.*)$/i,
    responses: [
      "Quack! API trouble! 🦆 Check your endpoint URL, HTTP method, and headers.",
      "Are you handling error responses? 4xx and 5xx need to be caught explicitly.",
      "Use Postman or curl to isolate whether the issue is in your code or the API."
    ],
    proResponses: [
      "Test the endpoint independently with curl or Postman. Verify auth tokens and headers.",
      "Implement proper error handling for all HTTP status codes, not just 2xx."
    ]
  },

  {
    label: 'Database / Query',
    pattern: /^(.*)(slow query|database performance|database query|sql)(.*)$/i,
    responses: [
      "Quack! Slow query? 🦆 Run EXPLAIN ANALYZE to see the query plan.",
      "Indexes are your best friend for read-heavy queries!",
      "Avoid SELECT * — only fetch the columns you need."
    ],
    proResponses: [
      "Run EXPLAIN ANALYZE <query> to inspect execution plan. Add indexes on filtered/joined columns.",
      "Consider query result caching, connection pooling, and avoiding N+1 patterns."
    ]
  },

  {
    label: 'Regex Issue',
    pattern: /^(.*)(regex error|regular expression problem|regex)(.*)$/i,
    responses: [
      "Quack! Regex can be painful! 🦆 Test your pattern at regex101.com",
      "Make sure your regex is compatible with the specific engine (Python re vs JS RegExp).",
      "Build it incrementally — start with a simple pattern and add complexity."
    ],
    proResponses: [
      "Use regex101.com to test patterns with explanation. Note engine differences (PCRE vs ECMAScript).",
      "Prefer named groups (?P<name>...) in Python for readable regex."
    ]
  },

  {
    label: 'Security Vulnerability',
    pattern: /^(.*)(security vulnerability|injection attack|xss|csrf|sql injection)(.*)$/i,
    responses: [
      "Quack! Security issue! 🦆 Never trust user input — sanitize everything!",
      "For SQL: use parameterized queries, never string concatenation.",
      "For XSS: escape HTML output. Use Content-Security-Policy headers."
    ],
    proResponses: [
      "Use parameterized queries for SQL injection prevention. Escape all user-generated HTML output.",
      "Implement CSRF tokens for state-changing requests. Review OWASP Top 10 as a baseline."
    ]
  },

  {
    label: 'Dependency Issue',
    pattern: /^(.*)(dependency issue|library not found|version conflict)(.*)$/i,
    responses: [
      "Quack! Dependency hell! 🦆 Check your requirements.txt or package.json.",
      "Use a virtual environment (Python) or node_modules per project to avoid conflicts.",
      "Try npm ls or pip list to see what's actually installed."
    ],
    proResponses: [
      "Pin dependency versions in requirements.txt or package-lock.json. Use venv/nvm per project.",
      "For conflicts, tools like pip-tools (Python) or npm dedupe (Node) can help."
    ]
  },

  {
    label: 'Code Refactoring',
    pattern: /^(.*)(refactor code|improve code structure|code smell)(.*)$/i,
    responses: [
      "Quack! Refactoring time! 🦆 Break big functions into small, focused ones.",
      "Single Responsibility Principle: each function should do one thing.",
      "Write tests first — then refactor with confidence!"
    ],
    proResponses: [
      "Apply SOLID principles. Extract methods, reduce cyclomatic complexity. Add tests before refactoring.",
      "Use your IDE's built-in refactoring tools — they're safer than manual find-replace."
    ]
  },

  // ── FALLBACK RULES ───────────────────────────────────────────────────────

  {
    label: 'Like / Love Something',
    pattern: /^i( really)? (like|love) (\w+)(.*)$/i,
    responses: [
      "What do you like about {2}? Tell me more!",
      "Nice! How does {2} relate to what you're building?"
    ],
    proResponses: [
      "Interesting. What are you working on with {2}?"
    ]
  },

  {
    label: 'General Question',
    pattern: /^(what|why|who|where|can|when|how)(.+)?$/i,
    responses: [
      "Quack! I'm not sure I understand. Can you rephrase that? 🦆",
      "Try giving me more context — describe the error message or what's happening!"
    ],
    proResponses: [
      "Could you provide more context? Include the error message if applicable.",
      "I may not have a specific rule for that. Try describing the error message directly."
    ]
  },

  {
    label: 'Catch-All',
    pattern: /^(.*)$/i,
    responses: [
      "Please, go on. Tell me more about what's happening! 🦆",
      "Interesting! Can you share the actual error message?",
      "Quack! Walk me through the problem step by step.",
      "Tell me more — the more context, the better Ducky can help!"
    ],
    proResponses: [
      "Could you elaborate? Sharing the error message and relevant code will help.",
      "Please provide more detail — describe the input, expected output, and actual output."
    ]
  }
];

// ===== MATCHING ENGINE =====
function getResponse(userInput) {
  const trimmed = userInput.trim();
  for (const rule of rules) {
    const match = trimmed.match(rule.pattern);
    if (match) {
      const responsePool = (tone === 'pro' && rule.proResponses)
        ? rule.proResponses
        : rule.responses;

      let response = responsePool[Math.floor(Math.random() * responsePool.length)];

      // Substitute capture groups {0}, {1}, {2} etc. BEFORE any quack appending (bug fix)
      response = response.replace(/\{(\d+)\}/g, (_, i) => match[parseInt(i) + 1] || '');

      // Quack suffix: only in quack tone, only on non-joke/non-quack-already responses, 40% chance
      if (tone === 'quack' && !response.includes('🦆') && Math.random() < 0.4) {
        response += ' Quack!';
      }

      return { text: response, label: rule.label, matchedRule: rule };
    }
  }
  // Should never reach here because catch-all always matches
  return { text: "Quack! 🦆 Tell me more!", label: 'Catch-All', matchedRule: null };
}

// ===== UI HELPERS =====
let statsMessages = 0;

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
    tag.textContent = '↳ Rule: ' + ruleLabel;
    bub.appendChild(tag);
  }

  msg.appendChild(av);
  msg.appendChild(bub);
  box.appendChild(msg);

  // Another solution button — only if there's a real matchedRule with multiple responses
  if (matchedRule && (matchedRule.responses.length + (matchedRule.proResponses?.length || 0)) > 1) {
    const anotherContainer = document.createElement('div');
    anotherContainer.style.paddingLeft = '48px';

    const btn = document.createElement('button');
    btn.className = 'another-btn';
    btn.textContent = '↻ Try another answer';
    btn.onclick = () => {
      const responsePool = (tone === 'pro' && matchedRule.proResponses)
        ? matchedRule.proResponses
        : matchedRule.responses;
      let r = responsePool[Math.floor(Math.random() * responsePool.length)];
      r = r.replace(/\{(\d+)\}/g, (_, i) => {
        const m = lastUserInput.match(matchedRule.pattern);
        return m ? (m[parseInt(i) + 1] || '') : '';
      });
      if (tone === 'quack' && !r.includes('🦆') && Math.random() < 0.4) r += ' Quack!';
      appendDuckMessage(r, ruleLabel, null); // no "another" button on second-level
      btn.remove();
      scrollChat();
    };

    anotherContainer.appendChild(btn);
    box.appendChild(anotherContainer);
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

function scrollChat() {
  const box = document.getElementById('chat-box');
  box.scrollTop = box.scrollHeight;
}

function escapeHtml(s) {
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

function updateRuleStat(label) {
  document.getElementById('stat-matched').textContent = label || '—';
}

// ===== SEND LOGIC =====
function handleSend() {
  const input = document.getElementById('user-input');
  const text = input.value.trim();
  if (!text) return;

  if (/^(quit|exit|bye)$/i.test(text)) {
    appendUserMessage(text);
    setTimeout(() => {
      appendDuckMessage("Goodbye! Keep quacking at those bugs! 🦆", null, null);
    }, 400);
    input.value = '';
    return;
  }

  lastUserInput = text;
  appendUserMessage(text);
  input.value = '';

  showTyping();

  // Simulate a slight delay for UX
  const delay = 300 + Math.random() * 400;
  setTimeout(() => {
    removeTyping();
    const { text: response, label, matchedRule } = getResponse(text);
    appendDuckMessage(response, label, matchedRule);
    updateRuleStat(label);
  }, delay);
}

function sendQuick(text) {
  document.getElementById('user-input').value = text;
  handleSend();
}

// ===== KEYBOARD HANDLER =====
document.getElementById('user-input').addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    handleSend();
  }
});

// ===== INIT =====
(function init() {
  const welcomeMsg = tone === 'quack'
    ? "Hello! I'm Ducky, your rubber duck debugger! 🦆 Quack! Describe your bug and let's squash it together!"
    : "Hello. I'm Ducky, a debugging assistant. Describe your error and I'll help you resolve it.";
  appendDuckMessage(welcomeMsg, null, null);

  // Update rule count in stats
  document.getElementById('stat-rules').textContent = rules.length + '+';
})();
