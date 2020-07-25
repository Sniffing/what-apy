from flask import Flask
from flask import jsonify

app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Which APY?'

@app.route('/savings_accounts')
def savings_accounts():
    return jsonify([
      {
        'apy': 1.05,
        'name': "test",
      },
      {
        'apy': 1.15,
        'name': "test2",
      }
    ])