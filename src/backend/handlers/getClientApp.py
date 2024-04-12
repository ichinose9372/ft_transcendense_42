# snemoto test for routing
from django.shortcuts import render
def getClientApp(request):
	return render(request, "getClientApp.html")

# snemoto frontendからレンダリング
# def top(request):
# 	return render(request, "home.html")
