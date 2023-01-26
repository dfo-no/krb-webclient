import Box from '@mui/material/Box';
import classnames from 'classnames';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import 'react-nestable/dist/styles/index.css';

import css from './Create.module.scss';
import NestableHierarcy from '../../../components/NestableHierarchy/NestableHierarcy';
import NewNeed from './Need/NewNeed';
import { useProjectMutationState } from '../../../store/api/ProjectMutations';
import { IRouteProjectParams } from '../../../models/IRouteProjectParams';
import { Need } from '../../../api/openapi-fetch';
import { ScrollableContainer } from '../../../components/ScrollableContainer/ScrollableContainer';
import { useGetProjectQuery } from '../../../store/api/bankApi';
import { useSelectState } from './SelectContext';

const CreateSideBar = (): React.ReactElement => {
  const { projectId } = useParams<IRouteProjectParams>();
  const { data: project } = useGetProjectQuery(projectId);
  const { needId, setNeedId, setNeedIndex } = useSelectState();
  const { editNeeds } = useProjectMutationState();
  const { t } = useTranslation();
  const [needs, setNeeds] = useState<Need[]>([]);

  useEffect(() => {
    if (project && project.needs) {
      setNeeds(project.needs);
    }
  }, [project]);

  if (!project) {
    return <></>;
  }

  const hasNeeds = (): boolean => {
    return needs.length !== 0;
  };

  const updateNeedsArrangement = (newNeedList: Need[]) => {
    if (needId) {
      const newIndex = newNeedList.findIndex((need) => need.id === needId);
      setNeedIndex(newIndex);
    }
    setNeeds(newNeedList);
    editNeeds(newNeedList);
  };

  const selectNeed = (item: Need) => {
    const index = project.needs.findIndex((n) => n.id === item.id);
    setNeedIndex(index);
    setNeedId(project.needs[index].id);
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
          needId && needId === item.id ? css.Selected : null
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
      {hasNeeds() && <NewNeed buttonText={t('Add new need')} />}

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
