import requests
import json

api_url = 'http://localhost:3001/food/getClasification'
food_name = 'Banana'

response = requests.get(f'{api_url}?food_name={food_name}')
data_list = response.json()

# Check if the list is not empty
if data_list and len(data_list) > 0:
    # Access the first element of the list
    data = data_list[0]

    print("Raw JSON Response:")
    print(data)

    if 'name' in data and 'type' in data and 'information' in data and len(data['information']) > 1:
        # Parse the "information" field as a JSON array
        information_array = json.loads(data['information'])
        
        result = {
            'name': data['name'],
            'type': data['type'],
            'information': information_array[1] if len(information_array) > 1 else None
        }
        print("Filtered Result:")
        print(result)
    else:
        print('Data tidak lengkap atau tidak ditemukan.')
else:
    print('Data tidak lengkap atau tidak ditemukan.')
