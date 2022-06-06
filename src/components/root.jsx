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
    backgroundColor: theme.background.colors.primary.main,
  }

  return (
    <Box sx={{...boxStyle, ...themeStyle}}>{props.children}</Box>
  )
};

export default Root;