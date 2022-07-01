import React from 'react';
import EventStatus from '../components/event/EventStatus';
import EventTimes from '../components/event/EventTimes';
import TokenStatus from '../components/event/TokenStatus';
import OpenseaButton from '../components/buttons/openseaButton';
import PolygonScanButton from '../components/buttons/polygonScanButton';
import VerifyCreator from '../components/event/VerifyCreator';
import ClaimModal from '../components/modals/claimModal';
import { isDev } from '../config/settings';

const TestPage = () => {

  var startTime = new Date();
  startTime = startTime.setTime(startTime.getTime() - 60*1000);

  var finishTime = new Date();
  finishTime = finishTime.setTime(finishTime.getTime() + 24*60*60*1000);

  const tokenLimit = 100;
  const tokensMinted = 69;

  console.log(`Page Path: ${window.location.pathname}`);
  console.log(`IsDev: ${isDev()}`);

  return (
    <div>
      <ClaimModal
        open={true}
      />
    </div>
  );

}

export default TestPage;