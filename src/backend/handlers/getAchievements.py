# snemoto test for routing
from django.shortcuts import render
# def getAchievements(request):
# 	return render(request, "getAchievements.html")

def getAchievements(request):
	participant_name = request.GET.get('participant_name', '')
	return render(request, "getAchievements.html", {'participant_name': participant_name})

# def getAchievements(request, participant_name):
# 	return render(request, "getAchievements.html", {'participant_name': participant_name})
