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

(function () {
  var now = Date.now();
  document.querySelectorAll("[data-tl-start]").forEach(function (el) {
    var periods = el.querySelectorAll("[data-from]");
    var n = periods.length;
    var position = 0;
    periods.forEach(function (period, i) {
      var from = Date.parse(period.dataset.from);
      var to = Date.parse(period.dataset.to) + 86400000;
      var current = now >= from && now < to;
      period.classList.toggle("tl-current", current);
      if (current) {
        position = (i + (now - from) / (to - from)) / n;
      } else if (now >= to) {
        position = Math.max(position, (i + 1) / n);
      }
    });
    el.style.setProperty("--tl-progress", (position * 100).toFixed(1) + "%");
  });
})();
