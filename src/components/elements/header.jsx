import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from "@mui/material/styles";
import { useNavigate } from 'react-router-dom';
import routes from '../../config/routes';

import AppStoreButton from '../buttons/appStoreButton';
import LogoButton from '../buttons/logoButton';

const toolBarStyle = {
  display: "flex",
  justifyContent: "space-between",
}

const Header = (props) => {

  const theme = useTheme();
  const navigate = useNavigate();

  const toolBarTheme = {
    backgroundColor: theme.palette.background.secondary
  };

  const onClick = () => {
    navigate(routes.home);
  }
  
  return (  
    <header>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar style={{ ...toolBarStyle, ...toolBarTheme }}>
              <LogoButton onClick={onClick}/>
              <AppStoreButton/>
          </Toolbar>
        </AppBar>
      </Box>
    </header>
  );
};

export default Header;