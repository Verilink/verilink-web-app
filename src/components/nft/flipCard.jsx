import React from 'react';
import Paper from "@mui/material/Paper";
import ReactCardFlip from 'react-card-flip';

import MediaCard from './mediaCard';

const containerStyle = { /* empty this for now */ }

const FlipCard = (props) => {

  const [isFlipped, setIsFlipped] = React.useState(false);

  var size = {
    width: props.width || 300,
    height: props.height || 300
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
          <MediaCard {...frontProps} onClick={flip}/>
          <MediaCard {...backProps} onClick={flip}/>
        </ReactCardFlip>
    </>
  );

};

export default FlipCard;