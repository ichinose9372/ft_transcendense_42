# # snemoto test for routing
# # from django.shortcuts import render
# # def storeTournamentResult(request):
# # 	return render(request, "storeTournamentResult.html")

# from django.dispatch import receiver
# from django.db.models.signals import post_save
# from models.models import Tournament, Match, Score
# import json

# def store_tournament_result(tournament, matches, scores):
# 	new_tournament = Tournament(tournament_name = tournament.name, tournament_id= tournament.id)
# 	new_tournament.save()
# 	new_matches = [Match(match_id=match.id, finished_time_stamp=match.finished_time_stamp, parent_match=match.parent_match, tournament=new_tournament.tournament_id) for match in matches]
# 	Match.objects.bulk_create(new_matches)
# 	new_scores = [Score(match=score.id, score=score.score, participang_name=score.player, match_id=score.match_id) for score in scores]
# 	Score.objects.bulk_create(new_scores)

# def parse_tournaments(tournament_json):
# 	tournament = json.loads(tournament_json)
# 	matches = tournament['matches']
# 	scores = tournament['scores']
# 	return tournament, matches, scores
