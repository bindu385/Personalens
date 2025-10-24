def segment_user(user_input: dict, df):
    category = user_input.get("category")
    skin_type = user_input.get("skin_type")
    hair_type = user_input.get("hair_type")
    country = user_input.get("country")

    # Filter by category
    filtered = df[df["Category"] == category]

    # Optional filters
    if skin_type and skin_type != "All" and "SkinType" in filtered.columns:
        filtered = filtered[filtered["SkinType"].str.contains(skin_type, case=False, na=False)]

    if hair_type and hair_type != "All" and "HairType" in filtered.columns:
        filtered = filtered[filtered["HairType"].str.contains(hair_type, case=False, na=False)]

    if country and country != "All":
        filtered = filtered[filtered["Country"].str.contains(country, case=False, na=False)]

    if filtered.empty:
        return []

    # Return top 3 random products
    return filtered.sample(n=min(3, len(filtered))).to_dict(orient="records")
