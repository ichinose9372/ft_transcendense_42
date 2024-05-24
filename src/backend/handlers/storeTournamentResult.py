# snemoto test for routing
from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt
import json

def storeTournamentResult(request):
	return HttpResponse("storeTournamentResult!!!")

# from django.dispatch import receiver
# from django.db.models.signals import post_save
# from handlers.models import TournamentResult

# @receiver(post_save, sender=TournamentResult)
# def handle_tournament_result(tournament, matches, scores):

@csrf_exempt # TODO: 本番環境では無効化しないほうがいいかも
@require_http_methods(["POST"])
def save_test(request):
    data = json.loads(request.body)

	# TODO : データの処理を行う
    print("Received data:", data)

    # TODO : 必要があればレスポンスを作成する，現在はデータが受け取れたことを確認するためにそのままデータを返している
    response_data = {
        'status': 'success',
        'message': 'Data received successfully',
        'data': data,
    }

    # JSONレスポンスを返す
    return JsonResponse(response_data)
