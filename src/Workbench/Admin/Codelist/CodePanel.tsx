import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material/';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import {
  putSelectedProjectThunk,
  setCodes
} from '../../../store/reducers/project-reducer';
import { useAppDispatch } from '../../../store/hooks';
import { Nestable } from '../../../models/Nestable';
import { Parentable } from '../../../models/Parentable';
import { ICode } from '../../../Nexus/entities/ICode';
import NestableHierarcy from '../../../NestableHierarchy/NestableHierarcy';
import Utils from '../../../common/Utils';
import { useSelectState } from './SelectContext';
import EditCodeForm from './EditCodeForm';
import CodeAddButton from './CodeAddButton';
import NewCodeForm from './NewCodeForm';
import { usePanelStyles } from './CodelistStyles';
import { useEditableState } from '../../Components/EditableContext';
import { FormContainerBox } from '../../Components/Form/FormContainerBox';

const CodePanel = (): React.ReactElement => {
  const classes = usePanelStyles();
  const dispatch = useAppDispatch();
  const { codelist, setCodelist } = useSelectState();
  const { editMode, setEditMode, isCreating, setCreating } = useEditableState();
  const [nestableCodes, setNestableCodes] = useState<Nestable<ICode>[]>([]);

  useEffect(() => {
    if (codelist) {
      setEditMode('');
      setCreating(false);
      setNestableCodes(Utils.parentable2Nestable(codelist.codes));
    }
  }, [codelist, setEditMode, setCreating]);

  // If no codelist is selected, we cant create the component
  if (!codelist) {
    return <></>;
  }

  const dispatchfunc = (item: Parentable<ICode>, index: number) => {
    const newCodes = [...codelist.codes];
    const indexOfMoved = newCodes.findIndex(
      (oldItem) => oldItem.id === item.id
    );
    newCodes.splice(indexOfMoved, 1);
    newCodes.splice(index, 0, item);

    dispatch(setCodes({ codelistId: codelist.id, codes: newCodes }));
    dispatch(putSelectedProjectThunk('dummy'));

    setCodelist({ ...codelist, codes: newCodes });
  };

  const isEditing = () => {
    return editMode !== '';
  };
  const isEditingItem = (item: Nestable<ICode>) => {
    return item && item.id === editMode;
  };

  const handleCloseEdit = (newCode: Parentable<ICode> | null) => {
    if (newCode) {
      const codes = [...codelist.codes];
      const codeIndex = codes.findIndex((code) => code.id === newCode.id);
      codes.splice(codeIndex, 1, newCode);
      setCodelist({ ...codelist, codes: codes });
    }
    setEditMode('');
  };

  const handleCloseCreate = (newCode: Parentable<ICode> | null) => {
    if (newCode) {
      const codes = [...codelist.codes];
      codes.push(newCode);
      setCodelist({ ...codelist, codes: codes });
    }
    setCreating(false);
  };

  const renderItem = (item: Nestable<ICode>, handler: React.ReactNode) => {
    if (isEditingItem(item)) {
      return (
        <FormContainerBox className={classes.editableListItem}>
          <EditCodeForm
            parent={codelist}
            element={Utils.nestable2Parentable(item)}
            handleClose={handleCloseEdit}
          />
        </FormContainerBox>
      );
    }
    return (
      <Box className={classes.listItem}>
        {!isEditing() && <Box className={classes.handlerIcon}>{handler}</Box>}
        <Box className={classes.textItem}>
          <Box className={classes.textItemTitle}>
            <Typography variant="smallBold">{item.title}</Typography>
          </Box>
          <Box className={classes.textItemDescription}>
            <Typography variant="small">{item.description}</Typography>
          </Box>
        </Box>
        <Box className={classes.editIcon} onClick={() => setEditMode(item.id)}>
          <EditOutlinedIcon />
        </Box>
      </Box>
    );
  };

  return (
    <Box className={classes.topContainer}>
      <CodeAddButton onClick={() => setCreating(true)} />
      {isCreating && (
        <FormContainerBox className={classes.editableListItem}>
          <NewCodeForm parent={codelist} handleClose={handleCloseCreate} />
        </FormContainerBox>
      )}
      <NestableHierarcy
        className={classes.nestableCustom}
        inputlist={nestableCodes}
        renderItem={renderItem}
        dispatchfunc={dispatchfunc}
        depth={1}
      />
    </Box>
  );
};

export default CodePanel;
