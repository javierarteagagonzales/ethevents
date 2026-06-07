import { z } from 'zod';

// ──────────────────────────────────────────────
// ESQUEMAS DE VALIDACIÓN ZOD — ETH Lima
// ──────────────────────────────────────────────

/**
 * Categorías válidas de eventos.
 */
export const EventTypeEnum = z.enum([
  'meetup',
  'conference',
  'workshop',
  'hackathon',
  'bootcamp',
  'cohorte',
  'buildathon',
]);

/**
 * Esquema para el envío de propuestas de evento desde /submit.
 * Campos del formulario público (nombres en español).
 */
export const SubmitEventSchema = z.object({
  nombre: z
    .string()
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .max(200, 'El nombre no puede exceder 200 caracteres'),
  descripcion: z
    .string()
    .min(10, 'La descripción debe tener al menos 10 caracteres')
    .max(2000, 'La descripción no puede exceder 2000 caracteres'),
  fecha: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Formato de fecha inválido (YYYY-MM-DD)'),
  'fecha-fin': z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Formato de fecha inválido')
    .optional()
    .or(z.literal('')),
  hora: z
    .string()
    .max(50)
    .optional()
    .or(z.literal('')),
  tipo: EventTypeEnum,
  ubicacion: z
    .string()
    .min(2, 'La ubicación debe tener al menos 2 caracteres')
    .max(200),
  link: z
    .string()
    .url('URL inválida')
    .optional()
    .or(z.literal('')),
  organizador: z
    .string()
    .max(200)
    .optional()
    .or(z.literal('')),
  tags: z
    .string()
    .max(500)
    .optional()
    .or(z.literal('')),
  parentId: z
    .union([z.string(), z.number()])
    .optional()
    .or(z.literal('')),
});

export type SubmitEventInput = z.infer<typeof SubmitEventSchema>;

// ──────────────────────────────────────────────
// ESQUEMAS PARA ADMIN — save-json
// ──────────────────────────────────────────────

/**
 * Esquema de un evento completo (events.json).
 */
export const EventItemSchema = z.object({
  id: z.number().int().positive(),
  parentId: z.number().int().positive().optional(),
  title: z.string().min(1),
  description: z.string(),
  date: z.string(),
  endDate: z.string().optional().or(z.literal('')),
  time: z.string().optional().or(z.literal('')),
  location: z.string(),
  type: z.string(),
  link: z.string().optional().or(z.literal('')),
  videoLink: z.string().optional().or(z.literal('')),
  tags: z.array(z.string()).default([]),
  image: z.string().optional().or(z.literal('')),
  organizer: z.string().optional().or(z.literal('')),
  issueUrl: z.string().optional().or(z.literal('')),
  issueNum: z.number().optional().default(0),
  state: z.string().optional().or(z.literal('')),
  createdAt: z.string().optional().or(z.literal('')),
  // Campos dinámicos del admin dashboard
  status: z.string().optional(),
});

/**
 * Esquema de asignación de evento a miembro.
 */
export const MemberEventAssignmentSchema = z.object({
  eventId: z.number().int(),
  role: z.string(),
});

/**
 * Esquema de redes sociales de miembro.
 */
export const MemberSocialSchema = z.object({
  x: z.string().optional().or(z.literal('')),
  instagram: z.string().optional().or(z.literal('')),
  linkedin: z.string().optional().or(z.literal('')),
});

/**
 * Áreas válidas de miembro.
 */
export const MemberAreaEnum = z.enum([
  'Tecnología',
  'Logística',
  'Proyectos',
  'Comunicaciones',
  'General',
]);

/**
 * Esquema de un miembro completo (members.json).
 */
export const MemberItemSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1),
  role: z.string(),
  area: MemberAreaEnum,
  photo: z.string().optional().or(z.literal('')),
  social: MemberSocialSchema.default({ x: '', instagram: '', linkedin: '' }),
  events: z.array(MemberEventAssignmentSchema).default([]),
});

/**
 * Esquema para el payload de /api/save-json.
 */
export const SaveJsonPayloadSchema = z.object({
  filename: z.enum(['events.json', 'members.json']),
  content: z.union([
    z.array(EventItemSchema),
    z.array(MemberItemSchema),
  ]),
});

/**
 * Formatea errores de Zod en un string legible.
 */
export function formatZodErrors(error: z.ZodError): string {
  return error.issues
    .map((issue) => `${issue.path.join('.')}: ${issue.message}`)
    .join('; ');
}
