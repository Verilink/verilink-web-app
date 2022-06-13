export const supportIpfsUrl = (url) => {
	if(!url) return null;
	
	if (url.slice(0, 7) === 'ipfs://') {
			const cid = url.slice(7);
			return `https://verilink.mypinata.cloud/ipfs/${cid}`;
	} else {
			return url;
	}
}