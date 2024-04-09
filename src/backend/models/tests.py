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

class TopPageTest(TestCase):
	def test_top_page_returns_200_and_expected_title(self):
		response = self.client.get("/")
		self.assertContains(response, "getClientApp", status_code=200)

	def test_top_page_uses_expected_template(self):
		response = self.client.get("/")
		self.assertTemplateUsed(response, "getClientApp.html")
