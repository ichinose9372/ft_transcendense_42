from django.contrib import admin
from django.urls import path

from handlers.getClientApp import top, start
from handlers.getAchievements import getAchievements
from handlers.storeTournamentResult import storeTournamentResult
from models.views import test_example
from django.conf.urls import handler404

# 第１引数：HTTPリクエストのパス
# 第２引数：ビュー関数
# nameキーワード引数：URLの逆引きに利用

urlpatterns = [
    path('admin/', admin.site.urls),
	path('', top, name="top"),
	path('start/', start, name="start"),
	path('gamefinish/', storeTournamentResult, name="gamefinish"),
	# for query_paramator
	path('dashboard/', getAchievements, name="dashboard"),
	# for path_paramator
	# path('dashboard/<str:participant_name>/', getAchievements, name="dashboard"),
	# path('', getClientApp, name=""),
	path('test_example/', test_example, name='test_example'),
]

handler404 = 'models.errors.custom_404'
