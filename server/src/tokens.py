import requests
import json
from dotenv import dotenv_values

config = dotenv_values(".env")

api_key = config.get("CMC_API_KEY")
url = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest'
params = {
    'start': '1',
    'limit': '110',
}
headers = {
    'Accepts': 'application/json',
    'X-CMC_PRO_API_KEY': api_key,
}

file_path = './tokens.json'

response = requests.get(url, headers=headers, params=params)
data = response.json()

tokens = [token["symbol"] for token in data['data'] if not "stablecoin" in token["tags"]]

with open(file_path, "w") as file:
    json.dump(tokens, file)
