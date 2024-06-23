# snemoto test for routing
from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt
import json
from django.http import JsonResponse
from models.models import Tournament, Match, Score
import json
from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt
from handlers.storeTournamentResultToBlockchain import add_scores

@csrf_exempt
@require_http_methods(["POST"])
def storeTournamentResult(request):
    try:
        data = json.loads(request.body)

        # Extract tournament data
        tournament_data = data['tournament']
        tournament_name = tournament_data['name']
        tournament_id = tournament_data['tournamentId']

        # Create or update the tournament
        tournament, created = Tournament.objects.update_or_create(
            tournament_id=tournament_id,
            defaults={'tournament_name': tournament_name}
        )

        # Extract and store matches data
        matches_data = data['matches']
        # Sort matches: parents first, then children
        matches_data.sort(key=lambda x: x['parentMatchId'] is not None)

        def sort_matches(matches):
            def get_depth(match, match_dict):
                depth = 0
                while match['parentMatchId']:
                    match = match_dict[match['parentMatchId']]
                    depth += 1
                return depth

            match_dict = {match['matchId']: match for match in matches}
            matches.sort(key=lambda match: get_depth(match, match_dict))

        sort_matches(matches_data)
        for match_data in matches_data:
            match_id = match_data['matchId']
            finished_timestamp = match_data['finishedTimestamp']
            parent_match_id = match_data['parentMatchId']
            parent_match = None

            if parent_match_id:
                parent_match = Match.objects.get(match_id=parent_match_id)

            Match.objects.update_or_create(
                match_id=match_id,
                defaults={
                    'finished_time_stamp': finished_timestamp,
                    'parent_match': parent_match,
                    'tournament': tournament
                }
            )

        # Extract and store scores data
        scores_data = data['scores']
        for score_data in scores_data:
            match_id = score_data['matchId']
            score_value = score_data['score']
            participant_name = score_data['participantName']

            match = Match.objects.get(match_id=match_id)

            Score.objects.update_or_create(
                match=match,
                participant_name=participant_name,
                defaults={'score': score_value}
            )

        scores_data_tuples = list(map(lambda x: [x['matchId'], x['participantName'], x['score']], scores_data))
        add_scores(scores_data_tuples)

        return JsonResponse({'status': 'success', 'message': 'Tournament results stored successfully'})

    except Exception as e:
        return JsonResponse({'status': 'error', 'message': str(e)})
