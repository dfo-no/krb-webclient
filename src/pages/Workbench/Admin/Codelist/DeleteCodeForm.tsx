import { FormProvider, useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';

import Nexus from '../../../../Nexus/Nexus';
import useProjectMutations from '../../../../store/api/ProjectMutations';
import { DeleteFrame } from '../../../../components/DeleteFrame/DeleteFrame';
import { Alert } from '../../../../models/Alert';
import { ICode } from '../../../../Nexus/entities/ICode';
import { ICodelist } from '../../../../Nexus/entities/ICodelist';
import { ModelType } from '../../../../Nexus/enums';
import { Parentable } from '../../../../models/Parentable';
import { useEditableState } from '../../../../components/EditableContext/EditableContext';
import { AlertsContainer } from '../../../../components/Alert/AlertContext';

interface Props {
  children: React.ReactElement;
  codelist: ICodelist;
  code: Parentable<ICode>;
  handleClose: (code: Parentable<ICode> | null) => void;
}

export default function DeleteCodeForm({
  children,
  codelist,
  code,
  handleClose,
}: Props): React.ReactElement {
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
      handleClose(codeToDelete);
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
          children={children}
          activated={deleteCandidateId === code.id}
          canBeDeleted={true}
          infoText={''}
          handleClose={() => handleClose(null)}
        />
      </form>
    </FormProvider>
  );
}
