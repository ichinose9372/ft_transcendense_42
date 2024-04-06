from django.shortcuts import render

from django.http import HttpResponse

# Create your views here.
def top(request):
	return HttpResponse(b"Hello Transcendence")