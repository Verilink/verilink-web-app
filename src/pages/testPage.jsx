import React from 'react';
import EventStatus from '../components/event/EventStatus';
import EventTimes from '../components/event/EventTimes';
import TokenStatus from '../components/event/TokenStatus';
import OpenseaButton from '../components/buttons/openseaButton';
import PolygonScanButton from '../components/buttons/polygonScanButton';
import VerifyCreator from '../components/event/VerifyCreator';
import ClaimModal from '../components/modals/claimModal';
import { isDev } from '../config/settings';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {
  FacebookShareButton,
  TwitterShareButton,

} from "react-share";
import ShareButton from '../components/buttons/shareButton';

const TestPage = () => {

  const [value, setValue] = React.useState('Default Controlled');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  React.useEffect(() => {
    console.log(`Value: ${JSON.stringify(value)}`);
  }, [value])

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}>
      <Box sx={{
        marginTop: 20,
      }}>
        <ShareButton/>
      </Box>
    </div>
  );

}

export default TestPage;

/*
  <TextField
    id="outlined-multiline-flexible"
    label="Multiline"
    multiline
    maxRows={4}
    defaultValue="hello world"
    value={value}
    onChange={handleChange}
  />
*/