from flask import Flask
from flask import jsonify
from google.cloud import datastore

app = Flask(__name__)
db = datastore.Client().from_service_account_json('../what-apy.json')

kind = 'flat_apy'
name = 'savings_acc_name'
key = db.key(kind, name)

@app.route('/savings_accounts')
def savings_accounts():
  query = db.query(kind=kind)
  result = query.fetch()
  print('api call', list(result))

  return jsonify([
    {
      'apy': 1.05,
      'name': "test",
    },
    {
      'apy': 1.18,
      'name': "test2",
    }
  ])

def createEntry():
  entry = datastore.Entity(key=key)
  entry['apy'] = 1.05
  entry['name'] = 'test'

  db.put(entry)

def readSavings():
  entries = db.query(kind=kind).fetch()
  for entry in entries:
      print('{} has apy: {}'.format(entry['name'], entry['apy']))


if __name__ == "__main__":
  app.run()
