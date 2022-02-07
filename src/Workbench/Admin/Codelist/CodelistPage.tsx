import React, { useState } from 'react';
import { IProduct } from '../../../Nexus/entities/IProduct';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import CodeListSearchBar from './CodeListSearchBar';

import { Box } from '@mui/material/';
import Button from '@mui/material/Button';
import { makeStyles } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import theme from '../../../theme';
import NewCodeListForm from './NewCodeListForm';
import Dialog from '../../../components/DFODialog/DFODialog';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

const useStyles = makeStyles({
  codelistsContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 40,
    gap: 30,
    margin: 'auto',
    width: '60vw',
    paddingLeft: 40,
    paddingRight: 40,
    paddingBottom: 30
  },
  searchFieldButtonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',

    [theme.breakpoints.down('header')]: {
      flexDirection: 'column',
      gap: 20
    }
  },
  searchField: {
    width: '35vw',
    minWidth: 300,
    paddingRight: 10,
    [theme.breakpoints.down('xs')]: {
      alignSelf: 'center',
      minWidth: 400
    }
  },
  addCodelistButton: {
    alignContent: 'flex-end',
    backgroundColor: 'red',

    [theme.breakpoints.down('md')]: {
      alignSelf: 'center'
    }
  },
  codelists: { width: 100 },
  list: {
    display: 'flex',
    flexDirection: 'column',
    listStyle: 'none',
    width: 874
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
    width: 850,
    alignSelf: 'flex-end'
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

export default function CodeListPage(): React.ReactElement {
  const { project } = useAppSelector((state) => state.project);
  const [codelists, setCodelists] = useState([]);
  const [show, setShow] = useState(false);

  const searchFieldCallback = (result: any) => {
    setCodelists(result);
  };

  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <>
      <Box className={classes.codelistsContainer}>
        <Box className={classes.searchFieldButtonContainer}>
          <Box className={classes.searchField}>
            <CodeListSearchBar
              list={project.products}
              callback={searchFieldCallback}
            />
          </Box>
          <Box className={classes.addCodelistButton}>
            <Button
              variant="primary"
              onClick={() => {
                setShow(true);
              }}
            >
              {t('add new code')}
            </Button>
          </Box>
        </Box>

        <Box className={classes.codelists}>
          <List className={classes.list} aria-label="codelist">
            {project.codelist.map(function (codelist, i) {
              const isLastItem =
                project.codelist.length - 1 === i ? 'true' : 'false';

              return (
                <ListItem className={classes.codeListItem} key={i}>
                  <Box className={classes.codeListItemParent}>
                    <Box className={classes.codeListItemParentTitle}>
                      <Typography variant="smallBold">
                        {codelist.title}
                      </Typography>
                    </Box>
                    <Box className={classes.codeListItemParentDescription}>
                      <Typography>En kort beskrivelse av kodelisten</Typography>
                    </Box>
                  </Box>

                  <List className={classes.codeListItemChildren}>
                    {Object.keys(codelist.codes).map((item, j) => (
                      <Box className={classes.code} key={j}>
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
        </Box>

        <Dialog
          title={t('add new code')}
          isOpen={show}
          handleClose={() => setShow(false)}
          children={<NewCodeListForm handleClose={() => setShow(false)} />}
        />
      </Box>
    </>
  );
}
