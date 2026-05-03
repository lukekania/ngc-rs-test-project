import { ResolveFn } from '@angular/router';

const ITEMS: Record<string, { id: string; name: string; summary: string }> = {
  '1': { id: '1', name: 'Alpha', summary: 'First demo item.' },
  '2': { id: '2', name: 'Bravo', summary: 'Second demo item.' },
  '3': { id: '3', name: 'Charlie', summary: 'Third demo item.' },
};

export const detailResolver: ResolveFn<{ id: string; name: string; summary: string } | null> = (
  route,
) => {
  const id = String(route.paramMap.get('id'));
  return ITEMS[id] ?? null;
};

export const allItems = () => Object.values(ITEMS);
