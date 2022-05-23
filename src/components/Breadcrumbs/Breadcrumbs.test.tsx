import React from 'react';
import userEvent from '@testing-library/user-event';
import { cleanup, render, RenderResult } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';

import Breadcrumbs from './Breadcrumbs';
import { IBreadcrumb } from '../../models/IBreadcrumb';

describe('Breadcrumbs', () => {
  const breadcrumbs: IBreadcrumb[] = [
    {
      label: 'Root',
      url: '/'
    },
    {
      label: 'Page',
      url: '/page'
    },
    {
      label: 'Current',
      url: '/page/current'
    }
  ];

  let testLocation: any;
  let component: RenderResult;
  let rootItem: HTMLElement;
  let pageItem: HTMLElement;
  let currentItem: HTMLElement;

  beforeEach(() => {
    component = render(
      <MemoryRouter>
        <Route
          path="*"
          render={({ location }) => {
            testLocation = location;
            return <Breadcrumbs breadcrumbs={breadcrumbs} />;
          }}
        />
      </MemoryRouter>
    );

    rootItem = component.getByText('Root');
    pageItem = component.getByText('Page');
    currentItem = component.getByText('Current');
  });

  afterAll(cleanup);

  it('Should render the breadcrumbs as expected', () => {
    expect(component.container.querySelectorAll('a').length).toBe(3);
    expect(rootItem.tagName).toEqual('A');
    expect(currentItem.tagName).toEqual('SPAN');
    expect(component.container.querySelector('a')).toHaveTextContent(
      'Anskaffelser.no'
    );
  });

  it('Should navigate when clicking on one of the links', async () => {
    expect(testLocation.pathname).toEqual('/');

    await userEvent.click(pageItem);
    expect(testLocation.pathname).toEqual('/page');

    await userEvent.click(rootItem);
    expect(testLocation.pathname).toEqual('/');
  });

  it('Should not do anything if clicking the last item', async () => {
    expect(testLocation.pathname).toEqual('/');

    await userEvent.click(pageItem);
    expect(testLocation.pathname).toEqual('/page');

    await userEvent.click(currentItem);
    expect(testLocation.pathname).toEqual('/page');

    await userEvent.click(rootItem);
    expect(testLocation.pathname).toEqual('/');

    await userEvent.click(currentItem);
    expect(testLocation.pathname).toEqual('/');
  });
});
