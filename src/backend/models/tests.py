from django.test import TestCase

from django.http import HttpRequest
from django.urls import resolve

# Create your tests here.

# snemoto frontendからレンダリング
# class TopPageTest(TestCase):
# 	def test_top_page_returns_200_and_expected_title(self):
# 		response = self.client.get("/")
# 		self.assertContains(response, "Pong", status_code=200)

# 	def test_top_page_uses_expected_template(self):
# 		response = self.client.get("/")
# 		self.assertTemplateUsed(response, "home.html")

class getClientAppTest(TestCase):
	def test_returns_200_and_expected_title(self):
		response = self.client.get("/")
		self.assertContains(response, "getClientApp", status_code=200)

	def test_uses_expected_template(self):
		response = self.client.get("/")
		self.assertTemplateUsed(response, "getClientApp.html")

class getAchievementsTest(TestCase):
	def test_returns_200_and_expected_title(self):
		response = self.client.get("/gamefinish/")
		self.assertContains(response, "getAchievements", status_code=200)

	def test_uses_expected_template(self):
		response = self.client.get("/gamefinish/")
		self.assertTemplateUsed(response, "getAchievements.html")

class storeTournamentResultTest(TestCase):
	def test_returns_200_and_expected_title(self):
		response = self.client.get("/dashboard/")
		self.assertContains(response, "storeTournamentResult", status_code=200)

	def test_uses_expected_template(self):
		response = self.client.get("/dashboard/")
		self.assertTemplateUsed(response, "storeTournamentResult.html")
