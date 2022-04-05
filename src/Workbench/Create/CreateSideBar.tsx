import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import makeStyles from '@mui/styles/makeStyles';
import React, { useEffect, useState } from 'react';
import 'react-nestable/dist/styles/index.css';
import Utils from '../../common/Utils';
import { BaseModelWithTitleAndDesc } from '../../models/BaseModelWithTitleAndDesc';
import { Nestable } from '../../models/Nestable';
import { Parentable } from '../../models/Parentable';
import { IBaseModel } from '../../Nexus/entities/IBaseModel';
import theme from '../../theme';
import NestableHierarcy from '../Components/NestableHierarchy/NestableHierarcy';
import { useParams } from 'react-router-dom';
import { IRouteParams } from '../Models/IRouteParams';
import { useGetProjectQuery } from '../../store/api/bankApi';
import LoaderSpinner from '../../common/LoaderSpinner';
import { INeed } from '../../Nexus/entities/INeed';
import { useSelectState } from './SelectContext';
import useProjectMutations from '../../store/api/ProjectMutations';

const useStyles = makeStyles({
  nestableItemCustom: {
    display: 'flex',
    cursor: 'pointer',
    backgroundColor: theme.palette.white.main,
    verticalAlign: 'middle',
    height: '35px',
    borderLeft: `1px solid ${theme.palette.gray400.main}`,
    borderRight: `1px solid ${theme.palette.gray400.main}`,
    '&:hover': {
      background: theme.palette.lightBlue.main,
      color: theme.palette.white.main
    }
  },
  nestableCustom: {
    '& .nestable-item': {
      marginTop: '16px',
      '& .nestable-item-name': {
        borderTop: `1px solid ${theme.palette.gray400.main}`,
        borderBottom: `1px solid ${theme.palette.gray400.main}`
      }
    },
    '& .nestable-list > .nestable-item > .nestable-list': {
      margin: '0',
      '& .nestable-item': {
        margin: '0',
        '& .nestable-item-name': {
          marginTop: '-1px'
        }
      }
    },
    width: '100%',
    paddingLeft: '5%',
    paddingBottom: '5%'
  },
  itemNameText: {
    display: 'flex',
    alignSelf: 'center',
    width: '95%'
  },
  collapseIcon: {
    display: 'flex',
    alignSelf: 'center',
    paddingRight: '4px',
    justifySelf: 'flex-end',
    marginLeft: 'auto'
  },
  handlerIcon: {
    paddingTop: 6,
    display: 'flex',
    paddingRight: '4px',
    alignSelf: 'center',
    justifySelf: 'flex-end'
  },
  selectedItem: {
    background: theme.palette.primary.main,
    color: theme.palette.white.main
  }
});

const CreateSideBar = (): React.ReactElement => {
  const { projectId } = useParams<IRouteParams>();
  const { data: project } = useGetProjectQuery(projectId);
  const classes = useStyles();
  const { needId, setNeedId, setNeedIndex } = useSelectState();
  const { editNeeds } = useProjectMutations();
  const [needs, setNeeds] = useState<Parentable<INeed>[]>([]);

  useEffect(() => {
    if (project && project.needs) {
      setNeeds(project.needs);
    }
  }, [project]);

  if (!project) {
    return <></>;
  }

  const updateNeedsArrangement = (newNeedList: Parentable<INeed>[]) => {
    console.log(newNeedList);
    setNeeds(newNeedList);
    editNeeds(newNeedList);
  };

  const selectNeed = (item: Parentable<INeed>) => {
    const index = project.needs.findIndex((n) => n.id === item.id);
    setNeedIndex(index);
    setNeedId(project.needs[index].id);
  };

  const itemClicked = (item: Parentable<INeed>) => {
    selectNeed(item);
  };

  const renderItem = (
    item: Parentable<INeed>,
    handler: React.ReactNode,
    collapseIcon: React.ReactNode
  ) => {
    return (
      <Box
        className={`${classes.nestableItemCustom} ${
          needId && needId === item.id ? classes.selectedItem : ''
        }`}
        onClick={() => itemClicked(item)}
      >
        <Box className={classes.handlerIcon}>{handler}</Box>
        <Typography className={classes.itemNameText}>
          {Utils.capitalizeFirstLetter(item.title ? item.title : '')}
        </Typography>
        <Box className={classes.collapseIcon}>{collapseIcon}</Box>
        {needId && needId === item.id && (
          <Box className={classes.collapseIcon}>
            <ArrowForwardIcon />
          </Box>
        )}
      </Box>
    );
  };

  return (
    <NestableHierarcy
      inputlist={needs}
      className={classes.nestableCustom}
      renderItem={renderItem}
      dispatchfunc={updateNeedsArrangement}
      depth={5}
      renderCollapseIcon={({ isCollapsed }) => {
        return isCollapsed ? (
          <KeyboardArrowRightIcon />
        ) : (
          <KeyboardArrowDownIcon />
        );
      }}
    />
  );
};

export default CreateSideBar;
