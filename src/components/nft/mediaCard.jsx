import React from 'react';
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import ReactPlayer from 'react-player';

import { supportIpfsUrl } from '../../helpers/ipfs';
import { getResolvedURI, isImageType, isVideoType } from '../../helpers/fileTypes';

const MediaCard = (props) => {

  const size = {
    width: props.width,
    height: props.height
  };

  const maxSize = {
    maxWidth: props.width,
    maxHeight: props.height
  };

  const mediaComponent = (uri) => {
    if(isImageType(uri))
    {
      const src = getResolvedURI(uri);
      return (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            backgroundColor: props.backgroundColor,
            ...size
          }}
        >
          <img style={{ 
            display: "block", ...maxSize, margin: "auto" }} 
            src={src} alt="Media Image"/>
        </Box>
      )
    }
    else if(isVideoType(uri))
    {
      const src = getResolvedURI(uri);
      return (<ReactPlayer
        url={src}
        loop={true}
        controls={false}
        playing={true}
        muted={true}
        playsinline={true}
        style={{ ...maxSize, backgroundColor: props.backgroundColor, visibility: "inherit"}}
      />)
    }
    
    return null;
  }

  return (
    <>
      {mediaComponent(props.uri)}
    </>
  )
}


export default MediaCard;