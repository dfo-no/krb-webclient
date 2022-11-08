import React, { ReactElement, useRef } from 'react';
import { Box, Button, ClickAwayListener } from '@mui/material';
import { useTranslation } from 'react-i18next';

import css from './OrganizationField.module.scss';

interface Organization {
  name: string;
  orgNr: string;
}
interface OrgFieldProps {
  entries: Organization[];
  onSelect: (name: string, orgNr: string) => void;
  onClear: () => void;
}
export default function ListEntries({
  entries,
  onSelect,
  onClear,
}: OrgFieldProps): ReactElement {
  const { t } = useTranslation();
  const ref = useRef<HTMLUListElement>(null);
  const listEntries = entries.sort((a, b) => a.name.localeCompare(b.name));
  return (
    <ClickAwayListener onClickAway={() => onClear()}>
      <ul ref={ref} className={css.OrganizationField}>
        {listEntries.map((entry) => (
          <li key={entry.orgNr}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
              }}
            >
              {entry.name}
              <Button
                className={css.Choose}
                variant="contained"
                onClick={() => onSelect(entry.name, entry.orgNr)}
              >
                {t('Choose')}
              </Button>
            </Box>
          </li>
        ))}
      </ul>
    </ClickAwayListener>
  );
}
