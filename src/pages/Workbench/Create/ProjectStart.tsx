import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';

import css from '../../Stylesheets/NoProducts.module.scss';
import mainIllustration from '../../../assets/images/main-illustration.svg';
import { NewNeed } from './Need/NewNeed';
import theme from '../../../theme';
import { ProjectForm } from '../../../api/nexus2';
import { NeedForm } from '../../../api/nexus2';

interface Props {
  project: ProjectForm;
  needs: NeedForm[];
}

export default function ProjectStart({
  project,
  needs,
}: Props): React.ReactElement {
  const { t } = useTranslation();
  console.log('===============');

  return (
    <div className={css.NoProducts}>
      <img
        src={mainIllustration}
        alt="main illustration"
        height="385"
        width="594"
      />
      <div className={css.Text}>
        <Typography variant="lgBold" color={theme.palette.primary.main}>
          {project.title}
        </Typography>
        <Typography variant="md">{t('PROJ_BUILDING_PROJ')}</Typography>
        <Typography variant="md">
          {t('PROJ_DEFINE_NEEDS_PROCUREMENT')}
        </Typography>
        <Typography variant="md">{t('PROJ_CREATE_REQ_PROCUREMENT')}</Typography>
      </div>
      <NewNeed needs={needs} buttonText={t('Create your first need')} />
    </div>
  );
}
