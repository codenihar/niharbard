from flask import Flask, request, jsonify
from flask_cors import CORS
from bardapi import Bard

token = 'Wgi8HT6PzwSpHQ9VUDNqgnL669sFPAKgxM4Y-pik0zuXjWJIQ8BGcwPZPKfEsITLZ6BDWw.'
bard = Bard(token=token)

app = Flask(__name__)
CORS(app)

@app.route("/members", methods=['POST'])
def members():
    data = request.get_json()
    #question = data['question']
    question = "Who is Dodagatta Nihar?"
    response = bard.get_answer(question)['content']
    return jsonify({'response': response})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)
