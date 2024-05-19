document.addEventListener("DOMContentLoaded", function () {
  fetch("header.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("menu-container").innerHTML = data;

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

  // Load the footer
  fetch("footer.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("footer-container").innerHTML = data;
    })
    .catch((error) => console.error("Error loading the footer:", error));
});
