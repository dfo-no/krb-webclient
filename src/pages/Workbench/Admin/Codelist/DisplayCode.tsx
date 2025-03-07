import { FormProvider, useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Box, Typography } from '@mui/material/';

import { AlertsContainer } from '../../../../components/Alert/AlertContext';
import { DeleteFrame } from '../../../../components/DeleteFrame/DeleteFrame';
import { useEditableState } from '../../../../components/EditableContext/EditableContext';
import { FormIconButton } from '../../../../components/Form/FormIconButton';
import { Alert } from '../../../../models/Alert';
import { Parentable } from '../../../../models/Parentable';
import { ICode } from '../../../../Nexus/entities/ICode';
import { ICodelist } from '../../../../Nexus/entities/ICodelist';
import { ModelType } from '../../../../Nexus/enums';
import Nexus from '../../../../Nexus/Nexus';
import useProjectMutations from '../../../../store/api/ProjectMutations';
import theme from '../../../../theme';
import { usePanelStyles } from './CodelistStyles';

interface Props {
  code: Parentable<ICode>;
  codelist: ICodelist;
  dragHandle: React.ReactNode | null;
  handleDelete: (code: Parentable<ICode>) => void;
  handleCancel: () => void;
}

export function DisplayCode({
  code,
  codelist,
  dragHandle,
  handleDelete,
  handleCancel,
}: Props): React.ReactElement {
  const classes = usePanelStyles();
  const { setCurrentlyEditedItemId, setDeleteCandidateId } = useEditableState();
  const { deleteCode } = useProjectMutations();
  const { addAlert } = AlertsContainer.useContainer();
  const nexus = Nexus.getInstance();
  const { deleteCandidateId } = useEditableState();

  const methods = useForm<Parentable<ICode>>({
    defaultValues: code,
    resolver: nexus.resolverService.resolver(ModelType.code),
  });

  const onSubmit = (codeToDelete: Parentable<ICode>): void => {
    deleteCode(codeToDelete, codelist).then(() => {
      const alert: Alert = {
        id: uuidv4(),
        style: 'success',
        text: 'Successfully deleted code',
      };
      addAlert(alert);
      handleDelete(codeToDelete);
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
          activated={deleteCandidateId === code.id}
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
                  onClick={() => setCurrentlyEditedItemId(code.id)}
                >
                  <EditOutlinedIcon />
                </FormIconButton>
                <FormIconButton
                  hoverColor={theme.palette.errorRed.main}
                  onClick={() => setDeleteCandidateId(code.id)}
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
