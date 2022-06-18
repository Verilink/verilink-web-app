import React from 'react';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
import ConditionalRender from '../hoc/ConditionalRender';

const TokenLimit= (props) => {
  
  const infinite = props.tokenLimit >= 1000000;

  return (
    <Box
      sx={{
        display: "flex", 
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <ConditionalRender condition={!infinite}>
        <Typography>{props.tokenLimit}</Typography>
      </ConditionalRender>
      <ConditionalRender condition={infinite}>
        <AllInclusiveIcon/>
      </ConditionalRender>
    </Box>
  );
};

export default TokenLimit;