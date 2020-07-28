import scrapy
import json

class BanksSpider(scrapy.Spider):
  name = "savings"

  file = open('banks.json')
  start_urls = json.load(file)
  file.close()

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

