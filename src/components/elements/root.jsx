import React from 'react';
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import { MAX_VIEWPORT_WIDTH } from '../../config/settings';

const boxStyle = {
  width: "calc(100%)",
  margin: "0 auto",
  maxWidth: MAX_VIEWPORT_WIDTH
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