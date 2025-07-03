document.addEventListener('DOMContentLoaded', () => {
  // Exemple de statistiques dynamiques
  const eleves = JSON.parse(localStorage.getItem('eleves') || '[]');
  document.getElementById('stat-eleves').textContent = `Nombre d'élèves : ${eleves.length}`;
  document.getElementById('stat-absents').textContent = `Absents : ${eleves.filter(e => e.statut === 'absent').length}`;
  document.getElementById('stat-messages').textContent = `Messages : 0`;
});
function getEleves() {
  return JSON.parse(localStorage.getItem('eleves') || '[]');
}
function setEleves(eleves) {
  localStorage.setItem('eleves', JSON.stringify(eleves));
}
function renderEleves() {
  const tbody = document.querySelector('#table-eleves tbody');
  tbody.innerHTML = '';
  getEleves().forEach((eleve, i) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${eleve.nom}</td>
      <td>${eleve.classe}</td>
      <td>${eleve.statut}</td>
      <td>
        <button onclick="editEleve(${i})">Modifier</button>
        <button onclick="deleteEleve(${i})">Supprimer</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}
document.getElementById('form-eleve').addEventListener('submit', function(e) {
  e.preventDefault();
  const nom = document.getElementById('nom').value;
  const classe = document.getElementById('classe').value;
  const statut = document.getElementById('statut').value;
  const eleves = getEleves();
  eleves.push({ nom, classe, statut });
  setEleves(eleves);
  renderEleves();
  this.reset();
});
window.deleteEleve = function(i) {
  const eleves = getEleves();
  eleves.splice(i, 1);
  setEleves(eleves);
  renderEleves();
};
window.editEleve = function(i) {
  const eleves = getEleves();
  const eleve = eleves[i];
  document.getElementById('nom').value = eleve.nom;
  document.getElementById('classe').value = eleve.classe;
  document.getElementById('statut').value = eleve.statut;
  eleves.splice(i, 1);
  setEleves(eleves);
  renderEleves();
};
document.addEventListener('DOMContentLoaded', renderEleves);
const planningData = {
  enseignant: [
    ['Lundi', 'Maths', 'Français', 'Histoire'],
    ['Mardi', 'SVT', 'Anglais', 'EPS'],
    // ...
  ],
  eleve: [
    ['Lundi', 'Maths', 'Français', 'Histoire'],
    ['Mardi', 'SVT', 'Anglais', 'EPS'],
    // ...
  ]
};
let vue = 'enseignant';
function renderPlanning() {
  const planning = planningData[vue];
  const section = document.getElementById('planning');
  section.innerHTML = `<h2>Vue ${vue.charAt(0).toUpperCase() + vue.slice(1)}</h2>`;
  planning.forEach(jour => {
    section.innerHTML += `<div><strong>${jour[0]}</strong> : ${jour.slice(1).join(', ')}</div>`;
  });
}
document.getElementById('switch-vue').addEventListener('click', () => {
  vue = vue === 'enseignant' ? 'eleve' : 'enseignant';
  renderPlanning();
});
document.addEventListener('DOMContentLoaded', renderPlanning);
function getEleves() {
  return JSON.parse(localStorage.getItem('eleves') || '[]');
}
function renderSelect() {
  const select = document.getElementById('select-eleve');
  select.innerHTML = '';
  getEleves().forEach((eleve, i) => {
    const option = document.createElement('option');
    option.value = i;
    option.textContent = eleve.nom + ' (' + eleve.classe + ')';
    select.appendChild(option);
  });
}
function renderFiche() {
  const i = document.getElementById('select-eleve').value;
  const eleve = getEleves()[i];
  const fiche = document.getElementById('fiche-eleve');
  if (eleve) {
    fiche.innerHTML = `
      <h3>${eleve.nom} - ${eleve.classe}</h3>
      <p>Notes : 15/20</p>
      <p>Remarques : Bon travail</p>
      <p>Comportement : Exemplaire</p>
    `;
  } else {
    fiche.innerHTML = '';
  }
}
document.addEventListener('DOMContentLoaded', () => {
  renderSelect();
  document.getElementById('select-eleve').addEventListener('change', renderFiche);
  renderFiche();
});
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
}
document.getElementById('form-param').addEventListener('submit', function(e) {
  e.preventDefault();
  const nom = document.getElementById('nom-etab').value;
  const adresse = document.getElementById('adresse-etab').value;
  const tel = document.getElementById('tel-etab').value;
  setParametres({ nom, adresse, tel });
  renderResume();
});
document.addEventListener('DOMContentLoaded', renderParametres);