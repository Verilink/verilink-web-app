import React from 'react';
import InstagramIcon from '@mui/icons-material/Instagram';
import IconButton from '@mui/material/IconButton';

const VerilinkInstagramURL = "https://www.instagram.com/verilink.io/";

const InstagramButton = () => {

  return (
    <IconButton href={VerilinkInstagramURL} aria-label="Verilink Instagram">
      <InstagramIcon/>
    </IconButton>
  );
};

export default InstagramButton;