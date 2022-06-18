import React from 'react';
import EventStatus from '../components/event/EventStatus';
import EventTimes from '../components/event/EventTimes';

const TestPage = () => {

  var startTime = new Date();
  startTime = startTime.setTime(startTime.getTime() - 60*1000);

  var finishTime = new Date();
  finishTime = finishTime.setTime(finishTime.getTime() + 24*60*60*1000);

  return (
    <div>
    <div style={{ marginTop: 40,
      width: "100%",
      height: 200,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderStyle: "1px solid black"
    }}>
      <EventStatus
        startTime={Math.floor(startTime / 1000)} 
        finishTime={Math.floor(finishTime / 1000)}/>
    </div>
    <div style={{ marginTop: 40,
      width: "100%",
      height: 200,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderStyle: "1px solid black"
    }}>
      <EventTimes startTime={startTime / 1000} finishTime={finishTime / 1000}/>
    </div>
    </div>
  );

}

export default TestPage;