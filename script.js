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
}

  function getEmplois() { 
    return JSON.parse(localStorage.getItem('emplois') || '[]'); }
function getProfs() {
  return JSON.parse(localStorage.getItem('profs') || '[]');
}
function setProfs(profs) {
  localStorage.setItem('profs', JSON.stringify(profs));
}
function renderProfs() {
  const tbody = document.querySelector('#table-prof tbody');
  tbody.innerHTML = '';
  getProfs().forEach((prof, i) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${prof.nom}</td>
      <td>${prof.prenom}</td>
      <td>${prof.matiere}</td>
      <td>${prof.salle}</td>
      <td>
        <button onclick="editProf(${i})">Modifier</button>
        <button onclick="deleteProf(${i})">Supprimer</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}
document.getElementById('form-prof').addEventListener('submit', function(e) {
  e.preventDefault();
  const nom = document.getElementById('nom-prof').value;
  const prenom = document.getElementById(`prenom-prof`).value;
  const matiere = document.getElementById('matiere-prof').value;
  const salle = document.getElementById(`salle-prof`).value;
  const profs = getProfs();
  profs.push({ nom, matiere });
  setProfs(profs);
  renderProfs();
  this.reset();
});
window.deleteProf = function(i) {
  const profs = getProfs();
  profs.splice(i, 1);
  setProfs(profs);
  renderProfs();
};
window.editProf = function(i) {
  const profs = getProfs();
  const prof = profs[i];
  document.getElementById('nom-prof').value = prof.nom;
  document.getElementById(`prenom-prof`).value = prof.prenom;
  document.getElementById('matiere-prof').value = prof.matiere;
  document.getElementById('salle-prof').value = prof.salle;
  profs.splice(i, 1);
  setProfs(profs);
  renderProfs();
};
document.addEventListener('DOMContentLoaded', renderProfs);
function getNotifs() {
  return JSON.parse(localStorage.getItem('notifs') || '[]');
}
function setNotifs(notifs) {
  localStorage.setItem('notifs', JSON.stringify(notifs));
}
function renderNotifs() {
  const tbody = document.querySelector('#table-notif tbody');
  const notifs = getNotifs();
  tbody.innerHTML = '';
  
  if (notifs.length === 0) {
    const tr = document.createElement(`tr`);
    tr.innerHTML = `<td colspan="3">Aucune notification pour le moment.</td>`;
    tbody.appendChild(tr);
    return;
  }
  getNotifs().forEach((notif, i) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${notif.titre}</td>
      <td>${notif.date}</td>
      <td>
        <button onclick="voirPlusNotif(${i})">voir plus</button>
        <button onclick="deleteNotif(${i})">Supprimer</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}
document.getElementById('form-notif').addEventListener('submit', function(e) {
  e.preventDefault();
  const titre = document.getElementById('titre-notif').value;
  const contenu = document.getElementById('contenu-notif').value;
  const toast = document.getElementById(`message-toast`);

  toast.textContent = `notification ajouter !`;
  toast.style.display = `block`;

  setTimeout (() => {
    toast.style.display = `none`;
  }, 2000);

  const notifs = getNotifs();
  const date = new Date().toLocaleString();
  notifs.push({ titre, contenu, date });
  setNotifs(notifs);
  renderNotifs();
  this.reset();
});
window.deleteNotif = function(i) {
  const notifs = getNotifs();
  notifs.splice(i, 1);
  setNotifs(notifs);
  renderNotifs();
};
  window.voirPlusNotif = function(i) {
  const notif = getNotifs()[i];
  alert(`📝 Notification\n\nTitre : ${notif.titre}\nContenu : ${notif.contenu}\nDate : ${notif.date}`);
};

document.addEventListener('DOMContentLoaded', renderNotifs);
function getParametres() {
  return JSON.parse(localStorage.getItem('parametres') || '{}');
}
function setParametres(param) {
  localStorage.setItem('parametres', JSON.stringify(param));
}
function renderParametres() {
  const param = getParametres();
  document.getElementById('nom-etab').value = param.nom || '';
  document.getElementById('adresse-etab').value = param.adresse || '';
  document.getElementById('tel-etab').value = param.tel || '';
  renderResume();
}
function renderResume() {
  const param = getParametres();
  const resume = document.getElementById('resume-param');
  if (param.nom) {
    resume.innerHTML = `
      <strong>Nom :</strong> ${param.nom}<br>
      <strong>Adresse :</strong> ${param.adresse}<br>
      <strong>Téléphone :</strong> ${param.tel}
    `;
  } else {
    resume.innerHTML = "<em>Aucune information enregistrée.</em>";
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
