import scrapy

class BanksSpider(scrapy.Spider):
  name = "banks"
  start_urls = [
    'https://www.depositaccounts.com/banks/ally-bank.html',
    'https://www.depositaccounts.com/banks/cibc-usa.html'
  ]

  def parse(self, response):
    bankName = response.url.split("/")[-1].split('.')[-2]
    filename = 'bank-%s.html' % bankName

    tables = response.css('table').css('.tmpRateTable')
    print('{}'.format(len(tables)))

    with open(filename, 'ab') as f:
      for table in tables:
        print(str(table.get()))
        f.write(str.encode('{}\n'.format(table.get())))

    self.log('Saved file %s' % filename)