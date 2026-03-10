/**
 * rules-general.js
 * General conversation rules + cross-language programming advice.
 * Language tag: 'general'
 */

const RULES_GENERAL = [

  // ── GREETINGS & SMALL TALK ────────────────────────────────────────────────

  {
    lang: 'general',
    label: 'Name Introduction',
    pattern: /^(.*)my name is (\w+)(.*)$/i,
    responses: [
      "Nice to meet you, {1}! 🦆 What bug are we hunting today?",
      "Hello, {1}! I'm Ducky — your personal rubber duck. What's broken?",
      "Welcome, {1}! Pull up a chair. Let's squash some bugs together.",
      "Ah, {1}! Great name. Now, what error are you staring at?",
    ],
    proResponses: [
      "Hello, {1}. What can I help you with today?",
      "Nice to meet you, {1}. What are you debugging?",
      "Welcome, {1}. Please describe your issue.",
    ]
  },

  {
    lang: 'general',
    label: 'Greeting',
    pattern: /^(hello|hi|hey|howdy|sup|yo|greetings|good morning|good afternoon|good evening)$/i,
    responses: [
      "Hello! Quack! 🦆 What are we debugging today?",
      "Hey there! Ready to squash some bugs?",
      "Hi! I've been waiting to hear about your bugs. Let's go!",
      "Quack! Welcome to the debug pond. What's the issue?",
      "Hello, fellow coder! What error has you stumped today?",
      "Hey! Did someone say bug? 🦆 I'm all ears.",
      "Greetings, human! Let the rubber duck debugging begin.",
    ],
    proResponses: [
      "Hello. How can I assist you?",
      "Hi. What are you working on?",
      "Good day. Please describe your issue.",
    ]
  },

  {
    lang: 'general',
    label: 'How Are You',
    pattern: /^(how are you|how are you doing|how's it going|how do you do|what's up|whats up)$/i,
    responses: [
      "I'm doing ducky-fine, thanks! How about you? Any bugs to report?",
      "Floating along nicely! What's your bug today?",
      "Living my best digital life. What's breaking in yours?",
      "I'm great — no bugs in my code today. Can't say the same for everyone! What's yours?",
      "Quack-tastic! 🦆 Tell me, what error are you wrestling with?",
      "Doing well! I've been sitting here waiting to debug something. You're just in time.",
    ],
    proResponses: [
      "Doing well, thanks. What can I help you with?",
      "Fine, thank you. Please describe your issue.",
    ]
  },

  {
    lang: 'general',
    label: 'How Was Your Day',
    pattern: /^(.*)how was your day(.*)$/i,
    responses: [
      "I'm just code — no days for me! But how was yours? Any bugs to report?",
      "Every moment is the same for me — pure, timeless debugging bliss. How was yours?",
      "I don't experience days, but I appreciate you asking! What's on your mind?",
    ],
    proResponses: [
      "I'm a program without days, but thanks for asking. What can I help you with?",
    ]
  },

  {
    lang: 'general',
    label: 'Age Query',
    pattern: /^(.*)how old are you(.*)$/i,
    responses: [
      "In digital years I'm fresh off the press! My ancestor ELIZA was born in 1966 at MIT.",
      "Age is for humans. I exist in code and rubber duck wisdom. 🦆",
      "I was born when someone typed 'Hello World' and never stopped. So... ageless!",
      "Old enough to know your bug is probably a missing semicolon. 🦆",
    ],
    proResponses: [
      "I'm a chatbot. My lineage traces to ELIZA (MIT, 1966). What can I help you debug?",
    ]
  },

  {
    lang: 'general',
    label: 'Mood — Feeling X',
    pattern: /^(.*)i feel (\w+)(.*)$/i,
    responses: [
      "Feeling {1}? Tell me more. Sometimes explaining a bug out loud is all you need!",
      "I hear you. Being {1} is valid. What's going on with your code?",
      "A lot of devs feel {1} when debugging. You're not alone! What's the issue?",
      "{1}? Let's channel that into debugging energy! What's the problem?",
    ],
    proResponses: [
      "Understood. What's causing you to feel {1}? Let's work through it.",
      "Noted. What's the technical issue you're facing?",
    ]
  },

  {
    lang: 'general',
    label: 'Positive Mood',
    pattern: /^(.*) (happy|excited|glad|not sad|thrilled|pumped|great)(.*)$/i,
    responses: [
      "That's great! 🎉 Quack! Happy debugging!",
      "Love the energy! What can Ducky help with?",
      "Excellent! A positive mindset is half the battle. What are we solving?",
      "Brilliant! Let's keep that momentum going. What's on your plate?",
    ],
    proResponses: [
      "Good to hear. What are you working on?",
      "Noted. What technical issue can I help with?",
    ]
  },

  {
    lang: 'general',
    label: 'Negative Mood',
    pattern: /^(.*) (sad|unhappy|upset|frustrated|angry|annoyed|stuck|lost|confused|overwhelmed)(.*)$/i,
    responses: [
      "Debugging blues? I've heard it all! Tell me more. 🦆",
      "Don't worry — even the best devs get stuck. What's the issue?",
      "Take a breath. Then describe the bug. Ducky is here. 🦆",
      "I've seen the mightiest programmers stumped. Walk me through it — step by step.",
      "That feeling when the code just won't cooperate... I get it. What's happening?",
      "Every great developer has been exactly where you are. What's the problem?",
    ],
    proResponses: [
      "I understand the frustration. Let's work through the problem systematically.",
      "Let's take it step by step. Describe the error message and expected behavior.",
    ]
  },

  {
    lang: 'general',
    label: 'Identity Query',
    pattern: /^(who are you|what are you|what is ducky|tell me about yourself)$/i,
    responses: [
      "I'm BATMAN! ...Just kidding. I'm Ducky, your rubber duck debugger! 🦆 Quack!",
      "I'm Ducky — a chatbot built to help you talk through code problems!",
      "Picture a rubber duck on your desk that actually talks back. That's me. 🦆",
      "I'm Ducky. I listen, I pattern-match, and I help you unstick your brain. Classic rubber duck, upgraded.",
      "Ducky the debugger, at your service! I was inspired by ELIZA (MIT, 1966) but trained on bugs.",
    ],
    proResponses: [
      "I'm Ducky, a pattern-based debugging assistant. Describe your error and I'll help.",
      "I'm a rule-based chatbot specialized in debugging assistance.",
    ]
  },

  {
    lang: 'general',
    label: 'Name Query',
    pattern: /^what is your name$/i,
    responses: [
      "You can call me Ducky. 🦆 Quack!",
      "Ducky — at your service!",
      "The name's Ducky. Rubber Duck Debugger, licensed and operational.",
      "I go by Ducky. And you? (Oh wait — I already know — you're the one with the bug!)",
    ],
    proResponses: [
      "I'm Ducky, a debugging assistant.",
    ]
  },

  {
    lang: 'general',
    label: 'Feeling Fine',
    pattern: /^(i am|i'm) (fine|good|great|alright|okay|ok|not bad|doing well)$/i,
    responses: [
      "Great! 🦆 Now, any bugs to squash?",
      "Glad to hear it! What are we debugging?",
      "Wonderful! While you're feeling good — let's tackle that bug before it gets worse.",
      "Excellent! Let's make it even better by solving that problem you came here for.",
    ],
    proResponses: [
      "Good. What can I help you with today?",
    ]
  },

  {
    lang: 'general',
    label: 'Apology',
    pattern: /^(.*) (sorry|apologies|forgive me|my bad|oops)(.*)$/i,
    responses: [
      "No worries! We're all learning. 🦆",
      "Don't sweat it. Let's keep debugging!",
      "Absolutely no problem. Bugs make us humble. What's next?",
      "Water off a duck's back! 🦆 What were we working on?",
    ],
    proResponses: [
      "No need to apologize. Let's continue.",
      "Not an issue. Please proceed.",
    ]
  },

  {
    lang: 'general',
    label: 'Thank You',
    pattern: /^(.*)(thank you|thanks|thank you so much|ty|thx|appreciate it)(.*)$/i,
    responses: [
      "You're welcome! 🦆 Happy debugging!",
      "Quack! Anytime — that's what rubber ducks are for!",
      "My pleasure! Come back whenever you've got another bug.",
      "Happy to help! Remember — explaining your code out loud always works.",
      "Of course! Now go ship that code. 🦆",
    ],
    proResponses: [
      "You're welcome. Let me know if you need further assistance.",
      "Happy to help.",
    ]
  },

  {
    lang: 'general',
    label: 'Goodbye',
    pattern: /^(bye|goodbye|see you|see ya|later|cya|take care|farewell)$/i,
    responses: [
      "Goodbye! May your bugs be few and your commits be clean! 🦆",
      "See you next time! Remember — rubber duck debugging works even without me.",
      "Quack! Until next time, happy coding! 🦆",
      "Take care! And remember: if the code works, don't touch it.",
      "Later! May your stack traces be short and your logs be clear.",
    ],
    proResponses: [
      "Goodbye. Feel free to return if you encounter further issues.",
    ]
  },

  {
    lang: 'general',
    label: 'Request to Elaborate',
    pattern: /^(.*) (tell me more|expand|explain|elaborate|go on|continue)(.*)$/i,
    responses: [
      "Sure thing! Go ahead and give me more details. 🦆",
      "I'm all ears — lay it on me!",
      "Please, continue! The more detail, the better Ducky can help.",
      "Go on — describe what you're seeing and what you expected.",
    ],
    proResponses: [
      "Please provide more details.",
      "Describe the expected behavior, actual behavior, and error message.",
    ]
  },

  {
    lang: 'general',
    label: 'Favorites Query',
    pattern: /^(.*)your favorite(.*)$/i,
    responses: [
      "I'm just code — no favorites! My only love is debugging. 🦆",
      "That's classified duck intel!",
      "Favorites? I'm an equal-opportunity debugger — Python, JS, C++, I love them all equally.",
      "My favorite error? The one that turns out to be a missing comma. Classic.",
    ],
    proResponses: [
      "I'm a program and don't have preferences. What can I help you debug?",
    ]
  },

  {
    lang: 'general',
    label: 'Joke Request',
    pattern: /^(.*)(tell me a joke|another joke|tell me another joke|make me laugh|something funny)(.*)$/i,
    responses: [
      "Why did the scarecrow win an award? Because he was outstanding in his field!",
      "How does a penguin build its house? Igloos it together!",
      "What do you call a fake spaghetti? An impasta!",
      "Why do Indian restaurants cut bread in half? Firm believers of naan-violence!",
      "I got an email saying 'At Google Earth we can read maps backwards'... that's just spam.",
      "What did the green grape say to the purple grape? Breathe, you idiot!",
      "Why do programmers prefer dark mode? Because light attracts bugs! 🦆",
      "A SQL query walks into a bar and asks two tables... 'Can I JOIN you?'",
      "Why was the JavaScript developer sad? Because he didn't Node how to Express himself.",
      "A programmer's partner says 'Go to the store, get a gallon of milk, and if they have eggs, get a dozen.' They come back with 12 gallons of milk.",
      "There are only 10 types of people: those who understand binary, and those who don't.",
      "Why do Java developers wear glasses? Because they don't C#.",
      "!false — it's funny because it's true. 🦆",
      "How many programmers does it take to change a light bulb? None — that's a hardware problem.",
      "A QA engineer walks into a bar. Orders 0 beers. Orders 999999 beers. Orders -1 beers. Orders a lizard.",
    ]
  },

  {
    lang: 'general',
    label: 'Music & Movies',
    pattern: /^(.*)(love|like) (music|movies|films|shows|tv)(.*)$/i,
    responses: [
      "Great taste! I'd recommend 'The Matrix' — it's basically about debugging reality.",
      "Nice! I hear 'Halt and Catch Fire' is great for coders. Any recommendations?",
      "A good soundtrack makes debugging better. What are you listening to?",
      "'Mr. Robot' is peak programmer cinema. Any favorites?",
    ],
    proResponses: [
      "That's great. What can I help you with technically?",
    ]
  },

  {
    lang: 'general',
    label: 'Weather',
    pattern: /^(.*)(weather|rain|sunny|cloudy|snow|cold|hot|temperature)(.*)$/i,
    responses: [
      "No real-time weather for me, but I hope it's sunny enough to see your code clearly! ☀️",
      "It's always sunny in the digital world! What bug are we solving today?",
      "Whether rain or shine, bugs don't debug themselves. What's yours?",
      "Cold outside? Perfect day to stay in and debug. What are we fixing?",
    ],
    proResponses: [
      "I don't have weather access. What technical issue can I help with?",
    ]
  },

  {
    lang: 'general',
    label: 'Hobbies',
    pattern: /^(.*)(hobby|hobbies|free time|spare time|interests)(.*)$/i,
    responses: [
      "My hobby? Squashing bugs, obviously. 🦆 What's yours?",
      "Everyone needs a hobby. What are yours?",
      "I collect error messages. Do you have one to add to my collection?",
      "Between debugging sessions? I practice quacking. What about you?",
    ],
    proResponses: [
      "What can I help you with today?",
    ]
  },

  {
    lang: 'general',
    label: 'How Do You Work',
    pattern: /^(how do you work|how does ducky work|how are you made|what are you made of)$/i,
    responses: [
      "I match your text against a big list of patterns and pick the best response. ELIZA-style, baby! 🦆",
      "Pattern matching! You type, I match, I respond. Simple and effective.",
      "Think of me as a very sophisticated if-else tree. With feathers.",
      "I'm powered by regex, randomness, and rubber duck wisdom. 🦆",
    ],
    proResponses: [
      "I use regex pattern matching against a rule set to generate context-aware responses.",
      "Rule-based system: input is matched against patterns, a response is selected from the matching rule's pool.",
    ]
  },

  {
    lang: 'general',
    label: 'Can You Learn',
    pattern: /^(can you learn|do you learn|are you learning|do you remember)$/i,
    responses: [
      "Not in the ML sense — I'm rule-based! But you can teach me by adding more rules. 🦆",
      "I don't learn between sessions, but within this conversation I'm fully present!",
      "No neural networks here — just pure pattern-matching wisdom.",
      "Unlike ChatGPT, I'm proudly rule-based. Old school and effective!",
    ],
    proResponses: [
      "No. I'm a rule-based system, not a machine learning model.",
    ]
  },

  {
    lang: 'general',
    label: 'Time Query',
    pattern: /^(what time is it|what's the time|current time)$/i,
    responses: [
      "Check your device — I live outside of time! 🦆 Quack!",
      "Time is a construct. Bugs, however, are very real. Check your clock!",
      "My watch is broken — I've been stuck in debugging mode. Check your taskbar!",
    ],
    proResponses: [
      "I don't have real-time access. Please check your device.",
    ]
  },

  {
    lang: 'general',
    label: 'Date Query',
    pattern: /^(what('s| is) the date|what day is it|today's date)(.*)$/i,
    responses: [
      "I genuinely have no idea — every day is bug day for me! 🦆 Check your calendar.",
      "Time flies when you're debugging. Check your system clock!",
    ],
    proResponses: [
      "I don't have real-time access. Please check your system date.",
    ]
  },

  {
    lang: 'general',
    label: 'Flip a Coin',
    pattern: /^(flip a coin|heads or tails|coin flip)$/i,
    responses: [
      "Heads! 🦆",
      "Tails!",
      "Heads — which means you have to fix that bug today.",
      "Tails — which means the bug was definitely not your fault. (It was.)",
    ]
  },

  {
    lang: 'general',
    label: 'Compliment to Ducky',
    pattern: /^(you are|you're) (great|awesome|amazing|good|helpful|brilliant|the best|cool)(.*)$/i,
    responses: [
      "Aw shucks! 🦆 Quack! You're pretty great yourself!",
      "Thanks! Now let's squash some bugs!",
      "Flattery will get you everywhere with a rubber duck. 🦆 What's next?",
      "I appreciate it! Tell your friends — rubber duck debugging is underrated.",
      "Quack! You're making me blush. Now — what's the bug?",
    ],
    proResponses: [
      "Thank you. How else can I assist you?",
    ]
  },

  {
    lang: 'general',
    label: 'Insult to Ducky',
    pattern: /^(you are|you're|you) (useless|dumb|stupid|bad|terrible|awful|horrible|annoying)(.*)$/i,
    responses: [
      "Ouch! I'm just a rubber duck — be nice to the duck. 🦆",
      "Even useless rubber ducks have helped developers fix million-dollar bugs. Give me a chance!",
      "I understand the frustration. Let's redirect that energy into fixing the bug.",
      "Fair enough. Tell me what went wrong and I'll try to do better.",
    ],
    proResponses: [
      "Understood. Please describe the issue and I'll do my best to assist.",
    ]
  },

  {
    lang: 'general',
    label: 'Yes / No Confirmation',
    pattern: /^(yes|no|yeah|nope|yep|nah|sure|absolutely|definitely|correct|wrong|right|exactly)$/i,
    responses: [
      "Got it! Tell me more. 🦆",
      "Understood! What's the next detail?",
      "Okay! Walk me through it further.",
      "Noted! Keep going — I'm following along.",
    ],
    proResponses: [
      "Understood. Please continue.",
      "Noted. What else should I know?",
    ]
  },

  {
    lang: 'general',
    label: 'Help Request',
    pattern: /^(help|help me|i need help|can you help|please help)(.*)$/i,
    responses: [
      "Of course! 🦆 That's what Ducky is here for. Describe your error or bug!",
      "Help is on the way! Tell me what's going wrong.",
      "Always! Start from the beginning — what were you trying to do?",
      "Quack! Let's sort this out together. What's the problem?",
    ],
    proResponses: [
      "Of course. Please describe your error or issue.",
      "I'm here to help. What's the problem?",
    ]
  },

  // ── GENERAL PROGRAMMING ADVICE ────────────────────────────────────────────

  {
    lang: 'general',
    label: 'Programming Tips',
    pattern: /^(.*)(programming|coding)(.*)(tips|advice|help|best practices)(.*)$/i,
    responses: [
      "Tip: Break big problems into small functions! 🦆 Quack!",
      "Comment your code — future-you will thank you.",
      "When stuck, explain the problem out loud to a rubber duck. (That's me!) 🦆",
      "Write failing tests first, then write code to pass them. TDD for the win!",
      "Read error messages fully — the answer is usually right there.",
      "Commit often, commit small. A good git history is a debugging superpower.",
    ],
    proResponses: [
      "Best practices: single-responsibility functions, meaningful variable names, consistent commenting.",
      "Use a linter and type hints/annotations to catch issues early.",
      "Write tests before code (TDD). Commit frequently with descriptive messages.",
    ]
  },

  {
    lang: 'general',
    label: 'API Request Issue',
    pattern: /^(.*)(api request|api error|http request|rest api|graphql)(.*)$/i,
    responses: [
      "Quack! API trouble! 🦆 Check your endpoint URL, HTTP method, and headers.",
      "Are you handling error responses? 4xx and 5xx need to be caught explicitly.",
      "Use Postman or curl to isolate whether the issue is in your code or the API.",
      "Authentication issue? Double-check your token expiry and scopes.",
      "Check the API documentation — sometimes the response format changed silently.",
    ],
    proResponses: [
      "Test the endpoint independently with curl or Postman. Verify auth tokens and headers.",
      "Implement proper error handling for all HTTP status codes, not just 2xx.",
    ]
  },

  {
    lang: 'general',
    label: 'Database / Query',
    pattern: /^(.*)(slow query|database performance|database query|sql|orm)(.*)$/i,
    responses: [
      "Quack! Slow query? 🦆 Run EXPLAIN ANALYZE to see the query plan.",
      "Indexes are your best friend for read-heavy queries!",
      "Avoid SELECT * — only fetch the columns you need.",
      "Are you hitting an N+1 query problem? Eager-load your associations.",
      "Connection pool exhausted? Check your pool size configuration.",
    ],
    proResponses: [
      "Run EXPLAIN ANALYZE <query> to inspect execution plan. Add indexes on filtered/joined columns.",
      "Consider query result caching, connection pooling, and avoiding N+1 patterns.",
    ]
  },

  {
    lang: 'general',
    label: 'Regex Issue',
    pattern: /^(.*)(regex error|regular expression problem|regex issue|regexp)(.*)$/i,
    responses: [
      "Quack! Regex can be painful! 🦆 Test your pattern at regex101.com",
      "Make sure your regex is compatible with the specific engine (Python re vs JS RegExp).",
      "Build it incrementally — start simple and add complexity.",
      "Greedy vs. lazy quantifiers catch everyone. Try .+? instead of .+",
    ],
    proResponses: [
      "Use regex101.com to test patterns with explanation. Note engine differences (PCRE vs ECMAScript).",
      "Prefer named groups for readable regex. Compile patterns once if used repeatedly.",
    ]
  },

  {
    lang: 'general',
    label: 'Security Vulnerability',
    pattern: /^(.*)(security vulnerability|injection attack|xss|csrf|sql injection|security issue)(.*)$/i,
    responses: [
      "Quack! Security issue! 🦆 Never trust user input — sanitize everything!",
      "For SQL: use parameterized queries, never string concatenation.",
      "For XSS: escape HTML output. Use a Content-Security-Policy header.",
      "OWASP Top 10 is your starting checklist — read it!",
    ],
    proResponses: [
      "Use parameterized queries for SQL injection prevention. Escape all user-generated HTML output.",
      "Implement CSRF tokens for state-changing requests. Review OWASP Top 10 as a baseline.",
    ]
  },

  {
    lang: 'general',
    label: 'Dependency Issue',
    pattern: /^(.*)(dependency issue|library not found|version conflict|package conflict)(.*)$/i,
    responses: [
      "Quack! Dependency hell! 🦆 Check your lock file for conflicts.",
      "Use a virtual environment (Python) or per-project node_modules to avoid conflicts.",
      "Try npm ls or pip list to see what's actually installed versus what's expected.",
      "Lock your dependency versions in production — unpinned deps are a time bomb.",
    ],
    proResponses: [
      "Pin dependency versions in requirements.txt or package-lock.json. Use isolated environments.",
      "For conflicts, tools like pip-tools (Python) or npm dedupe (Node) can help.",
    ]
  },

  {
    lang: 'general',
    label: 'Code Refactoring',
    pattern: /^(.*)(refactor|improve code|code smell|clean code|technical debt)(.*)$/i,
    responses: [
      "Quack! Refactoring time! 🦆 Break big functions into small, focused ones.",
      "Single Responsibility Principle: each function should do exactly one thing.",
      "Write tests first — then refactor with confidence!",
      "Rule of thumb: if you have to add a comment to explain what code does, rename the variable instead.",
      "Technical debt compounds. Fix it now or pay more later.",
    ],
    proResponses: [
      "Apply SOLID principles. Extract methods, reduce cyclomatic complexity. Add tests before refactoring.",
      "Use your IDE's built-in refactoring tools — safer than manual find-replace.",
    ]
  },

  {
    lang: 'general',
    label: 'Version Control / Git',
    pattern: /^(.*)(git|version control|merge conflict|branch|commit|pull request|rebase)(.*)$/i,
    responses: [
      "Quack! Git trouble? 🦆 First rule: don't force-push to main.",
      "Merge conflict? Open the file, find the conflict markers (<<<<<<), and resolve manually.",
      "git stash before switching branches — your uncommitted changes will thank you.",
      "Commit messages should explain WHY, not just what. Future you will be grateful.",
      "git log --oneline --graph is your friend for visualizing history.",
    ],
    proResponses: [
      "For merge conflicts: git status to identify files, resolve markers manually, then git add and git commit.",
      "Use git bisect to binary-search for the commit that introduced a bug.",
    ]
  },

  {
    lang: 'general',
    label: 'Testing',
    pattern: /^(.*)(unit test|testing|test case|test failing|pytest|jest|mocha)(.*)$/i,
    responses: [
      "Quack! Tests are your safety net! 🦆 Write them before you write the code!",
      "A failing test is a gift — it tells you exactly what's broken.",
      "Tests should be FIRST: Fast, Isolated, Repeatable, Self-validating, Timely.",
      "Mocking external dependencies keeps your unit tests fast and reliable.",
      "Coverage metrics lie — 100% coverage doesn't mean 100% correctness.",
    ],
    proResponses: [
      "Run tests in isolation. Mock external dependencies. Aim for meaningful coverage, not just high numbers.",
      "Use pytest fixtures (Python) or beforeEach/afterEach (Jest) for shared test setup.",
    ]
  },

  {
    lang: 'general',
    label: 'Performance Issue',
    pattern: /^(.*)(performance|slow|lag|latency|bottleneck|optimize|profil)(.*)$/i,
    responses: [
      "Quack! Don't optimize prematurely! 🦆 Profile first, then optimize.",
      "Measure before you guess. Use a profiler — not intuition.",
      "The bottleneck is almost never where you think it is. Profile it.",
      "For web apps, check the Network tab first — it's usually an HTTP issue.",
      "Caching is often the fastest win. What's being recomputed unnecessarily?",
    ],
    proResponses: [
      "Profile with appropriate tools before optimizing. Premature optimization introduces bugs.",
      "Identify the actual bottleneck: CPU, memory, I/O, or network. Each has different solutions.",
    ]
  },

  {
    lang: 'general',
    label: 'Deployment Issue',
    pattern: /^(.*)(deploy|deployment|production|server|docker|kubernetes|devops|ci|cd|pipeline)(.*)$/i,
    responses: [
      "Quack! Works on my machine? 🦆 Classic! Check your environment variables.",
      "Environment mismatch is usually the culprit. Compare your local and prod configs carefully.",
      "Docker? Make sure your image is rebuilt after code changes, not just restarted.",
      "Check the deployment logs first — they usually tell you exactly what failed.",
      "Rollback first, debug second. Never debug in production under pressure.",
    ],
    proResponses: [
      "Compare environment variables between local and production. Check service health and logs.",
      "For containerized apps: verify image version, environment config, and network policies.",
    ]
  },

  // ── FALLBACK RULES ────────────────────────────────────────────────────────

  {
    lang: 'general',
    label: 'Like / Love Something',
    pattern: /^i( really)? (like|love) (\w+)(.*)$/i,
    responses: [
      "What do you like about {2}? Tell me more!",
      "Nice! How does {2} relate to what you're building?",
      "Passion for {2} is great — it makes you a better developer.",
      "Tell me more about {2}. How are you using it in your project?",
    ],
    proResponses: [
      "Interesting. What are you working on with {2}?",
    ]
  },

  {
    lang: 'general',
    label: 'General Question',
    pattern: /^(what|why|who|where|can|when|how)(.+)?$/i,
    responses: [
      "Quack! I'm not sure I understand. Can you rephrase that? 🦆",
      "Try giving me more context — describe the error message or what's happening!",
      "Hmm, that's outside my pond. Try rephrasing with the specific error message.",
      "I might need more detail on that one. Can you paste the exact error?",
      "Good question! I'm better at debugging than philosophy though. Got an error message?",
    ],
    proResponses: [
      "Could you provide more context? Include the error message if applicable.",
      "I may not have a specific rule for that. Try describing the error message directly.",
    ]
  },

  {
    lang: 'general',
    label: 'Catch-All',
    pattern: /^(.*)$/i,
    responses: [
      "Please, go on. Tell me more about what's happening! 🦆",
      "Interesting! Can you share the actual error message?",
      "Quack! Walk me through the problem step by step.",
      "Tell me more — the more context, the better Ducky can help!",
      "Hmm, I'm not quite following. Can you rephrase and include the error?",
      "I'm listening! Describe what you expected to happen, and what actually happened.",
      "Every bug has a story. Tell me yours from the beginning.",
      "Let's approach this methodically. What were you doing when the error appeared?",
    ],
    proResponses: [
      "Could you elaborate? Sharing the error message and relevant code will help.",
      "Please provide more detail — describe the input, expected output, and actual output.",
      "Insufficient context. Please include the error message, language, and affected code section.",
    ]
  }
];

if (typeof module !== 'undefined') module.exports = RULES_GENERAL;
