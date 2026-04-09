from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity


def compute_jd_match(resume_text, job_description):
    resume_text = resume_text.lower()
    job_description = job_description.lower()

    # important tech keywords (expand as needed)
    tech_keywords = [
        "python", "java", "c++", "javascript", "react", "node", "html", "css",
        "sql", "mongodb", "aws", "docker", "kubernetes", "api", "backend",
        "frontend", "machine learning", "data", "flask", "django"
    ]

    # keyword overlap score
    jd_words = set(job_description.split())
    resume_words = set(resume_text.split())

    keyword_matches = sum(1 for word in tech_keywords if word in resume_words and word in jd_words)
    keyword_score = keyword_matches / max(len(tech_keywords), 1)

    # cosine similarity (still useful)
    from sklearn.feature_extraction.text import TfidfVectorizer
    from sklearn.metrics.pairwise import cosine_similarity

    vectorizer = TfidfVectorizer(stop_words='english', ngram_range=(1,2))
    vectors = vectorizer.fit_transform([resume_text, job_description])
    cosine_sim = cosine_similarity(vectors[0:1], vectors[1:2])[0][0]

    # combine (KEY FIX 🔥)
    final_score = (0.6 * keyword_score + 0.4 * cosine_sim) * 100

    return round(min(final_score, 100), 2)


def compute_ats_score(analysis, domain_scores, jd_score):
    best_domain_score = max(domain_scores.values())

    skill_score = min(len(analysis.get("skills", [])) * 5, 100)
    exp_score = min(len(analysis.get("experience", [])) * 20, 100)

    # Normalize weights (sum = 1)
    base_score = (
        0.4 * best_domain_score +
        0.3 * skill_score +
        0.3 * exp_score
    )

    if jd_score is None:
        return round(base_score, 2)

    final_score = (0.7 * base_score + 0.3 * jd_score)

    return round(min(final_score, 100), 2)