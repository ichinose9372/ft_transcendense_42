let chartInstance = null;

function checkGetAchievementsButtonValid(input, button) {
  if (input.value.trim() !== "") {
    button.disabled = false;
  } else {
    button.disabled = true;
  }
}

function dashboardEventHandlers() {
  const getAchievementsButton = document.getElementById(
    "getAchievementsButton"
  );
  const participantNameInput = document.getElementById("participantNameInput");
  const backToTopButton = document.getElementById("backToTopButton");

  if (backToTopButton) {
    backToTopButton.addEventListener("click", () => {
      const url = "/" + appState.getStateByKey("language") + "/";
      loadPage(url, topEventHandlers);
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

    participantNameInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        getAchievementsButton.click();
      }
    });

    getAchievementsButton.addEventListener("click", (e) => {
      const url = new URL(
        "/" + appState.getStateByKey("language") + "/getAchievements",
        window.location.origin
      );
      url.searchParams.append("participant_name", participantNameInput.value);
      fetch(url)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          const achievements = data.achievements;
          if (achievements.length === 0) {
            const lang = appState.getStateByKey("language");
            let message = "No Data";
            if (lang === "ja") {
              message = "データがありません。";
            } else if (lang === "fr") {
              message = "Pas de données";
            }
            document.getElementById("name-achievements").innerText = message;
            if (chartInstance) {
              chartInstance.destroy();
            }
            return ;
          }
          const scores = achievements.map((achievement) => achievement.score);

          // getAchievements関数にscoresを追加して仮のデータとして取得する時
          // const scores = data.scores;

          const lang = appState.getStateByKey("language");
          let message = " 's Achievements";
          if (lang === "ja") {
            message = " さんの実績";
          } else if (lang === "fr") {
            message = " Réalisations";
          }
          document.getElementById("name-achievements").innerText =
            participantNameInput.value + message;
          drawChart(scores);
        })
        .catch((error) => {
          console.error("Error getAchievements: ", error);
        });
    });
  }

  // reload時にtopに戻る
  if (getAchievementsButton && participantNameInput) {
    window.addEventListener("load", () => {
      const perfEntries = performance.getEntriesByType("navigation");
      const isReload = perfEntries[0].type === "reload";
      if (isReload) {
        const lang = appState.getStateByKey("language");
        window.location.href = "/" + lang + "/";
      }
    });
  }
}

function drawChart(scores) {
  if (chartInstance) {
    chartInstance.destroy();
  }
  const ctx = document.getElementById("chart");
  const labels = Array.from({ length: 12 }, (_, i) => `${i}`);
  const scoreCounts = Array(12).fill(0);
  let winRatePercentage = 0;
  if (scores.length > 0) {
    const winRate =
      scores.filter((score) => score === 11).length / scores.length;
    winRatePercentage = Math.round(winRate * 100);
  }
  scores.forEach((score) => {
    if (score >= 0 && score <= 11) {
      scoreCounts[score] += 1;
    }
  });
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Scores",
        data: scoreCounts,
        backgroundColor: [
          "rgb(54, 162, 235)",
          "rgb(75, 192, 192)",
          "rgb(153, 102, 255)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(255, 99, 71)",
          "rgb(144, 238, 144)",
          "rgb(173, 216, 230)",
          "rgb(255, 182, 193)",
          "rgb(138, 43, 226)",
          "rgb(255, 215, 0)",
          "rgb(255, 99, 132)",
        ],
        hoverOffset: 4,
      },
    ],
  };
  const config = {
    type: "doughnut",
    data: data,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: `Score Distribution (Win Rate: ${winRatePercentage}%)`,
        },
      },
    },
  };
  chartInstance = new Chart(ctx, config);
}

function initDashboard() {
  document.addEventListener("DOMContentLoaded", () => {
    window.addEventListener("popstate", () => {
      handlePopState();
    });
    dashboardEventHandlers();
  });
}

initDashboard();
