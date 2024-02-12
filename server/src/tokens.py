import requests
import json

api_key = 'apiKey'
url = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest'
headers = {
    'Accepts': 'application/json',
    'X-CMC_PRO_API_KEY': api_key,
}

file_path = './tokens.json'

response = requests.get(url, headers=headers)
data = response.json()

tokens = [token["symbol"] for token in data['data']]

with open(file_path, "w") as file:
    json.dump(tokens, file)