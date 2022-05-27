from crypt import methods
from sqlite3 import Cursor
from typing import Collection
from flask import Flask, request, jsonify, json
from pymongo import MongoClient
from bson import json_util


client = MongoClient(
    "mongodb+srv://amit:YA1dZkURFHFbrY2r@cluster0.3ahw9wr.mongodb.net/?retryWrites=true&w=majority")

database = client.elecnodes
collection = database.nodes
cursor = collection.find()

app = Flask(__name__)


@app.route("/", methods=["GET"])
def home():
    if request.method == "GET":
        return "<h1>HI</h1>"


@app.route("/get-data", methods=["GET"])
def getData():
    if request.method == "GET":
        data = []
        for doc in cursor:
            data.append(doc)

        data = json.loads(json_util.dumps(data))
        return jsonify({"result": data}), 200


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5001, debug=True)
