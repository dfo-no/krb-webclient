import React, { useEffect } from 'react';
import 'react-nestable/dist/styles/index.css';
import { Parentable } from '../../models/Parentable';
import { Nestable, Nestable as NestableModel } from '../../models/Nestable';
import { Box, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import theme from '../../theme';
import NestableHierarcy from '../../NestableHierarchy/NestableHierarcy';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { useEditableState } from './EditableContext';
import { BaseModelWithTitleAndDesc } from '../../models/BaseModelWithTitleAndDesc';
import { FormContainerBox } from './Form/FormContainerBox';
import Utils from '../../common/Utils';

const useStyles = makeStyles({
  nestableItemCustom: {
    display: 'flex',
    flexDirection: 'row',
    minHeight: 50,
    backgroundColor: theme.palette.dfoWhite.main
  },
  nestableItemEditable: {
    height: 70,
    backgroundColor: theme.palette.dfoWhite.main
  },
  nestableCustom: {
    '& .nestable-item': {
      marginTop: '16px',
      '& .nestable-item-name': {
        borderTop: `1px solid ${theme.palette.gray500.main}`,
        borderBottom: `1px solid ${theme.palette.gray500.main}`
      }
    },
    '& .nestable-list > .nestable-item > .nestable-list': {
      margin: '0',
      '& .nestable-item': {
        margin: '0',
        '& .nestable-item-name': {
          marginTop: '-1px'
        }
      }
    },
    width: '100%'
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
  dispatchfunc: (item: Parentable<T>, index: number) => void;
  inputlist: NestableModel<T>[];
  CreateComponent: React.ReactElement;
  EditComponent: (item: Parentable<T>) => React.ReactElement;
  depth: number;
}

const NestableHierarcyEditableComponent = <
  T extends BaseModelWithTitleAndDesc
>({
  dispatchfunc,
  inputlist,
  CreateComponent,
  EditComponent,
  depth
}: IProps<T>): React.ReactElement => {
  const classes = useStyles();
  const { editMode, setEditMode, isCreating } = useEditableState();

  const isEditing = () => {
    return editMode !== '';
  };
  const isEditingItem = (item: Nestable<T>) => {
    return item && item.id === editMode;
  };

  const renderItem = (item: Nestable<T>, handler: React.ReactNode) => {
    if (isEditingItem(item)) {
      return (
        <FormContainerBox className={classes.nestableItemEditable}>
          {EditComponent(Utils.nestable2Parentable(item))}
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
    <Box>
      {isCreating && (
        <FormContainerBox className={classes.nestableItemEditable}>
          {CreateComponent}
        </FormContainerBox>
      )}
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

export default NestableHierarcyEditableComponent;
