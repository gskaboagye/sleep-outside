document.addEventListener("DOMContentLoaded", () => {
  loadFragment("header.html", "header");
  loadFragment("footer.html", "footer");

  /* ================================
     DYNAMIC COMPONENT LOADER
  ================================= */
  function loadFragment(url, targetTag) {
    fetch(url)
      .then(response => response.text())
      .then(html => {
        document.querySelector(targetTag).outerHTML = html;

        // Reinitialize navigation after header loads
        if (targetTag === "header") {
          initNavigation();
        }
      })
      .catch(error => console.error(`Error loading ${url}:`, error));
  }

  /* ================================
     NAVIGATION MENU LOGIC
  ================================= */
  function initNavigation() {
    const menuToggle = document.getElementById("menu-toggle");
    const navLinks = document.getElementById("nav-links");

    if (!menuToggle || !navLinks) return;

    // Set default ARIA state
    menuToggle.setAttribute("aria-expanded", "false");

    menuToggle.addEventListener("click", () => {
      const expanded = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", String(!expanded));
      navLinks.classList.toggle("show");
    });

    // Optional: Close menu when clicking a link (mobile)
    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("show");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });

    // Optional: Close menu if clicking outside
    document.addEventListener("click", (e) => {
      if (!menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove("show");
        menuToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ================================
     PAGE ANIMATIONS (BONUS)
  ================================= */

  // Fade in content on load
  const mainContent = document.querySelector("main");
  if (mainContent) {
    mainContent.style.opacity = "0";
    setTimeout(() => {
      mainContent.style.transition = "opacity 1s ease-in-out";
      mainContent.style.opacity = "1";
    }, 100);
  }

});
