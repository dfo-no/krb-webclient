import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import React, { Dispatch, ReactElement } from 'react';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import css from './PublicationsPage.module.scss';
import DateUtils from '../../../../common/DateUtils';
import DeletePublicationForm from './DeletePublicationForm';
import SpecificationStoreService from '../../../../Nexus/services/SpecificationStoreService';
import { FormIconButton } from '../../../../components/Form/FormIconButton';
import { IPublication } from '../../../../Nexus/entities/IPublication';
import { useEditableState } from '../../../../components/EditableContext/EditableContext';
import { useGetBankQuery } from '../../../../store/api/bankApi';
import { ISpecification } from '../../../../Nexus/entities/ISpecification';

interface IProps {
  publication: IPublication;
  chooseSpecification: Dispatch<ISpecification>;
}

const PublicationItem = ({
  publication,
  chooseSpecification
}: IProps): ReactElement => {
  const { t } = useTranslation();
  const { setDeleteMode } = useEditableState();

  const { data: bank } = useGetBankQuery(publication.bankId);
  const specification = bank
    ? SpecificationStoreService.getSpecificationFromBank(bank)
    : null;

  const handleCloseDelete = () => {
    setDeleteMode('');
  };

  const enterDeleteMode = (item: IPublication): void => {
    setDeleteMode(item.id);
  };

  return (
    <DeletePublicationForm
      publication={publication}
      handleClose={handleCloseDelete}
    >
      <div className={css.Item}>
        <div className={css.Version}>
          <Typography variant="smBold">
            {t('Version')} {publication.version}
          </Typography>
          <time>{DateUtils.prettyFormat(publication.date)}</time>
        </div>
        <div className={css.Comment}>
          <Typography sx={{ alignSelf: 'center' }} variant="sm">
            {publication.comment}
          </Typography>
        </div>
        {specification && (
          <FormIconButton
            className={css.IconButton}
            hoverColor={'var(--error-color)'}
            edge="end"
            aria-label="delete"
            onClick={() => chooseSpecification(specification)}
          >
            <AddIcon />
          </FormIconButton>
        )}
        <FormIconButton
          className={css.IconButton}
          hoverColor={'var(--error-color)'}
          edge="end"
          aria-label="delete"
          onClick={() => enterDeleteMode(publication)}
        >
          <DeleteIcon color="inherit" />
        </FormIconButton>
      </div>
    </DeletePublicationForm>
  );
};

export default PublicationItem;
