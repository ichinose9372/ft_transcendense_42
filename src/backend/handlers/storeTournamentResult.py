from django.shortcuts import render

# Create your views here.
# snemoto test for routing
def storeTournamentResult(request):
	return render(request, "storeTournamentResult.html")

# from django.dispatch import receiver
# from django.db.models.signals import post_save
# from handlers.models import TournamentResult

# @receiver(post_save, sender=TournamentResult)
# def handle_tournament_result(tournament, matches, scores):
