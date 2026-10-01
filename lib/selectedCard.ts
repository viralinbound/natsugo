"use client";

import { useEffect, useState } from "react";

// Only one card on a page is highlighted at a time: selecting one tells the others to let go.
const EVENT = "np-card-select";

export function useSelectedCard(id: string): [boolean, () => void] {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const off = (e: Event) => (e as CustomEvent<string>).detail !== id && setOn(false);
    window.addEventListener(EVENT, off);
    return () => window.removeEventListener(EVENT, off);
  }, [id]);
  const select = () => {
    setOn(true);
    window.dispatchEvent(new CustomEvent(EVENT, { detail: id }));
  };
  return [on, select];
}
