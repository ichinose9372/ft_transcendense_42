from django.urls import path

from handlers import views

# 第１引数：HTTPリクエストのパス
# 第２引数：ビュー関数
# nameキーワード引数：URLの逆引きに利用

# urlpatterns = [
# 	path('start/', views.game_start, name="game_start"),
# 	path('finish/', views.game_finish, name="game_finish"),
# ]
