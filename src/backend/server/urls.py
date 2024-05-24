from django.contrib import admin
from django.urls import path

from handlers.getClientApp import top, start
from handlers.getAchievements import getAchievements
from handlers.storeTournamentResult import storeTournamentResult, save_test
from models.views import test_example
from django.conf.urls import handler404

# 第１引数：HTTPリクエストのパス
# 第２引数：ビュー関数
# nameキーワード引数：URLの逆引きに利用

urlpatterns = [
    path('admin/', admin.site.urls),
	path('', top, name="top"),
	path('start/', start, name="start"),
	# path('getClientApp/', getClientApp, name="getClientApp"),
	path('submitTournament/', storeTournamentResult, name="submitTournament"),
	path('getAchievements/', getAchievements, name="getAchievements"),
	# for path_paramator
	# path('dashboard/<str:participant_name>/', getAchievements, name="dashboard"),
	# path('', getClientApp, name=""),
	path('test_example/', test_example, name='test_example'),
	path('game/save_test/', save_test, name='save_test'),
]

handler404 = 'models.errors.custom_404'
