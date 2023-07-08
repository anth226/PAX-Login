export type ThemeModeValue = 'light' | 'dark';
export type ThemeDirectionValue = 'rtl' | 'ltr';
export type ThemeContrastValue = 'default' | 'bold';
export type ThemeLayoutValue = 'vertical' | 'horizontal' | 'mini';
export type ThemeColorPresetsValue = 'default' | 'cyan' | 'purple' | 'blue' | 'orange' | 'red';
export type ThemeStretchValue = boolean;

export type SettingsValuesProps = {
  themeMode: ThemeModeValue;
  themeLayout?: ThemeLayoutValue;
  themeStretch?: ThemeStretchValue;
  themeContrast?: ThemeContrastValue;
  themeDirection?: ThemeDirectionValue;
  themeColorPresets?: ThemeColorPresetsValue;
};

export type SettingsContextProps = SettingsValuesProps & {
    onToggleColorMode: VoidFunction,
}