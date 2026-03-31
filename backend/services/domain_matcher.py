from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

ROLE_PROFILES = {
    "Frontend Developer": "react javascript html css frontend ui ux",
    "Backend Developer": "node python api database backend server",
    "Machine Learning Engineer": "machine learning ai data science deep learning",
    "DevOps Engineer": "docker kubernetes aws ci cd cloud infrastructure",
    "Data Analyst": "sql excel python pandas data analysis visualization"
}


def compute_domain_scores(resume_text):
    scores = {}

    for role, desc in ROLE_PROFILES.items():
        vectorizer = TfidfVectorizer()

        vectors = vectorizer.fit_transform([resume_text, desc])
        similarity = cosine_similarity(vectors[0:1], vectors[1:2])[0][0]

        scores[role] = round(float(similarity) * 100, 2)

    # sort
    scores = dict(sorted(scores.items(), key=lambda x: x[1], reverse=True))

    return scores