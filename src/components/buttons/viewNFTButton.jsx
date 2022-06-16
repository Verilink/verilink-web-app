import React from 'react';
import Button from "@mui/material/Button";
import TokenIcon from '@mui/icons-material/Token';

const viewNFTButtonStyle = {

};

const ViewNFTButton = (props) => {

  return (
    <Button color="background" variant="contained"
      onClick={props.onClick} style={viewNFTButtonStyle}
      startIcon={<TokenIcon/>}
    >
      View NFT
    </Button>
  );
};

export default ViewNFTButton;