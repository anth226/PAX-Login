import React, { createContext, useContext, useMemo, useState } from 'react'
import { SettingsContextProps } from '../../shared/types/context';
import { defaultThemeValues } from './config-setting';
import { useMediaQuery } from '@mui/material';



const initialState: SettingsContextProps = {
  ...defaultThemeValues,
  onToggleColorMode: () => {},
}
export const SettingsContext = createContext(initialState);

export const useSettingsContext = () => {
  const context = useContext(SettingsContext);
  if (!context) throw new Error('useSettingsContext must be use inside ThemeProvider');

  return context;
};


function SettingsProvider({children}) {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const [themeMode, setThemeMode] = useState(defaultThemeValues.themeMode)

    React.useEffect(()=>{
      setThemeMode(prefersDarkMode ? 'dark' : 'light')
    },[prefersDarkMode])
    
    const onToggleColorMode = () => {
        setThemeMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    }

    const memoizedValue = useMemo(() => ({
      // Mode
      themeMode,
      onToggleColorMode,
    }), [themeMode]);


  return (
    <SettingsContext.Provider value={memoizedValue}>{children}</SettingsContext.Provider>
  )
}

export default SettingsProvider