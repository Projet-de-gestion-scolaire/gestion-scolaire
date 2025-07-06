// --- Fonctions utilitaires pour le localStorage ---
// Permet de récupérer des données du localStorage ou de retourner un tableau vide si non trouvé
function getFromLocalStorage(key) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : [];
    } catch (e) {
        console.error(`Erreur lors de la lecture de ${key} depuis localStorage:`, e);
        return [];
    }
}

// Permet de sauvegarder des données dans le localStorage
function saveToLocalStorage(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
        console.error(`Erreur lors de l'écriture de ${key} vers localStorage:`, e);
    }
}

// Données initiales pour la démo si le localStorage est vide
function initializeDemoData() {
    if (!localStorage.getItem("eleves")) {
        saveToLocalStorage("eleves", [
            { id: "1", nom: "Alpha Diallo", classe: "6ème A", statut: "actif" },
            { id: "2", nom: "Fanta Camara", classe: "5ème B", statut: "actif" },
            { id: "3", nom: "Mamadou Bah", classe: "4ème C", statut: "attente" }, // Inscription en attente
            { id: "4", nom: "Fatoumata Sow", classe: "3ème D", statut: "actif" },
            { id: "5", nom: "Ousmane Keita", classe: "6ème A", statut: "attente" }, // Inscription en attente
            { id: "6", nom: "Aminata Diallo", classe: "5ème B", statut: "actif" },
            { id: "7", nom: "Ibrahim Traoré", classe: "4ème C", statut: "actif" }
        ]);
    }
    if (!localStorage.getItem("profs")) {
        saveToLocalStorage("profs", [
            { id: "1", nom: "M. Sylla", matiere: "Mathématiques" },
            { id: "2", nom: "Mme Barry", matiere: "Français" },
            { id: "3", nom: "M. Conté", matiere: "Sciences" },
            { id: "4", nom: "Mlle Bangoura", matiere: "Anglais" }
        ]);
    }
    if (!localStorage.getItem("notifs")) {
        saveToLocalStorage("notifs", [
            { id: "1", message: "Nouvelle inscription (Mamadou Bah).", read: false },
            { id: "2", message: "Rappel: Réunion des parents le 15 juillet.", read: false },
            { id: "3", message: "Bulletin de la semaine publié.", read: true },
            { id: "4", message: "Date limite des inscriptions prolongée.", read: false }
        ]);
    }
    // Données pour "Événements à venir" et "Tâches à faire"
    if (!localStorage.getItem("evenements")) {
        saveToLocalStorage("evenements", [
            { id: "1", titre: "Fête de fin d'année", date: "2025-07-20" },
            { id: "2", titre: "Journée portes ouvertes", date: "2025-08-10" }
        ]);
    }
    if (!localStorage.getItem("taches")) {
        saveToLocalStorage("taches", [
            { id: "1", description: "Préparer le rapport trimestriel", completed: false },
            { id: "2", description: "Vérifier les dossiers d'inscription", completed: false },
            { id: "3", description: "Commander les fournitures scolaires", completed: true },
            { id: "4", description: "Mettre à jour le site web", completed: false }
        ]);
    }
}


// --- Bouton remonter ---
const btnTop = document.getElementById("btn-top");
if (btnTop) {
    btnTop.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    window.addEventListener("scroll", () => {
        btnTop.style.display = window.scrollY > 200 ? "flex" : "none";
    });
}

// --- Menu utilisateur ---
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
    alert("Déconnexion en cours... (Simulée avec localStorage)");
    // Dans une vraie application, vous effaceriez les données de session/authentification ici
    // et redirigeriez l'utilisateur vers la page de connexion.
    // window.location.href = '/login.html';
});

