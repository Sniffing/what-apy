import scrapy
import json
import logging

class BanksSpider(scrapy.Spider):
  name = "savings"

  file = open('banks.json')
  start_urls = json.load(file)
  file.close()

  def __init__(self):
    logging.getLogger('scrapy').setLevel(logging.ERROR)
    logging.getLogger('scrapy.utils').setLevel(logging.INFO)
    logging.getLogger('scrapy.extensions.telnet').setLevel(logging.CRITICAL)
    logging.getLogger('scrapy.middleware').setLevel(logging.ERROR)

  def parse(self, response):
    bankName = response.url.split("/")[-1].split('.')[-2]

    savingsAccounts = response.xpath('//table[@id="savingsTable"]//tr[@id]')

    for account in savingsAccounts:
      columns = account.xpath('.//td/text()')
      accInfo = {
        'accName': columns[3].get(),
        'bank': bankName,
        'apy': columns[0].get()
      }
      yield accInfo


