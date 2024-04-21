# snemoto test for routing
from django.shortcuts import render

def getAchievements(request):
    participant_name = request.GET.get('participant_name', '')
    data = {
        'participant_name': participant_name
	}
    return render(request, "dashboard.html", {'data': data})
