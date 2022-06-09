import makeStyles from '@mui/styles/makeStyles';
import { useAccordionState } from './AccordionContext';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import React, { SyntheticEvent, ReactElement } from 'react';
import theme from '../../theme';
import Box from '@mui/material/Box';

interface DFOAccordionElementProps {
  eventKey: string;
  header: ReactElement;
  body: ReactElement;
}

const useStyles = makeStyles({
  expandIcon: {
    '& .MuiSvgIcon-root': {
      color: theme.palette.gray700.main,
      fontSize: '4rem'
    }
  }
});

export const DFOAccordionElement = ({
  eventKey,
  header,
  body
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
