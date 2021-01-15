import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';

export default function HomePage(): ReactElement {
  return (
    <>
      <p>HomePage</p>
      <p>
        Denne siden er bare en placeholder for utvikling. Dette vil erstattes
        med HUB-view, og ha en login dings også. Om man så logger inn kommer man
        til /workbench/
        <br></br>
        <Link to={'/workbench'}>Til Workbench</Link>
      </p>
    </>
  );
}
