import React from 'react';
import Button from "@mui/material/Button";
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';

const viewPOIPButtonStyle = {

};

const ViewPOIPButton = (props) => {

  return (
      <Button color="background" variant="contained"
        onClick={props.onClick} style={viewPOIPButtonStyle}  
        startIcon={<WorkspacePremiumIcon/>}    
      >
        View POIP
      </Button>
  )
};

export default ViewPOIPButton;