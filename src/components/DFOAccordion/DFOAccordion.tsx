import makeStyles from '@mui/styles/makeStyles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React, { SyntheticEvent, ReactElement } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box
} from '@mui/material/';

import theme from '../../theme';
import { useAccordionState } from './AccordionContext';

interface DFOAccordionElementProps {
  eventKey: string;
  header: ReactElement;
  body: ReactElement;
  className?: string;
}

const useStyles = makeStyles({
  expandIcon: {
    '& .MuiSvgIcon-root': {
      color: theme.palette.gray700.main,
      fontSize: '4rem'
    }
  }
});

export const DFOAccordion = ({
  eventKey,
  header,
  body,
  className = ''
}: DFOAccordionElementProps): React.ReactElement => {
  const classes = useStyles();
  const { activeKey, setActiveKey } = useAccordionState();

  const handleAccordionChange =
    (key: string) =>
    (event: SyntheticEvent<Element, Event>, isExpanded: boolean): void => {
      setActiveKey(isExpanded ? key : '');
    };

  return (
    <Accordion
      expanded={eventKey === activeKey}
      onChange={handleAccordionChange(eventKey)}
      elevation={0}
    >
      <AccordionSummary
        className={className}
        expandIcon={
          <Box className={classes.expandIcon}>
            <ExpandMoreIcon />
          </Box>
        }
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        {header}
      </AccordionSummary>
      <AccordionDetails>{body}</AccordionDetails>
    </Accordion>
  );
};
