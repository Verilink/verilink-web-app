import React from 'react';
import Paper from "@mui/material/Paper";
import ReactCardFlip from 'react-card-flip';

import MediaCard from './mediaCard';

const containerStyle = {
  width: "calc(100%)",
  height: "calc(100%)",
  maxWidth: 300,
  maxHeight: 300,
}

const FlipCard = (props) => {

  const [isFlipped, setIsFlipped] = React.useState(false);

  var size = {
    width: 300,
    height: 300
  }

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
          <Paper elevation={1} onClick={flip}>
            <MediaCard {...frontProps}/>
          </Paper>
          <Paper elevation={1} onClick={flip}>
            <MediaCard {...backProps}/>
          </Paper>
        </ReactCardFlip>
    </>
  );

};

export default FlipCard;