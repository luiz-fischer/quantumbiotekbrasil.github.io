function getBasePath() {
  const path = location.pathname;
  console.log('PATH', path)
  const pathSegments = path.split("/").filter(seg => seg !== "");
  console.log(pathSegments)
  
  // Remove o nome do arquivo se houver
  if (pathSegments.length > 0 && pathSegments[pathSegments.length - 1].includes('.')) {
    pathSegments.pop();
  }

  // Remove a pasta específica se for uma subpasta
  const lastSegment = pathSegments[pathSegments.length - 1];
  if (["contato", "empresa", "omniambiente", "produtos", "setores"].includes(lastSegment)) {
    pathSegments.pop();
  }

  // Junta os segmentos de volta para obter o caminho base
  // Adiciona / no início e no final
  const basePath = pathSegments.length > 0 ? "/" + pathSegments.join("/") + "/" : "/";

  console.log('BASE PATH:', basePath);
  return basePath;
}

function loadHeaderFooter() {
  const basePath = getBasePath();

  const headerPath = basePath + "header.html";
  const footerPath = basePath + "footer.html";

  console.log('Loading header from:', headerPath);
  console.log('Loading footer from:', footerPath);

  fetch(headerPath)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.text();
    })
    .then((data) => {
      document.getElementById("menu-container").innerHTML = data;

      // Ajustar caminhos de imagem
      document.getElementById("logo").src = basePath + "assets/Logo Quantum Biotek-03.png";

      // Ajustar caminhos dos links do menu-item
      const menuItems = document.querySelectorAll(".menu-item a");
      menuItems.forEach((item) => {
        const href = item.getAttribute("href");
        if (href && href.startsWith("./")) {
          // Remove o ./ e adiciona o basePath
          item.setAttribute("href", basePath + href.substring(2));
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
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.text();
    })
    .then((data) => {
      document.getElementById("footer-container").innerHTML = data;

      // Ajustar caminhos de imagem no footer
      document.querySelector(".footer-logo").src = basePath + "assets/Logo-Omnienviro-quantum-biotek-.jpg";
      document.querySelector(".footer-social img[src*='facebook']").src = basePath + "icons/facebook.png";
      document.querySelector(".footer-social img[src*='twitter']").src = basePath + "icons/twitter.png";
      document.querySelector(".footer-social img[src*='instagram']").src = basePath + "icons/instagram.png";
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