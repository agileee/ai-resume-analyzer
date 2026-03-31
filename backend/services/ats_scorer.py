from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity


def compute_jd_match(resume_text, job_description):
    vectorizer = TfidfVectorizer()

    vectors = vectorizer.fit_transform([resume_text, job_description])
    similarity = cosine_similarity(vectors[0:1], vectors[1:2])[0][0]

    return round(min(float(similarity) * 300, 100), 2)


def compute_ats_score(analysis, domain_scores, jd_score):
    # Domain weight
    best_domain_score = max(domain_scores.values())

    # Skill coverage
    skill_score = min(len(analysis.get("skills", [])) * 5, 100)

    # Experience score
    exp_score = min(len(analysis.get("experience", [])) * 20, 100)

    # Final weighted score
    base_score = (
        0.8 * best_domain_score +
        0.8 * skill_score +
        0.8 * exp_score
    )

    if jd_score is None:
        return round(base_score, 2)

    return round((base_score + jd_score) / 2, 2)