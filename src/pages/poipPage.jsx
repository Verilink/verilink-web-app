import React from 'react';
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import MediaCard from '../components/nft/mediaCard';
import useWindowDimensions from '../helpers/windowDimensions';
import { MAX_VIEWPORT_WIDTH, POIP_ADDRESS } from '../config/settings';
import { Typography } from '@mui/material';
import poipStore from '../stores/poipStore';
import EventStatus from '../components/event/EventStatus';
import EventTimes from '../components/event/EventTimes';
import TokenStatus from '../components/event/TokenStatus';
import TokenLimit from '../components/event/TokenLimit';
import Grid from '@mui/material/Grid';
import useInterval from '../hooks/useInterval';

import OpenseaButton from "../components/buttons/openseaButton";
import PolygonScanButton from "../components/buttons/polygonScanButton";

import ReactMarkdown from 'react-markdown';
import logo from "../logo.png";

const centerFlex = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
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
  startTime: Math.floor(((new Date()).getTime()) / 1000) - 2000,
  finishTime: Math.floor(((new Date()).getTime()) / 1000) + 2000,
  tokensMinted: 420,
  tokenLimit: 1000,
  creator: "0xdd98001c33c0c75d0952439699c33b1a02cf23a9"
};

const TOKENS_MINTED_POLL_INTERVAL = 2000;

const getPoipDetails = (defaultDetails, poipDetails) => {
  return Object.entries(poipDetails).reduce((prev, cur) => {
    const [key, val] = cur;
    if(val != null) prev[key] = val;
    return prev;
  }, defaultDetails)
}

const PoipPage = (props) => {

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

  const pollTokensMinted = poipStore((s) => s.pollTokensMinted);

  useInterval(pollTokensMinted, TOKENS_MINTED_POLL_INTERVAL);

  const details = getPoipDetails(defaultPoipDetails, poipDetails);

  const windowDimensions = useWindowDimensions();
  const mediaSize = Math.min(windowDimensions.width - 20, MAX_VIEWPORT_WIDTH - 40);

  console.log(`Details: ${JSON.stringify(details)}`);

  React.useEffect(() => {
    const { loadPOIP } = poipStore.getState();
    loadPOIP();
  }, []);

  return (
    <Box sx={{
      marginTop: 0,
      marginBottom: 0,
      width: "100%",
    }}>
      <Box sx={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        backgroundColor: "gray",
        /* backgroundImage, */
        marginBottom: 2,
      }}>
        <MediaCard 
          uri={details.metadata.image} 
          width={mediaSize}
          height={mediaSize}/>
      </Box>
      <Container>
        <Typography align="center" variant="h5">{details.metadata.title}</Typography>
        <Typography 
          align="center" variant="h6" 
          style={{ fontStyle: "italic", }}>by {details.metadata.creator}</Typography>
        <EventStatus 
          startTime={details.startTime} 
          finishTime={details.finishTime}/>
        <TokenStatus
          tokensMinted={details.tokensMinted}
          tokenLimit={details.tokenLimit}/>
        <Box style={{ marginTop: 5, }}>
          <Typography paragraph>
            <ReactMarkdown children={details.metadata.description} className="line-break" />
          </Typography>
        </Box>
        <Box>
          <Box sx={{ ...centerFlex, marginTop: 2}}>
            <PolygonScanButton contractAddress={POIP_ADDRESS} tokenId={details.eventId}/>
          </Box>
          <Box sx={{ ...centerFlex, marginTop: 2 }}>
            <OpenseaButton contractAddress={POIP_ADDRESS} tokenId={details.eventId}/>
          </Box>
        </Box>
        <Box style={{ marginTop: 15, }}>       
          <Typography style={{ fontWeight: 750, }} gutterBottom>
            Event Details
          </Typography>
          <Grid container spacing={2}>

            <Grid item xs={3}>
              <Typography  align="left" style={{ marginLeft: 10,  }}>
                Timeline
              </Typography>
            </Grid>
            <Grid item xs={9}>
              <Box sx={{ display: "flex", justifyContent: "left"}}> 
                <EventTimes 
                  startTime={details.startTime} 
                  finishTime={details.finishTime}/>
              </Box>
            </Grid>
            
            <Grid item xs={3}>
              <Typography  align="left" style={{ marginLeft: 10,  }}>
                POI Limit
              </Typography>
            </Grid>
            <Grid item xs={9}>
              <Box sx={{ display: "flex", justifyContent: "left"}}> 
                <TokenLimit tokenLimit={details.tokenLimit}/>
              </Box>
            </Grid>

            <Grid item xs={3}>
              <Typography  align="left" style={{ marginLeft: 10,  }}>
                Creator
              </Typography>
            </Grid>
            <Grid item xs={9}>
              <Box sx={{ display: "flex", justifyContent: "left"}}> 
                <Typography align="center" style={{  }}>{details.creator}</Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  )
}

export default PoipPage;