from flask import Flask, request, jsonify
from flask_cors import CORS
from bardapi import Bard
from pymongo import MongoClient

app = Flask(__name__)
CORS(app)

token = 'Token goes here'
bard = Bard(token=token)

@app.route('/members', methods=['POST', 'GET'])
def members():
    if request.method == 'POST':
        data = request.get_json()
        question = data['question']  # Extract the question string

        # Check if the question is present in the database
        client = MongoClient('mongodb://localhost:27017/')
        db = client['shopDB']
        collection = db['bard']
        document = collection.find_one({'question': question})
        print(document)

        # If the question is present in the database, return the answer
        if document:
            answer = document['answer']
            return jsonify({'result': answer})

        # Otherwise, use bard.get_answer() to get the answer
        else:
            answer = bard.get_answer(question)['content']

            # Write the question and answer to the database
            document = {'question': question, 'answer': answer}
            collection.insert_one(document)

            return jsonify({'result': answer})


if __name__ == '__main__':
    app.run(debug=True, port=8080)
