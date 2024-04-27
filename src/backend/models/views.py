from django.http import HttpResponse
from django.template import RequestContext
from django.views.defaults import page_not_found

from models.models import Tournament, Match, Score
from datetime import date

def test_example(request):
    Tournament_instance = Tournament.objects.create(tournament_name="yichinos_tournament")
    Tournament_instance.save()
    return HttpResponse("Tournament created successfully")

def custom_404(request, exception):
    response = page_not_found(request, exception, template_name="404.html")
    response.status_code = 404
    return response