// --- Cartes dashboard ---
function updateDashboardCards() {
    const eleves = getFromLocalStorage("eleves");
    const profs = getFromLocalStorage("profs");
    const notifs = getFromLocalStorage("notifs");
    const evenements = getFromLocalStorage("evenements");
    const taches = getFromLocalStorage("taches");

    const pendingInscriptions = eleves.filter(e => e.statut === "attente").length;
    const unreadNotifications = notifs.filter(n => !n.read).length;
    const upcomingEvents = evenements.length; // Compte tous les événements pour l'exemple
    const todoTasks = taches.filter(t => !t.completed).length; // Tâches non complétées

    document.getElementById("card-eleves").textContent = eleves.length;
    document.getElementById("card-profs").textContent = profs.length;
    document.getElementById("card-inscriptions").textContent = pendingInscriptions;
    document.getElementById("card-notifs").textContent = unreadNotifications;
    document.getElementById("notif-count-header").textContent = unreadNotifications; // Met à jour le badge du header

    document.getElementById("card-avenir").textContent = upcomingEvents;
    document.getElementById("card-a-faire").textContent = todoTasks;
}

// --- Fonctions pour le menu latéral et le header scrolé ---
const menuToggle = document.getElementById("menu-toggle");
const mainSidebar = document.getElementById("main-sidebar");
const sidebarOverlay = document.getElementById("sidebar-overlay");
const mainHeader = document.getElementById("main-header");
const h1Title = mainHeader.querySelector('h1');
const bellIcon = mainHeader.querySelector('.fa-bell');
const userIcon = mainHeader.querySelector('.fa-user-circle');
const settingsIcon = mainHeader.querySelector('.fa-cog');
const userToggleBtn = document.getElementById('user-toggle');
const menuToggleBtn = document.getElementById('menu-toggle');

function openSidebar() {
    mainSidebar.classList.remove("-translate-x-full");
    sidebarOverlay.classList.remove("hidden");
    setTimeout(() => {
        sidebarOverlay.classList.add("opacity-50");
    }, 10);
}

function closeSidebar() {
    mainSidebar.classList.add("-translate-x-full");
    sidebarOverlay.classList.remove("opacity-50");
    setTimeout(() => {
        sidebarOverlay.classList.add("hidden");
    }, 300);
}

menuToggle.addEventListener("click", () => {
    if (mainSidebar.classList.contains("-translate-x-full")) {
        openSidebar();
    } else {
        closeSidebar();
    }
});

sidebarOverlay.addEventListener("click", closeSidebar);

const navLinks = mainSidebar.querySelectorAll('nav a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth < 768) {
            closeSidebar();
        }
    });
});

function setInitialSidebarState() {
    if (window.innerWidth < 768) {
        mainSidebar.classList.add("-translate-x-full");
        sidebarOverlay.classList.add("hidden");
    } else {
        mainSidebar.classList.remove("-translate-x-full");
        sidebarOverlay.classList.add("hidden");
    }
}

setInitialSidebarState();
window.addEventListener('resize', setInitialSidebarState);


// Effet de défilement du Header
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        mainHeader.classList.add('scrolled-header');
        h1Title.classList.add('text-white');
        h1Title.classList.remove('text-primary-blue');
        bellIcon.classList.add('text-white');
        bellIcon.classList.remove('text-gray-600');
        userIcon.classList.add('text-white');
        userIcon.classList.remove('text-gray-700');
        settingsIcon.classList.add('text-white');
        settingsIcon.classList.remove('text-gray-600');
        userToggleBtn.classList.add('text-white');
        userToggleBtn.classList.remove('text-gray-700');
        menuToggleBtn.classList.add('text-white');
        menuToggleBtn.classList.remove('text-gray-600');
    } else {
        mainHeader.classList.remove('scrolled-header');
        h1Title.classList.remove('text-white');
        h1Title.classList.add('text-primary-blue');
        bellIcon.classList.remove('text-white');
        bellIcon.classList.add('text-gray-600');
        userIcon.classList.remove('text-white');
        userIcon.classList.add('text-gray-700');
        settingsIcon.classList.remove('text-white');
        settingsIcon.classList.add('text-gray-600');
        userToggleBtn.classList.remove('text-white');
        userToggleBtn.classList.add('text-gray-700');
        menuToggleBtn.classList.remove('text-white');
        menuToggleBtn.classList.add('text-gray-600');
    }
});


// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    initializeDemoData(); // Crée les données initiales si elles n'existent pas
    updateDashboardCards(); // Met à jour les cartes avec les données du localStorage
});