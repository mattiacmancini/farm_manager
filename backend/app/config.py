import json
import os

def load_config(key):
    with open('config.json') as config_file:
        config_data = json.load(config_file)
    return replace_placeholders(config_data)[key]

def replace_placeholders(value):
    if isinstance(value, str):
        return os.path.expandvars(value)
    elif isinstance(value, dict):
        return {k: replace_placeholders(v) for k, v in value.items()}
    elif isinstance(value, list):
        return [replace_placeholders(v) for v in value]
    else:
        return value