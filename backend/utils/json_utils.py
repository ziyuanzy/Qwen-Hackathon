import json


def parse_json_response(response: str):
    response = response.strip()

    if response.startswith("```"):
        lines = response.splitlines()

        if lines[0].startswith("```"):
            lines = lines[1:]

        if lines and lines[-1].startswith("```"):
            lines = lines[:-1]

        response = "\n".join(lines)

    return json.loads(response)