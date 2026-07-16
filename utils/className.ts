import { type ClassValue, clsx } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

// Register the design system's custom font-size utilities.
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [
        {
          text: [
            'h1', 'h2', 'h3', 'h4', 'h5',
            'body-l', 'body-m', 'body-s', 'body-xs', 'body-2xs',
            'caption-l', 'caption-m', 'caption-s',
          ],
        },
      ],
    },
  },
});

/**
 * This function conditionally merges tailwind class names into a single valid name cluster string.
 * @param inputs Array of tailwind class names (or name clusters) to be added
 * @returns The formatted compound of tailwind class names.
 */
export default function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
