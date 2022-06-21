import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  /*
  typography: {
    fontFamily: ["Jost"].join(","),
    fontSize: 14
  },
  */

  palette: {
    primary: {
      main: "#24363C"
    },
    secondary: {
      main: "#AD968D"
    },
    highlight: {
      main: "#AD968D"
    },
    background: {
      main: "#E5E5E5",
      secondary: "#F8F8F8"
    }
  },

  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    }
  },
});

export default theme;