verifierServeur();
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
        $("#buttonDiv")[0],
        { type: "standard", theme: "outline", size: "medium" }
    );
}
);