import ArrowForwardIos from '@mui/icons-material/ArrowForwardIos';
import CardMedia from '@mui/material/CardMedia';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import ListItem, {
  listItemClasses,
  ListItemProps
} from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

import css from './Footer.module.scss';
import logoWhite from '../assets/images/logo-white-2-lines.svg';
import theme from '../theme';

const StyledListItem = styled(ListItem)<ListItemProps>(({ theme: t }) => {
  return {
    '&.MuiListItem-root': {
      '&.MuiListItem-divider': {
        borderBottom: `0.1rem solid ${t.palette.white.main}`
      }
    }
  };
});

const Footer = () => {
  const links = [
    { title: 'Kontakt', href: 'https://dfo.no/om-dfo/kontakt-oss' },
    { title: 'English', href: 'https://dfo.no/english' },
    { title: 'Personvern', href: 'https://dfo.no/om-dfo/personvern' },
    { title: 'Offentlig postjournal', href: 'https://einnsyn.no/' }
  ];

  return (
    <footer className={css.Footer}>
      <div className={css.content}>
        <div>
          <List
            dense
            sx={{
              width: '100%',
              height: '90%',
              [`& .${listItemClasses.root}:hover`]: {
                color: theme.palette.lightBlue.main,
                fontWeight: 'bold',
                '& svg': {
                  fill: theme.palette.lightBlue.main
                }
              }
            }}
          >
            <Divider
              component="li"
              sx={{
                borderTop: `0.1rem solid ${theme.palette.white.main}`
              }}
            />
            {links.map((link) => (
              <StyledListItem
                divider={true}
                alignItems="flex-start"
                key={link.title}
              >
                <ListItemButton component={Link} href={link.href}>
                  <ListItemText primary={link.title} />
                  <ListItemIcon className={css.icon}>
                    <ArrowForwardIos />
                  </ListItemIcon>
                </ListItemButton>
              </StyledListItem>
            ))}
          </List>
        </div>
        <div className={css.details}>
          <CardMedia
            component="img"
            image={logoWhite}
            sx={{ width: 334, height: 47 }}
          />
          <div className={css.address}>
            <Typography>Lørenfaret 1 C</Typography>
            <Typography>Pb 7154 St. Olavs plass, 0133 Oslo</Typography>
            <Typography>Tlf: 400 07 997</Typography>
            <Typography>Org. nr. 986 252 932</Typography>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
