from django.shortcuts import render

from django.http import HttpResponse

# Create your views here.

# snemoto frontendからレンダリング
# def top(request):
# 	return render(request, "home.html")

def getClientApp(request):
	return render(request, "getClientApp.html")
