from fastapi import APIRouter, UploadFile, File
from services.parser import extract_text_from_pdf
from services.analyzer import analyze_resume
from services.domain_matcher import compute_domain_scores
from services.gap_analyzer import gap_analysis
from fastapi import Form
from services.ats_scorer import compute_jd_match, compute_ats_score

router = APIRouter(prefix="/upload", tags=["Upload"])

@router.post("/")
async def upload_resume(
    file: UploadFile = File(...),
    job_description: str = Form(...)
):
    content = await file.read()
    text = extract_text_from_pdf(content)

    analysis = analyze_resume(text)
    domain_scores = compute_domain_scores(text)
    jd_score = compute_jd_match(text, job_description)
    ats_score = compute_ats_score(analysis, domain_scores, jd_score)
    gap = gap_analysis(analysis, domain_scores)

    return {
        "filename": file.filename,
        "analysis": analysis,
        "domain_scores": domain_scores,
        "gap_analysis": gap,
        "jd_match": jd_score,
        "ats_score": ats_score
    }