let MessageTestRate = document.getElementById("MessageTestRate");
let BoutonRafraichir = document.getElementById("BoutonRafraichir");
MessageTestRate.style.display = "none";
BoutonRafraichir.style.display = "none";
function TestReussi(token) {
  console.log("✅ Utilisateur confirmé !");
  creercookie("EstDejaVenuSurLeSite", "true", 999);
  window.href.location = "../";
};

function TestRate(){
  console.warn("Attention ! Le test a raté, veuillez refaire ou réessayer plus tard.");
  MessageTestRate.style.display = "block";
  BoutonRafraichir.style.display = "block";
};

function TestExpire(){
  console.warn("Le test a expiré, veuillez rafraîchir la page.")
  BoutonRafraichir.style.display = "block";
}

BoutonRafraichir.addEventListener("click", function() {
  location.reload();
})
