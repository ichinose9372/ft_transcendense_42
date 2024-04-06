from django.test import TestCase

from django.http import HttpRequest
from django.urls import resolve
from game.views import top, game_start, game_finish

# Create your tests here.
class TopPageViewTest(TestCase):
	def test_top_returns_200(self):
		response = self.client.get("/")
		self.assertEqual(response.status_code, 200)
	
	def test_top_returns_expected_content(self):
		response = self.client.get("/")
		self.assertEqual(response.content, b"Hello Transcendence")

class GameStartTest(TestCase):
	def test_should_resolve_game_start(self):
		found = resolve("/game/start/")
		self.assertEqual(game_start, found.func)

class GameFinishTest(TestCase):
	def test_should_resolve_game_finish(self):
		found = resolve("/game/finish/")
		self.assertEqual(game_finish, found.func)
