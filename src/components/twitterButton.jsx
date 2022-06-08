import React from 'react';
import TwitterIcon from '@mui/icons-material/Twitter';
import IconButton from '@mui/material/IconButton';

const VerilinkTwitterURL = "https://mobile.twitter.com/verilinkteam";

const TwitterButton = () => {

  return (
    <IconButton href={VerilinkTwitterURL} aria-label="Verilink Twitter">
      <TwitterIcon/>
    </IconButton>
  );
};

export default TwitterButton;