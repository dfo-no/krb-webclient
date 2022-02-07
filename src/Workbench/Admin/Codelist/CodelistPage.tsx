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
import { ja } from 'date-fns/locale';

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
  codelists: {},
  list: {
    display: 'flex',
    flexDirection: 'column',
    alignCo: 'center',
    listStyle: 'none',
    width: 874
  },
  codeListItem: {
    display: 'flex',
    flexDirection: 'column',
    padding: '0 !important'
  },
  code: {},
  codeListItemParent: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 25,
    width: '100%',
    height: 55,
    border: '1px solid #BBBBBB',
    backgroundColor: theme.palette.dfoWhite.main
  },
  codeListItemChildren: {
    height: 55,
    width: 850,
    alignSelf: 'flex-end',
    borderLeft: '1px solid #BBBBBB',
    borderRight: '1px solid #BBBBBB',
    backgroundColor: theme.palette.dfoWhite.main
  },
  codeListTitle: {
    color: 'red',
    justifySelf: 'center'
  }
});

export default function CodeListPage(): React.ReactElement {
  const { project } = useAppSelector((state) => state.project);
  const [codelists, setCodelists] = useState([]);
  const [show, setShow] = useState(false);

  const searchFieldCallback = (result: any) => {
    setCodelists(result);
  };

  console.log(project.codelist);

  const classes = useStyles();
  const { t } = useTranslation();

  // We dont get the correct data structure from the backend according to the flow, so here im creating some dummy data.
  const codeLists = [
    {
      id: 1,
      title: 'Kodeliste 1',
      codes: [
        { id: 1, name: 'Kode 1' },
        { id: 2, name: 'Kode 2' }
      ],
      sourceOriginal: '1',
      sourceRel: null,
      description: 'Kodelisten over alle kodelister'
    },
    {
      id: 2,
      title: 'Kodeliste 2',
      codes: [
        { id: 1, name: 'Kode 2' },
        { id: 2, name: 'Kode 3' }
      ],
      sourceOriginal: '2',
      sourceRel: null,
      description: 'Kodelisten over alle kodelister'
    },
    {
      id: 3,
      title: 'Kodeliste 3',
      codes: [
        { id: 1, name: 'Kode 4' },
        { id: 2, name: 'Kode 5' }
      ],
      sourceOriginal: '3',
      sourceRel: null,
      description: 'Kodelisten over alle kodelister'
    },
    {
      id: 4,
      title: 'Kodeliste 4',
      codes: [
        { id: 1, name: 'Kode 6' },
        { id: 2, name: 'Kode 7' }
      ],
      sourceOriginal: '4',
      sourceRel: null,
      description: 'Kodelisten over alle kodelister'
    },
    {
      id: 5,
      title: 'Kodeliste 5',
      codes: [
        { id: 1, name: 'Kode 8' },
        { id: 2, name: 'Kode 9' }
      ],
      sourceOriginal: '5',
      sourceRel: null,
      description: 'Kodelisten over alle kodelister'
    }
  ];

  const sorted = codeLists
    .slice()
    .sort((a, b) => (a.title.toLowerCase() < b.title.toLowerCase() ? -1 : 1));

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

        <Dialog
          title={t('add new code')}
          isOpen={show}
          handleClose={() => setShow(false)}
          children={<NewCodeListForm handleClose={() => setShow(false)} />}
        />

        <Box className={classes.codelists}>
          <List className={classes.list} aria-label="codelist">
            {sorted.map(function (codelist, i) {
              return (
                <ListItem className={classes.codeListItem} key={i}>
                  <Box className={classes.codeListItemParent}>
                    <Typography>{codelist.title}</Typography>
                  </Box>

                  <Box className={classes.codeListItemChildren}>
                    <List className={classes.list} aria-label="codelist">
                      {codelist.codes.map(function (code, j) {
                        return (
                          <ListItem className={classes.code} key={j}>
                            <ListItemText>
                              <Typography>{code.name}</Typography>
                            </ListItemText>
                          </ListItem>
                        );
                      })}
                    </List>
                  </Box>
                </ListItem>
              );
            })}
          </List>
        </Box>
      </Box>
    </>
  );
}
