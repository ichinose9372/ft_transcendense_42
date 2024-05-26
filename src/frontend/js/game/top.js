function topEventHandlers() {
  const startButton = document.getElementById("startButton");
  const dashboardButton = document.getElementById("dashboardButton");

  if (startButton) {
    startButton.addEventListener("click", () => {
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
