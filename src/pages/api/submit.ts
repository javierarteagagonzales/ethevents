import type { APIRoute } from 'astro';

import { SubmitEventSchema, formatZodErrors } from '../../lib/schemas';

export const prerender = false;

/**
 * Endpoint server-side para envío de propuestas de eventos.
 * Crea un GitHub Issue con los datos del formulario, consumido
 * internamente por /submit sin redirigir al usuario fuera del ecosistema.
 */
export const POST: APIRoute = async ({ request }) => {
  const body = await request.json();

  // Validación con Zod
  const validationResult = SubmitEventSchema.safeParse(body);
  
  if (!validationResult.success) {
    return new Response(
      JSON.stringify({ error: 'Error de validación: ' + formatZodErrors(validationResult.error) }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
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
    tags,
    parentId,
  } = validationResult.data;

  const GITHUB_TOKEN = import.meta.env.GITHUB_TOKEN;
  const REPO = 'javierarteagagonzales/ethevents';

  if (!GITHUB_TOKEN) {
    return new Response(
      JSON.stringify({ error: 'GITHUB_TOKEN no configurado en el servidor' }),
      { status: 503, headers: { 'Content-Type': 'application/json' } }
    );
  }

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

### 🔗 Evento Padre ID (opcional)
${parentId || '_No response_'}

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
        'User-Agent': 'ETH-Lima-Astro-SSR',
      },
      body: JSON.stringify({
        title: `[EVENTO] ${nombre}`,
        body: issueBody,
        labels: ['evento', 'pendiente'],
      }),
    });

    const data = await response.json();

    if (response.ok) {
      return new Response(
        JSON.stringify({ url: data.html_url, number: data.number }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    } else {
      console.error('GitHub API Error:', data);
      return new Response(
        JSON.stringify({ error: data.message || 'Error creating issue' }),
        { status: response.status, headers: { 'Content-Type': 'application/json' } }
      );
    }
  } catch (error: any) {
    console.error('Server Error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal Server Error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
