import DeleteIcon from '@mui/icons-material/Delete';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Box, Typography } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import { Dispatch, SetStateAction } from 'react';

import theme from '../../../../theme';
import { usePanelStyles } from './CodelistStyles';
import { FormIconButton } from '../../../../components/Form/FormIconButton';
import DeleteFrame from '../../../../components/DeleteFrame/DeleteFrame';
import Nexus from '../../../../Nexus/Nexus';
import useProjectMutations from '../../../../store/api/ProjectMutations';
import Utils from '../../../../common/Utils';
import { ICodelist } from '../../../../Nexus/entities/ICodelist';
import { Alert } from '../../../../models/Alert';
import { ModelType } from '../../../../Nexus/enums';
import { useEditableState } from '../../../../components/EditableContext/EditableContext';
import { AlertsContainer } from '../../../../components/Alert/AlertContext';
import { IBank } from '../../../../Nexus/entities/IBank';

interface Props {
  project: IBank;
  codelist: ICodelist;
  isSelected: boolean;
  setSelectedCodelist: Dispatch<SetStateAction<ICodelist | null>>;
  handleClose: (codelist: ICodelist | null) => void;
}

export default function DeleteCodelistForm({
  project,
  codelist,
  isSelected,
  setSelectedCodelist,
  handleClose,
}: Props): React.ReactElement {
  const classes = usePanelStyles();
  const { deleteCodelist } = useProjectMutations();
  const { addAlert } = AlertsContainer.useContainer();
  const nexus = Nexus.getInstance();
  const { t } = useTranslation();
  const { editMode, setEditMode, deleteMode, setDeleteMode } =
    useEditableState();

  const methods = useForm<ICodelist>({
    defaultValues: codelist,
    resolver: nexus.resolverService.resolver(ModelType.codelist),
  });

  const itemClicked = (clickedCodelist: ICodelist) => {
    if (editMode !== '') {
      setEditMode('');
    }
    if (deleteMode !== '') {
      setDeleteMode('');
    }
    setSelectedCodelist(clickedCodelist);
  };

  const isSelectedClass = () => {
    return isSelected ? classes.selectedItem : '';
  };

  const enterEditMode = (codelistToEdit: ICodelist) => {
    setSelectedCodelist(codelistToEdit);
    setEditMode(codelistToEdit.id);
  };

  const enterDeleteMode = (codelistToDelete: ICodelist) => {
    setSelectedCodelist(codelistToDelete);
    setDeleteMode(codelistToDelete.id);
  };

  const isInUse = Utils.codelistUsedInVariants(codelist, project);

  const infoText = isInUse
    ? `${t('Cant delete this codelist')} ${t(
        'Codelist has connected requirements'
      )}`
    : '';

  const onSubmit = (put: ICodelist): void => {
    deleteCodelist(put).then(() => {
      const alert: Alert = {
        id: uuidv4(),
        style: 'success',
        text: 'Successfully deleted codelist',
      };
      addAlert(alert);
      handleClose(put);
    });
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        autoComplete="off"
        noValidate
      >
        <DeleteFrame
          activated={deleteMode === codelist.id}
          canBeDeleted={!isInUse}
          infoText={infoText}
          handleClose={() => handleClose(null)}
        >
          <Box
            className={`${classes.listItem} ${
              classes.withHover
            } ${isSelectedClass()}`}
          >
            <Box
              className={classes.textItem}
              onClick={() => itemClicked(codelist)}
            >
              <Box className={classes.textItemTitle}>
                <Typography variant="smBold">{codelist.title}</Typography>
                <FormIconButton
                  sx={{ marginLeft: 'auto' }}
                  hoverColor={theme.palette.primary.main}
                  onClick={() => enterEditMode(codelist)}
                >
                  <EditOutlinedIcon />
                </FormIconButton>
                <FormIconButton
                  hoverColor={theme.palette.errorRed.main}
                  onClick={() => enterDeleteMode(codelist)}
                >
                  <DeleteIcon />
                </FormIconButton>
              </Box>
              <Box className={classes.textItemDescription}>
                <Typography variant="sm">{codelist.description}</Typography>
              </Box>
            </Box>
          </Box>
        </DeleteFrame>
      </form>
    </FormProvider>
  );
}
