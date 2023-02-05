import Box from '@mui/material/Box';
import classnames from 'classnames';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';
import 'react-nestable/dist/styles/index.css';

import css from './Create.module.scss';
import NestableHierarcy from '../../../components/NestableHierarchy/NestableHierarcyKRB858';
import { NewNeed } from './Need/NewNeed';
import { ScrollableContainer } from '../../../components/ScrollableContainer/ScrollableContainer';
import { useSelectState } from './SelectContext';
import { Need, ProjectForm } from '../../../api/nexus2';

type Props = {
  project: ProjectForm;
  needs: Need[];
};

const CreateSideBar = ({ project, needs }: Props): React.ReactElement => {
  const { needId, setNeedId, setNeedIndex } = useSelectState();
  // const { editNeeds } = useProjectMutations();
  const { t } = useTranslation();

  if (!project) {
    return <div className={css.SideBar}>No project found</div>;
  }

  const hasNeeds = (): boolean => {
    return needs.length !== 0;
  };

  const updateNeedsArrangement = (newNeedList: Need[]) => {
    if (needId) {
      const newIndex = newNeedList.findIndex((need) => need.ref === needId);
      setNeedIndex(newIndex);
    }
    // editNeeds(newNeedList);
  };

  const selectNeed = (item: Need) => {
    const index = needs.findIndex((n) => n.ref === item.ref);
    setNeedIndex(index);
    setNeedId(needs[index].ref);
  };

  const itemClicked = (item: Need) => {
    selectNeed(item);
  };

  const renderItem = (
    item: Need,
    handler: React.ReactNode,
    collapseIcon: React.ReactNode
  ) => {
    return (
      <Box
        className={classnames(
          css.NestableItem,
          needId && needId === item.ref ? css.Selected : null
        )}
        onClick={() => itemClicked(item)}
      >
        <Box className={css.Handle}>{handler}</Box>
        <Typography
          variant={item.parent === '' ? 'smBold' : 'sm'}
          className={css.ItemName}
        >
          {item.title}
        </Typography>
        <Box className={css.CollapseIcon}>{collapseIcon}</Box>
      </Box>
    );
  };

  return (
    <ScrollableContainer className={css.SideBar}>
      {hasNeeds() && <NewNeed needs={needs} buttonText={t('Add new need')} />}
      <NestableHierarcy
        inputlist={needs}
        className={css.Nestable}
        renderItem={renderItem}
        dispatchfunc={updateNeedsArrangement}
        depth={8}
        renderCollapseIcon={({ isCollapsed }) => {
          return isCollapsed ? (
            <KeyboardArrowRightIcon />
          ) : (
            <KeyboardArrowDownIcon />
          );
        }}
      />
    </ScrollableContainer>
  );
};

export default CreateSideBar;
