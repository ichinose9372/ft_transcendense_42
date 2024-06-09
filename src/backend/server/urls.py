from sys import prefix
from django.contrib import admin
from django.urls import path, include

from handlers.getClientApp import top, start, game
from handlers.getAchievements import getAchievements
from handlers.storeTournamentResult import storeTournamentResult, save_test
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
	path('dashboard/', getAchievements, name="dashboard"),
	# for path_paramator
	# path('dashboard/<str:participant_name>/', getAchievements, name="dashboard"),
	# path('', getClientApp, name=""),
	path('test_example/', test_example, name='test_example'),
	path('game/save_test/', save_test, name='save_test'),
	path('game/', game, name='game'),
)

handler404 = 'models.errors.custom_404'
