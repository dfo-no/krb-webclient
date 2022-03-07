import React from 'react';
import 'react-nestable/dist/styles/index.css';
import { Parentable } from '../../../models/Parentable';
import { Box, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import theme from '../../../theme';
import NestableHierarcy from './NestableHierarcy';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { useEditableState } from '../EditableContext';
import { BaseModelWithTitleAndDesc } from '../../../models/BaseModelWithTitleAndDesc';
import { FormContainerBox } from '../Form/FormContainerBox';

const useStyles = makeStyles({
  nestableItemCustom: {
    display: 'flex',
    minHeight: 50,
    border: `1px solid ${theme.palette.gray500.main}`,
    backgroundColor: theme.palette.dfoWhite.main
  },
  nestableCustom: {
    '& .nestable-item': {
      marginTop: '16px'
    },
    '& .nestable-list > .nestable-item > .nestable-list': {
      margin: '0',
      '& .nestable-item': {
        margin: '0',
        '& .nestable-item-name': {
          marginTop: '-1px'
        }
      }
    }
  },
  textItemTitle: {
    alignSelf: 'center',
    paddingLeft: 15
  },
  textItemDescription: {
    alignSelf: 'center',
    paddingLeft: 15,
    borderLeft: '1px solid',
    marginLeft: 'auto',
    width: '25vw'
  },
  handlerIcon: {
    alignSelf: 'center',
    cursor: 'pointer',
    paddingLeft: 8
  },
  editIcon: {
    alignSelf: 'center',
    cursor: 'pointer',
    paddingRight: '8px',
    '&:hover': {
      color: theme.palette.dfoLightBlue.main
    }
  }
});

interface IProps<T extends BaseModelWithTitleAndDesc> {
  dispatchfunc: (items: Parentable<T>[]) => void;
  inputlist: Parentable<T>[];
  CreateComponent: React.ReactElement;
  EditComponent: (item: Parentable<T>) => React.ReactElement;
  DeleteComponent?: (item: Parentable<T>) => React.ReactElement;
  depth: number;
}

const NestableHierarcyEditableComponents = <
  T extends BaseModelWithTitleAndDesc
>({
  dispatchfunc,
  inputlist,
  CreateComponent,
  EditComponent,
  DeleteComponent,
  depth
}: IProps<T>): React.ReactElement => {
  const classes = useStyles();
  const { editMode, setEditMode, isCreating } = useEditableState();

  const isEditing = () => {
    return editMode !== '';
  };
  const isEditingItem = (item: Parentable<T>) => {
    return item && item.id === editMode;
  };

  const renderItem = (item: Parentable<T>, handler: React.ReactNode) => {
    if (isEditingItem(item)) {
      return (
        <FormContainerBox>
          {EditComponent(item)}
          {DeleteComponent && DeleteComponent(item)}
        </FormContainerBox>
      );
    }
    return (
      <Box className={classes.nestableItemCustom}>
        {!isEditing() && <Box className={classes.handlerIcon}>{handler}</Box>}
        <Box className={classes.textItemTitle}>
          <Typography variant="smallBold">{item.title}</Typography>
        </Box>
        <Box className={classes.textItemDescription}>
          <Typography variant="small">{item.description}</Typography>
        </Box>
        <Box className={classes.editIcon} onClick={() => setEditMode(item.id)}>
          <EditOutlinedIcon />
        </Box>
      </Box>
    );
  };

  return (
    <Box sx={{ width: '100%' }}>
      {isCreating && <FormContainerBox>{CreateComponent}</FormContainerBox>}
      <NestableHierarcy<T>
        className={classes.nestableCustom}
        inputlist={inputlist}
        renderItem={renderItem}
        dispatchfunc={dispatchfunc}
        depth={depth}
      />
    </Box>
  );
};

export default NestableHierarcyEditableComponents;
