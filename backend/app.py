from flask import Flask, request, jsonify, json
from pymongo import MongoClient
from bson import json_util
from bson.objectid import ObjectId


client = MongoClient(
    "mongodb+srv://amit:YA1dZkURFHFbrY2r@cluster0.3ahw9wr.mongodb.net/?retryWrites=true&w=majority")

database = client.elecnodes
collection = database.nodes
cursor = collection.find()

app = Flask(__name__)


@app.route("/get-data", methods=["GET"])
def getData():
    if request.method == "GET":
        data = []
        for doc in cursor:
            data.append(doc)

        data = json.loads(json_util.dumps(data))
        return jsonify({"result": data}), 200

# @app.route("/add-node", methods=["PUT"])
# def addNode():
#   if request.method == "PUT":


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


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5001, debug=True)
