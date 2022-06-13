import React from 'react';
import Paper from "@mui/material/Paper";
import ReactCardFlip from 'react-card-flip';

import MediaCard from './mediaCard';

const containerStyle = {
  width: "calc(80%)",
  height: "calc(80%)",
  maxWidth: 360,
  maxHeight: 360,
}

const FlipCard = (props) => {

  const [isFlipped, setIsFlipped] = React.useState(false);

  var size = {
    width: props.width || 360,
    height: props.height || 360
  };

  const flip = () => {
    setIsFlipped(prev => !prev);
  }

  const frontProps = { ...size, uri: props.front };
  const backProps = { ...size, uri: props.back };

  return (
    <>
        <ReactCardFlip 
          isFlipped={isFlipped} 
          flipDirection="horizontal"
          containerStyle={containerStyle}
          infinite
          onClick={() => {setIsFlipped(prev=>!prev)}}
        >
          <Paper style={size} elevation={1} onClick={flip}>
            <MediaCard {...frontProps}/>
          </Paper>
          <Paper style={size} elevation={1} onClick={flip}>
            <MediaCard {...backProps}/>
          </Paper>
        </ReactCardFlip>
    </>
  );

};

export default FlipCard;