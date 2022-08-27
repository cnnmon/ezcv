/* eslint-disable react/jsx-no-constructed-context-values */
import { createContext, useContext, useState } from 'react';
import { getDefaultSections } from '../constants/sections';

const AppContext = createContext();

export function AppWrapper({ children }) {
  const [sections, setSections] = useState(getDefaultSections());

  return (
    <AppContext.Provider value={{ sections, setSections }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
