from pdfminer.high_level import extract_text
import io

def extract_text_from_pdf(file_bytes):
    with io.BytesIO(file_bytes) as pdf_file:
        text = extract_text(pdf_file)
    return text