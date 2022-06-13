const SUPPORTED_VIDEO_EXTENSIONS = [
  ".mp4",
  ".mov",
  ".avi",
  ".m4v"
];

export const isVideoType = (uri) => {
  if(!uri) return false;

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
  ".jpeg"
];

export const isImageType = (uri) => {
  if(!uri) return false;

  const longestExt = SUPPORTED_IMAGE_EXTENSIONS.reduce(
    (prev, cur) => prev.length >= cur.length ? prev : cur, ".");
  
  let uriExt = uri.slice(uri.length - longestExt.length, uri.length);

  for(let ext of SUPPORTED_IMAGE_EXTENSIONS)
  {
    if(uriExt.includes(ext)) return true;
  }

  return false;
}