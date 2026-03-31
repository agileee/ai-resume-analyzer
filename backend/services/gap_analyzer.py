ROLE_SKILLS = {
    "Frontend Developer": [
        "react", "javascript", "html", "css", "redux",
        "typescript", "next.js", "tailwind", "web performance"
    ],
    "Backend Developer": [
        "node.js", "python", "databases", "sql", "mongodb",
        "api", "system design", "docker", "redis"
    ],
    "Machine Learning Engineer": [
        "python", "machine learning", "deep learning", "tensorflow",
        "pytorch", "nlp", "data science", "pandas", "numpy"
    ]
}


COURSE_SUGGESTIONS = {
    "docker": "Docker for Beginners - KodeKloud",
    "system design": "System Design Primer (GitHub)",
    "redis": "Redis Crash Course - YouTube",
    "next.js": "Next.js Full Course - freeCodeCamp",
    "typescript": "TypeScript Complete Guide - Udemy",
    "tensorflow": "Deep Learning Specialization - Coursera",
    "pytorch": "PyTorch for Beginners - Udemy"
}


def find_missing_skills(user_skills, best_role):
    role_skills = ROLE_SKILLS.get(best_role, [])
    
    user_skills_lower = [s.lower() for s in user_skills]

    missing = []

    for skill in role_skills:
        if skill not in user_skills_lower:
            missing.append(skill)

    return missing


def suggest_resources(missing_skills):
    suggestions = {}

    for skill in missing_skills:
        if skill in COURSE_SUGGESTIONS:
            suggestions[skill] = COURSE_SUGGESTIONS[skill]

    return suggestions


def gap_analysis(analysis, domain_scores):
    # Find best role
    best_role = max(domain_scores, key=domain_scores.get)

    user_skills = analysis.get("skills", [])

    missing_skills = find_missing_skills(user_skills, best_role)
    suggestions = suggest_resources(missing_skills)

    return {
        "best_role": best_role,
        "missing_skills": missing_skills[:5],  # limit
        "recommendations": suggestions
    }