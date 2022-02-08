import React from 'react';
import List from '@mui/material/List';
import { makeStyles } from '@material-ui/core';
import ListItem from '@mui/material/ListItem';
import { Box } from '@mui/material/';
import Typography from '@mui/material/Typography';
import theme from '../../../theme';

interface IProps {
  list: any;
}

const useStyles = makeStyles({
  list: {
    display: 'flex',
    flexDirection: 'column',
    listStyle: 'none',
    '&>:last-child': {
      '& $codeListItemChildren': {
        '&>:last-child': {
          borderBottom: '1px solid #BBBBBB'
        }
      }
    }
  },
  codeListItem: {
    display: 'flex',
    flexDirection: 'column',
    padding: '0 !important'
  },
  code: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 25,
    height: 55,
    border: '1px solid #BBBBBB',
    backgroundColor: theme.palette.dfoWhite.main,
    borderTop: 'none'
  },
  codeListItemParent: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 25,
    width: '100%',
    height: 55,
    border: '1px solid #BBBBBB',
    backgroundColor: theme.palette.dfoWhite.main,
    paddingRight: 10
  },
  codeListItemChildren: {
    width: '95%',
    alignSelf: 'flex-end',

    '&>:last-child': {
      borderBottom: 'none'
    }
  },
  codeListItemParentTitle: {
    flex: 1
  },
  codeListItemParentDescription: {
    flex: 1,
    borderLeft: '1px solid #BBBBBB',
    paddingLeft: 10,
    color: '#B5B5B5',
    fontSize: 1
  }
});

export default function CodeList({ list }: IProps): React.ReactElement {
  const classes = useStyles();
  return (
    <List className={classes.list} aria-label="codelist">
      {list.map(function (codelist: any, i: number) {
        return (
          <ListItem className={classes.codeListItem} key={i}>
            <Box className={classes.codeListItemParent}>
              <Box className={classes.codeListItemParentTitle}>
                <Typography variant="smallBold">{codelist.title}</Typography>
              </Box>
              <Box className={classes.codeListItemParentDescription}>
                <Typography>{codelist.description}</Typography>
              </Box>
            </Box>

            <List className={classes.codeListItemChildren}>
              {Object.keys(codelist.codes).map((item, j) => (
                <Box key={j} className={classes.code}>
                  <Typography variant="smallBold">
                    {codelist.codes[j].title}
                  </Typography>
                </Box>
              ))}
            </List>
          </ListItem>
        );
      })}
    </List>
  );
}
