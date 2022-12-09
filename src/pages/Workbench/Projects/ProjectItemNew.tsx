import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

import css from './Projects.module.scss';
import { WORKBENCH } from '../../../common/PathConstants';
import { ProjectForm } from './ProjectsNew';

interface Props {
  project: ProjectForm;
}

export const ProjectItemNew = ({ project }: Props) => {
  return (
    <ListItem className={css.Item} key={project.ref}>
      <Link to={`/${WORKBENCH}/${project.ref}/create`} className={css.Link}>
        <Card className={css.ItemCard}>
          <div className={css.CardContent}>
            <div className={css.TitleButton}>
              <Typography variant="mdBold">{project.title}</Typography>
            </div>
            <Divider className={css.Divider} />
            <Typography variant="sm">{project.description}</Typography>
          </div>
        </Card>
      </Link>
    </ListItem>
  );
};
