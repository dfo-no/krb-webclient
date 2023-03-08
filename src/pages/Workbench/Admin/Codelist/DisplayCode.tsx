import { FormProvider, useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Box, Typography } from '@mui/material/';
import { zodResolver } from '@hookform/resolvers/zod';

import { AlertsContainer } from '../../../../components/Alert/AlertContext';
import { DeleteFrame } from '../../../../components/DeleteFrame/DeleteFrame';
import { useEditableState } from '../../../../components/EditableContext/EditableContext';
import { FormIconButton } from '../../../../components/Form/FormIconButton';
import { Alert } from '../../../../models/Alert';
import {
  CodeForm,
  CodesFormSchema,
  updateCodelist,
  useFindOneCodelist,
} from '../../../../api/nexus2';
import theme from '../../../../theme';
import { usePanelStyles } from './CodelistStyles';

interface Props {
  projectRef: string;
  codelistRef: string;
  code: CodeForm;
  dragHandle: React.ReactNode | null;
  handleDelete: (code: CodeForm) => void;
  handleCancel: () => void;
}

export function DisplayCode({
  projectRef,
  codelistRef,
  code,
  dragHandle,
  handleDelete,
  handleCancel,
}: Props): React.ReactElement {
  const classes = usePanelStyles();
  const { setCurrentlyEditedItemId, setDeleteCandidateId } = useEditableState();
  const { addAlert } = AlertsContainer.useContainer();
  const { deleteCandidateId } = useEditableState();
  const { codelist: loadedCodelist } = useFindOneCodelist(
    projectRef,
    codelistRef
  );

  const methods = useForm<CodeForm>({
    defaultValues: code,
    resolver: zodResolver(CodesFormSchema),
  });

  const onSubmit = (codeToDelete: CodeForm): void => {
    const updatedCodeList = loadedCodelist;
    if (!!updatedCodeList?.codes) {
      const codesIndex = updatedCodeList.codes.findIndex(
        (item) => item.ref === codeToDelete.ref
      );
      updatedCodeList.codes.splice(codesIndex, 1);
      updateCodelist({
        projectRef,
        codelistRef: codelistRef,
        ...updatedCodeList,
      }).then(() => {
        const alert: Alert = {
          id: uuidv4(),
          style: 'success',
          text: 'Successfully deleted code',
        };
        addAlert(alert);
        handleDelete(codeToDelete);
      });
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        autoComplete="off"
        noValidate
      >
        <DeleteFrame
          activated={deleteCandidateId === code.ref}
          canBeDeleted={true}
          infoText={''}
          handleCancel={handleCancel}
        >
          <Box className={classes.listItem}>
            {!!dragHandle && (
              <Box className={classes.handlerIcon}>{dragHandle}</Box>
            )}
            <Box className={classes.textItem}>
              <Box className={classes.textItemTitle}>
                <Typography variant="smBold">{code.title}</Typography>
                <FormIconButton
                  sx={{ marginLeft: 'auto' }}
                  onClick={() => setCurrentlyEditedItemId(code.ref)}
                >
                  <EditOutlinedIcon />
                </FormIconButton>
                <FormIconButton
                  hoverColor={theme.palette.errorRed.main}
                  onClick={() => setDeleteCandidateId(code.ref)}
                >
                  <DeleteIcon />
                </FormIconButton>
              </Box>
              <Box className={classes.textItemDescription}>
                <Typography variant="sm">{code.description}</Typography>
              </Box>
            </Box>
          </Box>
        </DeleteFrame>
      </form>
    </FormProvider>
  );
}
