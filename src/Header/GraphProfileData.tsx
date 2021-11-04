/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from 'react';
import { graphConfig } from '../authentication/authConfig';
import { GraphData } from '../models/GraphData';

export async function callMsGraph(accessToken: string) {
  const headers = new Headers();
  const bearer = `Bearer ${accessToken}`;

  headers.append('Authorization', bearer);

  const options = {
    method: 'GET',
    headers
  };

  return fetch(graphConfig.graphMeEndpoint, options)
    .then((response) => response.json())
    .catch((error) => console.error(error));
}

export const ProfileData = ({ graphData }: GraphData): React.ReactElement => {
  return (
    <div id="profile-div">
      <p>
        <strong>Title: </strong> {graphData.jobTitle}
      </p>
      <p>
        <strong>Mail: </strong> {graphData.mail}
      </p>
    </div>
  );
};
