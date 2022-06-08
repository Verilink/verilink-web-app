import logo from './logo.svg';
import './App.css';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Root from './components/root';
import Header from './components/header';

import theme from "./styles/theme";

/* pages */
import TagScanPage from './pages/tagScanPage';
import Footer from './components/footer';

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
              <Route path="/" element={<TagScanPage/>}/>
              <Route path="/tag-scan" element={<PageElement name="scan-tag"/>}/>
              <Route path="/tag-nft" element={<PageElement name="nft"/>}/>
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
