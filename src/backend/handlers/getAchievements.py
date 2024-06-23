# snemoto test for routing
from django.shortcuts import render
from models.models import Score
from django.http import JsonResponse

# def getAchievements(request):
# 	return render(request, "getAchievements.html")

# snemoto for path_paramator
# def getAchievements(request, participant_name):
# 	return render(request, "getAchievements.html", {'participant_name': participant_name})

def dashboard(request):
    return render(request, "templates/dashboard.html")

def getAchievements(request):
    participant_name = request.GET.get('participant_name', '')
    achievements = Score.objects.filter(participant_name=participant_name)
    achievements_list = [{'score': achievement.score, 'match_id': achievement.match_id} for achievement in achievements]
    data = {
        'participant_name': participant_name,
        'achievements': achievements_list,
    }
    return JsonResponse(data)