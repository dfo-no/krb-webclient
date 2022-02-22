import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material/';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import Nestable, { Item } from 'react-nestable';
import {
  putSelectedProjectThunk,
  setCodes
} from '../../../store/reducers/project-reducer';
import { useAppDispatch } from '../../../store/hooks';
import { Nestable as NestableModel } from '../../../models/Nestable';
import { Parentable } from '../../../models/Parentable';
import { ICode } from '../../../Nexus/entities/ICode';
import NestableHierarcy from '../../../NestableHierarchy/NestableHierarcy';
import Utils from '../../../common/Utils';
import { useSelectState } from './SelectContext';
import EditCodeForm from './EditCodeForm';
import CodeAddButton from './CodeAddButton';
import NewCodeForm from './NewCodeForm';
import { usePanelStyles } from './CodelistStyles';

const CodePanel = (): React.ReactElement => {
  const classes = usePanelStyles();
  const dispatch = useAppDispatch();
  const { codelist, setCodelist } = useSelectState();
  const [editMode, setEditMode] = useState('');
  const [isCreating, setCreating] = useState(false);
  const [nestableCodes, setNestableCodes] = useState<NestableModel<ICode>[]>(
    []
  );

  useEffect(() => {
    setEditMode('');
    setCreating(false);
    if (codelist) {
      setNestableCodes(Utils.parentable2Nestable(codelist.codes));
    }
  }, [codelist]);

  // If no codelist is selected, we cant create the component
  if (!codelist) {
    return <></>;
  }

  const { onChange } = NestableHierarcy(
    (item: Parentable<ICode>, index: number) => {
      const newCodes = [...codelist.codes];
      const indexOfMoved = newCodes.findIndex(
        (oldItem) => oldItem.id === item.id
      );
      newCodes.splice(indexOfMoved, 1);
      newCodes.splice(index, 0, item);

      dispatch(setCodes({ codelistId: codelist.id, codes: newCodes }));
      dispatch(putSelectedProjectThunk('dummy'));

      setCodelist({ ...codelist, codes: newCodes });
    }
  );

  const isEditing = () => {
    return editMode !== '';
  };
  const isEditingItem = (item: Item) => {
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

  const enterEditMode = (item: Item) => {
    setEditMode(item.id);
    setCreating(false);
  };

  const enterCreateMode = () => {
    setEditMode('');
    setCreating(true);
  };

  const renderItem = (item: Item, handler: React.ReactNode) => {
    if (isEditingItem(item)) {
      return (
        <Box className={classes.editableListItem}>
          <Box className={classes.textItem}>
            <EditCodeForm
              parent={codelist}
              element={Utils.nestable2Parentable(item as NestableModel<ICode>)}
              handleClose={handleCloseEdit}
            />
          </Box>
        </Box>
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
        <Box className={classes.editIcon} onClick={() => enterEditMode(item)}>
          <EditOutlinedIcon />
        </Box>
      </Box>
    );
  };

  return (
    <Box className={classes.topContainer}>
      <CodeAddButton onClick={() => enterCreateMode()} />
      {isCreating && (
        <Box className={classes.editableListItem}>
          <Box className={classes.textItem}>
            <NewCodeForm parent={codelist} handleClose={handleCloseCreate} />
          </Box>
        </Box>
      )}
      <Nestable
        items={nestableCodes}
        className={classes.nestableCustom}
        renderItem={({ item, handler }) => renderItem(item, handler)}
        onChange={(items) => onChange(items)}
        maxDepth={1}
        handler={<DragIndicatorIcon />}
      />
    </Box>
  );
};

export default CodePanel;
