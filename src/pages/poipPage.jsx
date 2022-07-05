import React from 'react';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import MediaCard from '../components/nft/mediaCard';
import useWindowDimensions from '../helpers/windowDimensions';
import { MAX_VIEWPORT_WIDTH } from '../config/settings';
import { Skeleton, Typography } from '@mui/material';
import poipStore from '../stores/poipStore';
import EventStatus from '../components/event/EventStatus';
import EventTimes from '../components/event/EventTimes';
import TokenStatus from '../components/event/TokenStatus';
import Grid from '@mui/material/Grid';
import useInterval from '../hooks/useInterval';
import OpenseaButton from "../components/buttons/openseaButton";
import PolygonScanButton from "../components/buttons/polygonScanButton";
import ClipboardCopy from '../components/buttons/clipboardCopy';
import VerifyCreator from '../components/event/VerifyCreator';
import ClaimModal from '../components/modals/claimModal';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import logo from "../logo.png";
import ConditionalRender from '../components/hoc/ConditionalRender';
import { getPOIPAddress } from '../config/endpoints';

const centerFlex = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
};

const testPoipDetails = {
  eventId: -1,
  metadata: {
    name: "In Search of the Unknown #50",
    creator: "Dr. Datamosh",
    image: { src: "ipfs://QmVFdX4kQhcjRWqkmG9oGbrZKG1XJK3nMLSunGXqDxmjzx", type: "image" },
    description: "Congratulations, you have found \"In Search of the Unknown #50\"! **In Search of the Unknown** is an electro / techno album produced by *Dr. Datamosh* inspired by experiences in the metaverse between 2020-2022. This is the first record released by On-Chain Records. It is only fitting that this is the launch of **Proof of Interaction Protocol** (POIP) by *Verilink* and the first POIP to be released."
  },
  startTime: 	1655697600,
  finishTime: 1656129599,
  tokensMinted: 0,
  tokenLimit: 1000000,
  creator: "0xdd98001c33c0c75d0952439699c33b1a02cf23a9"
};

const defaultPoipDetails = {
  eventId: -1,
  metadata: {
    title: "Sample POI",
    description: `Sorry, we couldn't find the POI you're looking for. 
    Please view this POI to lessen the sadness you're feeling.`,
    creator: "Isaac",
    image: logo
  },
  startTime:  Math.floor(((new Date()).getTime()) / 1000) - 2000,
  finishTime: Math.floor(((new Date()).getTime()) / 1000) + 2000,
  tokensMinted: 420,
  tokenLimit: 1000,
  creator: "0xdd98001c33c0c75d0952439699c33b1a02cf23a9"
};

const TOKENS_MINTED_POLL_INTERVAL = 10000;

const getPoipDetails = (defaultDetails, poipDetails) => {
  return Object.entries(poipDetails).reduce((prev, cur) => {
    const [key, val] = cur;
    if(val != null) prev[key] = val;
    return prev;
  }, defaultDetails)
}

