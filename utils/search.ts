// Name of the URL query parameter holding the search query.
export const SEARCH_PARAM = 'q';

// Relevance points given to a term depending on how it matches a field.
const EXACT_FIELD = 8; // The field is the term ('Login' for 'login').
const EXACT_WORD = 6; // A word of the field is the term ('Page de login' for 'login').
const FIELD_PREFIX = 5; // The field starts with the term ('Login page' for 'log').
const WORD_PREFIX = 4; // A word of the field starts with the term ('Page de login' for 'log').
const SUBSTRING = 2; // The term appears anywhere else ('Relogin' for 'log').

// Multipliers making a title match outweigh a description one.
const TITLE_WEIGHT = 3;
const DESCRIPTION_WEIGHT = 1;

/**
 * Normalize a text for comparison.
 * @param text Raw text.
 * @returns Comparable form of the text.
 */
export function normalize(text: string): string {
  return text.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase().trim();
}

/**
 * Split a query into the distinct terms it is made of.
 * @param query Raw search query.
 * @returns Normalized terms without duplicates.
 */
function toTerms(query: string): string[] {
  const normalized = normalize(query);
  return normalized === '' ? [] : [...new Set(normalized.split(/\s+/))];
}

/**
 * Score how well a single term matches a single field.
 * @param term Normalized search term.
 * @param field Normalized field of the task.
 * @returns Relevance points of the best match found, or 0 when the term is absent.
 */
function scoreField(term: string, field: string): number {
  if (field === '' || !field.includes(term)) return 0;
  if (field === term) return EXACT_FIELD;

  const words = field.split(/[^\p{L}\p{N}]+/u).filter((word) => word !== '');
  if (words.includes(term)) return EXACT_WORD;
  if (field.startsWith(term)) return FIELD_PREFIX;
  if (words.some((word) => word.startsWith(term))) return WORD_PREFIX;
  return SUBSTRING;
}

/**
 * Compare a search query to the name and description of a task.
 * Every term of the query must appear in one of both fields for the task to match.
 * @param query Raw search query (a blank one matches every task).
 * @param title Task name.
 * @param description Task description, when it has one.
 * @returns Relevance score, the higher the better, or 0 when the task does not match.
 */
export function scoreTask(query: string, title: string, description?: string | null): number {
  const terms = toTerms(query);
  if (terms.length === 0) return 1;

  const name = normalize(title);
  const details = normalize(description ?? '');

  let total = 0;
  for (const term of terms) {
    const score = scoreField(term, name) * TITLE_WEIGHT + scoreField(term, details) * DESCRIPTION_WEIGHT;
    if (score === 0) return 0;
    total += score;
  }
  return total;
}

/**
 * Filter out the items that do not match the query, then sort the rest by relevance.
 * Equally relevant items keep their incoming order (the sort is stable).
 * @param items Items to search through.
 * @param query Raw search query (a blank one returns the items untouched).
 * @param fields Reads the name and description to match from an item.
 * @returns Matching items, most relevant first.
 */
export function searchByRelevance<T>(
  items: T[],
  query: string,
  fields: (item: T) => { title: string, description?: string | null },
): T[] {
  if (normalize(query) === '') return items;

  return items
    .map((item) => {
      const { title, description } = fields(item);
      return { item, score: scoreTask(query, title, description) };
    })
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((entry) => entry.item);
}

/**
 * Read a search query out of the 'searchParams' of a page.
 * @param value Value of the search parameter, as provided by NextJS.
 * @returns Query string, or empty string when the parameter is absent.
 */
export function toSearchQuery(value: string | string[] | undefined): string {
  if (typeof value === 'string') return value;
  return Array.isArray(value) ? (value[0] ?? '') : '';
}
