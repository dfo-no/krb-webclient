import { useAccount, useMsal } from '@azure/msal-react';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { loginRequest } from '../authentication/authConfig';
import { callMsGraph, ProfileData } from './GraphProfileData';

export default function ProfileContent(): React.ReactElement {
  const { instance, accounts } = useMsal();
  const account = useAccount(accounts[0] || {});
  const [graphData, setGraphData] = useState(null);

  function RequestProfileData() {
    if (account) {
      instance
        .acquireTokenSilent({
          ...loginRequest,
          account
        })
        .then((response) => {
          callMsGraph(response.accessToken).then((resp) => setGraphData(resp));
        });
    }
  }

  return (
    <>
      <h5 className="card-title">
        Welcome {account ? account.name : 'unknown'}
      </h5>
      {graphData ? (
        <ProfileData graphData={graphData} />
      ) : (
        <Button variant="secondary" onClick={() => RequestProfileData()}>
          Request Profile Information
        </Button>
      )}
    </>
  );
}
