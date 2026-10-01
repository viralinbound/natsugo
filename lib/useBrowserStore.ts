"use client";

import { useSyncExternalStore } from "react";

const listeners = new Set<() => void>();
const notify = () => listeners.forEach((l) => l());

const subscribe = (cb: () => void) => {
  listeners.add(cb);
  window.addEventListener("storage", cb);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", cb);
  };
};

export function readLocal(key: string) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function writeLocal(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {}
  notify();
}

// Reactive localStorage value (string). Always null during server render and hydration.
export function useLocalStorage(key: string) {
  return useSyncExternalStore(subscribe, () => readLocal(key), () => null);
}

const noop = () => () => {};
export function useHydrated() {
  return useSyncExternalStore(noop, () => true, () => false);
}

// A clock that ticks every 30s: enough for "is this flashcard due yet?" checks.
const subscribeClock = (cb: () => void) => {
  const id = setInterval(cb, 30_000);
  return () => clearInterval(id);
};
const clockSnapshot = () => Math.floor(Date.now() / 30_000) * 30_000;
export function useClock() {
  return useSyncExternalStore(subscribeClock, clockSnapshot, () => 0);
}
