import React from 'react';
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import MediaCard from '../components/nft/mediaCard';
import useWindowDimensions from '../helpers/windowDimensions';
import { MAX_VIEWPORT_WIDTH } from '../config/settings';
import { Typography } from '@mui/material';
import ConditionalRender from "../components/hoc/ConditionalRender";
import poipStore from '../stores/poipStore';


const TimeComponent = () => {

  /*  If event dead - grayed out and timeline */
  /* If event live
    if "infinite" show open ended
    if < 24 hours left show countdown
    else show dates
  */

  return (
    <>
    <ConditionalRender>

    </ConditionalRender>
    <ConditionalRender>

    </ConditionalRender>

    </>
  )
}


const PoipPage = (props) => {
  const poipDetails = poipStore((s) => ({
    eventId: s.eventId,
    metadata: s.metadata,
    tokenLimit: s.tokenLimit,
    tokensMinted: s.tokensMinted,
    startTime: s.startTime,
    endTime: s.endTime,
    loading: s.loading,
    error: s.error
  }));

  const metadata = poipDetails.metadata || {}
  const title = metadata.title || "none";
  const description = metadata.description || "none";
  const image = metadata.image || "none";

  console.log(`Image: ${image}`)

  console.log(`POIP Details: ${JSON.stringify(poipDetails)}`);

  const windowDimensions = useWindowDimensions();
  const mediaSize = Math.min(windowDimensions.width - 20, MAX_VIEWPORT_WIDTH - 40);

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
      <Box sx={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        backgroundColor: "gray",
        /* backgroundImage, */
        marginBottom: 5,
      }}>
        <MediaCard 
          uri={image} 
          width={mediaSize}
          height={mediaSize}/>
      </Box>
      <Container>
        <Typography align="center" variant="h5">{title}</Typography>
        <Typography align="center" variant="h6">by Creator</Typography>

        <Box>
          <Typography gutterBottom variant="body1">
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}

export default PoipPage;