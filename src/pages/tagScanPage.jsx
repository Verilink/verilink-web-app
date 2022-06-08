import React from 'react';
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import BoundingBox from '../components/boundingBox';
import ScanButton from '../components/scanButton';
import VerilinkTag from "../VTag.png";


const TagScanPage = (props) => {

  return (
    <Container style={{ 
      marginTop: 20, 
      marginBottom: 20, 
      display: "flex", 
      justifyContent: "center", 
    }}>
      <BoundingBox style={{ padding: 2, maxWidth: 320 }}>
        <Box sx={{
          display: "flex",
          justifyContent: "center",
          marginBottom: 1,
        }}>
          <img src={VerilinkTag} style={{ width: 72, height: 72, }}/>
        </Box>
        <Box>
          <Typography variant="h5" align="center" color="background.main"
            gutterBottom>Scan a Verilink Tag</Typography>
          <Typography color="background.main" gutterBottom>
            Scan a Verilink Tag by pressing the scan button below and holding your mobile device to the tag. 
          </Typography>
          <Typography variant="caption" color="background.main">
            Hint: For Apple devices, trying tilting the top of the phone towards the tag.
          </Typography>
        </Box>
        <Box sx={{
          marginTop: 5,
          display: "flex",
          justifyContent: "center"
        }}>
          <ScanButton/>
        </Box>
      </BoundingBox>
    </Container>
  );
};

export default TagScanPage;