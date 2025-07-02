// Bouton remonter
const btnTop = document.getElementById("btn-top");
if (btnTop) {
  btnTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  window.addEventListener("scroll", () => {
    btnTop.style.display = window.scrollY > 200 ? "block" : "none";
  });
}

// Menu utilisateur
const userToggle = document.getElementById("user-toggle");
const userDropdown = document.getElementById("user-dropdown");
const logoutBtn = document.getElementById("logout-btn");

userToggle?.addEventListener("click", (e) => {
  e.preventDefault();
  userDropdown?.classList.toggle("hidden");
});

document.addEventListener("click", (e) => {
  if (
    userToggle &&
    userDropdown &&
    !userToggle.contains(e.target) &&
    !userDropdown.contains(e.target)
  ) {
    userDropdown.classList.add("hidden");
  }
});

logoutBtn?.addEventListener("click", (e) => {
  e.preventDefault();
  alert("Déconnexion en cours...");
});

// Cartes dashboard
function updateDashboardCards() {
  const eleves = JSON.parse(localStorage.getItem("eleves") || "[]");
  const profs = JSON.parse(localStorage.getItem("profs") || "[]");
  const notifs = JSON.parse(localStorage.getItem("notifs") || "[]");

  document.getElementById("card-eleves")?.textContent = eleves.length;
  document.getElementById("card-profs")?.textContent = profs.length;
  document.getElementById("card-inscriptions")?.textContent = eleves.filter(
    (e) => e.statut === "attente"
  ).length;
  document.getElementById("card-notifs")?.textContent = notifs.length;
  document.getElementById("card-avenir")?.textContent = 2;
  document.getElementById("card-a-faire")?.textContent = 5;
}

updateDashboardCards();
