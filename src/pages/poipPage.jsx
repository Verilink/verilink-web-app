import React from 'react';
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import MediaCard from '../components/nft/mediaCard';
import useWindowDimensions from '../helpers/windowDimensions';
import { MAX_VIEWPORT_WIDTH } from '../config/settings';
import { Typography } from '@mui/material';
import ConditionalRender from "../components/hoc/ConditionalRender";
import poipStore from '../stores/poipStore';
import EventStatus from '../components/event/EventStatus';
import EventTimes from '../components/event/EventTimes';
import TokenStatus from '../components/event/TokenStatus';
import TokenLimit from '../components/event/TokenLimit';

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
  startTime: 0,
  finishTime: Math.floor(((new Date()).getTime()) / 1000),
  tokensMinted: 420,
  tokenLimit: 1000
};

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
    error: s.error
  }));

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
      marginBottom: 20,
      width: "100%",
    }}>
      <ConditionalRender>

      </ConditionalRender>
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
        <Typography paragraph>
          <ReactMarkdown children={details.metadata.description} className="line-break" />
        </Typography>
        <Box>       
          <Box sx={centerFlex}> 
            <Typography style={{ fontStyle: "bold" }}>
                Event Window
           </Typography>
            <EventTimes 
              startTime={details.startTime} 
              finishTime={details.finishTime}/>
          </Box>
          <Typography style={{ fontStyle: "bold" }}>
            Event POI Limit
          </Typography>
          <Box sx={centerFlex}>
            <TokenLimit tokenLimit={details.tokenLimit}/>
          </Box>
          
        </Box>
      </Container>
    </Box>
  )
}

export default PoipPage;