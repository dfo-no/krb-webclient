import { joiResolver } from '@hookform/resolvers/joi';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import { IAlert } from '../../../models/IAlert';
import { Parentable } from '../../../models/Parentable';
import { IBank } from '../../../Nexus/entities/IBank';
import { DeleteNeedSchema, INeed } from '../../../Nexus/entities/INeed';
import { usePutProjectMutation } from '../../../store/api/bankApi';
import { useAppDispatch } from '../../../store/hooks';
import { addAlert } from '../../../store/reducers/alert-reducer';
import { useSelectState } from '../SelectContext';
import theme from '../../../theme';
import { FormDeleteBox } from '../../Components/Form/FormDeleteBox';
import { FormTextButton } from '../../Components/Form/FormTextButton';
import makeStyles from '@mui/styles/makeStyles';

interface IProps {
  child: React.ReactElement;
  project: IBank;
  need: INeed;
  handleClose: () => void;
}

const useStyles = makeStyles({
  form: {
    height: '100%'
  }
});

function DeleteNeedForm({
  child,
  project,
  need,
  handleClose
}: IProps): React.ReactElement {
  const dispatch = useAppDispatch();

  const classes = useStyles();
  const { t } = useTranslation();
  const [putProject] = usePutProjectMutation();
  const { setNeedIndex } = useSelectState();
  const { isDeletingNeed } = useSelectState();

  const methods = useForm<Parentable<INeed>>({
    defaultValues: need,
    resolver: joiResolver(DeleteNeedSchema),
    context: { needList: project.needs }
  });

  if (!project) {
    return <></>;
  }

  const onSubmit = async (deleteNeed: INeed) => {
    const foundIndex = project.needs.findIndex((n) => n.id === deleteNeed.id);
    const needs = [...project.needs];
    if (foundIndex !== -1) {
      needs.splice(foundIndex, 1);
    }
    const saveProject: IBank = {
      ...project,
      needs
    };
    await putProject(saveProject)
      .unwrap()
      .then((result) => {
        const alert: IAlert = {
          id: uuidv4(),
          style: 'success',
          text: 'Successfully edited need'
        };
        dispatch(addAlert({ alert }));
        handleClose();
        if (result.needs.length > 0) {
          setNeedIndex(needs.length - 1);
        } else {
          setNeedIndex(null);
        }
      });

    // TODO: fix back-end to joi-check with commented out code
    // element.requirements.length > 0 || Utils.checkIfParent(project.needs, n.id)
  };

  return (
    <FormProvider {...methods}>
      <form
        className={classes.form}
        onSubmit={methods.handleSubmit(onSubmit)}
        autoComplete="off"
        noValidate
      >
        {/* <input
          name="hasNeeds"
          defaultValue={
            Utils.checkIfParent(project.needs, element.id) ? 'true' : 'false'
          }
        /> */}
        {/*  <HiddenCtrl name="requirements" /> */}

        {isDeletingNeed && (
          <FormDeleteBox>
            <FormTextButton
              hoverColor={theme.palette.dfoErrorRed.main}
              type="submit"
              aria-label="delete"
            >
              {t('delete')}
            </FormTextButton>
            <FormTextButton
              hoverColor={theme.palette.gray500.main}
              onClick={() => handleClose()}
              aria-label="close"
            >
              {t('cancel')}
            </FormTextButton>
            {child}
          </FormDeleteBox>
        )}
        {!isDeletingNeed && child}
      </form>
    </FormProvider>
  );
}

export default DeleteNeedForm;
