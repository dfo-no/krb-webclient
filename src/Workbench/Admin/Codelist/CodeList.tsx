import React from 'react';
import List from '@mui/material/List';
import makeStyles from '@mui/styles/makeStyles';
import ListItem from '@mui/material/ListItem';
import { Box } from '@mui/material/';
import Typography from '@mui/material/Typography';
import theme from '../../../theme';
import { ICodelist } from '../../../Nexus/entities/ICodelist';

interface IProps {
  list: ICodelist[];
}

const useStyles = makeStyles({
  list: {
    display: 'flex',
    flexDirection: 'column',
    listStyle: 'none',
    '&>:last-child': {
      '& $codeListItemChildren': {
        '&>:last-child': {
          borderBottom: `1px solid ${theme.palette.silver.main}`
        }
      }
    }
  },
  codeListItem: {
    display: 'flex',
    flexDirection: 'column',
    padding: '0 !important'
  },
  codeListItemParent: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 25,
    width: '100%',
    height: 55,
    border: `1px solid ${theme.palette.silver.main}`,
    backgroundColor: theme.palette.dfoWhite.main,
    paddingRight: 10
  },
  codeListItemParentTitle: {
    flex: 1
  },
  codeListItemParentDescription: {
    flex: 1,
    borderLeft: `1px solid ${theme.palette.silver.main}`,
    paddingLeft: 10,
    color: theme.palette.gray600.main
  },
  codeListItemChildren: {
    width: '95%',
    alignSelf: 'flex-end',

    '&>:last-child': {
      borderBottom: 'none'
    }
  },
  codeListItemChild: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 25,
    height: 55,
    border: `1px solid ${theme.palette.silver.main}`,
    backgroundColor: theme.palette.dfoWhite.main,
    borderTop: 'none'
  }
});

export default function CodeList({ list }: IProps): React.ReactElement {
  const classes = useStyles();

  return (
    <List className={classes.list} aria-label="codelist">
      {list.map(function (codelist: ICodelist, i: number) {
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
              {Object.keys(codelist.codes).map((code, j) => (
                <Box key={j} className={classes.codeListItemChild}>
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
