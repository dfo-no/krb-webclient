import { makeStyles } from '@material-ui/core';
import DFOSearchBar from '../../../components/DFOSearchBar/DFOSearchBar';
import SwitchCtrl from '../../../FormProvider/SwitchCtrl';
import { useAppSelector } from '../../../store/hooks';
import List from '@mui/material/List';
import theme from '../../../theme';
import { Typography, Box, ListItem, ListItemText } from '@mui/material/';
import { DFOCheckbox } from '../../../components/DFOCheckbox/DFOCheckbox';

const useStyles = makeStyles({
  inheritanceTagList: {
    border: '2px solid #005B91',
    backgroundColor: '#EFEFEF',
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
  tagsList: {},
  tagListItem: {
    display: 'flex',
    borderBottom: `1px solid ${theme.palette.silver.main}`,
    backgroundColor: theme.palette.dfoWhite.main
  },
  tagListItemTitle: { width: '40%' },
  tagListItemDescription: {
    borderLeft: `1px solid ${theme.palette.silver.main}`,
    paddingLeft: 10,
    width: '90%'
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
    { title: 'Merkelapp', description: 'En finfin merkelapp' },
    { title: 'Merkelapp to', description: 'En finfin tag' },
    { title: 'Merkelapp tre', description: 'En finfin tag' },
    { title: 'Merkelapp fire', description: 'En finfin tag' },
    { title: 'Merkelapp fem', description: 'En finfin tag' },
    { title: 'Merkelapp seks', description: 'En finfin tag' },
    { title: 'Merkelapp sju', description: 'En finfin tag' },
    { title: 'Merkelapp åtte', description: 'En finfin tag' },
    { title: 'Merkelapp ni', description: 'En finfin tag' },
    { title: 'Merkelapp ti', description: 'En finfin tag' },
    { title: 'Merkelapp elleve', description: 'En finfin tag' },
    { title: 'Merkelapp tolv', description: 'En finfin tag' }
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
