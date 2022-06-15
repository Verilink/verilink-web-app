import React from 'react';
import axios from 'axios';
import { tagLookupURI } from '../config/endpoints';

export const useDeviceLookup = (deviceKey) => {
	const [isLoading, setIsLoading] = React.useState(false);
	const [error, setError] = React.useState({isSet: false, message: ""});
	const [data, setData] = React.useState(null);

	const internalFetchUrl = tagLookupURI(deviceKey);

	React.useEffect(async () => {
		setIsLoading(true);
		setError({isSet: false, message: ""});
		setData(null);
		
		try
		{
			const result = await axios(internalFetchUrl);
			const data = result.data;
			setData(data);
		}
		catch(error)
		{
			setIsLoading(false);
			setError({ 
				isSet: true,
				message: `We couldn't load the NFT associated with device ${deviceKey}`
			});
		}
		setIsLoading(false);
		
	}, [deviceKey]);

	return { isLoading, error, data }
}