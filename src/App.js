import logo from './logo.svg';
import './App.css';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Root from './components/elements/root';
import Header from './components/elements/header';

import theme from "./styles/theme";

/* pages */
import TagScanPage from './pages/tagScanPage';
import TagNFTPage from './pages/tagNFTPage';
import Footer from './components/elements/footer';

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
            <Route path="/" element={<TagNFTPage/>}/>
            <Route path="/tag-scan" element={<TagScanPage/>}/>
            <Route path="/tag-nft" element={<TagNFTPage/>}/>
            <Route path="/tag-poip" element={<PageElement name="poip"/>}/>
            <Route path="/poip" element={<PageElement name="poip"/>}/>
          </Routes>
          <Footer/>
        </BrowserRouter>
      </Root>
    </ThemeProvider>
  );
}

export default App;
