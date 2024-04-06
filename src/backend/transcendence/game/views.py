from django.shortcuts import render

from django.http import HttpResponse

# Create your views here.
def top(request):
	return HttpResponse(b"Hello Transcendence")

def game_start(request):
	return HttpResponse('トーナメント参加者の登録画面を表示')

def game_finish(request):
	return HttpResponse('トーナメントの結果情報が渡され、モデル層の処理、終了画面を返す')