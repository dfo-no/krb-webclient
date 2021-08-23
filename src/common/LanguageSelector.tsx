import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import Popover from '@material-ui/core/Popover';
import i18next from 'i18next';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BsCaretDownFill } from 'react-icons/bs';

interface LanguageProps {
  label: string;
  dir: string;
  active: boolean;
}

const languageMap: { [key: string]: LanguageProps } = {
  en: { label: 'English', dir: 'ltr', active: true },
  nb: { label: 'Norsk', dir: 'ltr', active: false }
};

const LanguageSelect = () => {
  const selected = localStorage.getItem('i18nextLng') || 'nb';
  const { t } = useTranslation();

  const [menuAnchor, setMenuAnchor] = useState<null | any>(null);
  useEffect(() => {
    document.body.dir = languageMap[selected].dir;
  }, [menuAnchor, selected]);

  return (
    <div className="d-flex justify-content-end align-items-center language-select-root">
      <Button onClick={({ currentTarget }) => setMenuAnchor(currentTarget)}>
        {languageMap[selected].label}
        <BsCaretDownFill />
      </Button>
      <Popover
        open={!!menuAnchor}
        anchorEl={menuAnchor}
        onClose={() => setMenuAnchor(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
      >
        <div>
          <List>
            <ListSubheader>{t('select_language')}</ListSubheader>
            {Object.keys(languageMap)?.map((item) => (
              <ListItem
                button
                key={item}
                onClick={() => {
                  i18next.changeLanguage(item);
                  setMenuAnchor(null);
                }}
              >
                {languageMap[item].label}
              </ListItem>
            ))}
          </List>
        </div>
      </Popover>
    </div>
  );
};

export default LanguageSelect;
