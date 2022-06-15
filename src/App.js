import logo from './logo.svg';
import './App.css';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

/* elements */
import Root from './components/elements/root';
import Header from './components/elements/header';
import Footer from './components/elements/footer';

import theme from "./styles/theme";

/* routes */
import routes from './config/routes';

/* pages */
import TagScanPage from './pages/tagScanPage';
import TagNFTPage from './pages/tagNFTPage';
import PoipPage from './pages/poipPage';
import DevicePage from './pages/devicePage';

const PageElement = ({name}) => {
  return (<div style={{ height: 50 }}>{name}</div>);
}


function App() {
  return (
    <ThemeProvider theme={theme}>
      <Root id='app-root'>
        <BrowserRouter>
          <Header/>
          <Routes>
            <Route path={routes.home} element={<TagScanPage/>}/>
            <Route path={routes.scan} element={<TagScanPage/>}/>
            <Route path={routes.device} element={<DevicePage/>}/>
            <Route path={routes.nft} element={<TagNFTPage/>}/>
            <Route path={routes.poip} element={<PoipPage/>}/>
          </Routes>
          <Footer/>
        </BrowserRouter>
      </Root>
    </ThemeProvider>
  );
}

export default App;
