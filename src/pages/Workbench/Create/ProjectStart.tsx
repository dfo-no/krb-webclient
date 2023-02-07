import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';

import css from '../../Stylesheets/NoProducts.module.scss';
import mainIllustration from '../../../assets/images/main-illustration.svg';
import NewNeed from './Need/NewNeed';
import theme from '../../../theme';
import { IBank } from '../../../Nexus/entities/IBank';

interface Props {
  project: IBank;
}

export default function ProjectStart({ project }: Props): React.ReactElement {
  const { t } = useTranslation();

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
      <NewNeed buttonText={t('Create your first need')} />
    </div>
  );
}
