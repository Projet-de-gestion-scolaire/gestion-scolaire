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

  // Clic en dehors pour fermer
  document.addEventListener('click', (e) => {
    if (!userToggle.contains(e.target) && !userDropdown.contains(e.target)) {
      userDropdown.classList.add('hidden');
    }
  });

  // Exemple : logout (juste une alerte pour démo)
  logoutBtn.addEventListener('click', (e) => {
    e.preventDefault();
    alert('Déconnexion en cours...');
    // Ici tu peux ajouter ta logique de logout (ex: clear session, rediriger, etc.)
  });

// --- Emploi du temps dynamique ---
if (document.getElementById('form-emploi')) {
  const form = document.getElementById('form-emploi');
  const tableBody = document.querySelector('#table-emploi tbody');
  const matiereSelect = document.getElementById('matiere');
  const enseignantSelect = document.getElementById('enseignant');

  function getEmplois() {
    return JSON.parse(localStorage.getItem('emplois') || '[]');
  }
  function setEmplois(emplois) {
    localStorage.setItem('emplois', JSON.stringify(emplois));
  }
  function remplirListeEnseignants() {
    enseignantSelect.innerHTML = '<option value="">Enseignant</option>';
    (JSON.parse(localStorage.getItem('profs')||'[]')).forEach(prof => {
      const opt = document.createElement('option');
      opt.value = prof.nom;
      opt.textContent = prof.nom + (prof.matiere ? ' ('+prof.matiere+')' : '');
      enseignantSelect.appendChild(opt);
    });
  }
  function renderTable() {
    const emplois = getEmplois();
    tableBody.innerHTML = '';
    emplois.forEach((e, i) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${e.jour}</td>
        <td>${e.heure}</td>
        <td>${e.matiere}</td>
        <td>${e.enseignant}</td>
        <td>${e.classe}</td>
        <td><button class="btn-suppr" data-index="${i}">Supprimer</button></td>
      `;
      tableBody.appendChild(tr);
    });
  }
  form.onsubmit = function(e) {
    e.preventDefault();
    const emploi = {
      jour: form.jour.value,
      heure: form.heure.value,
      matiere: form.matiere.value,
      enseignant: form.enseignant.value,
      classe: form.classe.value
    };
    const emplois = getEmplois();
    emplois.push(emploi);
    setEmplois(emplois);
    renderTable();
    form.reset();
  };
  tableBody.onclick = function(e) {
    if (e.target.classList.contains('btn-suppr')) {
      const index = e.target.getAttribute('data-index');
      const emplois = getEmplois();
      emplois.splice(index, 1);
      setEmplois(emplois);
      renderTable();
    }
  };
  remplirListeEnseignants();
  renderTable();
}
