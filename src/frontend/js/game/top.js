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

  document.querySelectorAll('input[name="btnradio"]').forEach((elem) => {
    elem.addEventListener("change", (event) => {
      if (event.target.checked) {
        const language = event.target.id.split("-")[1];
        translate(language);
      }
    });
  })
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
