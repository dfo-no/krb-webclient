import { configureStore } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';
import i18n from '../../i18nForTests';
import { INeed } from '../../models/INeed';
import ModelType from '../../models/ModelType';
import { Parentable } from '../../models/Parentable';
import projectReducer from '../../store/reducers/project-reducer';
import EditNeedForm from './EditNeedForm';

describe('EditNeedForm', () => {
  it('Should render the basic fields', () => {
    const mockStore = configureStore<unknown>({
      reducer: {
        project: projectReducer
      },
      preloadedState: {
        project: {
          id: '818daff5-ae19-4759-bdde-cc0d82484e2c',
          title: '',
          description: '',
          needs: [],
          codelist: [],
          products: [],
          tags: [],
          publications: [],
          type: ModelType.bank,
          version: 0
        }
      }
    });

    const need: Parentable<INeed> = {
      id: '5f9dd5b0-0bd8-4e11-bf28-128b16d10dae',
      title: 'A title',
      description: 'A description',
      requirements: [],
      type: ModelType.need,
      parent: '',
      sourceOriginal: null,
      sourceRel: null
    };

    render(
      <Provider store={mockStore}>
        <I18nextProvider i18n={i18n}>
          <EditNeedForm element={need} />
        </I18nextProvider>
      </Provider>
    );
    const title = screen.getByRole('textbox', { name: 'Title' });
    expect(title).toBeInTheDocument();
    expect(title).toHaveValue('A title');

    const description = screen.getByRole('textbox', { name: 'Description' });
    expect(description).toBeInTheDocument();
    expect(description).toHaveValue('A description');
  });
});
