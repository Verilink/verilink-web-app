import React from 'react';
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Logo from "../../polygon.png";
import { getScannerMaticURI } from '../../config/endpoints';

const PolygonScanButton = (props) => {
  
  const uri = getScannerMaticURI(props.contractAddress);

  return (
    <Button variant="contained" href={uri} style={{width: 195}}>
      <Box sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 1
      }}>
        <img src={Logo} style={{ width: 24, height: 24 }}/>
      </Box>
      View on polygon
    </Button>
  );
}

export default PolygonScanButton;