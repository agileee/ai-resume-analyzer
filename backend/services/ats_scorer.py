from services.domain_matcher import get_model
from sklearn.metrics.pairwise import cosine_similarity


def compute_jd_match(resume_text, job_description):
    model = get_model()

    resume_emb = model.encode([resume_text])
    jd_emb = model.encode([job_description])

    similarity = cosine_similarity(resume_emb, jd_emb)[0][0]

    return round(float(similarity) * 100, 2)


def compute_ats_score(analysis, domain_scores, jd_score):
    # Domain weight
    best_domain_score = max(domain_scores.values())

    # Skill coverage
    skill_score = min(len(analysis.get("skills", [])) * 5, 100)

    # Experience score
    exp_score = min(len(analysis.get("experience", [])) * 20, 100)

    # Final weighted score
    base_score = (
        0.6 * best_domain_score +
        0.6 * skill_score +
        0.4 * exp_score
    )

    if jd_score is None:
        return round(base_score, 2)

    return round((base_score + jd_score) / 2, 2)