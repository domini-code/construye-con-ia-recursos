import { Trip } from './types';

const STORAGE_KEY = 'gastos-viaje-data';

export function loadTrip(): Trip | null {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? (JSON.parse(raw) as Trip) : null;
}

export function saveTrip(trip: Trip): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(trip));
}

export function clearTrip(): void {
  localStorage.removeItem(STORAGE_KEY);
}
