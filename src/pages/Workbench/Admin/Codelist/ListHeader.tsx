import { Box, Button, Typography } from '@mui/material/';

import { useButtonStyles } from './CodelistStyles';

interface Props {
  heading: string;
  buttonText: string;
  onClick: () => void;
}

export function ListHeader({
  heading,
  buttonText,
  onClick,
}: Props): React.ReactElement {
  const classes = useButtonStyles();

  return (
    <Box className={classes.buttonContainer}>
      <Box className={classes.buttonTitle}>
        <Typography variant="smBold">{heading}</Typography>
      </Box>
      <Box className={classes.button}>
        <Button variant="primary" onClick={onClick}>
          {buttonText}
        </Button>
      </Box>
    </Box>
  );
}
