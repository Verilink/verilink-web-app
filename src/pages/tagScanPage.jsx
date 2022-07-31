import React from 'react';
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import { useNavigate } from "react-router-dom";
import routes from '../config/routes';

import BoundingBox from '../components/containers/boundingBox';
import ScanButton from '../components/buttons/scanButton';
import VerilinkTag from "../VTag.png";

import useWindowDimensions from '../helpers/windowDimensions';
import { MAX_VIEWPORT_WIDTH } from '../config/settings';
import useSearchParams from '../hooks/useSearchParams';
import { useStatusSnackbar, StatusSnackbar } from '../components/modals/statusSnackbar';

import deviceStore from '../stores/deviceStore';
import nftStore from '../stores/nftStore';
import poipStore from '../stores/poipStore';
import useAppendLog from '../helpers/useAppendLog';

const TagScanPage = (props) => {
  const linkHalo = deviceStore((s) => s.linkHalo);
  const loadDevice = deviceStore((s) => s.loadDevice);
  
  const {
    status: errorStatus,
    setMessage: setError
  } = useStatusSnackbar("error");

  const navigate = useNavigate();

  const windowDimensions = useWindowDimensions();
  const searchParams = useSearchParams();

  /* reset device, nft, poip on tag scan page */
  React.useEffect(() => { 
    const { reset: resetDeviceStore, init: deviceInit } = deviceStore.getState();
    const { reset: resetNFTStore } = nftStore.getState();
    const { reset: resetPOIPStore } = poipStore.getState();
    resetDeviceStore();
    resetNFTStore();
    resetPOIPStore();

    if(searchParams.get("static"))
    {
      deviceInit(searchParams.get("static"));
      const { chipId } = deviceStore.getState();
      if(chipId)
      {
        loadDevice();
        navigate(routes.device)
      }
    }
  }, [searchParams]);

  const onScan = async () => {
    try
    { 
      await linkHalo();
    }
    catch(error)
    {
      console.log(`Error: Scan Failed: ${error}`);
      setError("Scan Failed!");
      return;
    }

    /* switch if successful */
    const { chipId } = deviceStore.getState();
    if(!chipId)
    {
      setError("Unrecognized Device!");
      return;
    }
    else
    {
      loadDevice();
      navigate(routes.device)
    }
  }

  return (
    <Container style={{ 
      marginTop: 20, 
      marginBottom: 20, 
      display: "flex", 
      justifyContent: "center", 
    }}>
      <BoundingBox style={{ padding: 2, maxWidth: MAX_VIEWPORT_WIDTH, 
        width: (windowDimensions.width * 3 / 4) }}>
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
        </Box>
        <Box sx={{
          marginTop: 3,
          display: "flex",
          justifyContent: "center"
        }}>
          <ScanButton onClick={onScan}/>
        </Box>
      </BoundingBox>
      <StatusSnackbar {...errorStatus}/>
    </Container>
  );
};

export default TagScanPage;