function getBasePath() {
  const path = location.pathname;
  console.log('PATH', path);
  
  // Conta quantos níveis de profundidade estamos (número de barras após o domínio)
  const pathSegments = path.split("/").filter(seg => seg !== "");
  console.log('Path segments:', pathSegments);
  
  // Remove o nome do arquivo se houver
  if (pathSegments.length > 0 && pathSegments[pathSegments.length - 1].includes('.')) {
    pathSegments.pop();
  }
  
  console.log('Segments after removing file:', pathSegments);
  
  // Determina o nível de profundidade
  // Se estamos em /quantumbiotekbrasil/html/setores/ -> pathSegments = [quantumbiotekbrasil, html, setores]
  // Se estamos em /quantumbiotekbrasil/ -> pathSegments = [quantumbiotekbrasil]
  
  // Conta quantas pastas precisamos subir
  let depth = 0;
  
  const lastSegment = pathSegments[pathSegments.length - 1];
  
  // IMPORTANTE: Verificar portifolio PRIMEIRO (maior profundidade)
  if (pathSegments.some(seg => seg === "portifolio")) {
    depth = 3; // html/produtos/portifolio/ -> precisa subir 3 níveis
  } 
  // Se temos "setores", "empresa", "omniambiente", "produtos", "contato" no caminho, estamos em html/[pasta]/
  else if (["contato", "empresa", "omniambiente", "produtos", "setores"].includes(lastSegment)) {
    depth = 2; // html/pasta/ -> precisa subir 2 níveis
  } 
  else if (pathSegments.length > 0 && lastSegment === "html") {
    depth = 1; // html/ -> precisa subir 1 nível
  } 
  else {
    depth = 0; // raiz
  }
  
  console.log('Depth:', depth);
  
  // Constrói o caminho relativo
  let basePath = "";
  if (depth === 0) {
    basePath = "./";
  } else {
    basePath = "../".repeat(depth);
  }
  
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

      // Ajustar caminhos de imagem do logo
      const logoPath = basePath + "assets/Logo Quantum Biotek-03.png";
      console.log('Logo path:', logoPath);
      document.getElementById("logo").src = logoPath;

      // Ajustar caminhos dos links do menu-item
      const menuItems = document.querySelectorAll(".menu-item a");
      menuItems.forEach((item) => {
        const href = item.getAttribute("href");
        if (href && href.startsWith("./")) {
          // O header.html tem links como ./index.html, ./html/setores/agricultura.html
          // Precisamos ajustar baseado no basePath
          const newHref = basePath + href.substring(2);
          console.log('Adjusting link:', href, '->', newHref);
          item.setAttribute("href", newHref);
        }
      });

      // Adicionar event listeners para o menu hamburguer
      const hamburgerMenu = document.getElementById("hamburger-menu");
      const menu = document.getElementById("menu");
      const dropdowns = document.querySelectorAll(".dropdown > a");

      if (hamburgerMenu && menu) {
        hamburgerMenu.addEventListener("click", function () {
          menu.classList.toggle("show");
        });
      }

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
      const footerLogo = document.querySelector(".footer-logo");
      const facebookIcon = document.querySelector(".footer-social img[src*='facebook']");
      const twitterIcon = document.querySelector(".footer-social img[src*='twitter']");
      const instagramIcon = document.querySelector(".footer-social img[src*='instagram']");
      
      if (footerLogo) {
        footerLogo.src = basePath + "assets/Logo-Omnienviro-quantum-biotek-.jpg";
      }
      if (facebookIcon) {
        facebookIcon.src = basePath + "icons/facebook.png";
      }
      if (twitterIcon) {
        twitterIcon.src = basePath + "icons/twitter.png";
      }
      if (instagramIcon) {
        instagramIcon.src = basePath + "icons/instagram.png";
      }
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