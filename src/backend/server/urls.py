from django.contrib import admin
from django.urls import path

from handlers.getClientApp import getClientApp, top, start
from handlers.getAchievements import getAchievements
from handlers.storeTournamentResult import storeTournamentResult
from models.views import test_example

# 第１引数：HTTPリクエストのパス
# 第２引数：ビュー関数
# nameキーワード引数：URLの逆引きに利用

urlpatterns = [
    path('admin/', admin.site.urls),
	path('', top, name="top"),
	path('start/', start, name="start"),
	path('gamefinish/', storeTournamentResult, name="storeTournamentResult"),
	path('dashboard/', getAchievements, name="getAchievements"),
	path('test_example/', test_example, name='test_example'),
]
