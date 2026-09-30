import type { CharacterCard } from './contracts';
import { PRODUCT_CARDS } from './cards';

// Historical versions stay addressable by id@version; `current` is only what NEW episodes start on.
const cards = new Map<string, CharacterCard>();
const current = new Map<string, string>();
const key = (id: string, version: string) => `${id}@${version}`;

export function getCharacterCard(id: string, version: string): CharacterCard | null {
  return cards.get(key(id, version)) || null;
}

export function registerCharacterCard(card: CharacterCard, { makeCurrent = true } = {}): void {
  cards.set(key(card.id, card.version), Object.freeze(card));
  if (makeCurrent) current.set(card.id, card.version);
}

/** Cards a new episode in this unit may start on (latest registered version of each character). */
export function currentCharacterCards(unitId: string): CharacterCard[] {
  return Array.from(current.entries())
    .map(([id, version]) => cards.get(key(id, version))!)
    .filter(card => card && card.unitId === unitId);
}

function registerProductCards() {
  PRODUCT_CARDS.forEach(card => registerCharacterCard(card));
}
registerProductCards();

export function __replaceCharacterCardsForTests(next: CharacterCard[]): void {
  cards.clear();
  current.clear();
  next.forEach(card => registerCharacterCard(card));
}

export function __restoreProductCardsForTests(): void {
  cards.clear();
  current.clear();
  registerProductCards();
}
