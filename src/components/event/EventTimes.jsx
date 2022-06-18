import React from 'react';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import moment from 'moment';
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
import ConditionalRender from '../hoc/ConditionalRender';

const INFINITE_YEARS = 10;

const EventTimes = (props) => {

  const startTime = moment.unix(props.startTime);
  const finishTime = moment.unix(props.finishTime);

  const isFutureInfinite = Math.abs(moment.duration(finishTime.diff(startTime)).years()) >= INFINITE_YEARS;
  const isPastInfinite = Math.abs(moment.duration(moment().diff(startTime)).years()) >= INFINITE_YEARS;


  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Typography>
        <ConditionalRender condition={isFutureInfinite && isPastInfinite}>
          <AllInclusiveIcon/>
        </ConditionalRender>
        <ConditionalRender condition={isFutureInfinite && !isPastInfinite}>
          {startTime.format("LLL")} - 
          <AllInclusiveIcon/>
        </ConditionalRender>
        <ConditionalRender condition={!isFutureInfinite && isPastInfinite}>
          <AllInclusiveIcon/>
          {finishTime.format("LLL")}
        </ConditionalRender>
      </Typography>
    </Box>
  )
}

export default EventTimes;