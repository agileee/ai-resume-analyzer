from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity


def compute_jd_match(resume_text, job_description):
    vectorizer = TfidfVectorizer(stop_words='english')
    vectors = vectorizer.fit_transform([resume_text, job_description])

    cosine_sim = cosine_similarity(vectors[0:1], vectors[1:2])[0][0]

    resume_words = set(resume_text.lower().split())
    jd_words = set(job_description.lower().split())

    overlap = len(resume_words & jd_words) / max(len(jd_words), 1)

    final_score = (0.7 * cosine_sim + 0.3 * overlap) * 100

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