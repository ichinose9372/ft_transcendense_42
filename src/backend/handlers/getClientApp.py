from django.shortcuts import render

# # snemoto test for routing
# def getClientApp(request):
# 	return render(request, "getClientApp.html")

# snemoto frontendからレンダリング
def top(request):
	return render(request, "templates/top.html")

def start(request):
	return render(request, "templates/start.html")

def game(request):
	return render(request, "templates/game.html")
