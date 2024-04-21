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

document.addEventListener("DOMContentLoaded", () => {
  function init() {
    topEventHandlers();
  }
  window.addEventListener("popstate", (event) => {
    handlePopState(event);
    topEventHandlers();
  });

  init();
});
