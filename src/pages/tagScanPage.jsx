import React from 'react';
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

import BoundingBox from '../components/boundingBox';
import VerilinkTag from "../VTag.png";

const boxStyle = {

};

const TagScanPage = (props) => {

  return (
    <Container style={{ marginTop: 20, marginBottom: 20, }}>
      <BoundingBox>
        <Box sx={{
          display: "flex",
          justifyContent: "center"
        }}>
          <img src={VerilinkTag} style={{ width: 72, height: 72, }}/>
        </Box>
        <Box>

        </Box>
      </BoundingBox>
    </Container>
  );
};

export default TagScanPage;