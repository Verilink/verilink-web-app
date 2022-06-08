import React from 'react';
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";

const boxStyle = {
  width: "calc(100%)",
  margin: "0 auto",
  maxWidth: 500
};

const Root = (props) => {

  const theme = useTheme();

  const themeStyle = {
    backgroundColor: theme.palette.background.secondary
  }

  return (
    <Box sx={{...boxStyle, ...themeStyle}}>{props.children}</Box>
  )
};

export default Root;