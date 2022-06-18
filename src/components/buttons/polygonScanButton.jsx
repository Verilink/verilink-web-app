import React from 'react';
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Logo from "../../polygon.png";
import { getScannerMaticURI } from '../../config/endpoints';
import { useNavigate } from 'react-router-dom';

const PolygonScanButton = (props) => {
  const navigate = useNavigate();
  const uri = getScannerMaticURI(props.contractAddress);

  const onClick = () => {
    navigate(uri);
  }

  return (
    <Button variant="contained" 
      onClick={onClick} style={{width: 195}}>
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