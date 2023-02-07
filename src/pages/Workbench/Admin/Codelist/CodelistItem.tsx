import { Dispatch, SetStateAction } from 'react';

import DeleteCodelistForm from './DeleteCodelistForm';
import EditCodelistForm from './EditCodelistForm';
import { ICodelist } from '../../../../Nexus/entities/ICodelist';
import { FormContainerBox } from '../../../../components/Form/FormContainerBox';
import { useEditableState } from '../../../../components/EditableContext/EditableContext';
import { useSelectState } from './SelectContext';
import Utils from '../../../../common/Utils';
import { IBank } from '../../../../Nexus/entities/IBank';

type Props = {
  project: IBank;
  codelist: ICodelist;
  isSelected: boolean;
  setSelectedCodelist: Dispatch<SetStateAction<ICodelist | null>>;
};

export const CodelistItem = ({
  project,
  codelist,
  isSelected,
  setSelectedCodelist,
}: Props) => {
  const { allCodelists, setAllCodelists } = useSelectState();
  const { editMode, setEditMode, setDeleteMode } = useEditableState();

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

  const isEditingItem = (maybeEditedCodelist: ICodelist) => {
    return maybeEditedCodelist && maybeEditedCodelist.id === editMode;
  };

  if (isEditingItem(codelist)) {
    return (
      <FormContainerBox sx={{ marginBottom: 1 }} key={codelist.id}>
        <EditCodelistForm codelist={codelist} handleClose={handleCloseEdit} />
      </FormContainerBox>
    );
  } else {
    return (
      <DeleteCodelistForm
        key={codelist.id}
        project={project}
        codelist={codelist}
        isSelected={isSelected}
        setSelectedCodelist={setSelectedCodelist}
        handleClose={handleCloseDelete}
      />
    );
  }
};
