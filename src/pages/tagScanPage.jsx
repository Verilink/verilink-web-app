import React from 'react';
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import { useNavigate } from "react-router-dom";
import routes from '../config/routes';

import BoundingBox from '../components/containers/boundingBox';
import ScanButton from '../components/buttons/scanButton';
import VerilinkTag from "../VTag.png";

import useWindowDimensions from '../helpers/windowDimensions';

import deviceStore from '../stores/deviceStore';
import nftStore from '../stores/nftStore';
import poipStore from '../stores/poipStore';
import useAppendLog from '../helpers/useAppendLog';

const TagScanPage = (props) => {
  const linkHalo = deviceStore((s) => s.linkHalo);
  const loadDevice = deviceStore((s) => s.loadDevice);
  const [errorMsg, setErrorMsg] = React.useState({ isSet: false, message: "" });
  const navigate = useNavigate();

  const windowDimensions = useWindowDimensions();

  const [log, addLog, clearLog] = useAppendLog();

  /* reset device, nft, poip on tag scan page */
  React.useEffect(() => { 
    const { reset: resetDeviceStore } = deviceStore.getState();
    const { reset: resetNFTStore } = nftStore.getState();
    const { reset: resetPOIPStore } = poipStore.getState();
    resetDeviceStore();
    resetNFTStore();
    resetPOIPStore();
  }, []);

  const onScan = async () => {
    try
    { 
      await linkHalo(addLog);
    }
    catch(error)
    {
      console.log(`Error: Scan Failed: ${error}`);
      setErrorMsg({ isSet: true, message: "Scan failed!"});
      return;
    }

    /* switch if successful */
    const { chipId } = deviceStore.getState();
    if(!chipId)
    {
      setErrorMsg({ isSet: true, message: "Unrecognized Device!"});
      return;
    }
    else
    {
      loadDevice();
      navigate(routes.device)
    }
  }

  const handleClose = () => {
    setErrorMsg({ isSet: false, message: "" });
  }

  return (
    <Container style={{ 
      marginTop: 20, 
      marginBottom: 20, 
      display: "flex", 
      justifyContent: "center", 
    }}>
      <BoundingBox style={{ padding: 2, width: windowDimensions.width - 20 }}>
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
            Press the scan button below and hold your mobile device to the tag. 
          </Typography>
          <Typography variant="caption" color="background.main">
            Hint: For Apple devices, trying tilting the top of the phone towards the tag.
          </Typography>
          <Typography>
            {JSON.stringify(log)}
          </Typography>
        </Box>
        <Box sx={{
          marginTop: 3,
          display: "flex",
          justifyContent: "center"
        }}>
          <ScanButton onClick={onScan}/>
        </Box>
      </BoundingBox>
      <Snackbar open={errorMsg.isSet} autoHideDuration={6000} onClose={handleClose}>
        <MuiAlert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          {errorMsg.message}
        </MuiAlert>
      </Snackbar>
    </Container>
  );
};

export default TagScanPage;