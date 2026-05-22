export interface MemberSocial {
  x?: string;
  instagram?: string;
  linkedin?: string;
}

export type MemberArea = 'Tecnología' | 'Logística' | 'Proyectos' | 'Comunicaciones' | 'General';

export interface MemberEventAssignment {
  eventId: number;
  role: string;
}

export interface MemberItem {
  id: number;
  name: string;
  /** Rol general dentro de Ethereum Lima */
  role: string;
  /** Área de pertenencia dentro de Ethereum Lima */
  area: MemberArea;
  photo: string;
  social: MemberSocial;
  /** Asignaciones a eventos con rol específico por evento */
  events: MemberEventAssignment[];
}

export const ROLE_ORDER: string[] = [
  'Lead de Eth Lima',
  'Core Team',
  'Coordinador de Tecnología',
  'Coordinador de Logística',
  'Coordinador de Alianzas',
  'Coordinadora de Comunicaciones',
  'Lead del Proyecto',
  'Voluntario',
];

export const MEMBER_AREAS: MemberArea[] = [
  'Tecnología',
  'Logística',
  'Proyectos',
  'Comunicaciones',
  'General',
];
