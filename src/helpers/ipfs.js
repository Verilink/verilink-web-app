export const supportIpfsUrl = (uri) => {
	if(!uri) return null;
	
	if (uri.slice(0, 7) === 'ipfs://') {
			const cid = uri.slice(7);
			return `https://verilink.mypinata.cloud/ipfs/${cid}`;
	} else {
			return uri;
	}
}

export const isIPFS = (uri) => {
	const ipfsInd = "ipfs://";

	if(!uri) 
	{
		return false;
	}
	else if(uri.slice(0, ipfsInd.length) == ipfsInd)
	{
		return true;
	}

	return false;
}