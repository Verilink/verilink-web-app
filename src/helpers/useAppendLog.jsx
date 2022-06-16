import React from 'react';

const useAppendLog = () => {
  const [log, setLog] = React.useState([]);

  const addLog = (newLog) => {
    setLog(prev=>[...prev, newLog]);
  } 

  const clearLog = () => {
    setLog([]);
  }

  return [log, addLog, clearLog];
}

export default useAppendLog;