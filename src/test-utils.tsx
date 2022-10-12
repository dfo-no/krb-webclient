// eslint-disable-next-line
import { render, RenderOptions } from '@testing-library/react';
import React, { FC, ReactElement } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18nForTests';

const AllTheProviders: FC = ({ children }) => {
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options });

// eslint-disable-next-line
export * from '@testing-library/react';
export { customRender as render };
