document.addEventListener("DOMContentLoaded", () => {
  // Load header and footer dynamically
  loadFragment("header.html", "header");
  loadFragment("footer.html", "footer");

  function loadFragment(url, targetTag) {
    fetch(url)
      .then(res => res.text())
      .then(html => {
        document.querySelector(targetTag).outerHTML = html;

        // Reinitialize menu toggle once header is injected
        if (targetTag === "header") {
          initMenuToggle();
        }
      })
      .catch(err => console.error(`Error loading ${url}:`, err));
  }

  function initMenuToggle() {
    const menuToggle = document.getElementById("menu-toggle");
    const navLinks = document.getElementById("nav-links");

    if (menuToggle && navLinks) {
      menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("show");
      });
    }
  }
});
