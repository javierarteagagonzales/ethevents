import { defineMiddleware } from 'astro:middleware';

/**
 * Middleware de autenticación Basic Auth para el Admin Panel.
 * Protege /admin-dashboard-secret a nivel de red, eliminando
 * la necesidad de hashes SHA-256 expuestos en el cliente.
 *
 * Credenciales configurables vía variables de entorno:
 *   ADMIN_USER  — usuario (default: admin)
 *   ADMIN_PASS  — contraseña (requerida)
 */
export const onRequest = defineMiddleware(async ({ request, url, cookies, redirect }, next) => {
  // Solo proteger la ruta del admin
  if (!url.pathname.startsWith('/admin-dashboard-secret')) {
    return next();
  }

  // Verificar la cookie de sesión
  const authCookie = cookies.get('admin_session')?.value;
  const expectedToken = import.meta.env.ADMIN_PASS || 'default_fallback';

  if (!authCookie || authCookie !== expectedToken) {
    // Si no está autenticado, redirigir a la nueva página de login hermosa
    return redirect('/login');
  }

  // Autenticación exitosa — continuar
  return next();
});
