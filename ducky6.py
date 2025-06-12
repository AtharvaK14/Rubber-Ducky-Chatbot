import random
import re


class Simpleducky:
    def __init__(self):
        self.patterns_responses = {
            # Rule 1: Name Introduction
            r'(.*)my name is (\w+)(.*)': ["Nice to meet you, {1}!", "Hello, {1}. How can I assist you today?"],

            # Rule 2: Asking about ducky's day
            r'(how are you|how are you doing)': ["I'm doing well. How about you?",
                                                 "I'm doing fine, thank you. How are you?"],
            r'(.*)how was your day(.*)': [
                "I'm just a program, so I don't have days, but thanks for asking! How was yours?"],

            # Rule 3: Asking about ducky's age
            r'(.*)how old are you(.*)': ["In digital terms, I've been around for a while, but I don't age like humans.",
                                         "Age is a human concept. I exist in code."],
            r'how old are you': [
                "In digital years, I'm quite young! But I was created from 1964 to 1967 at MIT by Joseph Weizenbaum",
                "Age is a concept for humans. I exist in code and bytes!"],

            # Rule 4: Mood Expressions
            r'(.*)i feel (\w+)(.*)': ["I'm sorry to hear you feel {1}. Would you like to talk about it?",
                                      "Feeling {1} is natural. Share more if you'd like."],
            r'(.*) (happy|excited|glad|not sad)': ["That's great to hear!", "I'm happy for you."],
            r'(.*) (sad|unhappy|upset)': [
                "I'm sorry to hear that. Can you tell me more about why you're feeling this way?",
                "I'm here to listen. What's bothering you?"],

            # Rule 5: Music and Movies
            r'(.*)(love|like) (music|movies)(.*)': ["Music and movies are a great way to relax. Any favorites?",
                                                    "{2} has a way of connecting people. What do you recommend?"],

            # Rule 7: Weather Talk
            r'(.*)weather(.*)': ["I can't provide real-time weather updates, but I hope it's pleasant where you are!",
                                 "Weather talk, the classic conversation starter!"],
            r'(.*)(weather| rain|sunny|cloudy)(.*)': [
                "I don't have access to current weather, but talking about the weather is always nice!",
                "It's always sunny in the digital world!"],

            # Rule 8: Hobbies and Interests
            r'(.*)(hobby|hobbies)(.*)': ["Hobbies are a great way to spend time. What are yours?",
                                         "Everyone has something they love doing. What's yours?"],

            # Rule 9: Request for a Joke
            r'(.*)(tell me a joke|tell me another joke|another joke)(.*)': [
                "Why did the scarecrow win an award? Because he was outstanding in his field!",
                "How does a penguin build its house? Igloos it together!",
                "What do you call a fake spaghetti? An impasta",
                "Why do Indian Restaurants cut bread in half before serving it? Because they are firm believers of "
                "naan violence",
                "I got an e-mail saying, 'At Google Earth, we can read maps backwards' and I thought...  'That’s just "
                "spam.'",
                "What did the green grape say to the purple grape? Breathe, you idiot!"],

            # Rule 10: Feedback on ducky
            r'(.*)you are (\w+)(.*)': ["Thank you for the feedback. I'm here to help.",
                                       "I appreciate your input. I aim to be better."],
            r'(you are|you\'re) (great|awesome|amazing|good)': ["Thank you! I'm here to help.",
                                                                "That's kind of you to say!"],

            # Rule 11: Programming Error
            r'(my|the) program is (not working|broken|failing|infinite loop|giving an error)': [
                "I'm sorry to hear that your program is having issues. Can you provide more details?",
                "Let's try to figure out the issue together. What error message are you getting?",
                "Programming can be tricky. Can you share more about the problem you're facing?"],

            # Rule 12: Infinite Loop
            r'(.*)infinite loop(.*)': ["Check the loops in your code. Make sure there's a proper exit condition.",
                                       "Look for any missing or incorrect loop termination conditions.",
                                       "Infinite loops often happen when the loop condition is not being met."],

            # Rule 13: Braces and Indentation
            r'(.*)(indentation|braces)(.*)(error|issue|problem)': [
                "Make sure your code has consistent indentation. Mixing spaces and tabs can cause issues.",
                "Check if you have balanced braces or parentheses in your code.",
                "Incorrect indentation or missing braces can lead to syntax errors."],

            # Rule 14: Undefined Variables
            r'(.*)(variable|name)(.*)(not defined|undefined)': [
                "Ensure that you have declared the variable before using it in your code.",
                "Check the scope of your variables. It might not be defined in the current context.",
                "Make sure there are no typos in the variable name."],

            # Rule 15: General Programming Advice
            r'(.*)(programming|coding)(.*)(tips|advice|help)': [
                "Always break down complex problems into smaller, manageable tasks.",
                "Comment your code to make it easier to understand and maintain.",
                "Don't hesitate to ask for help on forums or communities when you're stuck."],

            # Rule 16: Division by zero error
            r'(.*)(division by zero|ZeroDivisionError)': [
                "Oops! It looks like you are trying to divide by zero. This operation is undefined.",
                "Be careful! Division by zero is not allowed in mathematics or programming.",
                "To avoid this error, make sure the denominator is not zero in your division operation."],

            # Rule 17: TypeError
            r'(.*)(type error|TypeError)': [
                "It looks like there's a type error in your code. Check the data types of the variables and make sure "
                "they match the expected data types.",
                "TypeError alert! Verify that you are using the correct data types in your code.",
                "If you're getting TypeError, double-check the arguments you're passing to the function or operation.",
                "Make sure to validate input types to prevent unexpected TypeError issues in your code."],

            # Rule 18: SyntaxError
            r'(.*)(SyntaxError|invalid syntax)': [
                "Oops! It seems there is a syntax error in your code. Check for proper indentation and look for any "
                "missing or misplaced parentheses.",
                "SyntaxError alert! Ensure that your code follows the correct Python syntax rules especially look for "
                "errors at the line highlighted.",
                "If you encounter a SyntaxError, carefully review the code around the reported line number for any "
                "syntax mistakes.",
                "Check for unmatched parentheses, brackets, spaces and quotation marks when dealing with SyntaxError."],

            # Rule 19: NameError
            r'(.*)(NameError)|(name)(.*)(not defined)': [
                "Oh no! It appears like you are running into a NameError. This happens when you attempt to utilize a "
                "name that isn't defined, such as a variable, function, etc.",
                "NameError warning! 'Check for typos or make sure you've declared the name before using it,' advises "
                "the user, 'and make sure the name you're using is correctly defined in your code.",
                "To fix a NameError, confirm that the variable or function name is spelled correctly and defined in "
                "the appropriate scope."],

            # Rule 20: ImportError
            r'(.*)(ImportError|No module named)': [
                "Looks like you are trying to import a module that Python can't locate. Double-check the module name "
                "for any typing mistakes and make sure it's installed in your Python environment.",
                "You've got an ImportError. check that the module you're importing is installed and accessible in "
                "your Python environment.",
                "Encountering an ImportError? It could be because the module you're trying to import isn't installed."],

            # Rule 22: RuntimeError
            r'(.*)(RuntimeError|run time error|runtime error)': [
                "It looks like there's a RuntimeError. This is a generic error that indicates an unexpected problem "
                "occurred during runtime.",
                "To resolve the RuntimeError, consider analysing the specific conditions under which the error occurs "
                "and adjust your code accordingly.", ],

            # Rule 23: AttributeError
            r'(.*)(AttributeError|attribute error)': [
                "It seems you're encountering an AttributeError. Check if the attribute you're trying to access "
                "exists for the object.",
                "AttributeError alert! Ensure that the object you're working with has the attribute you're trying to "
                "access.",
                "When facing an AttributeError, review the documentation for the object to understand its attributes "
                "and methods."
            ],

            # Rule 24: KeyError
            r'(.*)(KeyError|key error)': [
                "Oops! You've stumbled upon a KeyError. Make sure the key you're using to access a dictionary exists "
                "in the dictionary.",
                "KeyError warning! Confirm that the key you're trying to use is present in the dictionary.",
                "To avoid KeyError, double-check the keys in your dictionary and ensure they match your intended usage."
            ],

            # Rule 25: FileNotFoundError
            r'(.*)(FileNotFoundError|file not found)': [
                "It looks like you're dealing with a FileNotFoundError. Verify that the file path you provided is "
                "correct and the file exists.",
                "FileNotFoundError alert! Check the file path and make sure the file you're trying to access is in "
                "the specified location.",
                "Encountering a FileNotFoundError? Ensure that the file you're attempting to open is accessible from "
                "your code."
            ],

            # Rule 26: MemoryError
            r'(.*)(MemoryError|memory error)': [
                "Uh-oh! A MemoryError indicates your program has run out of available memory. Consider optimizing "
                "your code or using more efficient data structures.",
                "MemoryError alert! Review your code for any memory-intensive operations and explore ways to reduce "
                "memory usage.",
                "To tackle MemoryError, analyze the memory requirements of your program and implement strategies to "
                "minimize memory consumption."
            ],

            # Rule 27: ValueError
            r'(.*)(ValueError|value error)': [
                "It appears there's a ValueError in your code. Check if the input values meet the expected criteria "
                "for the operation.",
                "ValueError warning! Ensure that the values you're working with are suitable for the specific "
                "operation or function.",
                "When encountering a ValueError, examine the input data and make adjustments to align with the "
                "expected format or range."
            ],

            # Rule 28: AssertionError
            r'(.*)(AssertionError|assertion error)': [
                "Oh no! An AssertionError indicates that an assert statement failed. Review your assert conditions to "
                "identify and fix the issue.",
                "AssertionError alert! Double-check your assert statements and verify that the specified conditions "
                "hold true.",
                "When facing an AssertionError, carefully examine the conditions asserted in your code and adjust as "
                "needed."
            ],

            # Rule 29: KeyboardInterrupt
            r'(.*)(KeyboardInterrupt|keyboard interrupt)': [
                "A KeyboardInterrupt typically occurs when you manually interrupt the execution of your program. "
                "Check for infinite loops or blocking code.",
                "KeyboardInterrupt alert! Investigate if your program contains infinite loops or code that may "
                "prevent it from responding to interruptions.",
                "To handle KeyboardInterrupt, ensure your code is designed to gracefully handle interruptions and "
                "provide a way to exit cleanly."
            ],

            # Rule 30: ZeroDivisionError
            r'(.*)(ZeroDivisionError|division by zero)': [
                "Oops! It looks like you are trying to divide by zero. This operation is undefined.",
                "Be careful! Division by zero is not allowed in mathematics or programming.",
                "To avoid this error, make sure the denominator is not zero in your division operation."
            ],

            # Rule 31: TypeError (Mismatched Argument Types)
            r'(.*)(TypeError|type error)(.*)(argument)': [
                "It appears there's a TypeError related to mismatched argument types. Check that you're passing the "
                "correct data types to functions or operations.",
                "TypeError alert! Verify that the arguments you're passing to functions or operations match the "
                "expected data types.",
                "When dealing with a TypeError related to arguments, review the documentation for the function or "
                "operation to ensure proper usage."
            ],

            # Rule 32: SyntaxError (Unexpected Indentation)
            r'(.*)(SyntaxError|invalid syntax)(.*)(indentation)': [
                "Oops! It seems there is a syntax error related to unexpected indentation. Check for proper "
                "indentation and alignment of code blocks.",
                "SyntaxError alert! Ensure that your code follows the correct indentation rules, and look for errors "
                "at the line highlighted in the error message.",
                "When encountering a SyntaxError related to indentation, check for consistent use of spaces or tabs "
                "and adjust accordingly."
            ],

            # Rule 33: IndexError (List Index Out of Range)
            r'(.*)(IndexError|index error|index out of range)': [
                "Check if the index value you are using to access the element of the sequence is within the range of "
                "the sequence.",
                "Oops! It looks like you have encountered an IndexError. This happens when you are trying to access "
                "an index that doesn't exist in the sequence.",
                "When dealing with an IndexError, check the length of the list or array and make sure your index is "
                "within the valid range."
            ],

            # Rule 34: FileNotFoundError (Invalid File Path)
            r'(.*)(FileNotFoundError|file not found)(.*)(path)': [
                "It looks like you're dealing with a FileNotFoundError due to an invalid file path. Double-check the "
                "file path you provided and ensure it is correct.",
                "FileNotFoundError alert! Verify that the file path specified in your code is accurate and points to "
                "the location of the file.",
                "Encountering a FileNotFoundError related to the file path? Ensure that the file you're trying to "
                "access is in the specified location."
            ],

            # Rule 35: ModuleNotFoundError
            r'(.*)(ModuleNotFoundError|No module named)(.*)(module)': [
                "Looks like you are trying to import a module that Python can't locate. Double-check the module name "
                "for any typing mistakes and make sure it's installed in your Python environment.",
                "You've got a ModuleNotFoundError. Check that the module you're importing is installed and accessible "
                "in your Python environment.",
                "Encountering a ModuleNotFoundError? It could be because the module you're trying to import isn't "
                "installed."
            ],

            # Rule 36: KeyError (Accessing Nonexistent Dictionary Key)
            r'(.*)(KeyError|key error)(.*)(not found)': [
                "Oops! You've stumbled upon a KeyError. Make sure the key you're using to access a dictionary exists "
                "in the dictionary.",
                "KeyError warning! Confirm that the key you're trying to use is present in the dictionary.",
                "To avoid KeyError, double-check the keys in your dictionary and ensure they match your intended usage."
            ],

            # Rule 37: ValueError (Conversion or Parsing Error)
            r'(.*)(ValueError|value error)(.*)(conversion|parsing)': [
                "It appears there's a ValueError related to conversion or parsing. Check if the input values meet the "
                "expected criteria for the operation.",
                "ValueError warning! Ensure that the values you're working with are suitable for the specific "
                "conversion or parsing operation.",
                "When encountering a ValueError related to conversion or parsing, examine the input data and make "
                "adjustments to align with the expected format or range."
            ],

            # Rule 38: FileNotFoundError (Missing Required File)
            r'(.*)(FileNotFoundError|file not found)(.*)(required file)': [
                "It looks like you're dealing with a FileNotFoundError because a required file is missing. Check that "
                "the specified file is present in the expected location.",
                "FileNotFoundError alert! Verify that the required file, mentioned in your code, is available in the "
                "specified directory.",
                "Encountering a FileNotFoundError related to a required file? Ensure that the necessary file is "
                "present and accessible."
            ],

            # Rule 39: NameError (Undefined Variable in Expression)
            r'(.*)(NameError)|(name)(.*)(not defined)(.*)(expression)': [
                "Oh no! It appears like you are running into a NameError related to an undefined variable in your "
                "expression. Declare the variable before using it in your code.",
                "NameError warning! Check for typos or make sure you've declared the variable before using it in your "
                "expression.",
                "To fix a NameError in your expression, confirm that the variable or function name is spelled "
                "correctly and defined in the appropriate scope."
            ],

            # Rule 40: AssertionError (Failed Assertion)
            r'(.*)(AssertionError|assertion error)(.*)(failed)': [
                "Oh no! An AssertionError indicates that an assert statement failed. Review your assert conditions to "
                "identify and fix the issue.",
                "AssertionError alert! Double-check your assert statements and verify that the specified conditions "
                "hold true.",
                "When facing an AssertionError related to a failed assertion, carefully examine the conditions "
                "asserted in your code and adjust as needed."
            ],

            # Rule 41: RuntimeError (Unexpected Runtime Issue)
            r'(.*)(RuntimeError|run time error|runtime error)(.*)(unexpected)': [
                "It looks like there's a RuntimeError. This is a generic error that indicates an unexpected problem "
                "occurred during runtime.",
                "To resolve the RuntimeError, consider analyzing the specific conditions under which the error occurs "
                "and adjust your code accordingly."
            ],

            # Rule 42: ImportError (Missing Required Module)
            r'(.*)(ImportError|No module named)(.*)(required module)': [
                "Looks like you are trying to import a module that Python can't locate. Double-check the module name "
                "for any typing mistakes and make sure it's installed in your Python environment.",
                "You've got an ImportError. Check that the module you're importing is installed and accessible in "
                "your Python environment.",
                "Encountering an ImportError related to a required module? It could be because the module you're "
                "trying to import isn't installed."
            ],

            # Rule 43: KeyboardInterrupt (Interrupted Execution)
            r'(.*)(KeyboardInterrupt|keyboard interrupt)(.*)(execution)': [
                "A KeyboardInterrupt typically occurs when you manually interrupt the execution of your program. "
                "Check for infinite loops or blocking code.",
                "KeyboardInterrupt alert! Investigate if your program contains infinite loops or code that may "
                "prevent it from responding to interruptions.",
                "To handle KeyboardInterrupt, ensure your code is designed to gracefully handle interruptions and "
                "provide a way to exit cleanly."
            ],

            # Rule 44: MemoryError (Out of Memory)
            r'(.*)(MemoryError|memory error)(.*)(out of memory)': [
                "Uh-oh! A MemoryError indicates your program has run out of available memory. Consider optimizing "
                "your code or using more efficient data structures.",
                "MemoryError alert! Review your code for any memory-intensive operations and explore ways to reduce "
                "memory usage.",
                "To tackle MemoryError related to running out of memory, analyze the memory requirements of your "
                "program and implement strategies to minimize memory consumption."
            ],

            # Rule 45: NotImplementedError (Unimplemented Feature)
            r'(.*)(NotImplementedError|not implemented)': [
                "Oops! It looks like you've encountered a NotImplementedError. This often indicates that a feature or "
                "functionality is not yet implemented in your code.",
                "NotImplementedError alert! If you encounter this error, it means there's a part of the code that "
                "needs further development.",
                "To address a NotImplementedError, focus on implementing the missing functionality or consider using "
                "a placeholder until the feature is complete."
            ],

            # Rule 46: OverflowError (Numeric Overflow)
            r'(.*)(OverflowError|numeric overflow)': [
                "It appears you're dealing with an OverflowError. This occurs when a numeric operation exceeds the "
                "limits of the data type.",
                "OverflowError alert! Check if your numeric calculations are within the valid range for the data type "
                "being used.",
                "To avoid OverflowError, ensure that your numeric computations do not exceed the maximum or minimum "
                "values allowed for the data type."
            ],

            # Rule 47: FileNotFoundError (Invalid File Mode)
            r'(.*)(FileNotFoundError|file not found)(.*)(invalid file mode)': [
                "It looks like you're dealing with a FileNotFoundError due to an invalid file mode. Double-check the "
                "file mode specified when opening the file.",
                "FileNotFoundError alert! Verify that the file mode used in your code is valid and appropriate for "
                "the intended file operation.",
                "Encountering a FileNotFoundError related to an invalid file mode? Ensure that the file mode aligns "
                "with the operation you want to perform on the file."
            ],

            # Rule 48: OSError (Generic Operating System Error)
            r'(.*)(OSError|operating system error)': [
                "Oops! An OSError suggests there's a generic operating system-related error. Examine the specific "
                "details provided in the error message for more information.",
                "OSError alert! Review the error message details to understand the specific nature of the operating "
                "system-related issue.",
                "When encountering an OSError, check for factors such as file permissions, disk space, and other "
                "system-related constraints."
            ],

            # Rule 49: UnicodeError (Unicode Related Error)
            r'(.*)(UnicodeError|unicode error)': [
                "It seems you've encountered a UnicodeError. This occurs when there are issues with encoding or "
                "decoding Unicode characters.",
                "UnicodeError alert! Check if your code is handling Unicode characters correctly and using "
                "appropriate encoding/decoding methods.",
                "To resolve UnicodeError, ensure that your code properly handles Unicode characters, and consider "
                "using the correct encoding/decoding methods."
            ],

            # Rule 50: RecursionError (Maximum Recursion Depth Exceeded)
            r'(.*)(RecursionError|maximum recursion depth exceeded)': [
                "Oops! You've hit a RecursionError, which happens when the maximum recursion depth is exceeded in a "
                "recursive function. Check your recursive function for proper termination conditions.",
                "RecursionError alert! Review your recursive function to ensure it has proper termination conditions "
                "and doesn't exceed the maximum recursion depth.",
                "To address a RecursionError, optimize your recursive function and ensure it adheres to the maximum "
                "recursion depth allowed by the Python interpreter."
            ],

            # Rule for Memory Leak Detection
            r'(.*)(memory leak|leaking memory)(.*)': [
                "Memory leaks can be tricky. Are you freeing up memory after using it?",
                "Check if you're properly deallocating memory after use, especially in languages like C++."],

            # Rule for Concurrency Issues
            r'(.*)(deadlock|race condition|thread safety)(.*)': [
                "Concurrency issues like deadlocks and race conditions require careful handling of threads. Are your "
                "locks well managed?",
                "Make sure shared resources are properly synchronized to avoid race conditions."],

            # Rule for Database Query Optimization
            r'(.*)(slow query|database performance|database query)(.*)': [
                "Slow database queries can often be optimized. Have you checked your query's execution plan?",
                "Indexing might help improve your query performance."],

            # Rule for API Request Handling
            r'(.*)(API request|API error|HTTP request)(.*)': [
                "Check if your API endpoints are correctly defined and the server is responsive.",
                "Ensure your HTTP requests are properly formatted with the correct headers and parameters."],

            # Rule for Handling Null References
            r'(.*)(null reference|NullPointerException|nil object)(.*)': [
                "Null reference errors occur when trying to use an object that has not been instantiated. Make sure "
                "your objects are properly initialized.",
                "Consider using 'null' checks or optional chaining to prevent these errors."],

            # Rule for Regular Expression Debugging
            r'(.*)(regex error|regular expression problem|regex)(.*)': [
                "Regular expressions can be complex. Test your regex pattern in an online validator.",
                "Ensure your regex syntax is compatible with the language you're using."],

            # Rule for Cross-Platform Compatibility
            r'(.*)(cross-platform|different OS compatibility)(.*)': [
                "When coding for cross-platform compatibility, consider the different file paths and environment "
                "settings.",
                "Testing your application in different environments is key to ensuring compatibility."],

            # Rule for Dependency Management
            r'(.*)(dependency issue|library not found)(.*)': [
                "Make sure all your project dependencies are correctly installed and updated.",
                "Check if there are any version conflicts between your libraries."],

            # Rule for Code Refactoring Suggestions
            r'(.*)(refactor code|improve code structure)(.*)': [
                "Refactoring code can improve readability and efficiency. Consider breaking down large functions into "
                "smaller ones.",
                "Use design patterns where applicable to make your code more modular."],

            # Rule for Security Vulnerabilities
            r'(.*)(security vulnerability|injection attack|XSS|CSRF)(.*)': [
                "Always sanitize user inputs to prevent injection attacks.",
                "Be aware of common web vulnerabilities like XSS and CSRF. Validate and encode data appropriately."],

            # Rule for Mobile App Specific Issues
            r'(.*)(mobile app crash|Android issue|iOS problem)(.*)': [
                "Check the device logs for any specific error messages that can help diagnose the crash.",
                "Ensure compatibility with different OS versions and screen sizes."],

            # Other patterns...
            r'(.*)your favorite(.*)': ["I'm just a program, I can't have favorites!", "That's a secret.",
                                       "I'll never tell!"],
            r'(who are you|what are you)': ["I'm BATMAN!, kidding, i'm ducky a chatbot!",
                                            "I'm a chatbot, you can call me ducky."],
            r'(hello|hi|hey)': ['Hello!', 'Hello there!', 'Hey!'],
            r'what is your name': ["I'm just a chatbot, but you can call me Ducky.",
                                   "I'm nameless, but you can call me Ducky."],
            r'(I am|I\'m) (fine|good|great|alright)': ["Great. How can I help you today?"],
            r'(.*) (sorry|apologies|forgive me)': ["No need to apologize. It's okay.", "Don't worry about it."],
            r'(.*) (tell me more|expand|explain)': ["Sure, I'd love to hear more about that.", "Please, go on."],
            r'quit|exit': ["Goodbye!", "It was nice talking to you. Have a great day!"],
            r'why can\'t you (\w+)': ["I'm limited by my programming.",
                                      "I might not have been designed for that specific task."],
            r'(how do you work)': ["I process text based on predefined patterns and respond accordingly.",
                                   "I'm just a set of algorithms that recognize patterns and provide responses."],
            r'can you learn': [
                "I don't learn in the traditional sense, but I can process the information you provide to me.",
                "I'm based on predefined patterns and don't have the ability to learn or remember past interactions."],
            r'what time is it': [
                "I'm sorry, I don't have real-time capabilities. Please check the time on your device."],
            r'sing a song': ["Sing us a song, you're the piano man!", "Tell me why, Ain't nothing but a heartache!"],
            r'flip a coin': ["Heads", "Tails"],
            r'I( really|) (like|love) (\w+)': ["What do you like about {2}?", "Tell me more about {2}."],
            r'(what|why|who|where|can|when|how)(.*)?': ["I'm not sure I understand. Can you rephrase that?",
                                                        "Try asking a different question."],
            r'(.*)': ["Please, go on.", "Would you like to expand on that?", "Interesting. Tell me more.",
                      "Tell me more about that."],

        }

    def get_response(self, user_input):
        for pattern, responses in self.patterns_responses.items():
            match = re.match(pattern, user_input, re.IGNORECASE)
            if match:
                response = random.choice(responses)
                if random.random() < 0.5:
                    response += ' quack!'
                return response.format(*match.groups()), pattern

    def chat(self):
        print("Hello! I'm your friendly Rubber Duck AI. Quack! How can I help you debug today?")
        while True:
            user_input = input("You: ")
            if user_input.lower() in ['quit', 'exit', 'bye']:
                print("Rubber Duck AI: Goodbye! Keep quacking at those bugs!")
                break

            response, matched_pattern = self.get_response(user_input)
            print("Rubber Duck AI:", response)

            while matched_pattern and random.random() < 1:
                another_solution = input(
                    "Ducky: Are you satisfied with the response, or do you want another solution from the same rule? "
                    "(satisfied/another): ")
                if another_solution.lower() == 'another':
                    response = random.choice(self.patterns_responses[matched_pattern])
                    print("Ducky:", response.format(*re.match(matched_pattern, user_input, re.IGNORECASE).groups()))
                else:
                    break


