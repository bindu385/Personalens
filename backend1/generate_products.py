import json
from google import genai

# Initialize Gemini client
genai.configure(api_key="AIzaSyCnNdwXt9rMuoizZF5EbI7igyP-IEQj6zY")

model = genai.GenerativeModel("gemini-1.5-flash")

categories = ["Skincare", "Haircare", "Health Supplements"]
all_products = []

for category in categories:
    prompt = f"""
    Generate 10 realistic products for the category '{category}'.
    Each product should have the following fields: 
    ProductName, Brand, Category, SkinType, HairType, Country, Price, BuyLink, Image, Description.
    Respond strictly in JSON array format.
    """

    response = model.generate_content(prompt)

    try:
        products = json.loads(response.text)
        all_products.extend(products)
        print(f"[✓] Fetched products for {category}")
    except json.JSONDecodeError:
        print(f"[✗] Failed to decode JSON for category: {category}")
        print(response.text)

# Save to file
with open("products.json", "w") as f:
    json.dump(all_products, f, indent=2)

print("✅ Product generation complete.")
