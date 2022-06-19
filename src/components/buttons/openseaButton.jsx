import React from 'react';
import Button from '@mui/material/Button';
import Box from "@mui/material/Box";
import Logo from "../../openseaLogo.svg";
import { getOpenseaMaticURI } from '../../config/endpoints';

const OpenseaButton = (props) => {

  const uri = getOpenseaMaticURI(props.contractAddress, props.tokenId);

  return (
    <Button variant="contained" href={uri}
      style={{ width: 195 }}
    >
      <Box sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 1
      }}>
        <img src={Logo} style={{ width: 24, height: 24 }}/>
      </Box>
      View on OpenSea
    </Button>
  )
}

export default OpenseaButton;