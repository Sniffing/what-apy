# Define your item pipelines here
from itemadapter import ItemAdapter
from google.cloud import datastore
from datetime import date
import time
import hashlib

class SrcPipeline:
    def process_item(self, item, spider):
        return item

# class AccountInfo:
#   def __init__(self, accName, apy):
#     self.accName = accName,
#     self.apy = apy,

class DatabasePipeline:
    def open_spider(self, spider):
        self.db = datastore.Client().from_service_account_json('../what-apy.json')
        self.kind = 'flat_apy'

    def process_item(self, item, spider):
        if not item['apy']:
            print('Missing apy')
            return

        if not item['accName']:
            print('Missing apy')
            return


        self.save(item)

    def save(self, item):
        print('saving item', item)

        id_date = date.today().strftime("%Y-%m-%d")

        utc = int(time.time()) #UTC time of entry
        name = '{}-{}'.format(id_date, hash(hash(item['bank']) + hash(item['accName'])))
        key = self.db.key(self.kind, name)

        entry = datastore.Entity(key=key)
        entry['apy'] = item['apy']
        entry['bank'] = item['bank']
        entry['name'] = item['accName']
        entry['timestamp'] = utc

        self.db.put(entry)