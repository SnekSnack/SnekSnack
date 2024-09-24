# conversation.py

import torch
from transformers import pipeline

# Load the model (TinyLlama in this case)
pipe = pipeline("text-generation", model="TinyLlama/TinyLlama-1.1B-Chat-v1.0", torch_dtype=torch.bfloat16, device_map="cpu")

session_data = {}

# Load AI persona from `ai_persona.py`
from ai_persona import generate_persona

# Initialize a conversation session
def start_session(persona_name):
    persona = generate_persona(persona_name)
    if persona:
        session_data[persona_name] = {"persona": persona, "messages": []}
        return f"Session started with {persona['name']} ({persona['tone']} tone)"
    return "Invalid persona name."

def add_message(persona_name, role, message):
    if persona_name in session_data:
        session_data[persona_name]['messages'].append({"role": role, "content": message})
        
        # Prepare the persona for the AI's response
        persona = session_data[persona_name]['persona']
        system_message = {
            "role": "system",
            "content": f"You are {persona['name']}, {persona['tone']} with the following condition: {persona['condition'][0]['name']}.",
        }

        messages = [system_message] + session_data[persona_name]['messages']
        prompt = pipe.tokenizer.apply_chat_template(messages, tokenize=False, add_generation_prompt=True)

        # Running model
        outputs = pipe(prompt, max_new_tokens=256, do_sample=True, temperature=0.7, top_k=50, top_p=0.95)
        ai_response = outputs[0]["generated_text"]
        
        session_data[persona_name]['messages'].append({"role": "AI", "content": ai_response})

        return ai_response
    return "Session not found."

def display_conversation(persona_name):
    if persona_name in session_data:
        conversation = session_data[persona_name]['messages']
        for msg in conversation:
            print(f"{msg['role']}: {msg['content']}")
    else:
        print("No session found.")

# End the session and clear memory
def end_session(persona_name):
    if persona_name in session_data:
        del session_data[persona_name]
        return f"Session with {persona_name} ended."
    return "No session found."

# Example usage
if __name__ == "__main__":
    print(start_session("John Doe"))
    
    print("\nUser: How are you feeling today?")
    response = add_message("John Doe", "user", "How are you feeling today?")
    print(f"AI: {response}")
    
    print("\nConversation so far:")
    display_conversation("John Doe")
    
    print(end_session("John Doe"))
