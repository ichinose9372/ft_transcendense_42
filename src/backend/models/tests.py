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

class getAchievementsTest(TestCase):
	def test_returns_200_and_expected_title(self):
		response = self.client.get("/dashboard/")
		self.assertContains(response, "getAchievements", status_code=200)

	def test_uses_expected_template(self):
		response = self.client.get("/dashboard/")
		self.assertTemplateUsed(response, "getAchievements.html")

class TournamentCreationTest(TestCase):
    def test_tournament_creation(self):
        # トーナメントを作成
        tournament_instance = Tournament.objects.create(tournament_name="yichinos_tournament")
        tournament_instance.save()
        
        # トーナメントが正しく保存されたか確認
        self.assertIsNotNone(tournament_instance.pk)  # primary keyがNoneでないことを確認
        self.assertEqual(tournament_instance.tournament_name, "yichinos_tournament")

        # データベースに保存されているか確認
        exists = Tournament.objects.filter(tournament_name="yichinos_tournament").exists()
        self.assertTrue(exists)