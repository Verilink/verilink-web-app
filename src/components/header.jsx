import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from "@mui/material/styles";

import AppStoreButton from './appStoreButton';
import LogoButton from './logoButton';

const toolBarStyle = {
  display: "flex",
  justifyContent: "space-between",
}

const Header = (props) => {

  const theme = useTheme();

  const toolBarTheme = {
    backgroundColor: theme.background.colors.secondary.main
  };


  return (  
    <header>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar style={{ ...toolBarStyle, ...toolBarTheme }}>
              <LogoButton/>
              <AppStoreButton/>
          </Toolbar>
        </AppBar>
      </Box>
    </header>
  );
};

export default Header;