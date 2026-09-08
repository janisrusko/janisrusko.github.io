(function () {
  var root = document.documentElement;
  var button = document.querySelector(".theme-toggle");
  var label = document.querySelector(".toggle-label");

  if (!button || !label) {
    return;
  }

  function setTheme(theme) {
    root.dataset.theme = theme;
    localStorage.setItem("theme", theme);
    var targetTheme = theme === "light" ? "dark" : "light";
    button.setAttribute("aria-label", "Switch to " + targetTheme + " theme");
    label.textContent = targetTheme.charAt(0).toUpperCase() + targetTheme.slice(1);
  }

  setTheme(root.dataset.theme || "dark");

  button.addEventListener("click", function () {
    setTheme(root.dataset.theme === "light" ? "dark" : "light");
  });
})();
