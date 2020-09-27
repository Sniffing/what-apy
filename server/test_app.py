import unittest
import pytest
from flask import Flask
from app import app as flask_app

class AppTest(unittest.TestCase):
  def test_metadata_api_limit(self):
    app = flask_app.test_client(self)
    for _ in range(10):
      response = app.get('/metadata', follow_redirects=True)
    self.assertEqual(response.status_code, 200)

    response = app.get('/metadata', follow_redirects=True)
    self.assertEqual(response.status_code, 429)

if __name__ == "__main__":
  unittest.main()