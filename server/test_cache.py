import unittest
from datetime import datetime, timedelta
from cache import Cache

class CacheTest(unittest.TestCase):

  def test_getFromEmptyCache(self):
    cache = Cache()
    self.assertEqual(cache.get('some key'), None)

  def test_getFromCache(self):
    cache = Cache()
    cache.put('key','value')

    self.assertEqual(cache.get('key'), 'value')

  def test_replaceCacheEntry(self):
    cache = Cache()
    cache.put('key','value')
    cache.put('key','value2')

    self.assertEqual(cache.get('key'), 'value2')

  def test_cacheRefreshOverOneDay(self):
    cache = Cache()
    cache.put('k','v')
    self.assertEqual(cache.get('k'), 'v')

    fakedate = datetime.now() + timedelta(days=2)
    self.assertEqual(cache.get('k', fakedate), None)

  def test_cacheDoesNotRefreshUnderOneDay(self):
    cache = Cache()
    cache.put('k','v')
    self.assertEqual(cache.get('k'), 'v')

    fakedate = datetime.now() + timedelta(hours=23)
    self.assertEqual(cache.get('k', fakedate), 'v')

if __name__ == '__main__':
  unittest.main()