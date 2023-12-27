import json


def transform_json(input_file, output_file):
    with open(input_file, 'r') as f:
        input_data = json.load(f)

    output_data = {}

    for key, values in input_data.items():
        cities = key.split(' - ')
        new_key = f"{cities[0]} - {cities[1]}"

        output_data[new_key] = {
            "color": "rgb(0,0,255)",
            "activatet": 1,
            "roads": [
                {
                    "rotation": 0,
                    "posx": value["posx"],
                    "posy": value["posy"],
                }
                for value in values
            ]
        }

    with open(output_file, 'w') as f:
        json.dump(output_data, f, indent=2)


transform_json('output.json', 'roads.json')
