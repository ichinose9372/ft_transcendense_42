from django.http import HttpResponse
from models.models import Tournament, Match, Score
from django.http import HttpRequest
from datetime import date

def test_example(request):
    Tournament_instance = Tournament.objects.create(tournament_name="yichinos_tournament")
    Tournament_instance.save()
    return HttpResponse("Tournament created successfully")
