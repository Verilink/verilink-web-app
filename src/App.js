import logo from './logo.svg';
import './App.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
//  "@mui/core/styles";
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Root from './components/root';
import Header from './components/header';

const rootTheme = createTheme({
  typography: {
    fontFamily: ["Jost"].join(","),
    fontSize: 14
  },

  palette: {
    primary: {
      main: "#24363C"
    },
    secondary: {
      main: "#AD968D"
    },
    highlight: {
      main: "#AD968D"
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

  background: {
    colors: {
      primary: {
        main: "#E5E5E5",
      },
      secondary: {
        main: "#F8F8F8"
      }

    }
  },
});


function App() {
  return (
    <ThemeProvider theme={rootTheme}>
      <Root id='app-root'>
        <Header/>
        <div style={{ height: 50 }}></div>
      </Root>
    </ThemeProvider>
  );
}

export default App;
