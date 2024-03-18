開発環境の構築
校舎または自分のパソコンでpython3とDjangoの使用ができることを確認する。

### 開発イメージ
ローカルの環境で一通り開発した後にコンテナ化してデプロイするようなイメージで開発する。

### 手順
マイクロサービスとして設計する際の考え方として以下のようになる。

'''
python3 -m django startproject GameMain

'''
'''
python3 -m django startproject Result

'''
'''
python3 -m django startproject Login_register

'''

機能ごとにパッケージを作成する。
dockerfile及びdocker-composeで専用のdbを立ち上げ
setting.py にDBコンテナの情報を紐づける。

これを行なっていくことで、機能ごとにひとつのdbが設定されてマイクロサービスとして機能する。



次に書くパッケージにpythonサーバーのdockerfileがあることが確認できたら、backendのルートにあるdocker-compose.yamlにserviceとdbの設定を記述していく。

’’’
services:
  gamemain_db:
    image: postgres:13
    environment: 
      POSTGRES_DB: gamemaindb
      POSTGRES_USER: gamemainuser
      POSTGRES_PASSWORD: gamemainpass

  gamemain:
      build: ./GameMain
      command: python manage.py runserver 0.0.0.0:8000
      volumes:
        - .:/code
      ports:
        - "8000:8000"
      depends_on:
        - gamemain_db
’’’

次にパッケージの中あるsetting.pyを書き換える。
例　/GameMain/GameMain/setting.py

'''
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'gamemaindb',
        'USER': 'gamemainuser',
        'PASSWORD': 'gamemainpass',
        'HOST': 'gamemain_db',
        'PORT': '5432',
    }
}
'''

