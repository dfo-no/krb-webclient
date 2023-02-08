import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Box, Typography } from '@mui/material/';

import CodeAddButton from './CodeAddButton';
import DeleteCodeForm from './DeleteCodeForm';
import EditCodeForm from './EditCodeForm';
import NestableHierarcy from '../../../../components/NestableHierarchy/NestableHierarcy';
import NewCodeForm from './NewCodeForm';
import theme from '../../../../theme';
import useProjectMutations from '../../../../store/api/ProjectMutations';
import Utils from '../../../../common/Utils';
import { FormContainerBox } from '../../../../components/Form/FormContainerBox';
import { FormIconButton } from '../../../../components/Form/FormIconButton';
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

  const handleCloseEdit = (newCode: Parentable<ICode> | null) => {
    if (newCode) {
      const newCodes = Utils.replaceElementInList(
        newCode,
        selectedCodelist.codes
      );
      setSelectedCodelist({ ...selectedCodelist, codes: newCodes });
    }
    setCurrentlyEditedItemId('');
  };

  const handleCloseCreate = (newCode: Parentable<ICode> | null) => {
    if (newCode) {
      const newCodes = Utils.addElementToList(newCode, selectedCodelist.codes);
      setSelectedCodelist({ ...selectedCodelist, codes: newCodes });
    }
    setCreating(false);
  };

  const handleCloseDelete = (deletedCode: Parentable<ICode> | null) => {
    if (deletedCode) {
      const newCodes = Utils.removeElementFromList(
        deletedCode,
        selectedCodelist.codes
      );
      setSelectedCodelist({ ...selectedCodelist, codes: newCodes });
    }
    setDeleteCandidateId('');
  };

  const renderCodeItem = (
    item: Parentable<ICode>,
    handler: React.ReactNode
  ) => {
    return (
      <Box className={classes.listItem}>
        {!isEditing() && <Box className={classes.handlerIcon}>{handler}</Box>}
        <Box className={classes.textItem}>
          <Box className={classes.textItemTitle}>
            <Typography variant="smBold">{item.title}</Typography>
            <FormIconButton
              sx={{ marginLeft: 'auto' }}
              onClick={() => setCurrentlyEditedItemId(item.id)}
            >
              <EditOutlinedIcon />
            </FormIconButton>
            <FormIconButton
              hoverColor={theme.palette.errorRed.main}
              onClick={() => setDeleteCandidateId(item.id)}
            >
              <DeleteIcon />
            </FormIconButton>
          </Box>
          <Box className={classes.textItemDescription}>
            <Typography variant="sm">{item.description}</Typography>
          </Box>
        </Box>
      </Box>
    );
  };

  const renderItem = (item: Parentable<ICode>, handler: React.ReactNode) => {
    if (isEditingItem(item)) {
      return (
        <FormContainerBox sx={{ marginBottom: 1 }}>
          <EditCodeForm
            codelist={selectedCodelist}
            code={item}
            handleClose={handleCloseEdit}
          />
        </FormContainerBox>
      );
    }
    return (
      <DeleteCodeForm
        children={renderCodeItem(item, handler)}
        codelist={selectedCodelist}
        code={item}
        handleClose={handleCloseDelete}
      />
    );
  };

  return (
    <Box className={classes.topContainer}>
      <CodeAddButton onClick={() => setCreating(true)} />
      {isCreating && (
        <FormContainerBox sx={{ marginBottom: 1 }}>
          <NewCodeForm
            codelist={selectedCodelist}
            handleClose={handleCloseCreate}
          />
        </FormContainerBox>
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
