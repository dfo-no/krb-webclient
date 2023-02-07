import { Box, List } from '@mui/material';
import 'react-nestable/dist/styles/index.css';

import CodelistAddButton from './CodelistAddButton';
import NewCodelistForm from './NewCodelistForm';
import Utils from '../../../../common/Utils';
import { FormContainerBox } from '../../../../components/Form/FormContainerBox';
import { ICodelist } from '../../../../Nexus/entities/ICodelist';
import { ScrollableContainer } from '../../../../components/ScrollableContainer/ScrollableContainer';
import { useEditableState } from '../../../../components/EditableContext/EditableContext';
import { usePanelStyles } from './CodelistStyles';
import { useSelectState } from './SelectContext';
import { CodelistItem } from './CodelistItem';

const CodelistPanel = (): React.ReactElement => {
  const classes = usePanelStyles();
  const { setCodelist, codelists, setCodelists } = useSelectState();
  const { isCreating, setCreating } = useEditableState();

  const handleCloseCreate = (newCodelist: ICodelist | null) => {
    if (newCodelist) {
      setCodelist(newCodelist);
      setCodelists(Utils.addElementToList(newCodelist, codelists));
    }
    setCreating(false);
  };

  return (
    <Box className={classes.topContainer}>
      <CodelistAddButton onClick={() => setCreating(true)} />
      {isCreating && (
        <FormContainerBox>
          <NewCodelistForm handleClose={handleCloseCreate} />
        </FormContainerBox>
      )}
      <ScrollableContainer>
        <List className={classes.list} aria-label="codelist">
          {codelists &&
            codelists.map((codelist, index) => (
              <CodelistItem codelist={codelist} index={index} />
            ))}
        </List>
      </ScrollableContainer>
    </Box>
  );
};

export default CodelistPanel;
