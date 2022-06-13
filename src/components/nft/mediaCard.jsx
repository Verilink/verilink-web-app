import React from 'react';
import Paper from "@mui/material/Paper";
import ReactPlayer from 'react-player';

import { isImageType, isVideoType } from '../../helpers/fileTypes';

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
      return (<img style={maxSize} src={uri} alt="Media Image"/>)
    }
    else if(isVideoType(uri))
    {
      return (<ReactPlayer
        url={uri}
        loop={true}
        controls={false}
        playing={true}
        muted={true}
        playsinline={true}
        style={{ ...maxSize, backgroundColor: "black", visibility: "inherit"}}
      />)
    }
    
    return null;
  }


  return (
    <div style={{ width: 300, height: 300, backgroundColor: props.backgroundColor}}>
      {mediaComponent(props.uri)}
    </div>
  )
}


export default MediaCard;