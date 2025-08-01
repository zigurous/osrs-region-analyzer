import React, { createContext, useCallback, useContext, useState } from 'react'; // prettier-ignore
import type { BestInSlotSubcategories } from '../types';

type Settings = {
  leagues: boolean;
  bisClues: boolean;
  bisStrict: boolean;
  dropsPets: boolean;
  dropsCosmetics: boolean;
  minSkillLevel: number | '';
  maxSkillLevel: number | '';
} & BestInSlotSubcategories;

const defaultSettings: Settings = {
  leagues: false,
  bisClues: false,
  bisStrict: false,
  bisMeleeSubcategory: undefined,
  bisRangedSubcategory: undefined,
  bisMagicSubcategory: undefined,
  bisPrayerSubcategory: undefined,
  dropsPets: false,
  dropsCosmetics: false,
  minSkillLevel: '',
  maxSkillLevel: '',
};

declare function Setter<K extends keyof Settings>(
  key: K,
  value: Settings[K],
): void;

type SettingsContextData = Settings & {
  set: typeof Setter;
};

const SettingsContext = createContext<SettingsContextData>({
  ...defaultSettings,
  set: () => undefined,
});

export default SettingsContext;

export function useSettingsContext(): SettingsContextData {
  return useContext<SettingsContextData>(SettingsContext);
}

export function SettingsContextProvider({ children }: React.PropsWithChildren) {
  const [settings, setSettings] = useState<Settings>(defaultSettings);

  const set = useCallback<typeof Setter>((key, value) => {
    setSettings(state => ({ ...state, [key]: value }));
  }, []);

  return (
    <SettingsContext.Provider
      value={{
        ...settings,
        set,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}
