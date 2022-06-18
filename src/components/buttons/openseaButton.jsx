import React from 'react';
import Button from '@mui/material/Button';
import Box from "@mui/material/Box";
import Logo from "../../openseaLogo.svg";
import { getOpenseaMaticURI } from '../../config/endpoints';
import { useNavigate } from 'react-router-dom';


const OpenseaButton = (props) => {

  const uri = getOpenseaMaticURI(props.contractAddress, props.tokenId);
  const navigate = useNavigate();

  const onClick = () => {
    navigate(uri);
  }

  return (
    <Button variant="contained"
      onClick={onClick}
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