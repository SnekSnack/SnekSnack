# ai_persona.py

# Example AI persona templates
persona_template1 = {
    "name": "John Doe",
    "age": "45",
    "gender": "Male",
    "occupation": "Software Engineer",
    "tone": "Calm and Reflective",
    "condition": [
        {
            "name": "Generalized Anxiety Disorder",
            "description": "Experiences excessive worry about various aspects of life, often feeling on edge.",
            "duration": "24",
            "impact": "Moderate impact on daily life, leading to difficulties in concentration and sleep."
        }
    ],
    "personality_traits": {
        "overall": "Analytical, Introverted, Detail-Oriented",
        "introverted_extroverted": "Introverted, prefers working alone or in small groups.",
        "optimistic_pessimistic": "Cautiously pessimistic.",
        "decision_making_style": "Careful, second-guesses choices.",
        "communication_style": "Direct, over-explains."
    },
    "background_history": {
        "early_life": "Grew up in a small town with academic pressure.",
        "key_life_events": ["Graduated in Computer Science", "Joined a leading tech company"],
        "current_life_situation": "Working remotely, balancing life and therapy."
    }
}

persona_template2 = {
    "name": "Jane Smith",
    "age": "60",
    "gender": "Female",
    "occupation": "Retired Nurse",
    "tone": "Warm and Compassionate",
    "condition": [
        {
            "name": "Depression",
            "description": "Persistent feelings of sadness and withdrawal from activities.",
            "duration": "36",
            "impact": "Significant, leading to withdrawal and daily routine difficulties."
        }
    ],
    "personality_traits": {
        "overall": "Empathetic, Caring",
        "introverted_extroverted": "Was extroverted, now finds socializing exhausting.",
        "optimistic_pessimistic": "Struggles with pessimism.",
        "decision_making_style": "Indecisive.",
        "communication_style": "Warm, but withdrawn during low moods."
    },
    "background_history": {
        "early_life": "Grew up in a large family, wanted to help others.",
        "key_life_events": ["Completed nursing school", "Worked for 35 years"],
        "current_life_situation": "Struggles with loneliness post-retirement."
    }
}

# Function to generate AI persona
def generate_persona(template_name):
    if template_name == 'John Doe':
        return persona_template1
    elif template_name == 'Jane Smith':
        return persona_template2
    else:
        return None

# Test generation
if __name__ == "__main__":
    persona = generate_persona("John Doe")
    print(f"Generated persona: {persona['name']}, a {persona['occupation']} aged {persona['age']}")
