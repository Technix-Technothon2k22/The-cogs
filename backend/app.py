from crypt import methods
from flask import Flask, request, jsonify

app = Flask(__name__)

dummy_data = [
    {"location": {"lat": 45.2131, "long": 46.4234},
        "status": "online", "volt": 220, "phase": 3},
    {"location": {"lat": 45.2131, "long": 46.4234},
        "status": "online", "volt": 220, "phase": 3},
    {"location": {"lat": 45.2131, "long": 46.4234},
        "status": "online", "volt": 220, "phase": 3}
]


@app.route("/", methods=["GET"])
def home():
    if request.method == "GET":
        return "<h1>HI</h1>"


@app.route("/get-data", methods=["GET"])
def getData():
    if request.method == "GET":
        return jsonify({"result": dummy_data}), 200


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5001, debug=True)
