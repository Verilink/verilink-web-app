import { isIPFS, supportIpfsUrl } from "./ipfs";

const isString = (_str) => {
  return typeof _str == "string" || _str instanceof String;
}

const SUPPORTED_VIDEO_EXTENSIONS = [
  ".mp4",
  ".mov",
  ".avi",
  ".m4v",
  "video", // used for IPFS
];

export const isNonIPFSVideoType = (uri) => {
  if(!uri || !isString(uri)) return false;

  const longestExt = SUPPORTED_VIDEO_EXTENSIONS.reduce(
    (prev, cur) => prev.length >= cur.length ? prev : cur, ".")

  let uriExt = uri.slice(uri.length-longestExt.length, uri.length);

  for(let ext of SUPPORTED_VIDEO_EXTENSIONS)
  {
    if(uriExt.includes(ext)) return true;
  }
  
  return false;
}

const SUPPORTED_IMAGE_EXTENSIONS = [
  ".jpg",
  ".gif",
  ".png",
  ".jpeg",
  "image" // used for IPFS
];

export const isNonIPFSImageType = (uri) => {
  if(!uri || !isString(uri)) return false;

  const longestExt = SUPPORTED_IMAGE_EXTENSIONS.reduce(
    (prev, cur) => prev.length >= cur.length ? prev : cur, ".");
  
  let uriExt = uri.slice(uri.length - longestExt.length, uri.length);

  for(let ext of SUPPORTED_IMAGE_EXTENSIONS)
  {
    if(uriExt.includes(ext)) return true;
  }

  return false;
}

const isIPFSFileFormat = (uri) => {
  return uri && uri.src && uri.type;
}

export const isIPFSImageType = (uri) => {

  if(!isIPFSFileFormat(uri)) return false;

  if(isIPFS(uri.src))
  {
    return SUPPORTED_IMAGE_EXTENSIONS.includes(uri.type);
  }

  return false;
}

export const isIPFSVideoType = (uri) => {
  
  if(!isIPFSFileFormat(uri)) return false;

  if(isIPFS(uri.src)) 
  {
    return SUPPORTED_VIDEO_EXTENSIONS.includes(uri.type);
  }

  return false;
}

export const isImageType = (uri) => {
  return isIPFSImageType(uri) || isNonIPFSImageType(uri);
}

export const isVideoType = (uri) => {
  return isIPFSVideoType(uri) || isNonIPFSVideoType(uri);
}

export const getResolvedURI = (uri) => {

  if(isIPFSFileFormat(uri))
  {
    return supportIpfsUrl(uri.src);
  }
  else
  {
    return uri;
  }
  
}