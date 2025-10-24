import google.generativeai as genai
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import json

# Setup Gemini
genai.configure(api_key="AIzaSyARxrPd1k_9TyX69adFavILO1hg3qSsXds")

app = FastAPI(title="Lovable AI Recommender — Real-Time Gemini")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173", "http://localhost:8501"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Add routes to stop 404 errors
@app.get("/")
def root():
    return {"message": "Lovable AI Recommender API is running successfully!"}

@app.get("/favicon.ico")
async def favicon():
    return {}

class QuizInput(BaseModel):
    category: str
    skin_type: Optional[str] = None
    hair_type: Optional[str] = None
    country: Optional[str] = None
    age: Optional[int] = None

@app.post("/recommend")
def recommend(input: QuizInput):
    persona = input.dict()

    prompt = f"""
    Based on the following user persona, suggest 3 realistic products in the category '{persona['category']}':
    - Skin Type: {persona.get('skin_type', 'N/A')}
    - Hair Type: {persona.get('hair_type', 'N/A')}
    - Country: {persona.get('country', 'N/A')}
    - Age: {persona.get('age', 'N/A')}

    Return ONLY a valid JSON array of products. Do NOT wrap in markdown or explain anything.
    Fields: ProductName, Brand, Category, SkinType, HairType, Country, Price, BuyLink, Description.
    """

    try:
        # ✅ Correct Gemini API usage
        model = genai.GenerativeModel("gemini-2.5-flash")
        response = model.generate_content(prompt)
        raw_text = response.text.strip()

        try:
            data = json.loads(raw_text)
        except json.JSONDecodeError:
            data = [{"error": "Gemini returned non-JSON text", "raw_output": raw_text}]

        return {"recommendations": data}

    except Exception as e:
        return {"error": str(e)}
