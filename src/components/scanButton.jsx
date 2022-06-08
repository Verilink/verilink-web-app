import React from 'react';
import Button from "@mui/material/Button";

const scanButtonStyle = {
  width: 240
}

const ScanButton = () => {
  return (
    <Button color="background" variant="contained"
      style={scanButtonStyle}>Initiate a scan</Button>
  );
};

export default ScanButton;