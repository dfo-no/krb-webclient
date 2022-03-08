import ArrowForwardIos from '@mui/icons-material/ArrowForwardIos';
import AppBar from '@mui/material/AppBar';
import CardMedia from '@mui/material/CardMedia';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem, {
  listItemClasses,
  ListItemProps
} from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { styled } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import logoWhite from '../assets/images/logo-white.svg';
import theme from '../theme';

const StyledListItem = styled(ListItem)<ListItemProps>(({ theme: t }) => {
  return {
    '&.MuiListItem-root': {
      '&.MuiListItem-divider': {
        borderBottom: `1px solid ${t.palette.dfoLightBlue.main}`
      }
    }
  };
});

const Footer = () => {
  const links = [
    { title: 'Kontakt', href: '/' },
    { title: 'English', href: '/' },
    { title: 'Personvern', href: '/' },
    { title: 'Offentlig postjournal', href: '/' }
  ];
  console.log(listItemClasses.root);
  /*
  1. Slett Gammel Footer og tilhørende ubrukte komponenter.
  2. Legg til hover farge
  3. Endre icon farge.
  4. Legg til lenke
  5. Flytt footer til nederst.
  */

  return (
    <AppBar position="fixed" sx={{ top: 'auto', bottom: 0 }}>
      <Toolbar sx={{ bgcolor: 'dfoDarkBlue.main' }}>
        <Grid container>
          <Grid
            item
            xs={12}
            sm={6}
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              p: 4
            }}
          >
            <List
              dense
              sx={{
                width: '100%',
                maxWidth: 460,
                height: '90%',
                [`& .${listItemClasses.root}:hover`]: {
                  color: theme.palette.dfoLightBlue.main,
                  fontWeight: 'bold',
                  '& svg': {
                    fill: theme.palette.dfoLightBlue.main
                  }
                }
              }}
            >
              <Divider
                component="li"
                sx={{
                  borderTop: `1px solid ${theme.palette.dfoLightBlue.main}`
                }}
              />
              {links.map((link) => (
                <StyledListItem
                  divider={true}
                  alignItems="flex-start"
                  key={link.title}
                >
                  <ListItemButton>
                    <ListItemText primary={link.title} />
                    <ListItemIcon sx={{ color: 'white' }}>
                      <ArrowForwardIos />
                    </ListItemIcon>
                  </ListItemButton>
                </StyledListItem>
              ))}
            </List>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              pl: 8,
              pt: 2,
              pb: 2
            }}
          >
            <CardMedia
              component="img"
              image={logoWhite}
              sx={{ width: 137, height: 38 }}
            />
            <Typography>Karl Johans gate 37B</Typography>
            <Typography>Pb 7154 St. Olavs plass, 0130 Oslo</Typography>
            <Typography>Tlf: 400 07 997</Typography>
            <Typography>Org. nr. 986 252 932</Typography>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Footer;
