import React from 'react';
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";

const BoundingBox = ({children, style}) => {

  const theme = useTheme();

  //const backgroundColor = theme.background.colors.secondary.main;
  const backgroundColor = theme.palette.primary.main;

  return (
    <Box sx={{
      backgroundColor,
      borderRadius: 5,
      ...style
    }}>
      {children}
    </Box>
  );
};

export default BoundingBox;