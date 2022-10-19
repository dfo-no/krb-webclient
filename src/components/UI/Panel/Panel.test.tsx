import React from 'react';
import { render, RenderResult } from '@testing-library/react';

import Panel, { IProps } from './Panel';

const initialProps: IProps = { children: <button>Test</button> };

describe('Panel-komponent', () => {
  let component: RenderResult<
    typeof import('@testing-library/dom/types/queries'),
    HTMLElement,
    HTMLElement
  >;
  let componentNode: Element | null;
  let props: IProps;

  const setupProps = (additionalProps: IProps) => {
    props = {
      ...initialProps,
      ...additionalProps,
    };
  };

  const renderPanel = () => {
    component = render(<Panel {...props}>{props.children}</Panel>);
    componentNode = window.document.querySelector(
      'div[class*="Panel MuiBox-root css-0"]'
    );
  };

  it('Skal tegne et grunnleggende panel', () => {
    setupProps({ panelColor: 'white', children: <button>Test</button> });
    renderPanel();

    expect(component).toBeTruthy();
    expect(componentNode).toBeTruthy();
    expect(componentNode?.querySelectorAll('button')).toBeTruthy();
    expect(component.getByText('Test')).toBeTruthy();
    expect(window.document.querySelector('[data-color="white"]')).toBeTruthy();
    expect(window.document.querySelector('[class*="Sticky"]')).toBeFalsy();
  });

  it('Skal tegne panel med valgt farge', () => {
    setupProps({
      panelColor: 'primary',
      children: <button>Test button</button>,
    });
    renderPanel();
    expect(component.getByText('Test button')).toBeTruthy();
    expect(
      window.document.querySelector('[data-color="primary"]')
    ).toBeTruthy();
  });
});
