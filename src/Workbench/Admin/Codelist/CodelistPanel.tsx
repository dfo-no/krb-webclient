import React from 'react';
import 'react-nestable/dist/styles/index.css';
import { Typography, Box, List } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { ICodelist } from '../../../Nexus/entities/ICodelist';
import CodelistAddButton from './CodelistAddButton';
import { useSelectState } from './SelectContext';
import EditCodelistForm from './EditCodelistForm';
import NewCodelistForm from './NewCodelistForm';
import { usePanelStyles } from './CodelistStyles';
import { useEditableState } from '../../Components/EditableContext';
import { FormContainerBox } from '../../Components/Form/FormContainerBox';
import { ScrollableContainer } from '../../Components/ScrollableContainer';

const CodelistPanel = (): React.ReactElement => {
  const classes = usePanelStyles();
  const { codelist, setCodelist, codelists, setCodelists } = useSelectState();
  const { editMode, setEditMode, isCreating, setCreating } = useEditableState();

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
      <Box key={i}>
        {!isEditingItem(item) && (
          <Box
            className={`${classes.listItem} ${
              classes.withHover
            } ${selectedClass(item)}`}
          >
            <Box className={classes.textItem} onClick={() => itemClicked(item)}>
              <Box className={classes.textItemTitle}>
                <Typography variant="smallBold">{item.title}</Typography>
              </Box>
              <Box className={classes.textItemDescription}>
                <Typography variant="small">{item.description}</Typography>
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
