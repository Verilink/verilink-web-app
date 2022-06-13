import React from 'react';
import Button from '@mui/material/Button';
import Box from "@mui/material/Box";
import Typgraphy from "@mui/material/Typography";
import Logo from "../../logo.png";

const boxStyle = {
  justifyContent: "center",
  display: "flex",
  alignItems: "center",
};

const logoStyle = {
  maxWidth: 24,
  maxHeight: 24
};


const LogoButton = (props) => {

  return (
    <Button>
      <Box sx={boxStyle}>
        <img style={logoStyle} src={Logo}/>
        <Typgraphy>erilink</Typgraphy>
      </Box>
    </Button>
  );
};

export default LogoButton;