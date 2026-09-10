export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Méthode non autorisée" });
  }
try {
  if (!process.env.AI_GATEWAY_API_KEY) {
    return res.status(500).json({ error: "CLÉ ABSENTE" });
  }

  const { message } = req.body;

  

    if (!message) {
      return res.status(400).json({ error: "Message manquant" });
    }

    const response = await fetch(
      "https://ai-gateway.vercel.sh/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.AI_GATEWAY_API_KEY}`,
        },
        body: JSON.stringify({
          model: "openai/gpt-5.4",
          messages: [
            {
              role: "system",
              content:
                "Tu es DevoirIA, un assistant scolaire. Explique les exercices étape par étape avec des explications simples.",
            },
            {
              role: "user",
              content: message,
            },
          ],
          stream: false,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        error: data.error?.message || "Erreur de l'IA",
      });
    }

    return res.status(200).json({
      answer: data.choices?.[0]?.message?.content || "Pas de réponse.",
    });
  } catch (error) {
    return res.status(500).json({
      error: "Erreur serveur",
    });
  }
}
