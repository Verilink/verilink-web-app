import React from 'react';
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import ReactPlayer from 'react-player';

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
     
          <img style={{ 
            display: "block", ...maxSize, margin: "auto" }} 
            src={src} alt="Media Image"/>
      
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
        width={props.width}
        height={props.height}
        style={{...maxSize, visibility: "inherit"}}
      />)
    }
    
    return null;
  }

  return (
    <Box onClick={props.onClick}
      sx={{
        display: "flex",
        justifyContent: "center",
        ...size
      }}
    >
      {mediaComponent(props.uri)}
    </Box>
  )
}


export default MediaCard;