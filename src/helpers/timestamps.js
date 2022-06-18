import moment from 'moment';

const MILLISECONDS_PER_SECOND = 1000;
const MILLISECONDS_PER_MINUTE = 60 * MILLISECONDS_PER_SECOND;
const MILLISECONDS_PER_HOUR = 60 * MILLISECONDS_PER_MINUTE;
const MILLISECONDS_PER_DAY = 24 * MILLISECONDS_PER_HOUR;
const MILLISECONDS_PER_YEAR = 365 * MILLISECONDS_PER_DAY;

const dateFromSeconds = (utcS) => {
  utcS = utcS * MILLISECONDS_PER_SECOND;
  var d = new Date();
  const timeOffset = d.getTimezoneOffset() * MILLISECONDS_PER_MINUTE;

  d.setTime(utcS - timeOffset);
  return d;
}

const getDayFormat = (utcS) => {
  const date = dateFromSeconds(utcS);

  const amPM = (date.getUTCHours() >= 12) ? "PM" : "AM";
  const hours = (date.getUTCHours()) % 12;
  
  var dateString =
    ("0" + (date.getUTCMonth()+1)).slice(-2) + "/" +
    ("0" + date.getUTCDate()).slice(-2) + " " +
    date.getUTCFullYear() + "/" +
    ("0" + hours).slice(-2) + ":" +
    ("0" + date.getUTCMinutes()).slice(-2) + ":" +
    ("0" + date.getUTCSeconds()).slice(-2) + " " + amPM;
  return dateString;
}

const getTimeLeftInMS = (utcS) => {
  const date = dateFromSeconds(utcS);
  const today = new Date();
  return date.getTime() - today.getTime();
}

const getTimeLeftInYears = (utcS) => {
  const delta = getTimeLeftInMS(utcS);
  if(delta < 0) return 0;

  return delta / MILLISECONDS_PER_YEAR;
}

const getTimeLeftInHours = (utcS) => {
  const delta = getTimeLeftInMS(utcS);
  if(delta < 0) return 0;

  return delta / MILLISECONDS_PER_HOUR;
}

const getTimeLeftHMS = (utcS) => {
  var delta = getTimeLeftInMS(utcS);
  if(delta < 0) return 0;

  const hours = Math.floor(delta / MILLISECONDS_PER_HOUR);
  delta -= hours * MILLISECONDS_PER_HOUR;
  const minutes = Math.floor(delta / MILLISECONDS_PER_MINUTE);
  delta -= minutes * MILLISECONDS_PER_MINUTE;
  const seconds = delta / MILLISECONDS_PER_SECOND;

  return { hours, minutes, seconds };
}

export {
  getDayFormat,
  getTimeLeftInMS,
  getTimeLeftInYears,
  getTimeLeftInHours,
  getTimeLeftHMS
};