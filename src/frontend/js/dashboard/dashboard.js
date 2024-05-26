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
      loadPage("/", topEventHandlers);
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
      const url = new URL("/dashboard", window.location.origin);
      url.searchParams.append("participant_name", participantNameInput.value);
      loadPage(url, dashboardEventHandlers);
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
