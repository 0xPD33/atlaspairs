import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useLocalSettingsStore = create(
  persist(
    (set) => ({
      showMouseLight: false,
      darkMode: false,
      setShowMouseLight: (showMouseLight) => set({ showMouseLight }),
      setDarkMode: (darkMode) => set({ darkMode }),
    }),
    {
      name: "atlaspairs-local-settings",
      getStorage: () => localStorage,
    }
  )
);
