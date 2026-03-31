from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity

model = None

def get_model():
    global model
    if model is None:
        model = SentenceTransformer('all-MiniLM-L6-v2')
    return model


ROLE_PROFILES = {
    "Frontend Developer": 
        "React JavaScript UI UX HTML CSS frontend web development responsive design",
    
    "Backend Developer": 
        "Node.js Python APIs databases server backend microservices REST API system design",
    
    "Machine Learning Engineer": 
        "machine learning deep learning NLP data science AI models neural networks",
    
    "DevOps Engineer": 
        "docker kubernetes aws ci cd pipelines cloud infrastructure terraform monitoring linux",
    
    "Data Analyst": 
        "sql excel python data analysis pandas numpy visualization power bi tableau statistics"
}


def compute_domain_scores(resume_text):
    try:
        model = get_model()

        resume_embedding = model.encode([resume_text])

        scores = {}

        for role, description in ROLE_PROFILES.items():
            role_embedding = model.encode([description])

            similarity = cosine_similarity(resume_embedding, role_embedding)[0][0]

            # ✅ FIX: convert numpy.float32 → Python float
            score = float(similarity) * 100

            # clamp
            score = max(0, min(score, 100))

            scores[role] = round(score, 2)
            
        scores = dict(sorted(scores.items(), key=lambda x: x[1], reverse=True))
        return scores

    except Exception as e:
        print("ERROR:", str(e))
        return {
            "Frontend Developer": 0.0,
            "Backend Developer": 0.0,
            "Machine Learning Engineer": 0.0,
            "DevOps Engineer": 0.0,
            "Data Analyst": 0.0
        }