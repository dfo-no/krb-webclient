import { Button, Chip } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { IRequirement } from '../../Nexus/entities/IRequirement';
import theme from '../../theme';

interface IProps {
  requirements: IRequirement[];
  updateSelectedFunction: (item: IRequirement) => void;
}

const useStyles = makeStyles({
  requirementButton: {
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'space-between',
    border: `1px solid ${theme.palette.lightBlue.main}`,
    '&:hover': {
      background: theme.palette.lightBlue.main,
      color: theme.palette.dfoWhite.main,

      '& $sideBarListItemText': {
        color: theme.palette.dfoWhite.main
      }
    },

    [theme.breakpoints.down('md')]: {
      backgroundColor: theme.palette.gray100.main
    }
  }
});

export default function RequirementList({
  requirements,
  updateSelectedFunction
}: IProps): React.ReactElement {
  const classes = useStyles();

  const list = () => {
    const reqList = requirements.map((element: IRequirement) => {
      return (
        <Button
          key={element.id}
          onClick={() => updateSelectedFunction(element)}
          className={classes.requirementButton}
        >
          {element.title}{' '}
          {element.sourceRel && <Chip label="Arvet" variant="outlined" />}
        </Button>
      );
    });
    return (
      <>
        <ListGroup className="ml-3 mt-3 mb-4">{reqList}</ListGroup>
      </>
    );
  };

  return <>{list()}</>;
}
