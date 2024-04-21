// buttonやinputなどの要素にイベントリスナーを追加するための関数
function bindEventHandlers() {}

// djangoのurlに対してfetchを使ってリクエストを送信し、レスポンスを受け取り、DOMを更新する関数
function loadPage(url, callback) {
  fetch(url)
    .then((response) => response.text())
    .then((html) => {
      document.getElementById("app").innerHTML = html;
      window.history.pushState(null, "", url);
      if (callback) {
        callback();
      }
    })
    .catch((error) => {
      console.error("Error loading the page: ", error);
    });
}

// ブラウザの戻る/進むボタンが押されたときに発火する関数
function handlePopState(event) {
  if (event.state) {
    document.getElementById("app").innerHTML = event.state.html;
  } else {
    location.reload();
  }
}
