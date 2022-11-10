/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { debounce } from 'lodash';
import { useTranslation } from 'react-i18next';
import { useFormContext } from 'react-hook-form';

import List from './ListEntries';
import OrganizationFieldCtrl from '../../FormProvider/OrganzationFieldCtrl';

interface Organization {
  name: string;
  orgNr: string;
}
const DEBOUNCE = 250;

const searchFun = (
  queryParam: string,
  setResults: (value: Organization[]) => void
) => {
  fetch(`https://data.brreg.no/enhetsregisteret/api/enheter?navn=${queryParam}`)
    .then((res) => res.json())
    .then((data) => {
      setResults(
        data._embedded.enheter.length > 0
          ? data._embedded.enheter.map((entry: any) => {
              return { name: entry.navn, orgNr: entry.organisasjonsnummer };
            })
          : []
      );
    })
    .catch((e) => {
      console.log('error', e);
    });
};

const debouncedSearch = debounce(searchFun, DEBOUNCE);
const OrganizationField = () => {
  const { t } = useTranslation();
  const { getValues, setValue, register } = useFormContext();
  const [searchInput, setSearchInput] = useState('');
  const [results, setResults] = useState<Organization[]>([]);
  const [isClearIcon, setIsClearIcon] = useState<boolean>(false);
  useEffect(() => {
    register('organizationNumber');
    if (getValues('organization')) setIsClearIcon(true);
  }, [getValues, register]);

  const handleOnSearch = (value: string) => {
    if (!value) {
      debouncedSearch.cancel();
      setResults([]);
      setIsClearIcon(false);
    } else {
      setIsClearIcon(true);
      debouncedSearch(value, setResults);
    }
  };

  const onSelect = (name: string, orgNr: string) => {
    setResults([]);
    setValue('organization', name, {
      shouldValidate: true,
    });
    setValue('organizationNumber', orgNr, {
      shouldValidate: true,
    });
    setSearchInput(name);
  };
  const onClear = () => {
    debouncedSearch.cancel();
    setResults([]);
    setIsClearIcon(false);
    setSearchInput('');
    setValue('organization', '');
    setValue('organizationNumber', '');
  };
  const handleSetSearchInput = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = target.value;
    setValue('organization', inputValue, {
      shouldValidate: true,
    });
    setSearchInput(inputValue);
    handleOnSearch(inputValue);
  };

  return (
    <>
      <OrganizationFieldCtrl
        name="organization"
        label={t('Name of your organization')}
        placeholder={t('Name')}
        required={true}
        searchInput={searchInput}
        setSearchInput={handleSetSearchInput}
        onClear={onClear}
        isClearIcon={isClearIcon}
        children={<div>{getValues('organizationNumber')}</div>}
      />
      {!!results.length && (
        <List
          entries={results}
          onSelect={(name: string, orgNr: string) => onSelect(name, orgNr)}
        />
      )}
    </>
  );
};

export default OrganizationField;
