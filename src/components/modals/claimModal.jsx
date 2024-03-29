import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { MAX_VIEWPORT_WIDTH } from '../../config/settings';
import useWindowDimensions from '../../helpers/windowDimensions';
import Logo from "../../logo.svg"
import TextField from '@mui/material/TextField';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  borderRadius: 2,
  paddingTop: 2,
  paddingBottom: 2,
}

const validEmail = (email) => {
  var pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/; 
  return email.match(pattern);
}

const LoadingScreen = () => {

  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Typography align="center">Pending Blockchain Confirmation...</Typography>
      <CircularProgress/>
    </Box>
  )
};

const ClaimModal = (props) => {

  const windowDimensions = useWindowDimensions();
  const mediaSize = Math.min(windowDimensions.width * 3 / 4, MAX_VIEWPORT_WIDTH * 3 / 4);

  const [email, setEmail] = React.useState("");
  const handleChange = (event) => {
    setEmail(event.target.value);
  };

  const onClose = () => {
    if(props.onClose)
    {
      props.onClose();
    }
  }

  const onScanToClaim = () => {
    if(props.onClaim)
    {
      props.onClaim(email);
    }
  }

  return (
    <Modal 
      open={props.open} onClose={onClose}
      aria-labelledby="claim-modal"
      aria-describedby="allows the user to claim the token"
    >
      <Box
        sx={{ ...modalStyle, backgroundColor: "white", width: mediaSize, }}
      >
        <Container>
        {
            props.loading ? <LoadingScreen/> : (<>
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", marginBottom: 1 }}>
            <img src={Logo} style={{ width: 24, height: 24, }}/>
          </Box>
          <Typography align="left" paragraph gutterBottom>
            To claim ownership, download the app. Until you're ready, we're happy to hold onto this for you! 
          </Typography>
          <Typography align="center" gutterBottom>Enter an email to hold the token</Typography>
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <TextField
              label="email"
              value={email}
              onChange={handleChange}
              style={{ width: "80%" }}
            />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: 2, marginBottom: 2}}>
            <Button
              disabled={!validEmail(email)}
              variant="contained"
              onClick={onScanToClaim}
            >
              Scan to claim
            </Button>
          </Box>
          <Typography style={{ fontSize: 10 }}>
            {`Disclaimer: By claiming, you're acknowledging that Verilink will not be held responsible or liable 
            for any issues that may arise during token claiming or token storage. We promise we'll do our best :)`}
          </Typography>
          </>)
        }
        </Container>
      </Box>
    </Modal>
  )
}

export default ClaimModal;