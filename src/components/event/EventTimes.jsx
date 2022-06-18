import React from 'react';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import moment from 'moment';
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
import ConditionalRender from '../hoc/ConditionalRender';

const INFINITE_YEARS = 10;

const centerFlex = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
};

const CenteredLogo = () => {
  return (
    <Box sx={centerFlex}>
      <AllInclusiveIcon/>
    </Box>
  )
}

const EventTimes = (props) => {

  const startTime = moment.unix(props.startTime);
  const finishTime = moment.unix(props.finishTime);

  const isFutureInfinite = Math.abs(moment.duration(finishTime.diff(moment())).years()) >= INFINITE_YEARS;
  const isPastInfinite = Math.abs(moment.duration(moment().diff(startTime)).years()) >= INFINITE_YEARS;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
        <ConditionalRender condition={isFutureInfinite && isPastInfinite}>
          <CenteredLogo/>
        </ConditionalRender>

        <ConditionalRender condition={isFutureInfinite && !isPastInfinite}>
          <Box sx={centerFlex}>
            <Typography style={{ marginRight: 5, }}>
              {startTime.format("L")}, {startTime.format("LT")} -  
            </Typography>
            <CenteredLogo/>
          </Box>
        </ConditionalRender>

        <ConditionalRender condition={!isFutureInfinite && isPastInfinite}>
          <Box sx={centerFlex}>
            <CenteredLogo/> 
            <Typography style={{ marginLeft: 5, }}>
              - {finishTime.format("L")}, {finishTime.format("LT")}
            </Typography>
          </Box>
        </ConditionalRender>

        <ConditionalRender condition={!isFutureInfinite && !isPastInfinite}>
          <Box sx={centerFlex}>
            <Typography style={{  }}>
              {startTime.format("L")}, {startTime.format("LT")} - {finishTime.format("L")}, {finishTime.format("LT")}
            </Typography>
          </Box>
        </ConditionalRender>
    </Box>
  )
}

export default EventTimes;