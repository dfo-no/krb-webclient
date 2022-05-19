import React from 'react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { cleanup, render, RenderResult } from '@testing-library/react';
import { Router } from 'react-router-dom';

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

  const history = createMemoryHistory();
  let component: RenderResult;
  let rootItem: HTMLElement;
  let pageItem: HTMLElement;
  let currentItem: HTMLElement;

  beforeEach(() => {
    component = render(
      <Router history={history}>
        <Breadcrumbs breadcrumbs={breadcrumbs} />
      </Router>
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

  it('Should navigate when clicking on one of the links', () => {
    expect(history.location.pathname).toEqual('/');

    userEvent.click(pageItem);
    expect(history.location.pathname).toEqual('/page');

    userEvent.click(rootItem);
    expect(history.location.pathname).toEqual('/');
  });

  it('Should not do anything if clicking the last item', () => {
    expect(history.location.pathname).toEqual('/');

    userEvent.click(pageItem);
    expect(history.location.pathname).toEqual('/page');

    userEvent.click(currentItem);
    expect(history.location.pathname).toEqual('/page');

    userEvent.click(rootItem);
    expect(history.location.pathname).toEqual('/');

    userEvent.click(currentItem);
    expect(history.location.pathname).toEqual('/');
  });
});
