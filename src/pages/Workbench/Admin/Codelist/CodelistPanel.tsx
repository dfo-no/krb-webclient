import { Box, List } from '@mui/material';
import { useTranslation } from 'react-i18next';
import 'react-nestable/dist/styles/index.css';

import { ListHeader } from './ListHeader';
import NewCodelistForm from './NewCodelistForm';
import { addElementToList } from '../../../../common/Utils';
import { FormContainerBox } from '../../../../components/Form/FormContainerBox';
import { CodelistForm } from '../../../../api/nexus2';
import { ScrollableContainer } from '../../../../components/ScrollableContainer/ScrollableContainer';
import { useEditableState } from '../../../../components/EditableContext/EditableContext';
import { usePanelStyles } from './CodelistStyles';
import { useSelectState } from './SelectContext';
import { CodelistItem } from './CodelistItem';

type Props = {
  projectRef: string;
};

export const CodelistPanel = ({ projectRef }: Props): React.ReactElement => {
  const classes = usePanelStyles();
  const { t } = useTranslation();
  const {
    selectedCodelist,
    setSelectedCodelist,
    allCodelists,
    setAllCodelists,
  } = useSelectState();
  const { isCreating, setCreating } = useEditableState();

  const handleCloseCreate = (newCodelist: CodelistForm | null) => {
    if (newCodelist) {
      setSelectedCodelist(newCodelist);
      setAllCodelists(addElementToList(newCodelist, allCodelists));
    }
    setCreating(false);
  };

  return (
    <Box className={classes.topContainer}>
      {/* <Button onClick={() => setCreating(true)} /> */}
      <ListHeader
        heading={t('Codelist')}
        buttonText={t('Add new codelist')}
        onClick={() => setCreating(true)}
      />
      {isCreating && (
        <FormContainerBox>
          <NewCodelistForm
            projectRef={projectRef}
            handleClose={handleCloseCreate}
            handleCancel={() => setCreating(false)}
          />
        </FormContainerBox>
      )}
      <ScrollableContainer>
        <List className={classes.list} aria-label="codelist">
          {allCodelists &&
            allCodelists.map((codelist) => (
              <CodelistItem
                projectRef={projectRef}
                codelist={codelist}
                setSelectedCodelist={setSelectedCodelist}
                isSelected={
                  !!(selectedCodelist && selectedCodelist.ref === codelist.ref)
                }
                key={codelist.ref}
              />
            ))}
        </List>
      </ScrollableContainer>
    </Box>
  );
};
