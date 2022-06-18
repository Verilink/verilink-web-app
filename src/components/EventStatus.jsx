import React from 'react';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import moment from 'moment';
import BlinkStatus from './BlinkStatus';
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';

const INFINITE_YEARS = 10;

const InfiniteWindow = (props) => {
  console.log(`StartTime: ${JSON.stringify(props.startTime)}`);
  console.log(`FinishTime: ${JSON.stringify(props.finishTime)}`);

  return (
    <Box sx={{ 
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}>
      <BlinkStatus style={{ marginRight: 5 }}/>
      <Typography>Event Live</Typography>
      <Box sx={{
        borderLeft: "1px solid black",
        height: 14,
        marginLeft: 1,
        marginRight: 1
      }}/>
      <AllInclusiveIcon/>
    </Box>
  )
}

const LiveWindow = (props) => {
  return (
    <>
      <Box sx={{ 
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
        }}>
        <BlinkStatus style={{ marginRight: 5 }}/>
        <Typography>
          Event Live
        </Typography>
        <Box sx={{
          borderLeft: "1px solid black",
          height: 14,
          marginLeft: 1,
          marginRight: 1
          }}/>
        <Typography style={{ fontStyle: "italic" }}>
          Ends {moment().to(props.finishTime)}
        </Typography>
      </Box>
    </>
  );
}

const DeadWindow = (props) => {
  return (
    <>
      <Box sx={{ 
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}>
        <BlinkStatus color="gray" stop style={{ marginRight: 5 }}/>
        <Typography>Event Over</Typography>
        <Box sx={{
          borderLeft: "1px solid black",
          height: 14,
          marginLeft: 1,
          marginRight: 1
        }}/>
        <Typography style={{ fontStyle: "italic" }}>
          Ended {props.finishTime.from(moment())}
        </Typography>
      </Box>
    </>
  );
}

const getEventComponent = (startTime, finishTime) => {
  if(startTime < finishTime)
  {
    let duration = moment.duration(finishTime.diff(startTime));

    if(Math.abs(duration.years()) >= INFINITE_YEARS)
    {
      return (<InfiniteWindow startTime={startTime} finishTime={finishTime}/>);
    }
    else
    {
      return (<LiveWindow startTime={startTime} finishTime={finishTime}/>);
    }
  } 
  else
  {
    return (<DeadWindow startTime={startTime} finishTime={finishTime}/>);
  }
}

const EventStatus = (props) => {

  /* 
    Event Dead - grayed out and timeline
    Event Live:
      "Infinite" - show open ended
      If < 24 hours left show countdown
      else show dates
  */

  const startTime = moment.unix(props.startTime);
  const finishTime = moment.unix(props.finishTime);

  return (
    <>
     <Box sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      }}>
        {getEventComponent(startTime, finishTime)}
      </Box>
      
    </>
  )

}

export default EventStatus;