class Cache:
  def __init__(self):
    self.cache = {}

  def put(self, key, value):
    self.cache[key] = value

  def get(self, key):
    return None if key not in self.cache \
      else self.cache[key]