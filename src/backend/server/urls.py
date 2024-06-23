from sys import prefix
from django.contrib import admin
from django.urls import path, include

from handlers.getClientApp import top, start, game, end_tournament_view
from handlers.getAchievements import dashboard, getAchievements
from handlers.storeTournamentResult import storeTournamentResult
from models.views import test_example
from django.conf.urls import handler404
from django.conf.urls.i18n import i18n_patterns

# 第１引数：HTTPリクエストのパス
# 第２引数：ビュー関数
# nameキーワード引数：URLの逆引きに利用

urlpatterns = [
    path('i18n/', include('django.conf.urls.i18n')),
]

urlpatterns += i18n_patterns(
	path('admin/', admin.site.urls),
	path('', top, name="top"),
	path('start/', start, name="start"),
	path('gamefinish/', storeTournamentResult, name="gamefinish"),
	# for query_paramator
	path('dashboard/', dashboard, name="dashboard"),
	path('getAchievements/', getAchievements, name='getAchievements'),
	# for path_paramator
	# path('dashboard/<str:participant_name>/', getAchievements, name="dashboard"),
	# path('', getClientApp, name=""),
	path('test_example/', test_example, name='test_example'),
	path('game/', game, name='game'),
	path('game/end/', end_tournament_view, name='end_tournament'),
)

handler404 = 'models.errors.custom_404'
