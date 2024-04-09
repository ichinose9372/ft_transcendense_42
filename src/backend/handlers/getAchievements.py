from django.shortcuts import render

# Create your views here.
# snemoto test for routing
def getAchievements(request):
	return render(request, "getAchievements.html")
