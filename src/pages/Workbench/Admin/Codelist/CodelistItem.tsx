import DeleteIcon from '@mui/icons-material/Delete';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Box, Typography } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';

import theme from '../../../../theme';
import DeleteCodelistForm from './DeleteCodelistForm';
import EditCodelistForm from './EditCodelistForm';
import { FormIconButton } from '../../../../components/Form/FormIconButton';
import { ICodelist } from '../../../../Nexus/entities/ICodelist';
import { FormContainerBox } from '../../../../components/Form/FormContainerBox';
import { usePanelStyles } from './CodelistStyles';
import { useEditableState } from '../../../../components/EditableContext/EditableContext';
import { useSelectState } from './SelectContext';
import Utils from '../../../../common/Utils';

type Props = {
  codelist: ICodelist;
  setSelectedCodelist: Dispatch<SetStateAction<ICodelist | null>>;
  isSelected: boolean;
};

export const CodelistItem = ({
  codelist,
  setSelectedCodelist,
  isSelected,
}: Props) => {
  const classes = usePanelStyles();

  const { allCodelists, setAllCodelists } = useSelectState();
  const { editMode, setEditMode, deleteMode, setDeleteMode } =
    useEditableState();

  const itemClicked = (clickedCodelist: ICodelist) => {
    if (editMode !== '') {
      setEditMode('');
    }
    if (deleteMode !== '') {
      setDeleteMode('');
    }
    setSelectedCodelist(clickedCodelist);
  };

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

  const isSelectedClass = () => {
    return isSelected ? classes.selectedItem : '';
  };

  const enterEditMode = (codelistToEdit: ICodelist) => {
    setSelectedCodelist(codelistToEdit);
    setEditMode(codelistToEdit.id);
  };

  const enterDeleteMode = (codelistToDelete: ICodelist) => {
    setSelectedCodelist(codelistToDelete);
    setDeleteMode(codelistToDelete.id);
  };

  const renderCodelist = (codelistToRender: ICodelist) => {
    return (
      <Box
        className={`${classes.listItem} ${
          classes.withHover
        } ${isSelectedClass()}`}
      >
        <Box
          className={classes.textItem}
          onClick={() => itemClicked(codelistToRender)}
        >
          <Box className={classes.textItemTitle}>
            <Typography variant="smBold">{codelistToRender.title}</Typography>
            <FormIconButton
              sx={{ marginLeft: 'auto' }}
              hoverColor={theme.palette.primary.main}
              onClick={() => enterEditMode(codelistToRender)}
            >
              <EditOutlinedIcon />
            </FormIconButton>
            <FormIconButton
              hoverColor={theme.palette.errorRed.main}
              onClick={() => enterDeleteMode(codelistToRender)}
            >
              <DeleteIcon />
            </FormIconButton>
          </Box>
          <Box className={classes.textItemDescription}>
            <Typography variant="sm">{codelistToRender.description}</Typography>
          </Box>
        </Box>
      </Box>
    );
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
        children={renderCodelist(codelist)}
        codelist={codelist}
        handleClose={handleCloseDelete}
      />
    );
  }
};