if __name__ == "__main__":
    ducky = Simpleducky()
    ducky.chat()


def test_simpleducky():
    rubber_ducky = Simpleducky()

    # Programming debug related test inputs
    test_inputs = [
        "My program is not working",
        "I feel frustrated with this bug",
        "My program is giving an error",
        "I'm stuck in an infinite loop",
        "I'm having an indentation error",
        "My variable x is not defined",
        "Do you have any programming tips?",
        "My code is causing a division by zero error",
        "I'm getting a TypeError in my function",
        "I have a SyntaxError on line 10",
        "I got a NameError in my script",
        "I can't resolve this ImportError",
        "I'm facing a RuntimeError in my application",
        "There's an AttributeError in my object",
        "I'm getting a KeyError when accessing a dictionary",
        "I can't find my file, FileNotFoundError thrown",
        "My script is running out of memory, MemoryError",
        "I'm getting a ValueError in my calculation",
        "My assert statement failed, AssertionError",
        "My script stopped due to a KeyboardInterrupt",
        "I'm experiencing an OverflowError in my calculations",
        "My file access mode is wrong, FileNotFoundError",
        "I'm having an OSError while trying to access a file",
        "I'm facing a UnicodeError with string encoding",
        "I hit a RecursionError in my recursive function"
        "I'm facing a memory leak in my application",
        "My app has a deadlock issue",
        "My database query is too slow",
        "I'm having trouble with API requests",
        "I keep getting a null reference exception",
        "How do I debug a regex problem?",
        "I need help with cross-platform compatibility",
        "My project has a dependency issue",
        "How do I handle a security vulnerability in my code?",
        "My mobile app crashes on Android",
        "I'm struggling with a race condition"
    ]

    for input_str in test_inputs:
        response, _ = rubber_ducky.get_response(input_str)
        print(f"You: {input_str}\nRubber Duck AI: {response}\n")


if __name__ == "__main__":
    test_simpleducky()
