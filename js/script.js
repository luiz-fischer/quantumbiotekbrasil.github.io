function getBasePath() {
  const path = location.pathname;
  console.log('PATH', path)
  const pathSegments = path.split("/");
  console.log(pathSegments)
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

  const headerPath = new URL("header.html", location.origin + basePath)
    .href;
  const footerPath = new URL("footer.html", location.origin + basePath)
    .href;

  fetch(headerPath)
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("menu-container").innerHTML = data;

      // Ajustar caminhos de imagem
      document.getElementById("logo").src = new URL(
        "../assets/Logo Quantum Biotek-03.png",
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
        "../assets/Logo-Omnienviro-quantum-biotek-.jpg",
        footerBasePath
      ).href;
      document.querySelector(".footer-social img[src*='facebook']").src =
        new URL("../icons/facebook.png", footerBasePath).href;
      document.querySelector(".footer-social img[src*='twitter']").src =
        new URL("../icons/twitter.png", footerBasePath).href;
      document.querySelector(".footer-social img[src*='instagram']").src =
        new URL("../icons/instagram.png", footerBasePath).href;
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

const slider = function () {
  const slides = document.querySelectorAll(".slide");
  const btnLeft = document.querySelector(".slider__btn--left");
  const btnRight = document.querySelector(".slider__btn--right");
  const dotContainer = document.querySelector(".dots");

  let curSlide = 0;
  const maxSlide = slides.length;

  // Functions
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll(".dots__dot")
      .forEach((dot) => dot.classList.remove("dots__dot--active"));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add("dots__dot--active");
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // Next slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots();

    activateDot(0);
  };
  init();

  // Event handlers
  btnRight.addEventListener("click", nextSlide);
  btnLeft.addEventListener("click", prevSlide);

  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") prevSlide();
    e.key === "ArrowRight" && nextSlide();
  });

  dotContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots__dot")) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider();

const slider2 = function () {
  const slides = document.querySelectorAll(".slide2");
  const btnLeft = document.querySelector(".slider2__btn--left");
  const btnRight = document.querySelector(".slider2__btn--right");
  const dotContainer = document.querySelector(".dots2");

  let curSlide = 0;
  const maxSlide = slides.length;

  // Functions
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="dots2__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll(".dots2__dot")
      .forEach((dot) => dot.classList.remove("dots2__dot--active"));

    document
      .querySelector(`.dots2__dot[data-slide="${slide}"]`)
      .classList.add("dots2__dot--active");
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // Next slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots();

    activateDot(0);
  };
  init();

  // Event handlers
  btnRight.addEventListener("click", nextSlide);
  btnLeft.addEventListener("click", prevSlide);

  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") prevSlide();
    e.key === "ArrowRight" && nextSlide();
  });

  dotContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots2__dot")) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider2();