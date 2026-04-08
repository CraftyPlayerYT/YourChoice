const emailutilisateur = ElementId("email");
const motdepasse = ElementId("motdepasse");

async function envoyerCompteAuServer(emaildelutilisateur, motdepasse, emailDeRecuperation) {
    const paquetcreationdecompte = await fetch(SERVER_URL + '/verifierConnexionDuCompte', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: emaildelutilisateur,
            motdepasse: motdepasse,
        })
    })
}

async function TestReussi(token) {
    const paquetcloudflare = await fetch(SERVER_URL + '/verifier-token-cloudflare', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'  // l'étiquette
      },
      body: JSON.stringify({ turnstileToken: token })
    });
  const resultat = await paquetcloudflare.json();
  console.log(resultat);
  if(resultat.success) {
    creercookie("aVerifieCloudflarePourCreationDeCompte", "true", 0.01389);
  };
};

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

$(document).ready(function(){
    verifierServeur();
    google.accounts.id.initialize({
        client_id: "445190739638-9eruderb7lulctvr5cdrv6njhb19prkr.apps.googleusercontent.com",
        callback: handleCredentialResponse
    });
    google.accounts.id.renderButton(
        $("#SeConnecterAvecGoogle")[0],
        { type: "standard", theme: "outline", size: "medium" }
    );
    BoutonClique("se_connecter", function(){
        envoyerCompteAuServer(emailutilisateur.value, motdepasse.value);
    });
});
