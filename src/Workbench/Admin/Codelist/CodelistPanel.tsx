import React, { useState } from 'react';
import 'react-nestable/dist/styles/index.css';
import { Box } from '@material-ui/core';
import { Typography } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import List from '@mui/material/List';
import { ICodelist } from '../../../Nexus/entities/ICodelist';
import CodelistAddButton from './CodelistAddButton';
import { useSelectState } from './SelectContext';
import EditCodelistForm from './EditCodelistForm';
import NewCodelistForm from './NewCodelistForm';
import { usePanelStyles } from './CodelistStyles';

const CodelistPanel = (): React.ReactElement => {
  const classes = usePanelStyles();
  const { codelist, setCodelist, codelists, setCodelists } = useSelectState();
  const [editMode, setEditMode] = useState('');
  const [isCreating, setCreating] = useState(false);

  const itemClicked = (item: ICodelist) => {
    if (editMode !== '') {
      setEditMode('');
    }
    setCodelist(item);
  };

  const handleCloseEdit = (newCodelist: ICodelist | null) => {
    if (newCodelist) {
      setCodelist(newCodelist);
    }
    setEditMode('');
  };

  const handleCloseCreate = (newCodelist: ICodelist | null) => {
    if (newCodelist) {
      setCodelist(newCodelist);
      setCodelists([...codelists, newCodelist]);
    }
    setCreating(false);
  };

  const isEditingItem = (item: ICodelist) => {
    return item && item.id === editMode;
  };

  const selectedClass = (item: ICodelist) => {
    return codelist && codelist.id === item.id ? classes.selectedItem : '';
  };

  const enterEditMode = (item: ICodelist) => {
    setCodelist(item);
    setEditMode(item.id);
    setCreating(false);
  };

  const enterCreateMode = () => {
    setEditMode('');
    setCreating(true);
  };

  const renderItem = (item: ICodelist, i: number) => {
    if (isEditingItem(item)) {
      return (
        <Box className={classes.codelistItemRootEditing} key={i}>
          <Box className={classes.codelistItem}>
            <EditCodelistForm element={item} handleClose={handleCloseEdit} />
          </Box>
        </Box>
      );
    }
    return (
      <Box key={i}>
        {!isEditingItem(item) && (
          <Box className={`${classes.codelistItemRoot} ${selectedClass(item)}`}>
            <Box
              className={classes.codelistItem}
              onClick={() => itemClicked(item)}
            >
              <Box>
                <Typography variant="smallBold">{item.title}</Typography>
              </Box>
              <Box className={classes.codelistItemDescription}>
                <Typography>{item.description}</Typography>
              </Box>
            </Box>
            <Box
              className={classes.editIcon}
              onClick={() => enterEditMode(item)}
            >
              <EditOutlinedIcon />
            </Box>
            {codelist && codelist.id === item.id && (
              <Box className={classes.arrowIcon}>
                <ArrowForwardIcon />
              </Box>
            )}
          </Box>
        )}
      </Box>
    );
  };

  return (
    <Box className={classes.topContainer}>
      <CodelistAddButton onClick={() => enterCreateMode()} />
      {isCreating && (
        <Box className={classes.codelistItemRootEditing}>
          <Box className={classes.codelistItem}>
            <NewCodelistForm handleClose={handleCloseCreate} />
          </Box>
        </Box>
      )}
      <List className={classes.list} aria-label="codelist">
        {codelists && codelists.map(renderItem)}
      </List>
    </Box>
  );
};

export default CodelistPanel;
