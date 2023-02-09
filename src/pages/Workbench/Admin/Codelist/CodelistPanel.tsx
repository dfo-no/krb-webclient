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
import { IBank } from '../../../../Nexus/entities/IBank';

type Props = {
  project: IBank;
};

export const CodelistPanel = ({ project }: Props): React.ReactElement => {
  const classes = usePanelStyles();
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
      <CodelistAddButton onClick={() => setCreating(true)} />
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
