import { cleanup, render, RenderResult } from '@testing-library/react';
import fetchMock from 'fetch-mock';

import { findProjects, baseUrl } from './nexus2';

describe('test', () => {
  test('nexus 2', async () => {
    fetchMock.mock(new RegExp(`${baseUrl}.+?`), {
      body: [1, 2],
      status: 200,
    });
    const projects = await findProjects({});
    // console.log(projects);
    expect(projects.data.length).toBeGreaterThan(0);
  });
});
