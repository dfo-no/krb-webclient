import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import { Dispatch, SetStateAction } from 'react';

import Nexus from '../../../../Nexus/Nexus';
import useProjectMutations from '../../../../store/api/ProjectMutations';
import Utils from '../../../../common/Utils';
import { DeleteFrame } from '../../../../components/DeleteFrame/DeleteFrame';
import { ICodelist } from '../../../../Nexus/entities/ICodelist';
import { Alert } from '../../../../models/Alert';
import { ModelType } from '../../../../Nexus/enums';
import { useEditableState } from '../../../../components/EditableContext/EditableContext';
import { AlertsContainer } from '../../../../components/Alert/AlertContext';
import { IBank } from '../../../../Nexus/entities/IBank';
import { EditCodelistForm } from './EditCodelistForm';
import { useSelectState } from './SelectContext';
import { DisplayCodelist } from './DisplayCodelist';

interface Props {
  project: IBank;
  codelist: ICodelist;
  isSelected: boolean;
  setSelectedCodelist: Dispatch<SetStateAction<ICodelist | null>>;
}

export function CodelistItem({
  project,
  codelist,
  isSelected,
  setSelectedCodelist,
}: Props): React.ReactElement {
  const { deleteCodelist } = useProjectMutations();
  const { addAlert } = AlertsContainer.useContainer();
  const nexus = Nexus.getInstance();
  const { t } = useTranslation();
  const { editMode, setEditMode, deleteMode, setDeleteMode } =
    useEditableState();
  const { allCodelists, setAllCodelists } = useSelectState();

  const methods = useForm<ICodelist>({
    defaultValues: codelist,
    resolver: nexus.resolverService.resolver(ModelType.codelist),
  });

  const isInUse = Utils.codelistUsedInVariants(codelist, project);

  const infoText = isInUse
    ? `${t('Cant delete this codelist')} ${t(
        'Codelist has connected requirements'
      )}`
    : '';

  const handleCloseEdit = (newCodelist: ICodelist | null) => {
    if (newCodelist) {
      setSelectedCodelist(newCodelist);
    }
    setEditMode('');
  };

  const handleCloseDelete = (deletedCodelist: ICodelist | null) => {
    if (deletedCodelist) {
      setSelectedCodelist(null);
      setAllCodelists(
        Utils.removeElementFromList(deletedCodelist, allCodelists)
      );
    }
    setDeleteMode('');
  };

  const onSubmit = (put: ICodelist): void => {
    deleteCodelist(put).then(() => {
      const alert: Alert = {
        id: uuidv4(),
        style: 'success',
        text: 'Successfully deleted codelist',
      };
      addAlert(alert);
      handleCloseDelete(put);
    });
  };

  const isEditingItem = (maybeEditedCodelist: ICodelist) => {
    return maybeEditedCodelist && maybeEditedCodelist.id === editMode;
  };

  if (isEditingItem(codelist)) {
    return (
      <EditCodelistForm codelist={codelist} handleClose={handleCloseEdit} />
    );
  } else {
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
            handleClose={() => handleCloseDelete(null)}
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
