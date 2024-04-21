from django.contrib import admin
from django.urls import path

from handlers.getClientApp import getClientApp
from handlers.getAchievements import getAchievements
from handlers.storeTournamentResult import storeTournamentResult

# 第１引数：HTTPリクエストのパス
# 第２引数：ビュー関数
# nameキーワード引数：URLの逆引きに利用

urlpatterns = [
    path('admin/', admin.site.urls),
	path('', getClientApp, name=""),
	path('gamefinish/', storeTournamentResult, name="gamefinish"),
	# for query_paramator
	path('dashboard/', getAchievements, name="dashboard"),
	# for path_paramator
	# path('dashboard/<str:participant_name>/', getAchievements, name="dashboard"),
]
