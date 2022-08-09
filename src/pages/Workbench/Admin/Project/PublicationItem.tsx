import DeleteIcon from '@mui/icons-material/Delete';
import React, { ReactElement } from 'react';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import css from './ProjectPage.module.scss';
import DateUtils from '../../../../common/DateUtils';
import DeleteVersionForm from './DeleteVersionForm';
import { FormIconButton } from '../../../../components/Form/FormIconButton';
import { IPublication } from '../../../../Nexus/entities/IPublication';
import { useEditableState } from '../../../../components/EditableContext/EditableContext';

interface IProps {
  publication: IPublication;
}

const PublicationItem = ({ publication }: IProps): ReactElement => {
  const { t } = useTranslation();
  const { setDeleteMode } = useEditableState();

  const handleCloseDelete = () => {
    setDeleteMode('');
  };

  const enterDeleteMode = (item: IPublication): void => {
    setDeleteMode(item.id);
  };

  return (
    <DeleteVersionForm
      publication={publication}
      handleClose={handleCloseDelete}
    >
      <div className={css.Item}>
        <div className={css.Version}>
          <Typography variant="smBold">{`${t('Version')} ${
            publication.version
          }`}</Typography>
          <time>{DateUtils.prettyFormat(publication.date)}</time>
        </div>
        <div className={css.Comment}>
          <Typography sx={{ alignSelf: 'center' }} variant="sm">
            {publication.comment}
          </Typography>
        </div>
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
    </DeleteVersionForm>
  );
};

export default PublicationItem;
