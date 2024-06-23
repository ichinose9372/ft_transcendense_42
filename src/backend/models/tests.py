from django.test import TestCase

from django.http import HttpRequest
from django.urls import resolve
from models.models import Tournament, Match, Score
# from django.urls import resolve

# Create your tests here.
# snemoto frontend/からレンダリング

class TopPageTest(TestCase):
	def test_top_page_returns_200_and_expected_title(self):
		response = self.client.get("/en/")
		self.assertContains(response, "Pong", status_code=200)
	def test_top_page_uses_expected_template(self):
		response = self.client.get("/en/")
		self.assertTemplateUsed(response, "templates/top.html")

class PageNotFoundTest(TestCase):
	def test_returns_404_and_expected_title(self):
		response = self.client.get("/nosuchpage/")
		self.assertContains(response, "Page Not Found", status_code=404)

	def test_uses_expected_template(self):
		response = self.client.get("/nosuchapage/")
		self.assertTemplateUsed(response, "templates/404.html")

# snemoto for query_paramator
class getAchievementsTest(TestCase):
	def test_submit_participant_name(self):
		participant_name = "Shota Nemoto"
		response = self.client.get("/en/dashboard/", {'participant_name': participant_name})
		self.assertContains(response, "getAchievements", status_code=200)

	# def test_uses_expected_template(self):
	# 	response = self.client.get("/dashboard/")
	# 	self.assertTemplateUsed(response, "getAchievements.html")
