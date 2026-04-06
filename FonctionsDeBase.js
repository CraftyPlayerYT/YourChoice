const SERVER_URL = 'https://your-choice-backend.vercel.app';

async function verifierServeur() {
  try {
    const response = await fetch(SERVER_URL);
    const texte = await response.text();
    console.log("Statut du Backend :", texte);
  } catch (error) {
    console.error("Impossible de joindre le serveur :", error);
  }
}

function creercookie(nom, valeur, datedexpiration) {
    let date = new Date();
    
    if (typeof datedexpiration === "number") {
        date.setDate(date.getDate() + datedexpiration);
    } else if (datedexpiration === "aucune") {
        date.setFullYear(date.getFullYear() + 100);
    } else {
        console.error("Erreur dans la création d'un cookie : date invalide");
        return;
    }

    document.cookie = nom + "=" + valeur + "; expires=" + date.toUTCString() + "; path=/";
}

function lirecookie(nom) {
    let cookies = document.cookie.split("; ");
    for (let cookie of cookies) {
        let [cle, valeur] = cookie.split("=");
        if (cle === nom) return valeur;
    }
    return null;
}

function supprimercookie(nom) {
    creercookie(nom, "", -10);
}

function EstDejaVenuSurLeSite () {
  let a = lirecookie("EstDejaVenuSurLeSite");
  
  if (a === "true") { // ✅ On vérifie le texte "true" avec des guillemets
    console.log("Cookie détecté, accès autorisé !");
    return; 
  } else {
    window.location.href = "verification/capcha";
  }
}

EstDejaVenuSurLeSite();