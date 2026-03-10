/**
 * rules-cpp.js
 * C and C++ error and debugging rules.
 * Language tag: 'cpp'
 */

const RULES_CPP = [

  {
    lang: 'cpp',
    label: 'C++: Segmentation Fault',
    pattern: /^(.*)(segmentation fault|segfault|seg fault|access violation|signal 11)(.*)$/i,
    responses: [
      "Quack! Segfault! 🦆 You accessed memory you shouldn't have. Classic C/C++ villain!",
      "Common causes: null pointer dereference, array out of bounds, use-after-free.",
      "Compile with: g++ -g -fsanitize=address,undefined -o prog prog.cpp for detailed analysis.",
      "Run with valgrind: valgrind --leak-check=full ./yourprogram",
      "Check every pointer before dereferencing. Is it null? Has it been freed already?",
    ],
    proResponses: [
      "Compile with: g++ -g -fsanitize=address,undefined -o prog prog.cpp then run to pinpoint the fault.",
      "Use Valgrind: valgrind --track-origins=yes ./prog. Common causes: null ptr, out-of-bounds, use-after-free.",
    ]
  },

  {
    lang: 'cpp',
    label: 'C++: Memory Leak',
    pattern: /^(.*)(memory leak|leaking memory|heap.*leak|valgrind.*leak)(.*)$/i,
    responses: [
      "Quack! Memory leak! 🦆 Every new needs a delete — or better yet, use smart pointers!",
      "Prefer std::unique_ptr or std::shared_ptr over raw pointers in modern C++.",
      "Valgrind: valgrind --leak-check=full ./prog shows you exactly where leaked memory was allocated.",
      "Rule of thumb: if you wrote new, ask yourself where you wrote delete.",
    ],
    proResponses: [
      "Use RAII: prefer std::unique_ptr<T> over raw new/delete. Run valgrind --leak-check=full.",
      "Compile with -fsanitize=address to detect leaks at runtime with AddressSanitizer.",
    ]
  },

  {
    lang: 'cpp',
    label: 'C++: Undefined Behavior',
    pattern: /^(.*)(undefined behavior|UB|uninitialized variable|uninitialized memory|use before init)(.*)$/i,
    responses: [
      "Quack! Undefined behavior — the most chaotic bug in C/C++! 🦆",
      "Always initialize your variables. Reading uninitialized memory is UB and produces garbage.",
      "Compile with: g++ -Wall -Wextra -Wuninitialized -fsanitize=undefined to catch these.",
      "UB can silently corrupt data or crash seemingly unrelated code. Never ignore it.",
    ],
    proResponses: [
      "Compile with -fsanitize=undefined to detect UB at runtime. Always initialize variables.",
      "Use tools: Clang-Tidy, cppcheck, or PVS-Studio for static analysis of UB.",
    ]
  },

  {
    lang: 'cpp',
    label: 'C++: Stack Overflow',
    pattern: /^(.*)(stack overflow|stack smashing|stack.*corrupt|stack.*size)(.*)$/i,
    responses: [
      "Quack! Stack overflow in C++! 🦆 Deep recursion or a huge local array?",
      "Avoid declaring large arrays on the stack. Use heap allocation: new, std::vector, or std::array.",
      "Compile with -fstack-protector for canary-based stack corruption detection.",
      "Deep recursion? Convert to iteration using an explicit std::stack from the STL.",
    ],
    proResponses: [
      "Allocate large buffers on the heap: use std::vector instead of C-style arrays on stack.",
      "Compile with -fstack-protector-strong. For recursion, ensure your base case is correct.",
    ]
  },

  {
    lang: 'cpp',
    label: 'C++: Linker Error / Undefined Reference',
    pattern: /^(.*)(linker error|undefined reference|undefined symbol|unresolved external|ld.*error)(.*)$/i,
    responses: [
      "Quack! Linker error! 🦆 You declared a function but didn't define it, or forgot to link a library.",
      "Make sure all .cpp files are compiled together: g++ main.cpp utils.cpp -o myapp",
      "If using a library, add -l<name>: -lm for math, -lpthread for threads, -lssl for OpenSSL.",
      "Check the symbol with nm -C mylib.a | grep yourFunction to confirm it exists in the library.",
    ],
    proResponses: [
      "Undefined reference = missing definition or missing object file in link step. Add all .cpp files.",
      "For external libraries: link with -l<library>. Use nm or objdump to inspect symbol tables.",
    ]
  },

  {
    lang: 'cpp',
    label: 'C++: Null Pointer Dereference',
    pattern: /^(.*)(null pointer|nullptr|null dereference|dereferencing null|null.*crash)(.*)$/i,
    responses: [
      "Quack! Null pointer! 🦆 You dereferenced a pointer that was never set!",
      "Always check: if (ptr != nullptr) before dereferencing.",
      "In modern C++, prefer references over raw pointers when nullability isn't needed.",
      "std::optional<T> is the modern C++17 way to express a value that may or may not exist.",
    ],
    proResponses: [
      "Add nullptr checks before dereferencing. Consider std::optional<T> for nullable values in C++17.",
      "Enable AddressSanitizer: -fsanitize=address to catch null dereferences at runtime.",
    ]
  },

  {
    lang: 'cpp',
    label: 'C++: Compilation Error',
    pattern: /^(.*)(compilation error|compile error|does not compile|g\+\+.*error|gcc.*error|clang.*error|error.*compile)(.*)$/i,
    responses: [
      "Quack! Compilation failed! 🦆 Read the FIRST error — fix that one, then recompile.",
      "Compilers produce cascading errors from a single root cause. Top-to-bottom always.",
      "Add -Wall -Wextra to your compile flags for more helpful warnings.",
      "Clang often produces more actionable error messages than GCC — worth trying if you're stuck.",
    ],
    proResponses: [
      "Address errors top-to-bottom; cascading errors often stem from the first. Use -Wall -Wextra.",
      "Clang often produces more actionable error messages than GCC for complex template errors.",
    ]
  },

  {
    lang: 'cpp',
    label: 'C++: Buffer Overflow',
    pattern: /^(.*)(buffer overflow|out of bounds|array.*overflow|heap overflow|buffer.*overrun)(.*)$/i,
    responses: [
      "Quack! Buffer overflow — C's most famous bug! 🦆 Always bounds-check your arrays.",
      "Use std::vector or std::array instead of C-style arrays for automatic bounds safety.",
      "Use .at(i) instead of [i] on std::vector — it throws std::out_of_range if you go out of bounds.",
      "Compile with -fsanitize=address for runtime bounds checking.",
    ],
    proResponses: [
      "Use std::vector with .at(i) (bounds-checked) instead of raw arrays and operator[].",
      "Enable AddressSanitizer: -fsanitize=address. Also use static analysis: cppcheck or Clang-Tidy.",
    ]
  },

  {
    lang: 'cpp',
    label: 'C++: Use After Free / Dangling Pointer',
    pattern: /^(.*)(use after free|dangling pointer|freed memory|double free|heap use after free)(.*)$/i,
    responses: [
      "Quack! Use-after-free is a serious bug! 🦆 After delete, set the pointer to nullptr immediately.",
      "Better yet, use std::unique_ptr — it automatically prevents use-after-free.",
      "Valgrind or AddressSanitizer will pinpoint exactly where this happens.",
      "Double free? Two unique_ptr pointing to the same raw pointer — use shared_ptr instead.",
    ],
    proResponses: [
      "Adopt RAII with smart pointers (unique_ptr, shared_ptr) to eliminate use-after-free.",
      "Detect with: -fsanitize=address. After manual delete, immediately set ptr = nullptr.",
    ]
  },

  {
    lang: 'cpp',
    label: 'C++: Race Condition / Deadlock',
    pattern: /^(.*)(race condition|deadlock|thread safety|mutex|data race|concurrent|pthread)(.*)$/i,
    responses: [
      "Quack! Concurrency bugs are the hardest to reproduce! 🦆",
      "Protect shared data with std::mutex. Use std::lock_guard for automatic unlock.",
      "ThreadSanitizer detects data races: compile with -fsanitize=thread",
      "Deadlock? Two threads waiting for each other. Always acquire locks in the same order.",
    ],
    proResponses: [
      "Use std::mutex with std::lock_guard<std::mutex> for RAII locking. Run with -fsanitize=thread.",
      "Consider lock-free structures or std::atomic for simple counters to reduce lock contention.",
    ]
  },

  {
    lang: 'cpp',
    label: 'C++: Template Error',
    pattern: /^(.*)(template.*error|template.*instantiation|template.*type|typename|concept)(.*)$/i,
    responses: [
      "Quack! Template errors in C++ can be terrifying! 🦆 Read from the bottom up — that's the actual error.",
      "Enable C++20 concepts for much cleaner template error messages: -std=c++20",
      "Clang's template error messages are significantly better than GCC's for complex cases.",
      "Simplify: instantiate the template with concrete types first to verify the template itself is correct.",
    ],
    proResponses: [
      "Read template error messages from bottom up — the last line is typically the root cause.",
      "Use C++20 concepts (requires clauses) to constrain templates and get clearer error messages.",
    ]
  },

  {
    lang: 'cpp',
    label: 'C++: Smart Pointer Issue',
    pattern: /^(.*)(unique_ptr|shared_ptr|weak_ptr|smart pointer|make_unique|make_shared)(.*)$/i,
    responses: [
      "Quack! Smart pointer trouble! 🦆",
      "Can't copy a unique_ptr — use std::move() to transfer ownership.",
      "Circular shared_ptr references cause memory leaks. Break cycles with weak_ptr.",
      "Prefer std::make_unique<T>() over new T() — it's exception-safe and cleaner.",
    ],
    proResponses: [
      "unique_ptr is move-only. Use std::move() to transfer ownership. Use shared_ptr for shared ownership.",
      "Break shared_ptr cycles with weak_ptr. Prefer make_unique/make_shared over direct new.",
    ]
  },

  {
    lang: 'cpp',
    label: 'C++: STL / Iterator Issue',
    pattern: /^(.*)(iterator|stl|vector.*error|map.*error|iterator.*invalid|end\(\)|begin\(\))(.*)$/i,
    responses: [
      "Quack! STL iterator trouble! 🦆 Modifying a container while iterating over it invalidates iterators.",
      "Erase while iterating? Use the erase-remove idiom: v.erase(std::remove_if(...), v.end())",
      "Iterator past the end? Never dereference end() — it's one-past-the-last, not the last element.",
      "For maps, use find() and check against .end() before dereferencing.",
    ],
    proResponses: [
      "Never modify a container while iterating it with a range-for loop. Use the erase-remove idiom.",
      "Use container.find() and compare against .end() before dereferencing iterators.",
    ]
  },

  {
    lang: 'cpp',
    label: 'C++: Makefile / CMake Error',
    pattern: /^(.*)(makefile|cmake|make.*error|cmakelists|build system|cmake.*error)(.*)$/i,
    responses: [
      "Quack! Build system error! 🦆 For Makefile: check for tab indentation — spaces don't work.",
      "CMake error? Delete the build directory and re-run cmake fresh: rm -rf build && mkdir build && cd build && cmake ..",
      "Missing library in CMake? Add it: target_link_libraries(myapp PRIVATE mylib)",
      "Always run cmake --build . from the build directory, not the source root.",
    ],
    proResponses: [
      "For Makefile: recipe lines must use tabs, not spaces. Use: cat -A Makefile to verify.",
      "For CMake: always build out-of-source. Delete build dir and re-run cmake on errors.",
    ]
  },

  {
    lang: 'cpp',
    label: 'C++: Casting / Type Conversion',
    pattern: /^(.*)(static_cast|dynamic_cast|reinterpret_cast|c.*cast|type conversion|casting)(.*)$/i,
    responses: [
      "Quack! C++ cast trouble! 🦆 Prefer static_cast over C-style (type) casts for type safety.",
      "dynamic_cast returned nullptr? The object isn't the type you think it is. Check your class hierarchy.",
      "reinterpret_cast is a low-level operation — only use when you really know what you're doing.",
      "static_cast for safe, compile-time checked conversions. dynamic_cast for runtime polymorphism.",
    ],
    proResponses: [
      "Use static_cast for well-defined conversions. dynamic_cast for downcasting with runtime check.",
      "Avoid C-style casts — they bypass type safety. Always prefer named C++ casts.",
    ]
  },

  {
    lang: 'cpp',
    label: 'C++: Constructor / Destructor Issue',
    pattern: /^(.*)(constructor|destructor|copy constructor|move constructor|operator=|rule of (three|five|zero))(.*)$/i,
    responses: [
      "Quack! C++ constructor/destructor trouble! 🦆",
      "Rule of Three: if you define destructor, copy constructor, or copy assignment — define all three.",
      "Rule of Five in modern C++: add move constructor and move assignment operator.",
      "Rule of Zero: use smart pointers and STL types so you don't need any of the above.",
      "Missing virtual destructor in base class? Derived class destructor won't be called — memory leak!",
    ],
    proResponses: [
      "Follow the Rule of Zero: use RAII types so you need no custom copy/move/destructor.",
      "If you must manage resources manually, follow Rule of Five: destructor, copy ctor, copy assign, move ctor, move assign.",
    ]
  },

];

if (typeof module !== 'undefined') module.exports = RULES_CPP;
