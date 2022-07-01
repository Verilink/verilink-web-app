import React from 'react';
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import ConditionalRender from '../components/hoc/ConditionalRender';
import { useNavigate } from "react-router-dom";
import routes from '../config/routes';

import useWindowDimensions from '../helpers/windowDimensions';
import { MAX_VIEWPORT_WIDTH } from '../config/settings';

import BoundingBox from '../components/containers/boundingBox';
import VerifyButton from '../components/buttons/verifyButton';
import ViewNFTButton from '../components/buttons/viewNFTButton';
import ViewPOIPButton from '../components/buttons/viewPOIPButton';
import VerilinkTag from "../VTag.png";

/* Update to add the device things */
import deviceStore from '../stores/deviceStore';
import poipStore from '../stores/poipStore';
import nftStore from '../stores/nftStore';

/* Icons */
import VerifiedIcon from '@mui/icons-material/Verified';
import NewReleasesIcon from '@mui/icons-material/NewReleases';

const deviceLookupStub = {
  loading: false,
  error: { isSet: false, message: "" }
};

const deviceDetailsStub = {
  chipId: "0x69696969",
  contractAddress: null,
  tokenId: null,
  poipEventId: 2,
  verified: true
};

const DevicePage = (props) => {

  const navigate = useNavigate();

  const deviceLookup = deviceStore((s) => ({ 
    loading: s.loadingDevice, 
    error: s.deviceLookupError
  }));

  const deviceDetails = deviceStore((s) => ({
    chipId: s.chipId,
    contractAddress: s.contractAddress,
    tokenId: s.tokenId,
    poipEventId: s.poipEventId,
    verified: s.verified
  }));

  const onlyNFT = () => {
    return (deviceDetails.contractAddress != null && deviceDetails.tokenId != null) &&
      (deviceDetails.poipEventId == null);
  }

  const onlyPOIP = () => {
    return (deviceDetails.contractAddress == null && deviceDetails.tokenId == null) &&
      (deviceDetails.poipEventId != null);
  }

  const goToPOIP = (replace=false) => {
    navigate("../" + routes.poip, replace);
  }

  const goToNFT = (replace=false) => {
    navigate("../" + routes.nft, replace);
  }

  React.useEffect(() => {

    /* quick fix to jump to POIP - remove later */
    if(deviceDetails.poipEventId != null)
    {
      goToPOIP(true);
    }

    if(onlyNFT())
    {
      goToNFT(true);
    }
    else if(onlyPOIP())
    {
      goToPOIP(true);
    }
  }, [deviceDetails]);

  const windowDimensions = useWindowDimensions();

  console.log(`Device Details: ${JSON.stringify(deviceDetails)}`);

  const handleClose = () => {}
  const onScan = () => {}

  return (
    <Container style={{ 
      marginTop: 20, 
      marginBottom: 20, 
      display: "flex", 
      justifyContent: "center", 
    }}>
      <BoundingBox style={{ 
        padding: 2, maxWidth: MAX_VIEWPORT_WIDTH, 
        width: (windowDimensions.width * 3 / 4)
      }}>
        <Box sx={{
          display: "flex",
          justifyContent: "center",
          marginBottom: 1,
        }}>
          <img src={VerilinkTag} style={{ width: 72, height: 72, }}/>
        </Box>
        <Box>
          <Typography variant="h6" align="center" color="background.main">
            Device Id: {deviceDetails.chipId.slice(deviceDetails.chipId.length-8)}
            <Box sx={{ fontStyle: "italic", fontSize: 8}}>(Last 8 alphanumerics only)</Box>
          </Typography>
          <Typography variant="h6" align="center">
            { /*
            <Box sx={{ fontStyle: "italic", display: "flex", justifyContent: "center",
              color: deviceDetails.verified ? "background.main" : "error.dark" }}>
              { deviceDetails.verified ? "Verified": "Not Verified" }
              <Box sx={{ marginLeft: 1, 
                  display: "flex", 
                  justifyContent: "center",
                  alignItems: "center",  
                  }}>
                { deviceDetails.verified ? <VerifiedIcon/> : <NewReleasesIcon/> }
              </Box>
            </Box>
                */ }
          </Typography>
          <ConditionalRender condition={deviceDetails.verified == false}>
            <Box sx={{
              marginTop: 3,
              display: "flex",
              justifyContent: "center",
              marginBottom: 2,
            }}>
              <VerifyButton onClick={onScan}/>
            </Box>
          </ConditionalRender>
          <ConditionalRender condition={deviceLookup.loading}>
            { /* Loading Sign */ }
            <Box sx={{ display: 'flex', flexDirection: "column", 
              justifyContent: "center", alignItems: "center" }}>
              <Typography color="background.main" gutterBottom>Loading Blockchain Details</Typography>
              <CircularProgress color="secondary"/>
            </Box>
          </ConditionalRender>
          <ConditionalRender condition={!deviceLookup.lookup}>
            <ConditionalRender condition={deviceDetails.contractAddress != null && deviceDetails.tokenId != null}>
              <Box sx={{ marginTop: 2, display: "flex", justifyContent: "center", alignItems: "center" }}>
                <ViewNFTButton onClick={goToNFT}/>
              </Box>
            </ConditionalRender>
            <ConditionalRender condition={deviceDetails.poipEventId != null}>
              <Box sx={{ marginTop: 2, display: "flex", justifyContent: "center", alignItems: "center" }}>
                <ViewPOIPButton onClick={goToPOIP}/>
              </Box>
            </ConditionalRender>
          </ConditionalRender>
          <Typography color="background.main" gutterBottom>
          </Typography>
        </Box>
      </BoundingBox>
      <Snackbar open={false} autoHideDuration={6000} onClose={handleClose}>
        <MuiAlert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
        </MuiAlert>
      </Snackbar>
    </Container>
  );
}
export default DevicePage;