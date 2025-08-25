import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
export function cn(...inputs) {
	return twMerge(clsx(inputs));
}

export const APPOINTMENT_REASONS = {
  'consulta-general': 'Consulta General',
  'dolor-oido': 'Dolor de Oído',
  'perdida-auditiva': 'Pérdida Auditiva',
  'dolor-garganta': 'Dolor de Garganta',
  'congestion-nasal': 'Congestión Nasal',
  'vertigo-mareos': 'Vértigo/Mareos',
  'revision-audiometria': 'Revisión/Audiometría',
  'otro': 'Otro'
};

// Lunes: 1, Martes: 2, ..., Domingo: 0
const TIME_SLOTS_WEEKDAY = ['16:00', '16:30', '17:00', '17:30', '18:00', '18:30']; // 6 slots
const TIME_SLOTS_THU_FRI = ['10:00', '10:30', '11:00', '11:30', '12:00', '12:30']; // 6 slots

export const SCHEDULE = {
  1: TIME_SLOTS_WEEKDAY, // Lunes
  2: TIME_SLOTS_WEEKDAY, // Martes
  3: TIME_SLOTS_WEEKDAY, // Miércoles
  4: TIME_SLOTS_THU_FRI,  // Jueves
  5: TIME_SLOTS_THU_FRI,  // Viernes
  // Sábado (6) y Domingo (0) no tienen horarios
};

export const getSlotsForDay = (date) => {
  const dayOfWeek = date.getDay();
  return SCHEDULE[dayOfWeek] || [];
};

export const formatDate = (dateStr) => {
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const getReasonText = (reasonKey) => {
  return APPOINTMENT_REASONS[reasonKey] || reasonKey;
};