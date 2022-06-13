import React from 'react';
import Paper from "@mui/material/Paper";
import ReactCardFlip from 'react-card-flip';

import MediaCard from './mediaCard';

const paperStyle = {
  "& > *": {
    margin: 20,
  },
  height: "auto", 
  display: "inline-block",
  position: "relatives",
  borderRadius: 0,
}

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

  return (
    <>
        <ReactCardFlip 
          isFlipped={isFlipped} 
          flipDirection="horizontal"
          containerStyle={containerStyle}
          infinite
          onClick={() => {setIsFlipped(prev=>!prev)}}
        >
          <div onClick={flip}>
            <MediaCard backgroundColor="blue"/>
          </div>
          <div onClick={flip}>
            <MediaCard backgroundColor="yellow"/>
          </div>
        </ReactCardFlip>
    </>
  );

};

export default FlipCard;