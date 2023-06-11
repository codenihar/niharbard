from flask import Flask,request,jsonify
from flask_cors import CORS
from bardapi import Bard

app = Flask(__name__)
CORS(app)

token = 'Token goes here'
bard = Bard(token=token)

@app.route('/members',methods=['POST','GET'])
def members():
    if request.method=='POST':
        data = request.get_json()
        answer = bard.get_answer(data['question'])['content']
        data={"result":answer}
        return(jsonify(data))
    return {"members":["member1","member2"]}

@app.route('/home')
def home():
    return jsonify({"home":"home"})

if __name__ == '__main__':
    app.run(debug=True,port=8080)
