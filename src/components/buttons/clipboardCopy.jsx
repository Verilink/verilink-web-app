import React from 'react';
import AssignmentIcon from '@mui/icons-material/Assignment';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const ClipboardCopy = (props) => {
  
  const [open, setOpen] = React.useState(false);

  const onClick = () => {
    navigator.clipboard.writeText(props.text);
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  return (
    <>
    <IconButton onClick={onClick} aria-label="copy to clipboard">
      <AssignmentIcon/>
    </IconButton>
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <MuiAlert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
        Copied successfully!
      </MuiAlert>
    </Snackbar>
    </>
  )

}

export default ClipboardCopy;