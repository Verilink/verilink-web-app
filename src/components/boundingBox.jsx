import React from 'react';
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";

const BoundingBox = ({children}) => {

  const theme = useTheme();

  //const backgroundColor = theme.background.colors.secondary.main;
  const backgroundColor = theme.palette.primary.main;

  return (
    <Box sx={{
      backgroundColor,
      borderRadius: 5,
    }}>
      {children}
    </Box>
  );
};

export default BoundingBox;