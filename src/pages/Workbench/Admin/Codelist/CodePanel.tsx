import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Box } from '@mui/material/';
import { useTranslation } from 'react-i18next';

import { ListHeader } from './ListHeader';
import { DisplayCode } from './DisplayCode';
import EditCodeForm from './EditCodeForm';
import NestableHierarcy from '../../../../components/NestableHierarchy/NestableHierarcy';
import NewCodeForm from './NewCodeForm';
import useProjectMutations from '../../../../store/api/ProjectMutations';
import Utils from '../../../../common/Utils';
import { ICode } from '../../../../Nexus/entities/ICode';
import { Parentable } from '../../../../models/Parentable';
import { ScrollableContainer } from '../../../../components/ScrollableContainer/ScrollableContainer';
import { useEditableState } from '../../../../components/EditableContext/EditableContext';
import { usePanelStyles } from './CodelistStyles';
import { ICodelist } from '../../../../Nexus/entities/ICodelist';

type Props = {
  selectedCodelist: ICodelist;
  setSelectedCodelist: Dispatch<SetStateAction<ICodelist | null>>;
};

export const CodePanel = ({
  selectedCodelist,
  setSelectedCodelist,
}: Props): React.ReactElement => {
  const classes = usePanelStyles();
  const { t } = useTranslation();
  const {
    currentlyEditedItemId,
    setCurrentlyEditedItemId,
    isCreating,
    setCreating,
    deleteCandidateId,
    setDeleteCandidateId,
  } = useEditableState();
  const [codes, setCodes] = useState<Parentable<ICode>[]>([]);

  const { editCodes } = useProjectMutations();

  useEffect(() => {
    if (selectedCodelist) {
      setCurrentlyEditedItemId('');
      setCreating(false);
      setCodes(selectedCodelist.codes);
    }
  }, [selectedCodelist, setCurrentlyEditedItemId, setCreating]);

  const updateCodesArrangement = (newCodes: Parentable<ICode>[]) => {
    setCodes(newCodes);
    editCodes(newCodes, selectedCodelist);
  };

  const isEditing = () => {
    return currentlyEditedItemId !== '' && deleteCandidateId !== '';
  };

  const isEditingItem = (item: Parentable<ICode>) => {
    return item && item.id === currentlyEditedItemId;
  };

  const handleCloseEdit = (newCode: Parentable<ICode>) => {
    const newCodes = Utils.replaceElementInList(
      newCode,
      selectedCodelist.codes
    );
    setSelectedCodelist({ ...selectedCodelist, codes: newCodes });

    setCurrentlyEditedItemId('');
  };

  const handleCloseCreate = (newCode: Parentable<ICode>) => {
    const newCodes = Utils.addElementToList(newCode, selectedCodelist.codes);
    setSelectedCodelist({ ...selectedCodelist, codes: newCodes });

    setCreating(false);
  };

  const handleCloseDelete = (deletedCode: Parentable<ICode>) => {
    const newCodes = Utils.removeElementFromList(
      deletedCode,
      selectedCodelist.codes
    );
    setSelectedCodelist({ ...selectedCodelist, codes: newCodes });

    setDeleteCandidateId('');
  };

  const renderItem = (code: Parentable<ICode>, dragHandle: React.ReactNode) => {
    if (isEditingItem(code)) {
      return (
        <EditCodeForm
          codelist={selectedCodelist}
          code={code}
          handleClose={handleCloseEdit}
          handleCancel={() => setCurrentlyEditedItemId('')}
        />
      );
    } else {
      return (
        <DisplayCode
          code={code}
          codelist={selectedCodelist}
          dragHandle={isEditing() ? null : dragHandle}
          handleDelete={handleCloseDelete}
          handleCancel={() => setDeleteCandidateId('')}
        />
      );
    }
  };

  return (
    <Box className={classes.topContainer}>
      <ListHeader
        heading={t('Code')}
        buttonText={t('Add new code')}
        onClick={() => setCreating(true)}
      />
      {isCreating && (
        <NewCodeForm
          codelist={selectedCodelist}
          handleClose={handleCloseCreate}
          handleCancel={() => setCreating(false)}
        />
      )}
      <ScrollableContainer>
        <NestableHierarcy
          className={classes.nestableCustom}
          inputlist={codes}
          renderItem={renderItem}
          dispatchfunc={updateCodesArrangement}
          depth={1}
        />
      </ScrollableContainer>
    </Box>
  );
};
