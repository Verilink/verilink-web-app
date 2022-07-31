import React from 'react';
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

const useStatusSnackbar = (type) => {

  var severity = "";
  if(type == "error")
  { 
    severity = "error";
  }
  else // (type == "success")
  {
    severity = "success";
  }

  const [msg, setMsg] = React.useState({ isSet: false, message: ""});

  const handleClose = () => {
    setMsg({ isSet: false, message: "" });
  }

  const setMessage = (message) => {
    setMsg({ isSet: true, message: message });
  };

  return { status: { ...msg, handleClose, severity }, setMessage };
}

const StatusSnackbar = ({ isSet, message, handleClose, severity }) => {

  return (
    <>
       <Snackbar open={isSet} autoHideDuration={6000} onClose={handleClose}>
        <MuiAlert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
          {message}
        </MuiAlert>
      </Snackbar>
    </>
  );
};

export {
  StatusSnackbar,
  useStatusSnackbar
};