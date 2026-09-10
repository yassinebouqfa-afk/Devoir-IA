const photo = document.getElementById("photo");
const exercice = document.getElementById("exercice");
const message = document.getElementById("message");
const bouton = document.getElementById("resoudre");

if (photo) {
  photo.addEventListener("change", function () {
    if (photo.files.length > 0) {
      message.textContent = "Photo ajoutée ✅";
    }
  });
}

if (bouton) {
  bouton.addEventListener("click", function () {
    const texte = exercice ? exercice.value.trim() : "";
    const hasPhoto = photo && photo.files.length > 0;

    if (!texte && !hasPhoto) {
      message.textContent = "Ajoute une photo ou écris ton exercice.";
      return;
    }

    message.textContent =
      "Exercice reçu ✅ La connexion à l'IA sera ajoutée ensuite.";
  });
}
