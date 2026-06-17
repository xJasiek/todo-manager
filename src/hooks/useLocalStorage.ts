"use client";

import { useEffect, useState } from "react";

/**
 * Generischer Hook für persistenten State im Local Storage.
 *
 * Verhält sich wie `useState`, synchronisiert den Wert aber zusätzlich mit
 * dem `localStorage` des Browsers. Dadurch bleiben Daten nach einem Reload
 * erhalten.
 *
 * Wichtig: `localStorage` ist nur im Browser verfügbar. Beim Server-Side
 * Rendering (Next.js) wird daher zunächst der `initialValue` verwendet und
 * der gespeicherte Wert erst nach dem Mounten geladen, um Hydration-Fehler
 * zu vermeiden.
 *
 * @param key   Schlüssel, unter dem der Wert gespeichert wird.
 * @param initialValue  Standardwert, falls noch nichts gespeichert ist.
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, React.Dispatch<React.SetStateAction<T>>, boolean] {
  // Markiert, ob der Wert aus dem Local Storage bereits geladen wurde.
  const [hydrated, setHydrated] = useState(false);
  const [value, setValue] = useState<T>(initialValue);

  // Beim ersten Rendern im Browser den gespeicherten Wert einlesen.
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(key);
      if (stored !== null) {
        setValue(JSON.parse(stored) as T);
      }
    } catch (error) {
      console.error("Fehler beim Lesen aus dem Local Storage:", error);
    } finally {
      setHydrated(true);
    }
    // Nur beim Mount ausführen.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  // Bei jeder Wertänderung (nach dem Hydrieren) im Local Storage speichern.
  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Fehler beim Schreiben in den Local Storage:", error);
    }
  }, [key, value, hydrated]);

  return [value, setValue, hydrated];
}
