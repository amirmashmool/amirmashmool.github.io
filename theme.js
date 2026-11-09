(function () {
  var storageKey = "site-theme";

  function getSavedTheme() {
    try {
      return localStorage.getItem(storageKey);
    } catch (error) {
      return null;
    }
  }

  function updateButtons() {
    var isDark = document.body.classList.contains("dark-mode");

    document.querySelectorAll(".theme-toggle").forEach(function (button) {
      button.textContent = isDark ? "☀ Light" : "☾ Dark";
      button.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
      button.setAttribute("aria-pressed", isDark ? "true" : "false");
    });
  }

  function applyTheme(isDark) {
    document.body.classList.toggle("dark-mode", isDark);
    updateButtons();
  }

  window.toggleThemeMode = function () {
    var isDark = !document.body.classList.contains("dark-mode");
    applyTheme(isDark);

    try {
      localStorage.setItem(storageKey, isDark ? "dark" : "light");
    } catch (error) {
      // The selected theme still applies for this page when storage is unavailable.
    }
  };

  applyTheme(getSavedTheme() === "dark");

  window.addEventListener("storage", function (event) {
    if (event.key === storageKey) {
      applyTheme(event.newValue === "dark");
    }
  });
})();
