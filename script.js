
// ANIMAÇÃO DE ILUSTRAÇÕES

document.addEventListener("DOMContentLoaded", () => {
  const illustrations = document.querySelectorAll(".left-ilustration, .right-ilustration");

  let lastScrollY = window.scrollY;
  let direction = "down";

  window.addEventListener("scroll", () => {
    const currentScrollY = window.scrollY;
    direction = currentScrollY > lastScrollY ? "down" : "up";
    lastScrollY = currentScrollY;

    const windowHeight = window.innerHeight;

    illustrations.forEach((img) => {
      const rect = img.getBoundingClientRect();
      const centerY = rect.top + rect.height / 2;
      const viewportCenter = windowHeight / 2;

      const offset = centerY - viewportCenter;
      const enterZone = windowHeight * 0.6;

      let translateX = 0;
      let opacity = 1;
      const isLeft = img.classList.contains("left-ilustration");

      // Rolagem fora da zona visível
      if (offset > enterZone) {
        // acima do centro
        if (direction === "down") {
          translateX = isLeft ? 100 : -100;
        } else {
          translateX = isLeft ? -100 : 100;
        }
        opacity = 0;
      } else if (offset < -enterZone) {
        // abaixo do centro
        if (direction === "down") {
          translateX = isLeft ? 100 : -100;
        } else {
          translateX = isLeft ? -100 : 100;
        }
        opacity = 0;
      } else {
        // Rolagem dentro da zona visível
        const progress = offset / enterZone;

        if (Math.abs(progress) < 0.3) {
          // Área central
          translateX = 0;
          opacity = 1;
        } else {
          if (direction === "down") {
            translateX = (isLeft ? -1 : 1) * (progress > 0 ? -100 * progress : 100 * progress);
          } else {
            translateX = (isLeft ? 1 : -1) * (progress > 0 ? 100 * progress : -100 * progress);
          }
          opacity = 1 - Math.abs(progress);
        }
      }

      img.style.transform = `translateX(${translateX}px)`;
      img.style.opacity = opacity;
    });
  });

  // MENU

  const menuToggle = document.getElementById("menu-toggle");
  const navMenu = document.querySelector(".nav-menu");

  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
      navMenu.classList.toggle("open");
      menuToggle.textContent = navMenu.classList.contains("open") ? "✖" : "☰";
    });
  }
});
