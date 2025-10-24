import pandas as pd
import json

def load_products():
    with open("products.json", "r") as f:
        data = json.load(f)
    df = pd.DataFrame(data)
    return df