const PoipPage = (props) => {
  const [claimModalOpen, setClaimModalOpen] = React.useState(false);
  const onClaimModalClose = () => { setClaimModalOpen(false); }
  const onClickClaim = () => { setClaimModalOpen(true); }

  const [poipError, setPoipError] = React.useState({ set: false, message: ""});
  const onHandleAlertClose = () => { setPoipError({ set: false, message: "" }); }

  const [poipClaimSuccess, setPoipClaimSuccess] = React.useState(false);
  const onHandleSuccessClose = () => { setPoipClaimSuccess(false); }

  const { eventId } = useParams();

  const pollTokensMinted = poipStore((s) => s.pollTokensMinted);
  const isClaimable = poipStore((s) => s.isClaimable);
  const mintPOIP = poipStore((s) => s.mintPOIP);

  useInterval(pollTokensMinted, TOKENS_MINTED_POLL_INTERVAL);

  const poipDetails = poipStore((s) => ({
    eventId: s.eventId,
    metadata: s.metadata,
    tokenLimit: s.tokenLimit,
    tokensMinted: s.tokensMinted,
    startTime: s.startTime,
    finishTime: s.finishTime,
    loading: s.loading,
    error: s.error,
    creator: s.creator
  }));

  const mintDetails = poipStore((s) => ({
    minting: s.minting,
    errorMinting: s.errorMinting
  }));

  const onMintPOIP = async (address) => {
    try
    {
      await mintPOIP(address);
      setPoipClaimSuccess(true);
    }
    catch(error)
    {
      console.log(`Error Minting POIP: ${error}`);
      setPoipError({ set: true, message: "Failed to claim the POIP!"})
      console.log("Mint Error:", poipError)
    }
    finally
    {
      setClaimModalOpen(false);
    }
  }

  const details = getPoipDetails(defaultPoipDetails, poipDetails);

  const windowDimensions = useWindowDimensions();
  const mediaSize = Math.min(windowDimensions.width - 20, MAX_VIEWPORT_WIDTH - 40);

  React.useEffect(() => {

    (async () => {

      const { init, loadPOIP } = poipStore.getState();
      init(parseInt(eventId));

      try
      {
        await loadPOIP();
      }
      catch(error)
      {
        console.log(`Error loading POIP: ${error}`)
        setPoipError({ set: true, message: "Failed to load the POIP!"});
        console.log("Load Error:", poipError)
      }
    })()
  }, [eventId]);

  return (
    <Box sx={{
      marginTop: 1,
      marginBottom: 0,
      width: "100%",
    }}>
      <Box sx={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        //backgroundColor: "gray",
        /* backgroundImage, */
        marginTop: 2,
        marginBottom: 0,
      }}>
        { !poipDetails.loading ?
          (<MediaCard 
            uri={details.metadata.image} 
            width={mediaSize}
            height={mediaSize}/>) :
          (<Skeleton variant={"rectangular"} width={mediaSize} height={mediaSize}/>)
        }
      </Box>
      <Container sx={{ marginTop: 2, }}>
        { !poipDetails.loading ? (<>
        <Typography align="center" variant="h5">{details.metadata.title}</Typography>
        <Typography 
          align="center" variant="h6" 
          style={{ fontStyle: "italic", }}>by {details.metadata.creator}</Typography>
        <VerifyCreator creator={details.metadata.creator} address={details.creator}/>
        <EventStatus 
          startTime={details.startTime} 
          finishTime={details.finishTime}/>
       
        <ConditionalRender condition={isClaimable()}>
          <Box sx={{ ...centerFlex, marginTop: 1, marginBottom: 3 }}>
            <Button variant="contained" color="primary"
              onClick={onClickClaim}
            >
              Claim POI #{details.tokensMinted + 1}
            </Button>
          </Box>
        </ConditionalRender>
        </>) : (<Skeleton variant={"text"} />)
        }
        <Box>
          { !poipDetails.loading ?(<>
          <Typography paragraph component={"div"}>
            <ReactMarkdown children={details.metadata.description} className="line-break" />
          </Typography></>) : ((<Skeleton variant={"text"} />))
          }
        </Box>
        <Box>
          <Box sx={{ ...centerFlex, marginTop: 2}}>
            <PolygonScanButton contractAddress={getPOIPAddress()} tokenId={details.eventId}/>
          </Box>
          <Box sx={{ ...centerFlex, marginTop: 2 }}>
            <OpenseaButton contractAddress={getPOIPAddress()} tokenId={details.eventId}/>
          </Box>
        </Box>
        <Box style={{ marginTop: 15, }}>       
          <Typography style={{ fontWeight: 750, }} gutterBottom>
            Event Details
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <Box sx={{  display: "flex", alignItems: "center"}}>
                <Typography  align="center" style={{ }}>
                  Timeline
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={9}>
              <Box sx={{ display: "flex", justifyContent: "left"}}> 
                <EventTimes 
                  startTime={details.startTime} 
                  finishTime={details.finishTime}/>
              </Box>
            </Grid>
            
            <Grid item xs={3}>
              <Box sx={{  display: "flex", alignItems: "center"}}>
                <Typography  align="center" style={{ }}>
                  POIs
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={9}>
              <Box sx={{ display: "flex", justifyContent: "left", alignItems: "center"}}> 
              <TokenStatus tokensMinted={details.tokensMinted} tokenLimit={details.tokenLimit}/>
              </Box>
            </Grid>

            <Grid item xs={3}>
              <Box sx={{  display: "flex", alignItems: "center",}}>
                <Typography align="left" style={{ }}>
                  Creator
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={9}>
              <Box sx={{ display: "flex", justifyContent: "left", }}> 
                <Typography align="center" style={{  marginRight: 5, }}>
                  {details.creator.slice(0, 10) + "..." + details.creator.slice(-10)}
                </Typography>
                  <ClipboardCopy text={details.creator}/>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
      <ClaimModal 
        open={claimModalOpen} 
        onClose={onClaimModalClose}
        onClaim={onMintPOIP}
        loading={mintDetails.minting}
      />
      <Snackbar open={poipError.set} autoHideDuration={6000} onClose={onHandleAlertClose}>
        <MuiAlert onClose={onHandleAlertClose} severity="error" sx={{ width: '100%' }}>
          {poipError.message}
        </MuiAlert>
      </Snackbar>
      <Snackbar open={poipClaimSuccess} autoHideDuration={6000} onClose={onHandleSuccessClose}>
        <MuiAlert onClose={onHandleSuccessClose} severity="success" sx={{ width: '100%' }}>
          Successfully claimed the POIP!
        </MuiAlert>
      </Snackbar>
    </Box>
  )
}

export default PoipPage;