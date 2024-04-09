from django.shortcuts import render

# Create your views here.
# snemoto test for routing
def getClientApp(request):
	return render(request, "getClientApp.html")

# snemoto frontendからレンダリング
# def top(request):
# 	return render(request, "home.html")
