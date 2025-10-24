import streamlit as st
import requests

BACKEND_URL = "http://127.0.0.1:8000/recommend"

st.set_page_config(page_title='Lovable AI — POC', layout='wide')

st.markdown("""
# Choose a Category
Select the type of products you'd like recommendations for.
""")

cols = st.columns(3)
categories = ["Health Supplements", "Skincare", "Haircare"]

with cols[0]:
    st.image("https://picsum.photos/80", width=80)
    if st.button("Health Supplements"):
        st.session_state['category'] = "Health Supplements"

with cols[1]:
    st.image("https://picsum.photos/80", width=80)
    if st.button("Skincare"):
        st.session_state['category'] = "Skincare"

with cols[2]:
    st.image("https://picsum.photos/80", width=80)
    if st.button("Haircare"):
        st.session_state['category'] = "Haircare"

if 'category' in st.session_state:
    st.header(f"{st.session_state['category']} Quiz")


    with st.form(key='quiz'):
        country = st.selectbox('Country', ['India', 'US', 'UK', 'All'])
        age = st.number_input('Age', min_value=10, max_value=100, value=30)
        if st.session_state['category'] == 'Skincare':
            skin_type = st.radio('Skin type', ['Dry', 'Oily', 'Combination', 'All'])
            hair_type = None
        elif st.session_state['category'] == 'Haircare':
            hair_type = st.radio('Hair type', ['Straight', 'Curly', 'Wavy', 'All'])
            skin_type = None
        else:
            skin_type = None
            hair_type = None

        submitted = st.form_submit_button('Get Recommendations')

    if submitted:
        payload = {
            'category': st.session_state['category'],
            'country': country,
            'age': int(age),
            'skin_type': skin_type,
            'hair_type': hair_type
        }
        try:
            resp = requests.post(BACKEND_URL, json=payload, timeout=5)
            data = resp.json()
            items = data.get('recommendations', [])
        except Exception as e:
            st.error(f"Failed to reach backend: {e}")
            items = []

        if items:
            for it in items:
                st.subheader(it.get('ProductName'))
                st.write(it.get('Description'))
                cols = st.columns([1,3])
                with cols[0]:
                    st.image(it.get('Image'), width=120)
                with cols[1]:
                    st.write(f"**Brand:** {it.get('Brand')}  
**Price:** {it.get('Price')}")
                    st.markdown(f"[Buy Now]({it.get('BuyLink')})")
        else:
            st.info('No recommendations found — try different quiz answers.')

