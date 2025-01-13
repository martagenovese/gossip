from flask import Flask, request, jsonify, send_from_directory
import os
import json

app = Flask(__name__, static_folder='public')
messages_file = 'messages.json'
APP_PATH = os.path.dirname(os.path.abspath(__file__))

@app.route('/')
def index():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/<path:path>')
def static_file(path):
    return send_from_directory(app.static_folder, path)

@app.route('/saveMessage', methods=['POST'])
def save_message():
    message = request.json
    if not os.path.exists(messages_file):
        with open(messages_file, 'w') as f:
            json.dump([message], f, indent=2)
    else:
        with open(messages_file, 'r') as f:
            messages = json.load(f)
        messages.append(message)
        with open(messages_file, 'w') as f:
            json.dump(messages, f, indent=2)
    return jsonify({'success': True})

@app.route('/loadMessages', methods=['GET'])
def load_messages():
    if not os.path.exists(messages_file):
        return jsonify({'messages': []})
    else:
        with open(messages_file, 'r') as f:
            messages = json.load(f)
        return jsonify({'messages': messages})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3000, debug=True)