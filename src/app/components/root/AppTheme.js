'use client'
import * as React from 'react';
import { ThemeProvider, createTheme, useTheme } from '@mui/material/styles';
import { inputsCustomizations } from './customizations/inputs';
import { feedbackCustomizations } from './customizations/feedback';
import { navigationCustomizations } from './customizations/navigation';
import { dataDisplayCustomizations } from './customizations/dataDisplay';
import { surfacesCustomizations } from './customizations/surfaces';
import { colorSchemes, typography, shadows, shape } from './themePrimitives';

function AppTheme(props) {
  const { children, disableCustomTheme, themeComponents } = props;
  const { mode } = useTheme();

  const theme = React.useMemo(() => {
    return disableCustomTheme
      ? {}
      : createTheme({
        cssVariables: {
          colorSchemeSelector: 'data-mui-color-scheme',
          cssVarPrefix: 'template',
        },
        colorSchemes,
        typography,
        shadows,
        shape,
        components: {
          ...inputsCustomizations,
          ...feedbackCustomizations,
          ...navigationCustomizations,
          ...surfacesCustomizations,
          ...themeComponents,
        },
        palette: {
          mode: mode === 'system' ? 'light' : mode, // Respect system preference
        },
      });
  }, [disableCustomTheme, themeComponents, mode]);

  if (disableCustomTheme) {
    return <React.Fragment>{children}</React.Fragment>;
  }
  return (
    <ThemeProvider theme={theme} disableTransitionOnChange>
      {children}
    </ThemeProvider>
  );
}

export default AppTheme;