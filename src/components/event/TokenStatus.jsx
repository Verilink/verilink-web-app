import React from 'react';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
import ConditionalRender from '../hoc/ConditionalRender';

/* TODO later */

const TokenStatus = (props) => {
  
  const infinite = props.tokenLimit >= 1000000;

  return (
    <Box
      sx={{
        display: "flex", 
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Typography>
       {props.tokensMinted} out of {infinite ? " " : props.tokenLimit}
      </Typography>
      <ConditionalRender condition={infinite}>
        <AllInclusiveIcon style={{ marginLeft: 5}}/>
      </ConditionalRender>
    </Box>
  );
};

export default TokenStatus;