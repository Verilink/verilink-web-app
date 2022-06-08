import React from 'react';
import Box from "@mui/material/Box";
import Typography from '@mui/material/Typography';

import logo from "../logo.png";

import InstagramButton from './instagramButton';
import TwitterButton from './twitterButton';



const Footer = (props) => {

  return (
    <Box>
      <Box sx={{ 
        display: "flex",
        justifyContent: "center", 
      }}>
        <InstagramButton/>
        <TwitterButton/>
      </Box>
      <Box sx={{
        marginTop: 2,
        display: "flex",
        justifyContent: "center"
      }}>
        <img src={logo} style={{ width: 48 }}/>
      </Box>
      <Box sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
      }}>
        <Typography>VERILINK</Typography>
        <Typography variant="caption">©2021 Verilink LLC, All Rights Reserved</Typography>
      </Box>
    </Box>
  );
}

export default Footer;