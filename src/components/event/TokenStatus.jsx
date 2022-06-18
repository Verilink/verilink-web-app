import React from 'react';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
/* TODO later */

const TokenStatus = (props) => {

  return (
    <Box
      sx={{
        display: "flex", 
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Typography>
        {props.tokensMinted} out of {props.tokenLimit}
      </Typography>
    </Box>
  );
};

export default TokenStatus;