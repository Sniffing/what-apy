from flask import Flask
from flask import jsonify
import json
from google.cloud import datastore

app = Flask(__name__)
db = datastore.Client().from_service_account_json('../what-apy.json')

kind = 'flat_apy'
name = 'savings_acc_name'
key = db.key(kind, name)

class SavingsAcc():
  def __init__(self, acc):
    self.bank = acc['bank']
    self.name = acc['name']
    self.latest_date = acc['timestamp']
    self.latest_apy = float(acc['apy'][:-1])
    self.total_apy = float(acc['apy'][:-1])
    self.entries = 1

  def serialise(self):
    non_none_fields = {k:v for k,v in self.__dict__.items() if v is not None}
    return non_none_fields

class SavingsAccountDAO():
  def groupByBank(self, savings_accs):
    groups = {}

    for acc in savings_accs:
      bank = acc['bank']
      name = acc['name']

      if bank not in groups.keys():
        groups[bank] = dict()
        groups[bank][name] = SavingsAcc(acc)
      else:
        if name in groups[bank]:
          currAcc = groups[bank][name]
          percent = float(acc['apy'][:-1])
          currAcc.total_apy += percent
          currAcc.entries += 1

          if acc['timestamp'] > currAcc.latest_date:
            currAcc.latest_date = acc['timestamp']
            currAcc.latest_apy = float(acc['apy'][:-1])
        else:
          groups[bank][name] = SavingsAcc(acc)

    return jsonify([acc.serialise() for banks, types in groups.items() for t, acc in types.items()])

@app.route('/savings_accounts')
def savings_accounts():
  query = db.query(kind=kind)
  savings_accs = query.fetch()
  savingsDao = SavingsAccountDAO()
  accs_by_bank = savingsDao.groupByBank(savings_accs)

  return accs_by_bank

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
