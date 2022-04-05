import DeleteIcon from '@mui/icons-material/Delete';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Box, List, Typography } from '@mui/material';
import React from 'react';
import 'react-nestable/dist/styles/index.css';
import Utils from '../../../common/Utils';
import { ICodelist } from '../../../Nexus/entities/ICodelist';
import theme from '../../../theme';
import { useEditableState } from '../../Components/EditableContext';
import { FormContainerBox } from '../../Components/Form/FormContainerBox';
import { FormIconButton } from '../../Components/Form/FormIconButton';
import { ScrollableContainer } from '../../Components/ScrollableContainer';
import CodelistAddButton from './CodelistAddButton';
import { usePanelStyles } from './CodelistStyles';
import DeleteCodelistForm from './DeleteCodelistForm';
import EditCodelistForm from './EditCodelistForm';
import NewCodelistForm from './NewCodelistForm';
import { useSelectState } from './SelectContext';

const CodelistPanel = (): React.ReactElement => {
  const classes = usePanelStyles();
  const { codelist, setCodelist, codelists, setCodelists } = useSelectState();
  const {
    editMode,
    setEditMode,
    isCreating,
    setCreating,
    deleteMode,
    setDeleteMode
  } = useEditableState();

  const itemClicked = (item: ICodelist) => {
    if (editMode !== '') {
      setEditMode('');
    }
    if (deleteMode !== '') {
      setDeleteMode('');
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
      setCodelists(Utils.addElementToList(newCodelist, codelists));
    }
    setCreating(false);
  };

  const handleCloseDelete = (deletedCodelist: ICodelist | null) => {
    if (deletedCodelist) {
      setCodelist(null);
      setCodelists(Utils.removeElementFromList(deletedCodelist, codelists));
    }
    setDeleteMode('');
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
  };

  const enterDeleteMode = (item: ICodelist) => {
    setCodelist(item);
    setDeleteMode(item.id);
  };

  const renderCodelistItem = (item: ICodelist) => {
    return (
      <Box
        className={`${classes.listItem} ${classes.withHover} ${selectedClass(
          item
        )}`}
      >
        <Box className={classes.textItem} onClick={() => itemClicked(item)}>
          <Box className={classes.textItemTitle}>
            <Typography variant="sm" sx={{ fontWeight: 'bold' }}>
              {item.title}
            </Typography>
            <FormIconButton
              sx={{ marginLeft: 'auto' }}
              hoverColor={theme.palette.primary.main}
              onClick={() => enterEditMode(item)}
            >
              <EditOutlinedIcon />
            </FormIconButton>
            <FormIconButton
              hoverColor={theme.palette.errorRed.main}
              onClick={() => enterDeleteMode(item)}
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

  const renderItem = (item: ICodelist, i: number) => {
    if (isEditingItem(item)) {
      return (
        <FormContainerBox sx={{ marginBottom: 1 }} key={i}>
          <EditCodelistForm codelist={item} handleClose={handleCloseEdit} />
        </FormContainerBox>
      );
    }
    return (
      <DeleteCodelistForm
        key={i}
        children={renderCodelistItem(item)}
        codelist={item}
        handleClose={handleCloseDelete}
      />
    );
  };

  return (
    <Box className={classes.topContainer}>
      <CodelistAddButton onClick={() => setCreating(true)} />
      {isCreating && (
        <FormContainerBox>
          <NewCodelistForm handleClose={handleCloseCreate} />
        </FormContainerBox>
      )}
      <ScrollableContainer>
        <List className={classes.list} aria-label="codelist">
          {codelists && codelists.map(renderItem)}
        </List>
      </ScrollableContainer>
    </Box>
  );
};

export default CodelistPanel;
