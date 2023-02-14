import { Box, List } from '@mui/material';
import { useTranslation } from 'react-i18next';
import 'react-nestable/dist/styles/index.css';

import { ListHeader } from './ListHeader';
import NewCodelistForm from './NewCodelistForm';
import Utils from '../../../../common/Utils';
import { FormContainerBox } from '../../../../components/Form/FormContainerBox';
import { ICodelist } from '../../../../Nexus/entities/ICodelist';
import { ScrollableContainer } from '../../../../components/ScrollableContainer/ScrollableContainer';
import { useEditableState } from '../../../../components/EditableContext/EditableContext';
import { usePanelStyles } from './CodelistStyles';
import { useSelectState } from './SelectContext';
import { CodelistItem } from './CodelistItem';
import { IBank } from '../../../../Nexus/entities/IBank';

type Props = {
  project: IBank;
};

const CodelistPanel = ({ project }: Props): React.ReactElement => {
  const classes = usePanelStyles();
  const { t } = useTranslation();
  const {
    selectedCodelist,
    setSelectedCodelist,
    allCodelists,
    setAllCodelists,
  } = useSelectState();
  const { isCreating, setCreating } = useEditableState();

  const handleCloseCreate = (newCodelist: ICodelist | null) => {
    if (newCodelist) {
      setSelectedCodelist(newCodelist);
      setAllCodelists(Utils.addElementToList(newCodelist, allCodelists));
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
                project={project}
                codelist={codelist}
                setSelectedCodelist={setSelectedCodelist}
                isSelected={
                  !!(selectedCodelist && selectedCodelist.id === codelist.id)
                }
              />
            ))}
        </List>
      </ScrollableContainer>
    </Box>
  );
};

export default CodelistPanel;
