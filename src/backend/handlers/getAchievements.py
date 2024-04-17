# snemoto test for routing
from django.shortcuts import render
def getAchievements(request):
	return render(request, "getAchievements.html")
