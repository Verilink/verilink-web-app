import React from 'react';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from '@mui/material/CircularProgress';
import { ETHER_PROVIDER } from '../../config/settings';
import ConditionalRender from '../hoc/ConditionalRender';
import VerifiedIcon from '@mui/icons-material/Verified';
import NewReleasesIcon from '@mui/icons-material/NewReleases';

/* 
  1: Can pass an address an lookup a name
  2: Can pass a name
    2.a: reverse lookup address
    3.b: 

  For Now: Look-up 
*/

const getName = async (address) => {
  console.log(`adfasdfddress: ${address}`)
  const ensDomain = await ETHER_PROVIDER.lookupAddress(address.toLowerCase());
  const reverse = await ETHER_PROVIDER.resolveName("verilink.eth");
  console.log(`Reverse: ${reverse}`);
  console.log(`ENS Domain: ${ensDomain}`);
  return ensDomain;
}

const matchNameToAddress = async (name, address) => {
  const resolvedAddress = (await ETHER_PROVIDER.resolveName(name)) || "";
  const resolvedEthAddress = (await ETHER_PROVIDER.resolveName(name + ".eth")) || "";

  if(resolvedAddress.toLowerCase() == address.toLowerCase())
  {
    return name;
  } 
  else if(resolvedEthAddress.toLowerCase() == address.toLowerCase())
  {
    return name + ".eth";
  }
  else
  {
    return "";
  }
}

const Verified = (props) => {
  return (
    <Box sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: "#4BB543"
    }}>
      <VerifiedIcon/>
      <Typography style={{ marginLeft: 2 }}>
        Verified by {props.name}
      </Typography>
    </Box>
  );
}

const Unverified = (props) => {
  return (
    <Box sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: "#D0342C"
    }}>
      <NewReleasesIcon/>
      <Typography style={{ marginLeft: 2 }}>
        Not verified
      </Typography>
    </Box>
  )
}

const VerifyCreator = (props) => {

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState({ set: false, message: "" });
  const [data, setData] = React.useState(null);

  React.useEffect(() => {

    const verify = async () => {
      setLoading(true);
      setError({ set: false, message: "" });
      setData(null);
      
      try
      {
        let match = await matchNameToAddress(props.creator, props.address);

        if(match != "")
        {
          setData(match)
        }
        else
        {
          match = await matchNameToAddress("verilink.eth", props.address);
          if(match != "") {
            setData(match);
          }
          else {
            setData(null)
          }
        }
      }
      catch(error)
      { 
        console.log(`Error: ${error}`)
        setError({ set: true, message: "Error verifying creator"});
      }

      setLoading(false);
    }

    verify();
  }, []);
  
  return (
    <Box sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}>
      <ConditionalRender condition={loading}>
        <CircularProgress size="small"/>
      </ConditionalRender>
      <ConditionalRender condition={!loading && !error.set}>
        {
          (data !== null) ? (<Verified address={props.address} name={data}/>) :
            (<Unverified address={props.address} name={data}/>)
        }
      </ConditionalRender>
    </Box>
  )
}

export default VerifyCreator;