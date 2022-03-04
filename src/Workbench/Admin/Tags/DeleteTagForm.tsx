import React from 'react';
import theme from '../../../theme';
import { FormIconButton } from '../../Components/Form/FormIconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { Parentable } from '../../../models/Parentable';
import { BaseTagSchema, ITag } from '../../../Nexus/entities/ITag';
import useProjectMutations from '../../../store/api/ProjectMutations';
import { FormProvider, useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { v4 as uuidv4 } from 'uuid';
import { IAlert } from '../../../models/IAlert';
import { addAlert } from '../../../store/reducers/alert-reducer';
import { useAppDispatch } from '../../../store/hooks';
import { FormItemBox } from '../../Components/Form/FormItemBox';

interface IProps {
  tag: Parentable<ITag>;
  handleClose: () => void;
}

export default function DeleteTagForm({
  tag,
  handleClose
}: IProps): React.ReactElement {
  const { deleteTag } = useProjectMutations();
  const dispatch = useAppDispatch();

  const methods = useForm<Parentable<ITag>>({
    defaultValues: tag,
    resolver: joiResolver(BaseTagSchema)
  });

  async function onSubmit(put: Parentable<ITag>) {
    await deleteTag(put).then(() => {
      const alert: IAlert = {
        id: uuidv4(),
        style: 'success',
        text: 'Successfully deleted tag'
      };
      dispatch(addAlert({ alert }));
      handleClose();
    });
  }

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        autoComplete="off"
        noValidate
      >
        <FormItemBox>
          <FormIconButton
            hoverColor={theme.palette.dfoErrorRed.main}
            type="submit"
            aria-label="delete"
          >
            <DeleteIcon />
          </FormIconButton>
        </FormItemBox>
      </form>
    </FormProvider>
  );
}
