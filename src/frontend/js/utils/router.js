function checkGetAchievementsButtonValid(input, button) {
  if (input.value.trim() !== "") {
    button.disabled = false;
  } else {
    button.disabled = true;
  }
}

// buttonやinputなどの要素にイベントリスナーを追加するための関数
function bindEventHandlers() {
  const startButton = document.getElementById("startButton");
  const dashboardButton = document.getElementById("dashboardButton");
  const getAchievementsButton = document.getElementById(
    "getAchievementsButton"
  );
  const participantNameInput = document.getElementById("participantNameInput");

  if (startButton) {
    startButton.addEventListener("click", () => {
      loadPage("/start");
    });
  }

  if (dashboardButton) {
    dashboardButton.addEventListener("click", () => {
      loadPage("/dashboard");
    });
  }

  if (getAchievementsButton && participantNameInput) {
    if (participantNameInput.value.trim() !== "") {
      getAchievementsButton.disabled = false;
    } else {
      getAchievementsButton.disabled = true;
    }
    participantNameInput.addEventListener("input", () => {
      checkGetAchievementsButtonValid(
        participantNameInput,
        getAchievementsButton
      );
    });
    getAchievementsButton.addEventListener("click", (e) => {
      const url = new URL("/dashboard", window.location.origin);
      url.searchParams.append("participant_name", participantNameInput.value);
      loadPage(url);
    });
  }
}

// djangoのurlに対してfetchを使ってリクエストを送信し、レスポンスを受け取り、DOMを更新する関数
function loadPage(url) {
  fetch(url)
    .then((response) => response.text())
    .then((html) => {
      document.getElementById("app").innerHTML = html;
      window.history.pushState(null, "", url);
      bindEventHandlers();
    })
    .catch((error) => {
      console.error("Error loading the page: ", error);
    });
}

// ブラウザの戻る/進むボタンが押されたときに発火する関数
function handlePopState(event) {
  if (event.state) {
    document.getElementById("app").innerHTML = event.state.html;
    bindEventHandlers();
  } else {
    location.reload();
  }
}
