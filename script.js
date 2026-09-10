alert("SCRIPT OK");
const photo = document.getElementById("photo");
const exercice = document.getElementById("exercice");
const message = document.getElementById("message");
const bouton = document.getElementById("resoudre");

if (photo) {
  photo.addEventListener("change", function () {
    if (photo.files.length > if (bouton) {
  bouton.addEventListener("click", async function () {
    const texte = exercice ? exercice.value.trim() : "";

    if (!texte) {
      message.textContent = "Écris ton exercice pour commencer.";
      return;
    }

    message.textContent = "🤖 DevoirIA réfléchit...";

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: texte
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erreur");
      }

      message.textContent = data.answer;
    } } catch (error) {
  message.textContent = "❌ " + error.message;
}
      
  
    }
  });

