import React from 'react';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from '@mui/material/CircularProgress';

import { ETHER_PROVIDER } from '../../config/settings';

/* 
  1: Can pass an address an lookup a name
  2: Can pass a name
    2.a: reverse lookup address
    3.b: 
*/

const getName = async (address) => {
  console.log(`adfasdfddress: ${address}`)
  const ensDomain = await ETHER_PROVIDER.lookupAddress(address.toLowerCase());
  const reverse = await ETHER_PROVIDER.resolveName("verilink.eth");
  console.log(`Reverse: ${reverse}`);
  console.log(`ENS Domain: ${ensDomain}`);
  return ensDomain;
}

const VerifyCreator = (props) => {



  React.useEffect(() => {

    console.log(`Address: ${props.address}`);
    const test = async () => {
      console.log(`Domain: ${await getName(props.address)}`)
    }

    test();

  }, []);

  return (
    <Box>
    </Box>
  )
}

export default VerifyCreator;