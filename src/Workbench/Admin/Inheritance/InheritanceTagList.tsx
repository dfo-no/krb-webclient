import { makeStyles } from '@material-ui/core';
import DFOSearchBar from '../../../components/DFOSearchBar/DFOSearchBar';
import { useAppSelector } from '../../../store/hooks';
import List from '@mui/material/List';
import theme from '../../../theme';
import { Typography, Box, ListItem, ListItemText } from '@mui/material/';
import { DFOCheckbox } from '../../../components/DFOCheckbox/DFOCheckbox';

const useStyles = makeStyles({
  inheritanceTagList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
    margin: 'auto',
    border: '2px solid #005B91',
    backgroundColor: '#efefef',
    width: '50vw',
    padding: 30
  },
  topContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  searchContainer: {
    width: '50%'
  },
  tagsList: {
    border: `1px solid ${theme.palette.silver.main}`,
    '&:last-child': {
      borderBottom: 'none'
    },
    '& .MuiList-root': {
      paddingTop: 0,
      paddingBottom: 0
    }
  },
  tagListItem: {
    display: 'flex',
    backgroundColor: theme.palette.dfoWhite.main,
    borderBottom: `1px solid ${theme.palette.silver.main}`,
    height: '42px'
  },
  tagListItemTitle: { width: '40%' },
  tagListItemDescription: {
    display: 'flex',
    alignItems: 'center',
    borderLeft: `1px solid ${theme.palette.silver.main}`,
    paddingLeft: 10,
    width: '90%',
    height: '42px'
  },
  tagListCheckbox: {},
  showTagsText: {}
});

export default function InheritancePage(): React.ReactElement {
  const { project } = useAppSelector((state) => state.project);
  const classes = useStyles();

  const tagsCallback = () => {};
  const tagsSearchFunction = () => {};

  const tags = [
    { title: 'Merkelapp 1', description: 'Merkelapp beskrivelse' },
    { title: 'Merkelapp 2', description: 'Merkelapp beskrivelse' },
    { title: 'Merkelapp 3', description: 'Merkelapp beskrivelse' },
    { title: 'Merkelapp 4', description: 'Merkelapp beskrivelse' },
    { title: 'Merkelapp 5', description: 'Merkelapp beskrivelse' },
    { title: 'Merkelapp 6', description: 'Merkelapp beskrivelse' },
    { title: 'Merkelapp 7', description: 'Merkelapp beskrivelse' },
    { title: 'Merkelapp 8', description: 'Merkelapp beskrivelse' },
    { title: 'Merkelapp 9', description: 'Merkelapp beskrivelse' },
    { title: 'Merkelapp 10', description: 'Merkelapp beskrivelse' },
    { title: 'Merkelapp 11', description: 'Merkelapp beskrivelse' },
    { title: 'Merkelapp 12', description: 'Merkelapp beskrivelse' }
  ];

  return (
    <>
      <Box className={classes.inheritanceTagList}>
        <Box className={classes.topContainer}>
          <Box className={classes.searchContainer}>
            <DFOSearchBar
              label="Søk etter merkelapper"
              list={project.tags}
              searchFunction={tagsSearchFunction}
              callback={tagsCallback}
            />
          </Box>
          <Typography className={classes.showTagsText} variant="smallUnderline">
            Vis valgte merkelapper
          </Typography>
        </Box>
        <Box className={classes.tagsList}>
          <List>
            {tags.map((tag) => {
              return (
                <ListItem className={classes.tagListItem} key={tag.title}>
                  <Box className={classes.tagListCheckbox}>
                    <DFOCheckbox />
                  </Box>
                  <Box className={classes.tagListItemTitle}>
                    <ListItemText>
                      <Typography variant="smallGray">{tag.title}</Typography>
                    </ListItemText>
                  </Box>
                  <Box className={classes.tagListItemDescription}>
                    <ListItemText>
                      <Typography variant="smallGray">
                        {tag.description}
                      </Typography>
                    </ListItemText>
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
