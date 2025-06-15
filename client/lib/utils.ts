import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

type CacheEntry<T> = { data: T; expiry: number };

export function setLocalCache<T>(key: string, value: T, ttlMinutes = 10) {
  const entry: CacheEntry<T> = {
    data: value,
    expiry: Date.now() + ttlMinutes * 60 * 1000,
  };
  localStorage.setItem(key, JSON.stringify(entry));
}

export function getLocalCache<T>(key: string): T | null {
  const raw = localStorage.getItem(key);
  if (!raw) return null;
  try {
    const { data, expiry } = JSON.parse(raw) as CacheEntry<T>;
    if (Date.now() > expiry) {
      localStorage.removeItem(key);
      return null;
    }
    return data;
  } catch {
    localStorage.removeItem(key);
    return null;
  }
}