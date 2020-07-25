import scrapy

class BanksSpider(scrapy.Spider):
  name = "savings"
  start_urls = [
    'https://www.depositaccounts.com/banks/ally-bank.html',
    'https://www.depositaccounts.com/banks/cibc-usa.html',
    'https://www.depositaccounts.com/banks/vio-bank.html',
  ]

  def parse(self, response):
    bankName = response.url.split("/")[-1].split('.')[-2]
    filename = 'bank-%s.html' % bankName

    savingsAccounts = response.xpath('//table[@id="savingsTable"]//tr[@id]')

    with open(filename, 'wb') as f:
      f.write(str.encode(''))

    with open(filename, 'ab') as f:
      for account in savingsAccounts:
        columns = account.xpath('.//td/text()')
        accInfo = {
          'accType': columns[3].get(),
          'apy': columns[0].get()
        }
        f.write(str.encode('{}\n'.format(accInfo)))

    self.log('Saved file %s' % filename)