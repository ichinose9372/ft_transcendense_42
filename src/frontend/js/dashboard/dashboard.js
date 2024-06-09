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
        "/" + appState.getStateByKey("language") + "/dashboard",
        window.location.origin
      );
      url.searchParams.append("participant_name", participantNameInput.value);
      loadPage(url, dashboardEventHandlers);
    });
  }

  // reload時にtopに戻る
  if (getAchievementsButton && participantNameInput) {
    window.addEventListener("load", () => {
      const perfEntries = performance.getEntriesByType("navigation");
      const isReload = perfEntries[0].type === "reload";
      if (isReload) {
        window.location.href = "/";
      }
    });
  }
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
