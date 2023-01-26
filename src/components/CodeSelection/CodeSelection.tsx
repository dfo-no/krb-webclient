import React from 'react';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

import css from './Selection.module.scss';
import { DFOCheckbox } from '../DFOCheckbox/DFOCheckbox';
import { ICode } from '../../Nexus/entities/ICode';
import { ICodeSelection } from '../../Nexus/entities/ICodelistQuestion';
import { Parentable } from '../../models/Parentable';

interface IProps {
  name: string;
  codesList: Parentable<ICode>[];
  codeSelection?: ICodeSelection[];
  isDisabled?: boolean;
}

const CodeSelection = ({
  name,
  codesList,
  codeSelection,
  isDisabled,
}: IProps): React.ReactElement => {
  const { t } = useTranslation();
  const location = useLocation();

  const isPrefilledResponse = location.pathname.includes(
    'prefilledresponse'
  ) as boolean;

  const sortCodes = (codesToBeSorted: ICode[]): ICode[] => {
    return [...codesToBeSorted].sort((a, b) => {
      const aSelection = codeSelection?.find((cs) => cs.code === a.id);
      const bSelection = codeSelection?.find((cs) => cs.code === b.id);
      if (!aSelection) {
        return 1;
      }
      if (!bSelection) {
        return -1;
      }
      if (aSelection.mandatory !== bSelection.mandatory) {
        return +bSelection.mandatory - +aSelection.mandatory;
      }
      return bSelection.discount - aSelection.discount;
    });
  };

  const codes = codeSelection ? sortCodes(codesList) : codesList;

  const onClick = (
    item: ICode,
    selected: string[],
    onChange: (value: string[]) => void
  ): void => {
    if (selected.some((elem) => elem === item.id)) {
      const selectedUpdated = [...selected];
      const index = selectedUpdated.findIndex((elem) => elem === item.id);
      if (index !== -1) {
        selectedUpdated.splice(index, 1);
      }
      onChange(selectedUpdated);
    } else {
      onChange([...selected, item.id]);
    }
  };

  const codeChecked = (item: ICode, selected: string[]): boolean => {
    return selected.some((elem) => elem === item.id);
  };

  const codeMandatory = (item: ICode): boolean => {
    const selection = codeSelection?.find((cs) => cs.code === item.id);
    return selection ? selection.mandatory : false;
  };

  const mandatoryCodes = codeSelection?.filter((code) => code.mandatory);
  const optionalCodes = codeSelection?.filter((code) => !code.mandatory);

  const mandatoryCodesList = () => {
    return codes.filter((code) =>
      mandatoryCodes?.find((c) => c.code === code.id)
    );
  };

  const optionalCodesList = () => {
    return codes.filter((code) =>
      optionalCodes?.find((c) => c.code === code.id)
    );
  };

  const renderCodesList = (
    item: ICode,
    selected: string[],
    onChange: (value: string[]) => void
  ) => {
    return (
      <div
        key={item.id}
        className={css.SelectionItems}
        onClick={() => onClick(item, selected, onChange)}
        data-pre-response={isPrefilledResponse}
      >
        <div className={css.itemTitle} data-disabled={isDisabled}>
          <DFOCheckbox
            checked={codeChecked(item, selected)}
            _color={'var(--text-primary-color)'}
            disabled={isDisabled}
          />
          <span data-mandatory={codeMandatory(item)}>{item.title}</span>
        </div>
        <span>{item.description}</span>
      </div>
    );
  };

  const isMandatoryOrOptionalCodes = () => {
    return mandatoryCodesList().length > 0 || optionalCodesList().length > 0;
  };

  return (
    <Controller
      render={({ field: { value: selected = [], onChange } }) => (
        <div className={css.Selection}>
          {mandatoryCodesList().length > 0 && (
            <>
              <label>{t('Mandatory')}</label>
              {mandatoryCodesList()?.map((item) => {
                return renderCodesList(item, selected, onChange);
              })}
            </>
          )}
          {optionalCodesList().length > 0 && (
            <>
              <label>{t('Optional')}</label>
              {optionalCodesList()?.map((item) => {
                return renderCodesList(item, selected, onChange);
              })}
            </>
          )}
          {!isMandatoryOrOptionalCodes() &&
            codes.map((item) => {
              return renderCodesList(item, selected, onChange);
            })}
        </div>
      )}
      name={name}
    />
  );
};

export default CodeSelection;
