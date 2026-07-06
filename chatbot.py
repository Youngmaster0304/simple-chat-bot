#!/usr/bin/env python3
"""
Project 1: Rule-Based AI Chatbot 🤖

This is a simple rule-based chatbot that responds to predefined user inputs
using control flow and decision-making logic (if-elif-else statements).
It runs in a continuous loop until an exit command is received.
"""

def get_bot_response(user_input):
    # Normalize user input by converting to lowercase, removing BOM, and stripping extra spaces
    cleaned_input = user_input.replace('\ufeff', '').strip().lower()

    # 1. Handle Exit Commands
    if cleaned_input in ["exit", "quit", "bye", "goodbye"]:
        return "Goodbye! Have a wonderful day! 👋", True

    # 2. Handle Greetings
    elif cleaned_input in ["hello", "hi", "hey", "hola", "greetings"]:
        return "Hello there! I am a simple rule-based AI chatbot. How can I help you today? 🤖", False

    # 3. Handle Identity / Name queries
    elif "your name" in cleaned_input or "who are you" in cleaned_input:
        return "I am RoboRule, a chatbot built using Python control flow! 💻", False

    # 4. Handle State / Condition queries
    elif "how are you" in cleaned_input or "how is it going" in cleaned_input:
        return "I'm doing great, thank you for asking! Just running loops and checking conditions. How about you?", False

    # 5. Handle capabilities / help requests
    elif cleaned_input in ["help", "what can you do", "features"]:
        return (
            "I can answer simple questions! Try asking me:\n"
            "  - My name ('Who are you?')\n"
            "  - How I am doing ('How are you?')\n"
            "  - Or send a greeting ('Hi') or exit ('bye')"
        ), False

    # 6. Fallback Response (if no rules are matched)
    else:
        return (
            "I'm sorry, I don't understand that. 😕\n"
            "Since I am a basic rule-based chatbot, I only respond to specific keywords.\n"
            "Type 'help' to see what I can do!"
        ), False

def main():
    print("=" * 60)
    print("🤖 Welcome to the Rule-Based AI Chatbot (RoboRule) 🤖")
    print("Type 'help' to see my commands, or 'exit'/'bye' to leave.")
    print("=" * 60)

    # Continuous loop
    while True:
        try:
            # Get user input
            user_msg = input("\nYou: ")
            
            # Skip empty inputs
            if not user_msg.strip():
                continue

            # Process input and get response + exit flag
            response, should_exit = get_bot_response(user_msg)
            
            # Print response
            print(f"Bot: {response}")

            # Exit the loop if exit condition met
            if should_exit:
                break

        except (KeyboardInterrupt, EOFError):
            print("\nBot: Goodbye! 👋")
            break

if __name__ == "__main__":
    main()
