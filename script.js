// 1. CONFIGURATION (Les adresses et variables globales)
const SERVER_URL = 'https://your-choice-backend.vercel.app/';

// 2. FONCTIONS DE MAINTENANCE (Vérification du serveur)
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

// 3. FONCTIONS D'AUTHENTIFICATION (Le code Google)
async function handleCredentialResponse(response) {
    const token = response.credential;
    // Plus tard, on ajoutera ici l'envoi vers SERVER_URL
    const paquet = await fetch(SERVER_URL + '/verifier-token', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'  // l'étiquette
      },
      body: JSON.stringify({ token: token })
    })
  const userInfo = await paquet.json();
  console.log(userInfo);
}

function IntercepterErreurXRSpatialTracking() {
    windows.addEventListener('error', function(event) {
        if (event.message.includes('xr-spatial-tracking')) {
            console.log("⚠️ XR-tracking ignoré: votre navigateur ne l'utilise pas, veuillez ignorer cette erreur si elle ne vous conserne pas.");
            event.preventDefault();
        }
    })
}

// 4. DÉMARRAGE (Ce qui s'exécute dès que la page est prête)
$(document).ready(function() {
    // On vérifie le serveur
    verifierServeur();

    // On initialise Google
    google.accounts.id.initialize({
        client_id: "898605285847-vblmutqem2vpcca9f4fmis0ne42nn4vp.apps.googleusercontent.com",
        callback: handleCredentialResponse
    });

    google.accounts.id.renderButton(
        $("#buttonDiv")[0],
        { theme: "outline", size: "large" }
    );
});
