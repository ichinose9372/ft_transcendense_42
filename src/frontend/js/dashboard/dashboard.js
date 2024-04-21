document.addEventListener("DOMContentLoaded", () => {
  function init() {
    bindEventHandlers();
  }

  window.addEventListener("popstate", handlePopState);
  init();
});
