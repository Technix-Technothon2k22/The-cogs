from crypt import methods
from flask import Flask, request, jsonify, json
from pymongo import MongoClient
from bson import json_util
from bson.objectid import ObjectId
from flask_cors import CORS


client = MongoClient(
    "mongodb+srv://amit:YA1dZkURFHFbrY2r@cluster0.3ahw9wr.mongodb.net/?retryWrites=true&w=majority")

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
        return jsonify("Repair on"), 200


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001, debug=True)
