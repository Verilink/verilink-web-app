import React from 'react';
import Button from "@mui/material/Button";

const scanButtonStyle = {
  width: 240
}

const ScanButton = (props) => {
  return (
    <Button color="background" variant="contained"
      onClick={props.onClick} style={scanButtonStyle}
      >Initiate a scan</Button>
  );
};

export default ScanButton;