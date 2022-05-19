import React, { ReactElement } from 'react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory, MemoryHistory } from 'history';
import { cleanup, render, RenderResult } from '@testing-library/react';
import { Router } from 'react-router-dom';

import ConstructionOutlinedIcon from '@mui/icons-material/ConstructionOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import DFOToolbar from './DFOToolbar';
import { IToolbarItem } from '../../models/IToolbarItem';

interface MockProps {
  history: MemoryHistory;
}

const MockComponent = ({ history }: MockProps): ReactElement => {
  const toolbarItems: IToolbarItem[] = [
    {
      icon: <ConstructionOutlinedIcon />,
      label: 'Construction',
      selected: history.location.pathname === '/construction',
      url: '/construction'
    },
    {
      icon: <SettingsOutlinedIcon />,
      label: 'Settings',
      selected: history.location.pathname === '/settings',
      url: '/settings'
    }
  ];
  return <DFOToolbar items={toolbarItems} />;
};

describe('DFOToolbar', () => {
  const history = createMemoryHistory();
  let component: RenderResult;

  beforeEach(() => {
    component = render(
      <Router history={history}>
        <MockComponent history={history} />
      </Router>
    );
  });

  afterAll(cleanup);

  it('Should render as expected', () => {
    expect(component).toBeTruthy();
    expect(component.container.querySelectorAll('a').length).toBe(2);
    expect(component.container.querySelectorAll('a.selected').length).toBe(0);
  });

  it('Should navigate when clicking on one of the items', () => {
    expect(history.location.pathname).toEqual('/');

    const link = component.getByLabelText('Construction');
    userEvent.click(link);
    component = render(
      <Router history={history}>
        <MockComponent history={history} />
      </Router>
    );

    expect(
      component.container.querySelector('a.selected')?.getAttribute('href')
    ).toEqual('/construction');
    expect(history.location.pathname).toEqual('/construction');
  });
});
