import re

SKILLS_DB = [
    "python", "java", "c++", "react", "node.js", "mongodb",
    "machine learning", "data structures", "algorithms",
    "fastapi", "flask", "django", "sql", "javascript"
]

def extract_skills(text):
    text_lower = text.lower()
    found_skills = []

    for skill in SKILLS_DB:
        if skill in text_lower:
            found_skills.append(skill)

    return list(set(found_skills))


import re

import re

def extract_education(text):
    lines = text.split("\n")
    education = []

    for line in lines:
        line_clean = line.strip()

        # Triggers for common degree formats
        if any(keyword in line_clean.lower() for keyword in ["b.tech", "bachelor", "m.tech", "master", "secondary", "ssc", "hsc"]):
            
            # This regex looks for the degree name and captures everything following it on the same line
            match = re.search(
                r"(b\.tech|bachelor of technology|m\.tech|master|secondary|ssc|hsc)[^|\n]*",
                line_clean,
                re.IGNORECASE
            )

            if match:
                edu = match.group(0)
                # Clean up multiple spaces and trailing characters
                edu = re.sub(r"\s+", " ", edu).strip().rstrip(',-')
                education.append(edu)

    # Remove duplicates while preserving order
    return list(dict.fromkeys(education))


def extract_experience(text):
    # Split by common bullet points or newlines
    lines = re.split(r'\n|•|▪|●', text)
    experience = []

    # Common action verbs
    keywords = [
        "developed", "built", "designed", "implemented", "created", 
        "engineered", "optimized", "reduced", "led", "managed", 
        "worked", "collaborated", "architected"
    ]

    for line in lines:
        line_clean = line.strip()

        # Skip very short lines (like headers or dates)
        if len(line_clean) > 200:
            continue
            
        # Check if any keyword exists in the line
        if any(word in line_clean.lower() for word in keywords):
            # Clean up leading dashes or special chars if they survived the split
            line_clean = re.sub(r'^[^a-zA-Z0-9]+', '', line_clean)
            experience.append(line_clean)

    # Remove duplicates and return
    return list(dict.fromkeys(experience))[:5] # Increased limit to 10


def analyze_resume(text):
    return {
        "skills": extract_skills(text),
        "education": extract_education(text),
        "experience": extract_experience(text)
    }