import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import { Dispatch, SetStateAction } from 'react';

import Nexus from '../../../../Nexus/Nexus';
import Utils, { removeElementFromList } from '../../../../common/Utils';
import { DeleteFrame } from '../../../../components/DeleteFrame/DeleteFrame';
import { CodelistForm, deleteCodelist } from '../../../../api/nexus2';
import { Alert } from '../../../../models/Alert';
import { ModelType } from '../../../../Nexus/enums';
import { useEditableState } from '../../../../components/EditableContext/EditableContext';
import { AlertsContainer } from '../../../../components/Alert/AlertContext';
import { EditCodelistForm } from './EditCodelistForm';
import { useSelectState } from './SelectContext';
import { DisplayCodelist } from './DisplayCodelist';

interface Props {
  projectRef: string;
  codelist: CodelistForm;
  isSelected: boolean;
  key: string;
  setSelectedCodelist: Dispatch<SetStateAction<CodelistForm | null>>;
}

export function CodelistItem({
  projectRef,
  codelist,
  isSelected,
  key,
  setSelectedCodelist,
}: Props): React.ReactElement {
  const { addAlert } = AlertsContainer.useContainer();
  const nexus = Nexus.getInstance();
  const { t } = useTranslation();
  const {
    currentlyEditedItemId,
    setCurrentlyEditedItemId,
    deleteCandidateId,
    setDeleteCandidateId,
  } = useEditableState();
  const { allCodelists, setAllCodelists } = useSelectState();

  const methods = useForm<CodelistForm>({
    defaultValues: codelist,
    resolver: nexus.resolverService.resolver(ModelType.codelist),
  });

  const isInUse = Utils.codelistUsedInVariants(codelist, project);

  const infoText = isInUse
    ? `${t('Cant delete this codelist')} ${t(
        'Codelist has connected requirements'
      )}`
    : '';

  const handleCloseEdit = (newCodelist: CodelistForm) => {
    setSelectedCodelist(newCodelist);

    setCurrentlyEditedItemId('');
  };

  const handleCloseDelete = (deletedCodelist: CodelistForm) => {
    setSelectedCodelist(null);
    setAllCodelists(removeElementFromList(deletedCodelist, allCodelists));

    setDeleteCandidateId('');
  };

  const onSubmit = (codelistToBeDeleted: CodelistForm): void => {
    deleteCodelist({
      projectRef,
      codelistRef: codelistToBeDeleted.ref,
      ...codelistToBeDeleted,
    }).then(() => {
      const alert: Alert = {
        id: uuidv4(),
        style: 'success',
        text: 'Successfully deleted codelist',
      };
      addAlert(alert);
      handleCloseDelete(codelistToBeDeleted);
    });
  };

  const isEditingItem = (maybeEditedCodelist: CodelistForm) => {
    return (
      maybeEditedCodelist && maybeEditedCodelist.ref === currentlyEditedItemId
    );
  };

  if (isEditingItem(codelist)) {
    return (
      <EditCodelistForm
        projectRef={projectRef}
        codelist={codelist}
        key={key}
        handleClose={handleCloseEdit}
        handleCancel={() => setCurrentlyEditedItemId('')}
      />
    );
  } else {
    return (
      <FormProvider {...methods}>
        <form
          key={key}
          onSubmit={methods.handleSubmit(onSubmit)}
          autoComplete="off"
          noValidate
        >
          <DeleteFrame
            activated={deleteCandidateId === codelist.ref}
            canBeDeleted={!isInUse}
            infoText={infoText}
            handleCancel={() => setDeleteCandidateId('')}
          >
            <DisplayCodelist
              codelist={codelist}
              isSelected={isSelected}
              setSelectedCodelist={setSelectedCodelist}
            />
          </DeleteFrame>
        </form>
      </FormProvider>
    );
  }
}
