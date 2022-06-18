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

  const isInfinite = Math.abs(moment.duration(finishTime.diff(startTime)).years()) >= INFINITE_YEARS;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Typography>
      {startTime.format("LLL")} - {isInfinite ? "" : finishTime.format("LLL")}
      </Typography>
      <ConditionalRender condition={isInfinite}>
        <AllInclusiveIcon/>
      </ConditionalRender>
    </Box>
  )
}

export default EventTimes;