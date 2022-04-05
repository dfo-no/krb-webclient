import React from 'react';
import { useTranslation } from 'react-i18next';
import { FormProvider, useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { v4 as uuidv4 } from 'uuid';
import { useAppDispatch } from '../../../store/hooks';
import { addAlert } from '../../../store/reducers/alert-reducer';
import Nexus from '../../../Nexus/Nexus';
import { ICode, PostCodeSchema } from '../../../Nexus/entities/ICode';
import { ICodelist } from '../../../Nexus/entities/ICodelist';
import { Parentable } from '../../../models/Parentable';
import { IAlert } from '../../../models/IAlert';
import { FormItemBox } from '../../Components/Form/FormItemBox';
import { useFormStyles } from '../../Components/Form/FormStyles';
import useProjectMutations from '../../../store/api/ProjectMutations';
import { useParams } from 'react-router-dom';
import { IRouteParams } from '../../Models/IRouteParams';
import FormButtons from '../../Components/Form/FormButtons';
import VerticalTextCtrl from '../../../FormProvider/VerticalTextCtrl';

interface IProps {
  codelist: ICodelist;
  handleClose: (newCode: Parentable<ICode> | null) => void;
}

export default function NewCodeForm({
  codelist,
  handleClose
}: IProps): React.ReactElement {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const nexus = Nexus.getInstance();
  const classes = useFormStyles();
  const { projectId } = useParams<IRouteParams>();
  const { addCode } = useProjectMutations();

  const defaultValues: Parentable<ICode> =
    nexus.codelistService.generateDefaultCodeValues(projectId);

  const methods = useForm<Parentable<ICode>>({
    resolver: joiResolver(PostCodeSchema),
    defaultValues
  });

  async function onSubmit(post: Parentable<ICode>) {
    const newCode = nexus.codelistService.createCodeWithId(post);
    await addCode(newCode, codelist).then(() => {
      const alert: IAlert = {
        id: uuidv4(),
        style: 'success',
        text: 'Successfully created code'
      };
      dispatch(addAlert({ alert }));
      methods.reset();
      handleClose(newCode);
    });
  }

  return (
    <FormProvider {...methods}>
      <form
        className={classes.form}
        onSubmit={methods.handleSubmit(onSubmit)}
        autoComplete="off"
        noValidate
      >
        <FormItemBox>
          <VerticalTextCtrl name="title" label={t('Title')} placeholder={''} />
          <VerticalTextCtrl
            name="description"
            label={t('Description')}
            placeholder={''}
          />
          <FormButtons handleClose={() => handleClose(null)} />
        </FormItemBox>
      </form>
    </FormProvider>
  );
}
