from django.test import TestCase

from django.http import HttpRequest
from django.urls import resolve
from handlers.views import top, game_start, game_finish

# Create your tests here.

# snemoto frontendからレンダリング
# class TopPageTest(TestCase):
# 	def test_top_page_returns_200_and_expected_title(self):
# 		response = self.client.get("/")
# 		self.assertContains(response, "Pong", status_code=200)

# 	def test_top_page_uses_expected_template(self):
# 		response = self.client.get("/")
# 		self.assertTemplateUsed(response, "home.html")

class TopPageTest(TestCase):
	def test_top_page_returns_200_and_expected_title(self):
		response = self.client.get("/")
		self.assertContains(response, "Transcendence Test", status_code=200)

	def test_top_page_uses_expected_template(self):
		response = self.client.get("/")
		self.assertTemplateUsed(response, "top.html")

class GameStartTest(TestCase):
	def test_should_resolve_game_start(self):
		found = resolve("/game/start/")
		self.assertEqual(game_start, found.func)

class GameFinishTest(TestCase):
	def test_should_resolve_game_finish(self):
		found = resolve("/game/finish/")
		self.assertEqual(game_finish, found.func)
