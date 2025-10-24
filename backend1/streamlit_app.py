# This file previously contained Streamlit frontend code.
# Streamlit frontend has been removed. Please use the new React frontend for UI.
BACKEND_URL = "http://127.0.0.1:8000/recommend"

st.set_page_config(page_title='Lovable AI — POC', layout='wide')

# Title
st.markdown("""
# 🧬 Lovable AI: Persona-Based Product Recommender
Select the type of products you'd like personalized recommendations for.
""")

# Category selection
cols = st.columns(3)
categories = ["Health Supplements", "Skincare", "Haircare"]

# Handle category selection
for i, cat in enumerate(categories):
    with cols[i]:
        st.image("https://picsum.photos/80", width=80)
        if st.button(cat):
            st.session_state['category'] = cat

# If category is selected, show quiz
if 'category' in st.session_state:
    st.header(f"📝 {st.session_state['category']} Quiz")

    with st.form(key='quiz'):
        country = st.selectbox('Country', ['India', 'US', 'UK', 'All'])
        age = st.number_input('Age', min_value=10, max_value=100, value=30)

        # Conditional inputs
        skin_type = hair_type = None
        if st.session_state['category'] == 'Skincare':
            skin_type = st.radio('Skin Type', ['Dry', 'Oily', 'Combination', 'All'])
        elif st.session_state['category'] == 'Haircare':
            hair_type = st.radio('Hair Type', ['Straight', 'Curly', 'Wavy', 'All'])

        submitted = st.form_submit_button('Get Recommendations')

    # Submit quiz data
    if submitted:
        payload = {
            'category': st.session_state['category'],
            'country': country,
            'age': int(age),
            'skin_type': skin_type,
            'hair_type': hair_type
        }

        try:
            response = requests.post(BACKEND_URL, json=payload, timeout=30)
            data = response.json()

            # Fix: recommendations might be a stringified JSON array
            raw_items = data.get('recommendations', [])
            if isinstance(raw_items, str):
                try:
                    items = json.loads(raw_items)
                except json.JSONDecodeError as e:
                    st.error(f"Failed to parse recommendations: {e}")
                    items = []
            else:
                items = raw_items

            if not items and 'error' in data:
                st.error(f"Gemini Error: {data['error']}")

        except Exception as e:
            st.error(f"Failed to reach backend: {e}")
            items = []

        # Display recommendations
        if items:
            st.success(f"🎉 Found {len(items)} recommendations!")
            for item in items:
                if not isinstance(item, dict):
                    st.warning(f"Skipping malformed item: {item}")
                    continue

                st.subheader(item.get('ProductName', 'No name'))
                st.write(item.get('Description', 'No description'))

                prod_cols = st.columns([1, 3])
                
                with prod_cols[1]:
                    st.write(f"**Brand:** {item.get('Brand', '')}")
                    st.write(f"**Price:** {item.get('Price', 'N/A')}")
                    if item.get('BuyLink'):
                        st.markdown(f"[🛒 Buy Now]({item.get('BuyLink')})", unsafe_allow_html=True)
        else:
            st.info("No recommendations found — try different quiz answers.")
