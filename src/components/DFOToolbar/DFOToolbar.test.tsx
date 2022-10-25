import React, { ReactElement } from 'react';
import userEvent from '@testing-library/user-event';
import { cleanup, render, RenderResult } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import ConstructionOutlinedIcon from '@mui/icons-material/ConstructionOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

import DFOToolbar from './DFOToolbar';
import { IToolbarItem } from '../../models/IToolbarItem';

interface MockProps {
  location: Location;
}

const MockComponent = ({ location }: MockProps): ReactElement => {
  const toolbarItems: IToolbarItem[] = [
    {
      icon: <ConstructionOutlinedIcon />,
      label: 'Construction',
      selected: location.pathname === '/construction',
      url: '/construction',
    },
    {
      icon: <SettingsOutlinedIcon />,
      label: 'Settings',
      selected: location.pathname === '/settings',
      url: '/settings',
    },
  ];
  return <DFOToolbar items={toolbarItems} />;
};

describe('DFOToolbar', () => {
  let component: RenderResult;
  let testLocation: Location;

  beforeEach(() => {
    component = render(
      <MemoryRouter>
        <Route
          path="*"
          render={({ location }) => {
            testLocation = location as unknown as Location;
            return <MockComponent location={testLocation} />;
          }}
        />
      </MemoryRouter>
    );
  });

  afterAll(cleanup);

  it('Should render as expected', () => {
    expect(component).toBeTruthy();
    expect(component.container.querySelectorAll('a').length).toBe(2);
    expect(component.container.querySelectorAll('a.selected').length).toBe(0);
  });

  it('Should navigate when clicking on one of the items', async () => {
    expect(testLocation.pathname).toEqual('/');

    const link = component.getByLabelText('Construction');
    await userEvent.click(link);

    expect(
      component.container.querySelector('a.selected')?.getAttribute('href')
    ).toEqual('/construction');
    expect(testLocation.pathname).toEqual('/construction');
  });
});
