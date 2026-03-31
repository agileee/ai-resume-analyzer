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
    roles = list(ROLE_PROFILES.keys())
    descriptions = list(ROLE_PROFILES.values())

    corpus = [resume_text] + descriptions

    vectorizer = TfidfVectorizer(stop_words='english', ngram_range=(1,2))
    vectors = vectorizer.fit_transform(corpus)

    resume_vec = vectors[0]
    role_vecs = vectors[1:]

    similarities = cosine_similarity(resume_vec, role_vecs)[0]

    max_sim = max(similarities) if max(similarities) > 0 else 1

    scores = {
        role: round((sim / max_sim) * 100, 2)
        for role, sim in zip(roles, similarities)
    }

    return dict(sorted(scores.items(), key=lambda x: x[1], reverse=True))