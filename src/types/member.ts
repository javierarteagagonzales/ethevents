export interface MemberSocial {
  x?: string;
  instagram?: string;
  linkedin?: string;
}

export interface MemberItem {
  id: number;
  name: string;
  role: string;
  photo: string;
  social: MemberSocial;
  eventIds: number[];
}

export const ROLE_ORDER: string[] = [
  'Lead de Eth Lima',
  'Core Team',
  'Coordinador de Tecnología',
  'Coordinador de Logística',
  'Coordinador de Alianzas',
  'Coordinador de Comunicaciones',
  'Lead del Proyecto',
  'Voluntario',
];
