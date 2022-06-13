import React from 'react';
import { Fab, Typography } from '@mui/material';
import AppleIcon from '@mui/icons-material/Apple';
import { useTheme } from "@mui/material/styles";

const verilinkURL = "https://apps.apple.com/us/app/verilink/id1582507741";

const AppStoreButton = (props) => {

	return (
		<Fab variant="extended" color="primary" href={verilinkURL} style={{ borderRadius: 5, }}>
			<AppleIcon style={{ marginRight: 5 }}/>
			<Typography>Verilink App</Typography>
		</Fab>	
	)
}

export default AppStoreButton;