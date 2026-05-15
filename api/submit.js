export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const {
    nombre,
    descripcion,
    fecha,
    'fecha-fin': fechaFin,
    hora,
    tipo,
    ubicacion,
    link,
    organizador,
    tags
  } = req.body;

  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  const REPO = 'javierarteagagonzales/ethevents';

  // Construct the issue body exactly as the template expects
  const issueBody = `### 📌 Nombre del Evento
${nombre || '_No response_'}

### 📝 Descripción
${descripcion || '_No response_'}

### 🗓️ Fecha
${fecha || '_No response_'}

### 🗓️ Fecha de fin (opcional)
${fechaFin || '_No response_'}

### ⏰ Hora
${hora || '_No response_'}

### 📍 Ubicación
${ubicacion || '_No response_'}

### 🏷️ Tipo de evento
${tipo || '_No response_'}

### 🔗 Link de registro / más info
${link || '_No response_'}

### 🏷️ Tags
${tags || '_No response_'}

### 👤 Organizador / Contacto
${organizador || '_No response_'}

### ✅ Confirmación
- [x] El evento es real y tiene fecha confirmada.
- [x] Acepto que los maintainers pueden editar o rechazar el issue.
- [x] El evento está relacionado con Web3 / Ethereum / blockchain.`;

  try {
    const response = await fetch(`https://api.github.com/repos/${REPO}/issues`, {
      method: 'POST',
      headers: {
        'Authorization': `token ${GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'Vercel-Serverless-Function'
      },
      body: JSON.stringify({
        title: `[EVENTO] ${nombre}`,
        body: issueBody,
        labels: ['evento', 'pendiente']
      })
    });

    const data = await response.json();

    if (response.ok) {
      return res.status(200).json({ url: data.html_url, number: data.number });
    } else {
      console.error('GitHub API Error:', data);
      return res.status(response.status).json({ error: data.message || 'Error creating issue' });
    }
  } catch (error) {
    console.error('Server Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
