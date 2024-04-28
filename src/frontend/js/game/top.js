function topEventHandlers() {
  const startTournamentButton = document.getElementById(
    "startTournamentButton"
  );
  const dashboardButton = document.getElementById("dashboardButton");

  if (startTournamentButton) {
    startTournamentButton.addEventListener("click", () => {
      loadPage("/start", startEventHandlers);
    });
  }

  if (dashboardButton) {
    dashboardButton.addEventListener("click", () => {
      loadPage("/dashboard", dashboardEventHandlers);
    });
  }
}

function initTop() {
  document.addEventListener("DOMContentLoaded", () => {
    window.addEventListener("popstate", () => {
      handlePopState();
    });
    topEventHandlers();
  });
}

initTop();
