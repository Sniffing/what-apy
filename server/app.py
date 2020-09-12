from flask import Flask
from flask import jsonify
import json
from savingsAccounts import SavingsAccountDAO
from cache import Cache
from google.cloud import datastore

app = Flask(__name__)
db = datastore.Client().from_service_account_json('../what-apy.json')

kind = 'flat_apy'
name = 'savings_acc_name'
key = db.key(kind, name)
cache = Cache()

savings_accounts_api_key = 'savings_accounts'

@app.route('/metadata')
def metadata():
  banks = {
    "ally-bank": "Ally Bank" ,
    "cibc-usa": "CIBC",
    "vio-bank": "Vio Bank",
    "american-express-national-bank": "American Express",
    "capital-one-360": "Capital One 360",
    "hsbc-direct": "HSBC",
    "first-foundation-bank": "First Foundation bank"
  }
  metadata = {
    'banks': banks
  }
  return jsonify(metadata)

@app.route('/savings_accounts')
def savings_accounts():
  accs_by_bank = cache.get(savings_accounts_api_key)

  if accs_by_bank: print('cache hit')

  if not accs_by_bank:
    query = db.query(kind=kind)
    savings_accs = query.fetch()
    savingsDao = SavingsAccountDAO()
    accs_by_bank = savingsDao.groupByBank(savings_accs)
    cache.put(savings_accounts_api_key, accs_by_bank)

  return jsonify([acc.serialise() for banks, types in accs_by_bank.items() for t, acc in types.items()])

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
