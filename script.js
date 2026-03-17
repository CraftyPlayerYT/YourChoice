const SERVER_URL = 'https://dailytask-backend.onrender.com';

async function verifierServeur() {
  try {
    const response = await fetch(SERVER_URL);
    const texte = await response.text();
    console.log("Statut du Backend :", texte);
  } catch (error) {
    console.error("Impossible de joindre le serveur :", error);
  }
}

// On lance la vérification au démarrage
verifierServeur();
