from django.test import TestCase

# from django.http import HttpRequest
# from django.urls import resolve

# Create your tests here.

# snemoto frontend/からレンダリング

class TopPageTest(TestCase):
	def test_top_page_returns_200_and_expected_title(self):
		response = self.client.get("/")
		self.assertContains(response, "Pong", status_code=200)
	def test_top_page_uses_expected_template(self):
		response = self.client.get("/")
		self.assertTemplateUsed(response, "top.html")

class PageNotFoundTest(TestCase):
	def test_returns_404_and_expected_title(self):
		response = self.client.get("/nosuchpage/")
		self.assertContains(response, "Page Not Found", status_code=404)

	def test_uses_expected_template(self):
		response = self.client.get("/nosuchapage/")
		self.assertTemplateUsed(response, "404.html")

# snemoto for query_paramator
class getAchievementsTest(TestCase):
	def test_submit_participant_name(self):
		participant_name = "Shota Nemoto"
		response = self.client.get("/dashboard/", {'participant_name': participant_name})
		self.assertContains(response, "getAchievements", status_code=200)
		self.assertIn("Shota Nemoto", response.content.decode())

# class storeTournamentResultTest(TestCase):
# 	def test_returns_200_and_expected_title(self):
# 		response = self.client.get("/gamefinish/")
# 		self.assertContains(response, "storeTournamentResult", status_code=200)

# 	def test_uses_expected_template(self):
# 		response = self.client.get("/gamefinish/")
# 		self.assertTemplateUsed(response, "storeTournamentResult.html")

# snemoto for path_paramator
# from django.urls import reverse
# class getAchievementsTest(TestCase):
# 	def test_submit_participant_name(self):
# 		participant_name = "Shota Nemoto"
# 		url = reverse('dashboard', kwargs={'participant_name': participant_name})
# 		# method = get
# 		response = self.client.get(url)

# 		self.assertEqual(response.status_code, 200)
# 		self.assertContains(response, participant_name)
# 		self.assertTemplateUsed(response, "getAchievements.html")
# 		self.assertIn(participant_name, response.content.decode())

# snemoto backend/templatesからレンダリング
# class getClientAppTest(TestCase):
# 	def test_returns_200_and_expected_title(self):
# 		response = self.client.get("/")
# 		self.assertContains(response, "getClientApp", status_code=200)

# 	def test_uses_expected_template(self):
# 		response = self.client.get("/")
# 		self.assertTemplateUsed(response, "getClientApp.html")

# class getAchievementsTest(TestCase):
# 	def test_returns_200_and_expected_title(self):
# 		response = self.client.get("/dashboard/")
# 		self.assertContains(response, "getAchievements", status_code=200)

# 	def test_uses_expected_template(self):
# 		response = self.client.get("/dashboard/")
# 		self.assertTemplateUsed(response, "getAchievements.html")
