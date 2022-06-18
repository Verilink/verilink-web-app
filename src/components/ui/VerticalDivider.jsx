import React from 'react';
import Box from "@mui/material/Box";

const VerticalDivider = (props) => {
  const height = props.height || 14;
  const color = props.color || "black";

  return (
  <Box sx={{
    borderLeft: `1px solid ${color}`,
    height: height,
    marginLeft: 1,
    marginRight: 1
  }}/>
  )
}

export default VerticalDivider;