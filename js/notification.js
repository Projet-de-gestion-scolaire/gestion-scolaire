// =============================
// Gestion des Notifications
// =============================

// 🔁 Récupérer les notifications depuis localStorage
function getNotifs() {
  return JSON.parse(localStorage.getItem('notifs') || '[]');
}

// 💾 Sauvegarder les notifications
function setNotifs(notifs) {
  localStorage.setItem('notifs', JSON.stringify(notifs));
}

// 🖼️ Afficher les notifications dans le tableau
function renderNotifs() {
  const tbody = document.querySelector('#table-notif tbody');
  const notifs = getNotifs();
  tbody.innerHTML = '';

  if (notifs.length === 0) {
    const tr = document.createElement('tr');
    tr.innerHTML = '<td colspan="3">Aucune notification.</td>';
    tbody.appendChild(tr);
    return;
  }

  notifs.forEach((notif, i) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${notif.titre}</td>
      <td>${notif.date}</td>
      <td>
        <button onclick="voirPlusNotif(${i})">Voir plus</button>
        <button onclick="deleteNotif(${i})">Supprimer</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

// ➕ Ajouter une notification depuis le formulaire
const formNotif = document.getElementById('form-notif');
formNotif.addEventListener('submit', function(e) {
  e.preventDefault();
  const titre = document.getElementById('titre-notif').value.trim();
  const contenu = document.getElementById('contenu-notif').value.trim();

  const date = new Date().toLocaleString();
  const notifs = getNotifs();
  notifs.push({ titre, contenu, date });
  setNotifs(notifs);
  renderNotifs();
  formNotif.reset();

  const toast = document.getElementById('message-toast');
  toast.textContent = 'Notification ajoutée !';
  toast.style.display = 'block';
  setTimeout(() => {
    toast.style.display = 'none';
  }, 2000);
});

// 🗑️ Supprimer une notification
function deleteNotif(index) {
  const notifs = getNotifs();
  notifs.splice(index, 1);
  setNotifs(notifs);
  renderNotifs();
}

// 👁️ Voir plus de détails sur une notification
function voirPlusNotif(index) {
  const notif = getNotifs()[index];
  alert(`📝 Notification\nTitre : ${notif.titre}\nContenu : ${notif.contenu}\nDate : ${notif.date}`);
}

// 🔁 Afficher les notifications au chargement de la page
window.addEventListener('DOMContentLoaded', renderNotifs);
