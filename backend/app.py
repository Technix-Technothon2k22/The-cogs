from crypt import methods
from flask import Flask, request, jsonify, json
from pymongo import MongoClient
from bson import json_util
from bson.objectid import ObjectId
from flask_cors import CORS
from decouple import config
from twilio.rest import Client

account_sid = config('TWILIO_ACCOUNT_SID')
auth_token = config('TWILIO_AUTH_TOKEN')

smsClient = Client(account_sid, auth_token)

uri = "mongodb+srv://{}:{}@cluster0.3ahw9wr.mongodb.net/?retryWrites=true&w=majority".format(
    config("DB_USERNAME"), config("DB_PASSWORD"))

client = MongoClient(uri)

database = client.elecnodes
collection = database.nodes


app = Flask(__name__)
CORS(app)


@app.route("/get-data", methods=["GET"])
def getData():
    if request.method == "GET":
        cursor = collection.find()
        data = []
        for doc in cursor:
            data.append(doc)

        data = json.loads(json_util.dumps(data))
        return jsonify({"result": data}), 200


@app.route("/add-node", methods=["POST"])
def addNode():
    if request.method == "POST":
        data = request.get_json()

        data["location"]["lat"] = float(data["location"]["lat"])
        data["location"]["long"] = float(data["location"]["long"])

        data["status"] = "online"
        data["volt"] = 220
        data["phase"] = 3
        data["numbers"] = ["8329270368"]
        collection.insert_one(data)

        return jsonify("Added"), 200


@app.route("/del-node/<id>", methods=["DELETE"])
def delNode(id):
    if request.method == "DELETE":
        try:
            if collection.find_one({"_id": ObjectId(id)}) is not None:
                collection.delete_one({"_id": ObjectId(id)})
            else:
                raise Exception("No object")
        except(Exception):
            return jsonify("Error"), 503

        return jsonify("Deleted"), 200


@app.route("/change-status/<id>", methods=["PUT"])
def changeStatus(id):
    if request.method == "PUT":
        collection.find_one_and_update(
            {"_id": ObjectId(id)}, {"$set": {"status": "repair"}}, upsert=True)
        node = collection.find_one({"_id": ObjectId(id)})
        nums = node["numbers"]

        for num in nums:
            message = smsClient.messages.create(
                body='Your electricity node is under repair, you may face loss of electricity. We are sorry for the inconvenience.',
                from_='+19784812080',
                to='+91{}'.format(str(num))
            )
        return jsonify("Repair on"), 200


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001, debug=True)
