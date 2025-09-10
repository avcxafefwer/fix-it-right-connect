import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format a number or a numeric range string into a localized currency string.
 * If input is like "$1500" or "$1,500" or "1500 - 2500" it will attempt to parse numbers
 * and format them using Intl.NumberFormat for the provided locale (default 'en-US').
 */
export function formatCurrency(input: string, locale = 'en-US', currency = 'USD') {
  if (!input) return input;

  // extract numbers (allow commas and periods)
  const nums = [...input.matchAll(/\d[\d,\.]+/g)].map(m => m[0].replace(/,/g, ''))
    .map(s => Number(s)).filter(n => !Number.isNaN(n));

  if (nums.length === 0) return input;

  const nf = new Intl.NumberFormat(locale, { style: 'currency', currency, maximumFractionDigits: 0 });

  if (nums.length === 1) return nf.format(nums[0]);

  // range - format both
  return nums.map(n => nf.format(n)).join(' - ');
}
