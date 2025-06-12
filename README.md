# Rubber-Ducky-Chatbot

## 📌 Project Overview
Rubber Duck Debugging Assistant, affectionately called **Ducky**, is an interactive Python chatbot designed to help programmers debug their code by simulating the "rubber duck debugging" technique. Inspired by the practice of explaining code problems aloud to a rubber duck to clarify thinking, Ducky engages users in a conversational manner to identify and resolve common programming issues.

Ducky recognizes various error types and programming problems through pattern matching and provides practical advice, tips, and even a bit of playful humor by occasionally adding a cheerful "quack!" to its responses. Beyond debugging, Ducky can also handle casual chit-chat and fun commands like singing a song or flipping a coin, making the debugging process more enjoyable.

## 🛠️ Tech Stack
Python

## 🚀 Features
- **Error Resolution Guidance:**  
Identifies common programming errors such as `ImportError`, `SyntaxError`, `TypeError`, `NameError`, and many others, offering concise, practical solutions tailored to each issue.

- **Interactive Chat Interface:**
- Engages users through a conversational loop where users describe their coding problems and receive thoughtful, context-aware responses.

- **Quirky Personality:**  
Adds a whimsical touch by occasionally appending "quack!" to responses, making debugging less stressful and more fun.

- **User Feedback Loop:**
- After each response, Ducky asks if the user is satisfied or wants additional suggestions, ensuring thorough assistance.

- **Testing Function:**  
Includes a `test_simpleducky` function that simulates various programming scenarios to verify the chatbot’s responsiveness and accuracy.

## 💡 How to Use
Ducky operates by matching user input against a set of predefined regular expression patterns that correspond to common programming issues. It then selects an appropriate response from a curated list of suggestions. The chatbot runs in a continuous loop, allowing users to ask multiple questions until they choose to exit.

## Getting Started

### Prerequisites

- Python 3.x installed on your system

### Installation

1. Clone this repository or download the source code files.
2. Navigate to the project directory in your terminal or command prompt.

### Running the Program

Run the main Python script to start the interactive Rubber Duck Debugging Assistant:

```bash
python ducky.py
```

You will be prompted to enter your programming issue or question. Type your query and press Enter. Ducky will respond with advice or tips. After each response, you can indicate if you are satisfied or want further help.

To exit the program, type `exit` or `quit`.

### ✅ Testing

To run the built-in test function that simulates various error scenarios and evaluates Ducky’s responses, execute:

```bash
python ducky.py --test
```

This will run the `test_simpleducky` method and display the results, helping you verify the chatbot’s effectiveness.

---

## Example Interaction

```
You: My program is giving an ImportError
Ducky: Encountering an ImportError? It could be because the module you're trying to import isn't installed. quack!

You: I'm stuck in an infinite loop
Ducky: Look for any missing or incorrect loop termination conditions.

You: Do you have any programming tips?
Ducky: Comment your code to make it easier to understand and maintain. quack!
```

---

## Project Structure

- `ducky.py` — Main Python script containing the Rubber Duck Debugging Assistant implementation.
- `README.md` — This documentation file.
- Other supporting files as needed.

---

## Strengths and Limitations

**Strengths:**

- Engages users interactively, encouraging problem-solving through conversation.
- Covers a broad range of common programming errors using pattern matching.
- Includes a testing framework to validate chatbot responses.
- Adds humor and personality to reduce debugging frustration.

**Limitations:**

- Relies on predefined patterns; may not understand highly nuanced or complex queries.
- Lacks advanced natural language understanding or learning capabilities.
- Cannot access real-time information or external resources.
- Responses are limited to the scope of programmed patterns and may not handle ambiguous inputs well.

---

## Broader Impact and Ethical Considerations

This project creatively applies fundamental natural language processing techniques to make debugging more accessible and engaging, especially for novice programmers. While it simplifies AI concepts, it promotes thoughtful coding practices and problem-solving skills. Ethical use involves ensuring users understand the assistant is a tool for guidance and not a substitute for professional debugging or security expertise.

---

## Credits

Developed by:  
Aan Nazmus Sakib, Atharva Kadam, Jyoti Suhag, Rohith Kola, Grace Chandler  
Under the guidance of Prof. Leo Ureel  
Department of Computer Science, 2023

