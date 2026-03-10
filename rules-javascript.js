/**
 * rules-javascript.js
 * JavaScript and Node.js error and debugging rules.
 * Language tag: 'javascript'
 */

const RULES_JAVASCRIPT = [

  {
    lang: 'javascript',
    label: 'JS: Uncaught TypeError / Cannot Read Property',
    pattern: /^(.*)(uncaught typeerror|cannot read propert|cannot read properties of (null|undefined)|is not a function)(.*)$/i,
    responses: [
      "Quack! Classic JS gotcha! 🦆 Something is null or undefined when you tried to access it.",
      "Add a null check: if (obj && obj.property) before accessing. Or use optional chaining: obj?.property",
      "Use the browser devtools console to check the exact line and what the null value is.",
      "Optional chaining is your friend: obj?.prop?.nested — returns undefined instead of crashing.",
      "Check if an async function resolved to undefined before you tried to use the result.",
    ],
    proResponses: [
      "Use optional chaining (obj?.prop) and nullish coalescing (obj ?? default) to guard access.",
      "Check the call stack — the null value is usually set a few frames above the error.",
    ]
  },

  {
    lang: 'javascript',
    label: 'JS: ReferenceError',
    pattern: /^(.*)(uncaught referenceerror|referenceerror|is not defined)(.*)$/i,
    responses: [
      "Quack! Variable not defined! 🦆 Did you forget to declare it with let, const, or var?",
      "Scope issue? Variables declared with let/const inside a block aren't visible outside it.",
      "Check for typos — JavaScript is case-sensitive!",
      "Temporal dead zone? let and const can't be used before their declaration line.",
    ],
    proResponses: [
      "Ensure the variable is declared in the accessible scope. Avoid var; prefer const/let for block scoping.",
      "Check for temporal dead zone issues with let/const — they aren't hoisted like var.",
    ]
  },

  {
    lang: 'javascript',
    label: 'JS: SyntaxError',
    pattern: /^(.*)(uncaught syntaxerror|unexpected token|unexpected end of input|unexpected identifier)(.*)$/i,
    responses: [
      "Quack! JavaScript syntax error! 🦆 Check for missing brackets, commas, or semicolons.",
      "Unexpected token often means a missing closing bracket from a few lines up.",
      "Use a linter like ESLint — it catches these before you even run the code!",
      "JSON.parse error? Make sure your JSON has double quotes and no trailing commas.",
    ],
    proResponses: [
      "Inspect the line and lines above it for unmatched brackets or missing commas in object literals.",
      "ESLint with an IDE plugin will highlight syntax errors in real time.",
    ]
  },

  {
    lang: 'javascript',
    label: 'JS: Unhandled Promise Rejection',
    pattern: /^(.*)(unhandled promise rejection|promise rejection|unhandledrejection|async.*error|await.*error)(.*)$/i,
    responses: [
      "Quack! Unhandled promise rejection! 🦆 Wrap your await in try/catch!",
      "Every async function should have error handling: try { await ... } catch(e) { console.error(e) }",
      "Chain .catch() onto your promise: fetch(url).catch(err => console.error(err))",
      "In Node.js, listen to process.on('unhandledRejection') as a safety net.",
    ],
    proResponses: [
      "Add try/catch around all await expressions. For promise chains, append .catch(handler).",
      "In Node.js, listen to process.on('unhandledRejection') to catch missed rejections globally.",
    ]
  },

  {
    lang: 'javascript',
    label: 'JS: CORS Error',
    pattern: /^(.*)(cors error|cors|cross-origin|access-control-allow-origin|blocked by cors)(.*)$/i,
    responses: [
      "Quack! CORS is blocking your request! 🦆 The server needs to allow your origin.",
      "You can't fix CORS from the frontend alone — the server must set Access-Control-Allow-Origin.",
      "During development, use a proxy. In production, fix the server headers.",
      "In Express: const cors = require('cors'); app.use(cors()); — done!",
    ],
    proResponses: [
      "CORS is enforced by the browser. The server must respond with Access-Control-Allow-Origin.",
      "In Express: use the cors npm package. In other backends, add the appropriate response header.",
    ]
  },

  {
    lang: 'javascript',
    label: 'JS: Maximum Call Stack / Stack Overflow',
    pattern: /^(.*)maximum call stack size exceeded(.*)$/i,
    responses: [
      "Quack! Infinite recursion in JavaScript! 🦆 Your recursive function's base case is never reached.",
      "Check the termination condition — it must actually become true eventually.",
      "JS has a smaller stack than most languages. Consider an iterative approach.",
      "Are you accidentally calling a function from within itself without a base case?",
    ],
    proResponses: [
      "Maximum call stack exceeded = infinite recursion. Verify base case is reachable.",
      "Use trampolining or iterative approaches for deep recursion in JavaScript.",
    ]
  },

  {
    lang: 'javascript',
    label: 'JS: Module / Import Error',
    pattern: /^(.*)(cannot find module|module not found|failed to resolve import|require is not defined|import.*error)(.*)$/i,
    responses: [
      "Quack! Module not found! 🦆 Run npm install first.",
      "Check your import path — relative paths need ./ prefix in Node.js.",
      "Mixing CommonJS (require) and ES modules (import)? Pick one per project.",
      "For ESM in Node.js, make sure package.json has: \"type\": \"module\"",
    ],
    proResponses: [
      "Run npm install. Verify path casing (Linux is case-sensitive). Check package.json 'type' field for ESM vs CJS.",
      "For ESM: use import/export. For CJS: use require/module.exports. Don't mix without a bundler.",
    ]
  },

  {
    lang: 'javascript',
    label: 'JS: Node.js ENOENT',
    pattern: /^(.*)(ENOENT|no such file or directory)(.*)$/i,
    responses: [
      "Quack! File not found at that path! 🦆",
      "Check if you're running the script from the right directory. Use __dirname to build absolute paths.",
      "Use path.join(__dirname, 'file.txt') instead of bare relative strings.",
      "Print __dirname to see where Node.js thinks you are.",
    ],
    proResponses: [
      "Use path.join(__dirname, relativePath) for reliable file resolution in Node.js.",
      "Verify the file exists with fs.existsSync() before attempting to read it.",
    ]
  },

  {
    lang: 'javascript',
    label: 'JS: EADDRINUSE (Port In Use)',
    pattern: /^(.*)(EADDRINUSE|address already in use|port.*in use|port.*taken)(.*)$/i,
    responses: [
      "Quack! Port already taken! 🦆 Another process is using that port.",
      "On Mac/Linux: lsof -ti :3000 | xargs kill to free the port.",
      "On Windows: netstat -ano | findstr :3000, then taskkill /PID <pid> /F",
      "Or just change your port in the config — it's the fastest fix.",
    ],
    proResponses: [
      "Kill the process: lsof -ti :PORT | xargs kill (Unix) or use Task Manager on Windows.",
      "Set PORT via environment variable to avoid hardcoded conflicts: process.env.PORT || 3000",
    ]
  },

  {
    lang: 'javascript',
    label: 'JS: Null / Undefined Access',
    pattern: /^(.*)(null|undefined)(.*)(error|issue|problem|crash|TypeError)(.*)$/i,
    responses: [
      "Quack! null/undefined strikes again! 🦆 Use optional chaining: obj?.prop",
      "The nullish coalescing operator is your friend: value ?? 'fallback'",
      "Always validate API responses before accessing nested properties.",
      "typeof x === 'undefined' is safe — accessing x.prop when x is null is not.",
    ],
    proResponses: [
      "Use optional chaining (obj?.prop) and nullish coalescing (val ?? default) for safe access.",
      "Validate API response shapes with a schema validator like Zod or Yup.",
    ]
  },

  {
    lang: 'javascript',
    label: 'JS: Event Listener Not Firing',
    pattern: /^(.*)(event listener|addeventlistener|event not firing|click not working|event.*not.*work)(.*)$/i,
    responses: [
      "Quack! Event not firing? 🦆 Make sure the element exists in the DOM when you attach the listener!",
      "Move your script to the bottom of the body, or use DOMContentLoaded.",
      "Check if another listener is calling event.stopPropagation().",
      "Is the element being dynamically created? Use event delegation on a parent element instead.",
    ],
    proResponses: [
      "Attach listeners after DOMContentLoaded or place scripts at end of body.",
      "Use event delegation for dynamically created elements: parent.addEventListener('click', e => e.target.matches('.btn') && handler(e)).",
    ]
  },

  {
    lang: 'javascript',
    label: 'JS: Fetch / HTTP Error',
    pattern: /^(.*)(fetch error|http.*error|404|500|network error|failed to fetch|axios.*error)(.*)$/i,
    responses: [
      "Quack! HTTP request failed! 🦆 Check the URL, HTTP method, and headers.",
      "fetch() doesn't throw on 4xx/5xx — check response.ok before using the data!",
      "Open the Network tab in DevTools to see the actual request and response.",
      "Is the server running? Can you hit the endpoint directly from the browser or Postman?",
    ],
    proResponses: [
      "Always check response.ok after fetch(). 4xx/5xx do not throw by default.",
      "Use the Network tab in browser DevTools or Postman to inspect the raw HTTP exchange.",
    ]
  },

  {
    lang: 'javascript',
    label: 'JS: Closure / Scope Issue',
    pattern: /^(.*)(closure|scope|variable.*loop|var.*async|let.*loop|stale closure)(.*)$/i,
    responses: [
      "Quack! Classic closure gotcha! 🦆 Are you using var in a loop? Use let instead.",
      "In async code, closures can capture the wrong value if you're using var. Switch to let or const.",
      "Stale closure? The function is referencing an old value that was captured when it was created.",
      "Use the function argument pattern to pass the loop variable explicitly into the callback.",
    ],
    proResponses: [
      "Replace var with let for block scoping in loops. For async patterns, use IIFE or Array.from with index.",
      "Stale closures in React hooks: add the dependency to the useEffect/useCallback dependency array.",
    ]
  },

  {
    lang: 'javascript',
    label: 'JS: this Context Issue',
    pattern: /^(.*)(this.*undefined|this.*wrong|lost.*this|context.*this|bind|arrow function)(.*)$/i,
    responses: [
      "Quack! 'this' is JavaScript's most famous footgun! 🦆",
      "Arrow functions don't have their own 'this' — use them to preserve the outer context.",
      "If using a regular function as a callback, bind it: obj.method.bind(obj)",
      "Class methods lose 'this' when passed as callbacks. Bind in the constructor or use arrow function properties.",
    ],
    proResponses: [
      "Arrow functions inherit 'this' lexically. For class methods used as callbacks, use arrow function class fields.",
      "Use .bind(this) or arrow functions to preserve context in callbacks and event handlers.",
    ]
  },

  {
    lang: 'javascript',
    label: 'JS: Async / Await Pitfall',
    pattern: /^(.*)(async.*await|await.*outside|top.*level.*await|promise.*not.*resolved)(.*)$/i,
    responses: [
      "Quack! await can only be used inside an async function! 🦆",
      "Forgot to await a promise? console.log() will show [object Promise] instead of the value.",
      "Top-level await works in ES modules (type: module) but not in CommonJS.",
      "async forEach doesn't work as expected — use for...of with await instead.",
    ],
    proResponses: [
      "await is only valid inside async functions. For top-level await, use ES modules (package.json: type:module).",
      "Avoid async forEach — use for...of with await or Promise.all() for parallel execution.",
    ]
  },

  {
    lang: 'javascript',
    label: 'JS: JSON Parse Error',
    pattern: /^(.*)(JSON\.parse|invalid json|json parse error|unexpected.*json|malformed json)(.*)$/i,
    responses: [
      "Quack! Invalid JSON! 🦆 JSON requires double quotes — single quotes are not valid.",
      "No trailing commas allowed in JSON. That's a JavaScript thing, not a JSON thing.",
      "Use JSONLint.com to validate your JSON string.",
      "Wrap JSON.parse() in try/catch to handle malformed input gracefully.",
    ],
    proResponses: [
      "JSON requires double-quoted keys and string values. No trailing commas, no comments.",
      "Always use try/catch around JSON.parse(). Validate with JSON.parse(JSON.stringify(obj)) as a sanity check.",
    ]
  },

  {
    lang: 'javascript',
    label: 'JS: npm / Package Issue',
    pattern: /^(.*)(npm error|npm install|npm.*failed|node_modules|package-lock|yarn error)(.*)$/i,
    responses: [
      "Quack! npm trouble! 🦆 Try: rm -rf node_modules && npm install",
      "Delete package-lock.json and node_modules, then reinstall — fixes most npm weirdness.",
      "Node version mismatch? Use nvm to switch: nvm use 18",
      "npm cache issues? Run: npm cache clean --force",
    ],
    proResponses: [
      "Delete node_modules and package-lock.json, then run npm install. Check .nvmrc for required Node version.",
      "For peer dependency conflicts: npm install --legacy-peer-deps as a last resort.",
    ]
  },

  {
    lang: 'javascript',
    label: 'JS: Webpack / Bundler Error',
    pattern: /^(.*)(webpack|bundler|vite|rollup|esbuild|build.*error|bundle.*error)(.*)$/i,
    responses: [
      "Quack! Build tool error! 🦆 Check the first error in the output — ignore the cascade.",
      "Module not found during build? Verify the import path and file extension.",
      "Vite HMR not working? Hard-refresh the browser and restart the dev server.",
      "Circular dependency? Tools like madge can visualize your import graph.",
    ],
    proResponses: [
      "Address the first error in the build output — subsequent errors are usually cascading.",
      "For circular dependencies, use madge --circular to identify them, then refactor.",
    ]
  },

  {
    lang: 'javascript',
    label: 'JS: React Error',
    pattern: /^(.*)(react.*error|usestate|useeffect|hook.*error|component.*render|jsx.*error|key.*prop)(.*)$/i,
    responses: [
      "Quack! React error! 🦆 Hooks can only be called at the top level — not inside conditions or loops.",
      "Missing key prop in a list? Add a unique key to each element: <li key={item.id}>",
      "useEffect dependency array missing a value? ESLint's exhaustive-deps rule catches this.",
      "State updates in React are async — don't read state immediately after calling setState.",
    ],
    proResponses: [
      "Rules of Hooks: call only at top level, only in React functions. Use the eslint-plugin-react-hooks.",
      "For list rendering, always provide stable, unique key props — avoid using array index as key.",
    ]
  },

  {
    lang: 'javascript',
    label: 'JS: TypeScript Error',
    pattern: /^(.*)(typescript|ts.*error|type.*error|ts.*compile|\.ts|tsc)(.*)$/i,
    responses: [
      "Quack! TypeScript error! 🦆 The type checker found an inconsistency — trust it!",
      "Never use 'any' to silence TypeScript — it defeats the purpose. Define the real type.",
      "Type assertion: as SomeType is a last resort, not a first response.",
      "Run tsc --noEmit to type-check without generating output files.",
    ],
    proResponses: [
      "Define explicit types instead of using 'any'. Use generics for reusable components.",
      "Run tsc --strict to enable all strict type checks. Address root causes, not just type assertions.",
    ]
  },

];

if (typeof module !== 'undefined') module.exports = RULES_JAVASCRIPT;
