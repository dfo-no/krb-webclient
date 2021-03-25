/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { graphConfig } from '../authentication/authConfig';

// TODO find appropriate interface for props for graph data
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

export const ProfileData = (props: any) => {
  return (
    <div id="profile-div">
      <p>
        <strong>Title: </strong> {props.graphData.jobTitle}
      </p>
      <p>
        <strong>Mail: </strong> {props.graphData.mail}
      </p>
    </div>
  );
};
