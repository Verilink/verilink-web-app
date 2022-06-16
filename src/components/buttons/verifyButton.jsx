import React from 'react';
import Button from "@mui/material/Button";

const scanButtonStyle = {
  width: 240
}

const VerifyButton = (props) => {
  return (
    <Button color="background" variant="contained"
      onClick={props.onClick} style={scanButtonStyle}
      >Verify Device</Button>
  );
};

export default VerifyButton;