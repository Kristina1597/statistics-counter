const { createTheme } = require('@material-ui/core');

export const theme = createTheme({
    breakpoints: {
        values: {
            xxs: 0, // small phone
            xs: 300, // phone
            sm: 600, // tablets
            md: 900, // small laptop
            lg: 1200, // desktop
            xl: 1536 // large screens
        }
    }
});