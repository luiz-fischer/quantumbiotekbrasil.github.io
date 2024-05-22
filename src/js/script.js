function getBasePath() {
  const path = location.pathname;
  const pathSegments = path.split("/");

  // Remove o nome do arquivo e a pasta específica (se houver)
  pathSegments.pop();

  if (pathSegments[pathSegments.length - 1] === "contato") {
    pathSegments.pop();
  }

  if (pathSegments[pathSegments.length - 1] === "empresa") {
    pathSegments.pop();
  }

  if (pathSegments[pathSegments.length - 1] === "omniambiente") {
    pathSegments.pop();
  }

  if (pathSegments[pathSegments.length - 1] === "produtos") {
    pathSegments.pop();
  }

  if (pathSegments[pathSegments.length - 1] === "setores") {
    pathSegments.pop();
  }

  // Junta os segmentos de volta para obter o caminho base
  const basePath = pathSegments.join("/");

  return basePath;
}

function loadHeaderFooter() {
  const basePath = getBasePath();

  const headerPath = new URL("html/header.html", location.origin + basePath)
    .href;
  const footerPath = new URL("html/footer.html", location.origin + basePath)
    .href;

  fetch(headerPath)
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("menu-container").innerHTML = data;

      // Ajustar caminhos de imagem
      document.getElementById("logo").src = new URL(
        "../../assets/Quantum-Biotek-Logo-Blanco-con-contorno.png",
        location.origin + basePath
      ).href;

      // Ajustar caminhos dos links do menu-item
      const menuItems = document.querySelectorAll(".menu-item a");
      menuItems.forEach((item) => {
        const href = item.getAttribute("href");
        if (href && href.startsWith("./")) {
          item.setAttribute(
            "href",
            new URL(href, location.origin + basePath).href
          );
        }
      });

      // Adicionar event listeners para o menu hamburguer
      const hamburgerMenu = document.getElementById("hamburger-menu");
      const menu = document.getElementById("menu");
      const dropdowns = document.querySelectorAll(".dropdown > a");

      hamburgerMenu.addEventListener("click", function () {
        menu.classList.toggle("show");
      });

      dropdowns.forEach(function (dropdown) {
        dropdown.addEventListener("click", function (e) {
          e.preventDefault();
          this.nextElementSibling.classList.toggle("show");
        });
      });
    })
    .catch((error) => console.error("Error loading the menu:", error));

  fetch(footerPath)
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("footer-container").innerHTML = data;

      // Ajustar caminhos de imagem no footer
      const footerBasePath = new URL(basePath, location.origin).href;
      document.querySelector(".footer-logo").src = new URL(
        "../../assets/Logo-Omnienviro-quantum-biotek-.jpg",
        footerBasePath
      ).href;
      document.querySelector(".footer-social img[src*='facebook']").src =
        new URL("../../icons/facebook.png", footerBasePath).href;
      document.querySelector(".footer-social img[src*='twitter']").src =
        new URL("../../icons/twitter.png", footerBasePath).href;
      document.querySelector(".footer-social img[src*='instagram']").src =
        new URL("../../icons/instagram.png", footerBasePath).href;
    })
    .catch((error) => console.error("Error loading the footer:", error));
}

document.addEventListener("DOMContentLoaded", loadHeaderFooter);

// Contador
document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".counter");
  const speed = 100; // A menor velocidade significa uma contagem mais rápida

  counters.forEach((counter) => {
    const updateCount = () => {
      const target = +counter.getAttribute("data-count");
      const count = +counter.innerText;
      const increment = target / speed;
      const prefix = counter.getAttribute("data-prefix") || "";
      const suffix = counter.getAttribute("data-suffix") || "";

      if (count < target) {
        counter.innerText = prefix + Math.ceil(count + increment) + suffix;
        setTimeout(updateCount, 10); // Atualiza a cada 10ms
      } else {
        counter.innerText = prefix + target + suffix;
      }
    };

    updateCount();
  });
});
