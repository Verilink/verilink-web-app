import React from 'react';
import EventStatus from '../components/event/EventStatus';
import EventTimes from '../components/event/EventTimes';
import TokenStatus from '../components/event/TokenStatus';
import OpenseaButton from '../components/buttons/openseaButton';
import PolygonScanButton from '../components/buttons/polygonScanButton';
import VerifyCreator from '../components/event/VerifyCreator';

const TestPage = () => {

  var startTime = new Date();
  startTime = startTime.setTime(startTime.getTime() - 60*1000);

  var finishTime = new Date();
  finishTime = finishTime.setTime(finishTime.getTime() + 24*60*60*1000);

  const tokenLimit = 100;
  const tokensMinted = 69;

  return (
    <div>
    <div style={{ marginTop: 5,
      width: "100%",
      height: 200,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderStyle: "1px solid black"
    }}>
      <VerifyCreator 
        address={"0xdd98001c33c0c75d0952439699c33b1a02cf23a9"}
        creator={"verilink"}
      />
    </div>
    </div>
  );

}

export default TestPage;