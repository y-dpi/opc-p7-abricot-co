import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * This function conditionally merges tailwind class names into a single valid name cluster string.
 * @param inputs Array of tailwind class names (or name clusters) to be added
 * @returns The formatted compound of tailwind class names.
 */
export default function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}