import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const API_URL = process.env.REACT_APP_API_URL;

console.log(`${API_URL}`);
