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

  def accumulate(self, acc):
    percent = float(acc['apy'][:-1])
    self.total_apy += percent
    self.entries += 1

    if acc['timestamp'] > self.latest_date:
      self.latest_date = acc['timestamp']
      self.latest_apy = float(acc['apy'][:-1])

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
          groups[bank][name].accumulate(acc)
        else:
          groups[bank][name] = SavingsAcc(acc)

    return groups