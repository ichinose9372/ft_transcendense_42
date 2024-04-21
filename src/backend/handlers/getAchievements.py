# snemoto test for routing
from django.shortcuts import render

def getAchievements(request):
    participant_name = request.GET.get('participant_name', '')
    # TODO : 名前を元にDBからデータを取得してdataに格納，現状は名前だけを格納
    data = {
        'participant_name': participant_name
	}
    return render(request, "dashboard.html", {'data': data})
