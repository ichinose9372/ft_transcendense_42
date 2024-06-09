function topEventHandlers() {
  const startButton = document.getElementById("startButton");
  const dashboardButton = document.getElementById("dashboardButton");

  if (startButton) {
    startButton.addEventListener("click", () => {
      const url = "/" + appState.getStateByKey("language") + "/start";
      loadPage(url, startEventHandlers);
    });
  }

  if (dashboardButton) {
    dashboardButton.addEventListener("click", () => {
      const url = "/" + appState.getStateByKey("language") + "/dashboard";
      loadPage(url, dashboardEventHandlers);
    });
  }

  document.querySelectorAll('input[name="btnradio"]').forEach((elem) => {
    elem.addEventListener("change", (event) => {
      if (event.target.checked) {
        const selectedLanguage = event.target.id.split("-")[1];
        appState.setState({ language: selectedLanguage });
        // console.log(selectedLanguage);
        fetch(set_language_url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrf_token,
          },
          body: JSON.stringify({ language: selectedLanguage }),
        })
          .then((response) => {
            if (response.ok) {
              appState.setState({ language: selectedLanguage });
              loadPage('/' + selectedLanguage + '/', topEventHandlers)
              return {
                status: response.status,
                statusText: response.statusText,
              };
            }
          })
          .catch((error) => {
            console.error(error);
          });

      }
    });
  });

  window.addEventListener('load', () => {
    const perfEntries = performance.getEntriesByType("navigation");
    const isReload = perfEntries[0].type === 'reload';
    if (isReload) {
      window.location.href = '/';
    }
  });
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
