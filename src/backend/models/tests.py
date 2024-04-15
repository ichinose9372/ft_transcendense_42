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

class storeTournamentResultTest(TestCase):
	def test_returns_200_and_expected_title(self):
		response = self.client.get("/gamefinish/")
		self.assertContains(response, "storeTournamentResult", status_code=200)

	def test_uses_expected_template(self):
		response = self.client.get("/gamefinish/")
		self.assertTemplateUsed(response, "storeTournamentResult.html")

# class getAchievementsTest(TestCase):
# 	def test_returns_200_and_expected_title(self):
# 		response = self.client.get("/dashboard/")
# 		self.assertContains(response, "getAchievements", status_code=200)

# 	def test_uses_expected_template(self):
# 		response = self.client.get("/dashboard/")
# 		self.assertTemplateUsed(response, "getAchievements.html")

class getAchievementsTest(TestCase):
	def test_submit_participant_name(self):
		participant_name = "Shota Nemoto"
		response = self.client.get("/dashboard/", {'participant_name': participant_name})
		self.assertContains(response, "getAchievements", status_code=200)
		self.assertIn("Received participant: Shota Nemoto", response.content.decode())
