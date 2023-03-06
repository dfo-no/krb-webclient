import { Dispatch, SetStateAction } from 'react';
import { Box, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

import theme from '../../../../theme';
import { usePanelStyles } from './CodelistStyles';
import { CodelistForm } from '../../../../api/nexus2';
import { useEditableState } from '../../../../components/EditableContext/EditableContext';
import { FormIconButton } from '../../../../components/Form/FormIconButton';

interface Props {
  codelist: CodelistForm;
  isSelected: boolean;
  setSelectedCodelist: Dispatch<SetStateAction<CodelistForm | null>>;
}

export const DisplayCodelist = ({
  codelist,
  isSelected,
  setSelectedCodelist,
}: Props) => {
  const classes = usePanelStyles();
  const {
    currentlyEditedItemId,
    setCurrentlyEditedItemId,
    deleteCandidateId,
    setDeleteCandidateId,
  } = useEditableState();

  const itemClicked = (clickedCodelist: CodelistForm) => {
    if (currentlyEditedItemId !== '') {
      setCurrentlyEditedItemId('');
    }
    if (deleteCandidateId !== '') {
      setDeleteCandidateId('');
    }
    setSelectedCodelist(clickedCodelist);
  };

  const isSelectedClass = () => {
    return isSelected ? classes.selectedItem : '';
  };

  const enterEditMode = (codelistToEdit: CodelistForm) => {
    setSelectedCodelist(codelistToEdit);
    setCurrentlyEditedItemId(codelistToEdit.ref);
  };

  const enterDeleteMode = (codelistToDelete: CodelistForm) => {
    setSelectedCodelist(codelistToDelete);
    setDeleteCandidateId(codelistToDelete.ref);
  };
  return (
    <Box
      className={`${classes.listItem} ${
        classes.withHover
      } ${isSelectedClass()}`}
    >
      <Box className={classes.textItem} onClick={() => itemClicked(codelist)}>
        <Box className={classes.textItemTitle}>
          <Typography variant="smBold">{codelist.title}</Typography>
          <FormIconButton
            sx={{ marginLeft: 'auto' }}
            hoverColor={theme.palette.primary.main}
            onClick={() => enterEditMode(codelist)}
          >
            <EditOutlinedIcon />
          </FormIconButton>
          <FormIconButton
            hoverColor={theme.palette.errorRed.main}
            onClick={() => enterDeleteMode(codelist)}
          >
            <DeleteIcon />
          </FormIconButton>
        </Box>
        <Box className={classes.textItemDescription}>
          <Typography variant="sm">{codelist.description}</Typography>
        </Box>
      </Box>
    </Box>
  );
};
