import { Controller } from 'react-hook-form';
import { List, ListItem, Typography, Checkbox, Box } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React from 'react';
import { useParams } from 'react-router-dom';
import { IRouteParams } from '../Workbench/Models/IRouteParams';
import { useGetProjectQuery } from '../store/api/bankApi';
import LoaderSpinner from '../common/LoaderSpinner';
import theme from '../theme';
import Utils from '../common/Utils';
import { Levelable } from '../models/Levelable';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { ScrollableContainer } from '../Workbench/Components/ScrollableContainer';
import { Parentable } from '../models/Parentable';
import { IBaseModelWithTitleAndDesc } from '../models/IBaseModelWithTitleAndDesc';

const useStyles = makeStyles({
  checkbox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '22px',
    height: '22px',
    marginRight: 32,
    marginLeft: 16,
    border: `2px solid`,
    '& .MuiSvgIcon-root': {
      color: theme.palette.white.main
    }
  },
  list: {
    border: `1px solid ${theme.palette.black.main}`,
    backgroundColor: theme.palette.gray100.main,
    maxHeight: 400,
    padding: 32
  },
  listItem: {
    display: 'flex',
    backgroundColor: theme.palette.white.main,
    border: `1px solid ${theme.palette.silver.main}`,
    minHeight: 50,
    padding: 0,
    paddingTop: 8,
    paddingBottom: 8,
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: theme.palette.lightBlue.main,
      color: theme.palette.white.main,
      '& .MuiSvgIcon-root': {
        backgroundColor: theme.palette.white.main,
        color: theme.palette.lightBlue.main
      }
    }
  },
  itemDescription: {
    marginLeft: 'auto',
    borderLeft: `1px solid ${theme.palette.silver.main}`,
    paddingLeft: 20,
    flex: '0 0 30vw'
  },
  itemTitle: {
    alignSelf: 'center',
    paddingLeft: 15,
    flex: '1 1 auto'
  }
});

interface IProps<T extends IBaseModelWithTitleAndDesc> {
  name: string;
  items: Parentable<T>[];
}

const SelectionMultipleCtrl = <T extends IBaseModelWithTitleAndDesc>({
  name,
  items
}: IProps<T>): React.ReactElement => {
  const { projectId } = useParams<IRouteParams>();
  const { data: project } = useGetProjectQuery(projectId);
  const classes = useStyles();

  if (!project) {
    return <LoaderSpinner />;
  }

  const levelableItems: Levelable<T>[] = Utils.parentable2Levelable(items);

  const onClick = (
    item: T,
    selected: string[],
    onChange: (value: string[]) => void
  ) => {
    if (selected.some((elem) => elem === item.id)) {
      const selectedUpdated = [...selected];
      const index = selectedUpdated.findIndex((elem) => elem === item.id);
      if (index !== -1) {
        selectedUpdated.splice(index, 1);
      }
      onChange(selectedUpdated);
    } else {
      onChange([...selected, item.id]);
    }
  };

  const productChecked = (item: T, selected: string[]) => {
    return selected.some((elem) => elem === item.id);
  };

  return (
    <Controller
      render={({ field: { value: selected, onChange } }) => (
        <ScrollableContainer className={classes.list}>
          <List>
            {levelableItems.map((item) => {
              return (
                <ListItem
                  key={item.id}
                  className={classes.listItem}
                  sx={{
                    marginTop: item.level === 1 ? 2 : -0.125, // -0.125 is equal to 1px to prevent double border
                    marginLeft: `${(item.level - 1) * 2}%`,
                    width: `${100 - (item.level - 1) * 2}%`
                  }}
                  onClick={() => onClick(item, selected, onChange)}
                >
                  <Box
                    className={classes.checkbox}
                    sx={{
                      backgroundColor: productChecked(item, selected)
                        ? theme.palette.primary.main
                        : 'none'
                    }}
                  >
                    <Checkbox
                      icon={<></>}
                      checkedIcon={<CheckBoxIcon />}
                      checked={productChecked(item, selected)}
                    />
                  </Box>
                  <Typography
                    className={classes.itemTitle}
                    variant={item.level === 1 ? 'smBold' : 'sm'}
                  >
                    {item.title}
                  </Typography>
                  <Typography
                    className={classes.itemDescription}
                    variant={'sm'}
                  >
                    {item.description}
                  </Typography>
                </ListItem>
              );
            })}
          </List>
        </ScrollableContainer>
      )}
      name={name}
    />
  );
};

export default SelectionMultipleCtrl;
