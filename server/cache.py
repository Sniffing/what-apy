from datetime import date, datetime

class Cache:
  def __init__(self):
    self.cacheLastRefresh = datetime.now()
    self.cache = {}

  def cacheOutOfDate(self, now=datetime.now()) -> bool:
    diff = now - self.cacheLastRefresh
    return diff.days >= 1

  def put(self, key, value, now=datetime.now()):
    if self.cacheOutOfDate(now):
      self.cache = {}

    self.cache[key] = value

  def get(self, key, now=datetime.now()):
    if self.cacheOutOfDate(now):
      self.cache = {}

    return None if key not in self.cache \
      else self.cache[key]