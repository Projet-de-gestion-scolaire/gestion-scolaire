// =============================
// Gestion des Professeurs
// =============================

// 🔁 Récupérer la liste des profs depuis le localStorage
function getProfs() {
  return JSON.parse(localStorage.getItem('profs') || '[]');
}

// 💾 Sauvegarder une nouvelle liste dans le localStorage
function setProfs(profs) {
  localStorage.setItem('profs', JSON.stringify(profs));
}

// 🖼️ Afficher tous les profs dans le tableau
function renderProfs() {
  const tbody = document.querySelector('#table-prof tbody');
  tbody.innerHTML = ''; // on vide d'abord le tableau

  const profs = getProfs();

  if (profs.length === 0) {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td colspan="5">Aucun professeur enregistré.</td>`;
    tbody.appendChild(tr);
    return;
  }

  profs.forEach((prof, i) => {
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

// ➕ Quand on ajoute un prof via le formulaire
const formProf = document.getElementById('form-prof');
formProf.addEventListener('submit', function(e) {
  e.preventDefault();

  const nom = document.getElementById('nom-prof').value.trim();
  const prenom = document.getElementById('prenom-prof').value.trim();
  const matiere = document.getElementById('matiere-prof').value.trim();
  const salle = document.getElementById('salle-prof').value.trim();

  const profs = getProfs();
  profs.push({ nom, prenom, matiere, salle });
  setProfs(profs);

  renderProfs();
  formProf.reset();

  const toast = document.getElementById('message-toast');
  toast.textContent = 'Professeur ajouté !';
  toast.style.display = 'block';
  setTimeout(() => {
    toast.style.display = 'none';
  }, 2000);
});

// 🗑️ Supprimer un prof
function deleteProf(index) {
  const profs = getProfs();
  profs.splice(index, 1);
  setProfs(profs);
  renderProfs();
}

// ✏️ Modifier un prof (remplit le formulaire avec les infos existantes)
function editProf(index) {
  const profs = getProfs();
  const prof = profs[index];

  document.getElementById('nom-prof').value = prof.nom;
  document.getElementById('prenom-prof').value = prof.prenom;
  document.getElementById('matiere-prof').value = prof.matiere;
  document.getElementById('salle-prof').value = prof.salle;

  // On supprime l'ancien prof avant d'ajouter à nouveau
  profs.splice(index, 1);
  setProfs(profs);
  renderProfs();
}

// 🔁 Exécuter la fonction une fois que la page est chargée
window.addEventListener('DOMContentLoaded', renderProfs);
