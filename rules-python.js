/**
 * rules-python.js
 * Python-specific error and debugging rules.
 * Language tag: 'python'
 */

const RULES_PYTHON = [

  {
    lang: 'python',
    label: 'PY: Program Not Working',
    pattern: /^(my|the) program is (not working|broken|failing|giving an error)(.*)$/i,
    responses: [
      "Oh no! 🦆 Can you share the error message or the section of code?",
      "Let's debug together! What error are you seeing?",
      "Programming can be tricky. Tell me more — what's happening?",
      "Copy-paste the traceback if you have one — it tells us exactly where Python gave up.",
    ],
    proResponses: [
      "What error message or unexpected behavior are you observing?",
      "Please share the full traceback and the relevant code section.",
    ]
  },

  {
    lang: 'python',
    label: 'PY: Infinite Loop',
    pattern: /^(.*)infinite loop(.*)$/i,
    responses: [
      "Quack! Check your loop — does it have a proper exit condition? 🦆",
      "Infinite loops usually mean a loop condition is never becoming False. Check your variables.",
      "Look for a missing break statement, or a condition that never evaluates to False.",
      "Add a print() inside the loop temporarily to see what's happening on each iteration.",
    ],
    proResponses: [
      "Verify your loop's termination condition. Ensure the loop variable is modified each iteration.",
      "Check for missing break statements or conditions that never evaluate to False.",
    ]
  },

  {
    lang: 'python',
    label: 'PY: Indentation Error',
    pattern: /^(.*)(indentation|IndentationError|TabError)(.*)(error|issue|problem)?(.*)$/i,
    responses: [
      "Quack! Python is whitespace-sensitive. Make sure you're not mixing tabs and spaces! 🦆",
      "Consistent indentation is key. Try running your file through a linter.",
      "Use your editor's 'convert tabs to spaces' feature — then set it to 4 spaces per PEP 8.",
      "Run python -m py_compile yourfile.py to catch indentation errors before running.",
    ],
    proResponses: [
      "Ensure consistent indentation throughout. Python requires 4 spaces per level (PEP 8).",
      "Run: python -m py_compile yourfile.py to catch indentation errors early.",
      "Configure your editor to always use spaces, never tabs, for Python files.",
    ]
  },

  {
    lang: 'python',
    label: 'PY: Undefined Variable / NameError',
    pattern: /^(.*)(variable|name)(.*)(not defined|undefined)(.*)$/i,
    responses: [
      "Quack! Did you declare that variable before using it? 🦆",
      "Check the scope — the variable might not exist in this context.",
      "Typo? Python variable names are case-sensitive!",
      "If it's inside a function, make sure it's not a local variable you're trying to use globally.",
    ],
    proResponses: [
      "Ensure the variable is declared before the point of use and within the correct scope.",
      "Check for typos; Python is case-sensitive. Use your IDE's 'Find References' feature.",
    ]
  },

  {
    lang: 'python',
    label: 'PY: ZeroDivisionError',
    pattern: /^(.*)(ZeroDivisionError|division by zero)(.*)$/i,
    responses: [
      "Quack! You can't divide by zero — that's math, not just Python! 🦆",
      "Add a guard: if denominator != 0: before your division.",
      "ZeroDivisionError: check that your denominator can never be zero at that point.",
      "Use try/except ZeroDivisionError: to handle it gracefully if zero is a valid input.",
    ],
    proResponses: [
      "Add a pre-condition check: assert denominator != 0 or use try/except ZeroDivisionError.",
      "Validate inputs before division operations to prevent ZeroDivisionError.",
    ]
  },

  {
    lang: 'python',
    label: 'PY: TypeError',
    pattern: /^(.*)(TypeError|type error)(.*)$/i,
    responses: [
      "Quack! Type mismatch! Make sure you're not mixing strings and ints without conversion. 🦆",
      "TypeError usually means you're calling something that isn't callable, or mixing incompatible types.",
      "Use type() or isinstance() to check what you're actually working with.",
      "Common cause: int + str without str(n) or int(s) conversion.",
    ],
    proResponses: [
      "Inspect variable types with type() at the error line. Ensure function signatures match call arguments.",
      "Common causes: concatenating str + int, calling a non-callable, or wrong number of arguments.",
    ]
  },

  {
    lang: 'python',
    label: 'PY: SyntaxError',
    pattern: /^(.*)(SyntaxError|invalid syntax)(.*)$/i,
    responses: [
      "Quack! Syntax error! Check the line ABOVE the highlighted one — Python reports one line late sometimes. 🦆",
      "Look for missing colons after if/for/def/class, unmatched parentheses, or misquoted strings.",
      "Run python -m py_compile yourfile.py for a faster syntax check.",
      "Missing colon at the end of an if, for, while, def, or class line is the #1 cause.",
    ],
    proResponses: [
      "Check the line prior to the reported error — Python's SyntaxError often points one line late.",
      "Common causes: missing colon after if/for/def, unmatched brackets, or invalid string quotes.",
    ]
  },

  {
    lang: 'python',
    label: 'PY: NameError',
    pattern: /^(.*)(NameError|name.*not defined)(.*)$/i,
    responses: [
      "Quack! NameError — that variable or function doesn't exist yet! 🦆",
      "Check for typos in the name. Python is case-sensitive!",
      "Make sure it's defined before the line where it's used.",
      "If it's a function, make sure you defined it before calling it.",
    ],
    proResponses: [
      "NameError indicates an undefined identifier. Verify spelling, scope, and declaration order.",
      "Ensure imports are at the top and variables are initialized before use.",
    ]
  },

  {
    lang: 'python',
    label: 'PY: ImportError / ModuleNotFoundError',
    pattern: /^(.*)(ImportError|ModuleNotFoundError|No module named)(.*)$/i,
    responses: [
      "Quack! Module not found! Try: pip install <modulename> 🦆",
      "Make sure you're in the right virtual environment. Run: which python to check.",
      "Typo in the module name? Check PyPI for the exact package name.",
      "On some systems you need pip3 instead of pip. Try both!",
    ],
    proResponses: [
      "Run pip install <package> in your active environment. Verify with pip list.",
      "If using venv, ensure it's activated: source venv/bin/activate (Unix) or venv\\Scripts\\activate (Win).",
    ]
  },

  {
    lang: 'python',
    label: 'PY: RuntimeError',
    pattern: /^(.*)(RuntimeError|run time error|runtime error)(.*)$/i,
    responses: [
      "Quack! RuntimeError is Python's way of saying 'something unexpected happened'. 🦆",
      "Share the full traceback — the cause is usually a few frames up the stack.",
      "Check your program's state at the point of failure with a print() or debugger.",
    ],
    proResponses: [
      "Examine the full traceback. RuntimeError is generic — the root cause is typically higher in the stack.",
      "Add logging before the failure point to inspect variable state.",
    ]
  },

  {
    lang: 'python',
    label: 'PY: AttributeError',
    pattern: /^(.*)(AttributeError|attribute error)(.*)$/i,
    responses: [
      "Quack! That object doesn't have that attribute! Maybe it's None? 🦆",
      "Use dir(obj) to see what attributes an object actually has.",
      "Check you're not accidentally calling a method on None — a common cause.",
      "Did a function return None unexpectedly? That's a frequent culprit.",
    ],
    proResponses: [
      "Use dir(obj) or help(obj) to verify available attributes. Check for None before attribute access.",
      "Common cause: a function returned None unexpectedly and you chained a method call on it.",
    ]
  },

  {
    lang: 'python',
    label: 'PY: KeyError',
    pattern: /^(.*)(KeyError|key error)(.*)$/i,
    responses: [
      "Quack! That key doesn't exist in your dictionary! 🦆",
      "Use dict.get(key, default) instead of dict[key] to avoid KeyError.",
      "Check the key name for typos — dictionary keys are case-sensitive!",
      "Print dict.keys() to see exactly what keys are available.",
    ],
    proResponses: [
      "Use dict.get(key, default) for safe access. Or check with: if key in dict: before accessing.",
      "Print dict.keys() to verify the exact key names available.",
    ]
  },

  {
    lang: 'python',
    label: 'PY: FileNotFoundError',
    pattern: /^(.*)(FileNotFoundError|file not found)(.*)$/i,
    responses: [
      "Quack! Can't find the file! Double-check the path. 🦆",
      "Use os.path.exists(path) to verify the file before opening it.",
      "Relative paths depend on where you run the script from. Try an absolute path to confirm.",
      "Print os.getcwd() to see your current working directory — the path may be resolving differently than expected.",
    ],
    proResponses: [
      "Use pathlib.Path(path).exists() to validate before open(). Prefer absolute paths in production.",
      "Check working directory with os.getcwd() — relative paths resolve from there.",
    ]
  },

  {
    lang: 'python',
    label: 'PY: MemoryError',
    pattern: /^(.*)(MemoryError|memory error|out of memory)(.*)$/i,
    responses: [
      "Quack! Out of memory! 🦆 Are you loading a huge file all at once?",
      "Try using generators or chunked reading instead of loading everything into RAM.",
      "Profile with memory_profiler: pip install memory-profiler then use @profile decorator.",
    ],
    proResponses: [
      "Use generators or streaming I/O instead of loading full datasets into memory.",
      "Profile with: pip install memory-profiler, then @profile decorator on your function.",
    ]
  },

  {
    lang: 'python',
    label: 'PY: ValueError',
    pattern: /^(.*)(ValueError|value error)(.*)$/i,
    responses: [
      "Quack! The value is the right type but wrong content. 🦆",
      "Check what you're passing — int('abc') raises ValueError, for example.",
      "Validate your input data before passing it to functions.",
      "Use try/except ValueError: to handle bad input gracefully.",
    ],
    proResponses: [
      "ValueError: the type is correct but the value is out of range or invalid for the operation.",
      "Add input validation before the operation. Use try/except ValueError to handle gracefully.",
    ]
  },

  {
    lang: 'python',
    label: 'PY: AssertionError',
    pattern: /^(.*)(AssertionError|assertion error|assert.*failed)(.*)$/i,
    responses: [
      "Quack! An assertion failed — your assumption about the program state was wrong! 🦆",
      "Check what the assert was checking and why that condition is False.",
      "Use assert x == expected, f'Got {x}' to get informative failure messages.",
    ],
    proResponses: [
      "An assert statement evaluated to False. Examine the asserted condition and the actual values.",
      "Use assert x == expected, f'Got {x}' for informative failure messages.",
    ]
  },

  {
    lang: 'python',
    label: 'PY: KeyboardInterrupt',
    pattern: /^(.*)(KeyboardInterrupt|keyboard interrupt)(.*)$/i,
    responses: [
      "Quack! You pressed Ctrl+C! Or your program has an infinite loop. 🦆",
      "Wrap your main loop with try/except KeyboardInterrupt: to exit gracefully.",
      "If it happened unexpectedly, look for a blocking call or an infinite loop.",
    ],
    proResponses: [
      "Handle gracefully with try/except KeyboardInterrupt: ... sys.exit(0).",
      "Unexpected KeyboardInterrupt often indicates a blocking I/O call or infinite loop.",
    ]
  },

  {
    lang: 'python',
    label: 'PY: IndexError',
    pattern: /^(.*)(IndexError|index error|index out of range)(.*)$/i,
    responses: [
      "Quack! List index out of range! Remember Python is zero-indexed. 🦆",
      "Print len(yourlist) to see how many items are in it, then check your index.",
      "Use enumerate() when iterating instead of manual index management.",
      "A list of length N has valid indices 0 through N-1. Check your boundary conditions.",
    ],
    proResponses: [
      "Verify index is in range [0, len(sequence)-1]. Use len() checks or try/except IndexError.",
      "Consider using enumerate() for index-aware iteration to avoid off-by-one errors.",
    ]
  },

  {
    lang: 'python',
    label: 'PY: RecursionError',
    pattern: /^(.*)(RecursionError|maximum recursion depth exceeded|recursion limit)(.*)$/i,
    responses: [
      "Quack! Too deep! 🦆 Your recursive function has no reachable base case.",
      "Every recursive function needs a base case that stops the recursion.",
      "You can check sys.getrecursionlimit() — but fix the base case first, don't just raise the limit!",
    ],
    proResponses: [
      "Ensure your recursive function has a reachable base case. Default stack depth is 1000.",
      "Consider refactoring with an explicit stack (iterative approach) to avoid recursion limits.",
    ]
  },

  {
    lang: 'python',
    label: 'PY: NotImplementedError',
    pattern: /^(.*)(NotImplementedError|not implemented)(.*)$/i,
    responses: [
      "Quack! Stub alert! Someone left a NotImplementedError as a placeholder. 🦆",
      "This means a method was declared in an abstract class but never implemented in the subclass.",
      "Time to implement it! What should that method do?",
    ],
    proResponses: [
      "NotImplementedError indicates an abstract method stub. Implement the method in the concrete subclass.",
    ]
  },

  {
    lang: 'python',
    label: 'PY: OverflowError',
    pattern: /^(.*)(OverflowError|numeric overflow|math range error)(.*)$/i,
    responses: [
      "Quack! Number too big for the data type! 🦆 Python ints are arbitrary precision, but floats aren't.",
      "Use the decimal module for high-precision arithmetic to avoid float overflow.",
    ],
    proResponses: [
      "Python int is unbounded, but float has limits (~1.8e308). Use decimal.Decimal for precision-critical math.",
    ]
  },

  {
    lang: 'python',
    label: 'PY: OSError',
    pattern: /^(.*)(OSError|PermissionError|operating system error|errno)(.*)$/i,
    responses: [
      "Quack! OS-level error! 🦆 Check file permissions, disk space, and paths.",
      "OSError is a catch-all for file system and OS issues. Check the errno attribute for specifics.",
      "PermissionError? Try running with elevated permissions, or fix the file's access rights.",
    ],
    proResponses: [
      "Inspect the errno attribute for the specific OS error code. Common causes: permissions, disk full.",
      "Use pathlib or os.access() to check permissions before file operations.",
    ]
  },

  {
    lang: 'python',
    label: 'PY: UnicodeError',
    pattern: /^(.*)(UnicodeError|UnicodeDecodeError|UnicodeEncodeError|encoding error|unicode)(.*)$/i,
    responses: [
      "Quack! Encoding issues! 🦆 Try specifying encoding='utf-8' when opening files.",
      "Use str.encode() and bytes.decode() with explicit encoding names.",
      "The chardet library can auto-detect file encoding: pip install chardet",
    ],
    proResponses: [
      "Always specify encoding explicitly: open(file, encoding='utf-8'). Use errors='replace' for tolerance.",
      "For mixed encodings, chardet library can auto-detect: pip install chardet",
    ]
  },

  {
    lang: 'python',
    label: 'PY: StopIteration',
    pattern: /^(.*)(StopIteration|generator|iterator|next\(\))(.*)$/i,
    responses: [
      "Quack! StopIteration means your iterator ran out of items! 🦆",
      "Use a for loop instead of manually calling next() to avoid this.",
      "Or catch it: try: val = next(it) except StopIteration: handle_end()",
    ],
    proResponses: [
      "Use for loops over iterators when possible. For manual next(), wrap in try/except StopIteration.",
    ]
  },

  {
    lang: 'python',
    label: 'PY: Pickling Error',
    pattern: /^(.*)(PicklingError|pickle|unpickle|serializ)(.*)$/i,
    responses: [
      "Quack! Pickling trouble! 🦆 Not all Python objects can be pickled — lambdas and local functions can't.",
      "Try using json instead of pickle for simple data structures.",
      "If you must pickle, make sure all referenced objects are importable at the top level.",
    ],
    proResponses: [
      "Objects must be importable at module level to be picklable. Lambdas and closures cannot be pickled.",
      "Consider using json, msgpack, or dill (a pickle alternative that handles closures).",
    ]
  },

  {
    lang: 'python',
    label: 'PY: Async / Await Error',
    pattern: /^(.*)(async|await|asyncio|coroutine|event loop|RuntimeError.*coroutine)(.*)$/i,
    responses: [
      "Quack! Async gotcha! 🦆 Did you forget to await your coroutine?",
      "You can't call an async function without await — it returns a coroutine object, not the result.",
      "Use asyncio.run(main()) as your entry point, not main() directly.",
      "Mixing sync and async code? Use asyncio.run() or a thread pool executor.",
    ],
    proResponses: [
      "Ensure all coroutines are awaited. Use asyncio.run() as the event loop entry point.",
      "For blocking code inside async functions, use asyncio.to_thread() or run_in_executor().",
    ]
  },

  {
    lang: 'python',
    label: 'PY: Virtual Environment',
    pattern: /^(.*)(virtual environment|venv|virtualenv|conda|pip install|requirements.txt)(.*)$/i,
    responses: [
      "Quack! Always use a virtual environment! 🦆 python -m venv venv to create one.",
      "Activate it: source venv/bin/activate (Mac/Linux) or venv\\Scripts\\activate (Windows).",
      "Freeze your dependencies: pip freeze > requirements.txt after installing everything.",
      "Different project, different venv. Never install packages globally for project work.",
    ],
    proResponses: [
      "Create: python -m venv venv. Activate: source venv/bin/activate. Install: pip install -r requirements.txt.",
      "Use pip freeze > requirements.txt to capture your dependency versions for reproducibility.",
    ]
  },

  {
    lang: 'python',
    label: 'PY: Debugging Tip',
    pattern: /^(.*)how (do i|to|can i) debug(.*)python(.*)$/i,
    responses: [
      "Quack! Use print() statements liberally — no shame in it! 🦆",
      "Try pdb: import pdb; pdb.set_trace() to step through your code interactively.",
      "In Python 3.7+, just use breakpoint() — same as pdb.set_trace() but cleaner.",
      "VS Code has a great Python debugger built in. Set a breakpoint and run the debugger!",
    ],
    proResponses: [
      "Use pdb.set_trace() or breakpoint() (Python 3.7+). Run with python -m pdb yourfile.py.",
      "For complex issues, use logging instead of print — it's easier to control and filter.",
    ]
  },

];

// Works in both browser (ignored) and Node.js (used by ducky-cli.js)
if (typeof module !== 'undefined') module.exports = RULES_PYTHON;
