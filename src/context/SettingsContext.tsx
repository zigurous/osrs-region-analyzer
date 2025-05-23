import React, { createContext, useContext, useState } from 'react'; // prettier-ignore
import type { BestInSlotSubcategories } from '../types';

type Settings = {
  bisLeagues: boolean;
  bisClues: boolean;
} & BestInSlotSubcategories;

const defaultSettings: Settings = {
  bisLeagues: false,
  bisClues: false,
  bisMeleeSubcategory: undefined,
  bisRangedSubcategory: undefined,
  bisMagicSubcategory: undefined,
  bisPrayerSubcategory: undefined,
};

interface SettingsContextData {
  settings: Settings;
  setSettings: React.Dispatch<React.SetStateAction<Settings>>;
}

const SettingsContext = createContext<SettingsContextData>({
  settings: defaultSettings,
  setSettings: () => undefined,
});

export default SettingsContext;

export function useSettingsContext(): SettingsContextData {
  return useContext<SettingsContextData>(SettingsContext);
}

export function SettingsContextProvider({ children }: React.PropsWithChildren) {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  return (
    <SettingsContext.Provider
      value={{
        settings,
        setSettings,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}
