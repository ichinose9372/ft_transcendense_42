#!/bin/bash

# Elasticsearchのヘルスチェックが成功するまで待機
while ! curl -sSf "http://localhost:9200/" >/dev/null; do
  echo "Waiting for Elasticsearch to be up..."
  sleep 5
done

# ILMポリシーの作成
curl -X PUT "http://localhost:9200/_ilm/policy/logstash-policy" -H 'Content-Type: application/json' -d'
{
  "policy": {
    "phases": {
      "hot": {
        "actions": {
          "rollover": {
            "max_age": "30d",
            "max_size": "50gb"
          }
        }
      },
      "delete": {
        "min_age": "90d",
        "actions": {
          "delete": {}
        }
      }
    }
  }
}
'

# 初期インデックスの作成
curl -X PUT "http://localhost:9200/logstash-000001" -H 'Content-Type: application/json' -d'
{
  "aliases": {
    "logstash-alias": {
      "is_write_index": true
    }
  }
}
'
