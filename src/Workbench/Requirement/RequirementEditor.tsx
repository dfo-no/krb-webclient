import { DevTool } from '@hookform/devtools';
import { joiResolver } from '@hookform/resolvers/joi';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import Utils from '../../common/Utils';
import ErrorSummary from '../../Form/ErrorSummary';
import { IAlert } from '../../models/IAlert';
import { INeed } from '../../models/INeed';
import { BaseRequirementSchema, IRequirement } from '../../models/IRequirement';
import { ITag } from '../../models/ITag';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addAlert } from '../../store/reducers/alert-reducer';
import {
  editRequirementInNeed,
  putSelectedProjectThunk
} from '../../store/reducers/project-reducer';
import TagsAsChips from '../Tags/TagsAsChips';
import VariantArray from './VariantArray';
import withProjectAndNeedAndRequirement from './withProjectAndNeedAndRequirement';

function RequirementEditor(): React.ReactElement {
  const dispatch = useAppDispatch();

  const { t } = useTranslation();

  // HOC ensures that these 3 props will always be set
  const { project } = useAppSelector((state) => state.project);
  const { needId } = useAppSelector((state) => state.selectNeed);
  const { reqId } = useAppSelector((state) => state.selectedRequirement);

  const need = Utils.ensure(
    project.needs.find((element) => element.id === needId)
  );

  const requirement = Utils.ensure(
    need.requirements.find((element) => element.id === reqId)
  );

  const { control, register, handleSubmit, formState } = useForm<IRequirement>({
    resolver: joiResolver(BaseRequirementSchema),
    defaultValues: requirement
  });
  const { errors } = formState;

  const onSubmit = async (post: IRequirement) => {
    const alert: IAlert = {
      id: uuidv4(),
      style: 'success',
      text: 'successfully updated requirement'
    };
    dispatch(editRequirementInNeed({ needId: need.id, requirement: post }));
    dispatch(putSelectedProjectThunk('dummy')).then(() => {
      dispatch(addAlert({ alert }));
    });
  };

  const needOptions = (needList: INeed[]) => {
    return needList.map((element) => {
      return (
        <option key={element.id} value={element.id}>
          {element.title}
        </option>
      );
    });
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const changeNeed = (newNeedId: string) => {
    // TODO: dispatch a change Need and switch URL
  };

  const tagOptions = (tags: ITag[]) => {
    return tags.map((tag) => {
      return (
        <option key={tag.id} value={tag.id}>
          {tag.title}
        </option>
      );
    });
  };
  return (
    <>
      <h3 className="mt-3">
        {Utils.capitalizeFirstLetter(requirement.requirement_Type)} {t('Page')}{' '}
      </h3>
      <Form onSubmit={handleSubmit((e) => onSubmit(e))} noValidate>
        <Form.Group as={Row}>
          <Form.Label column sm={1}>
            {t('Title')}
          </Form.Label>
          <Col sm={8}>
            <Form.Control {...register('title')} isInvalid={!!errors.title} />
            {errors.title && (
              <Form.Control.Feedback as={Col} type="invalid">
                {errors.title?.message}
              </Form.Control.Feedback>
            )}
          </Col>
          <Col sm={3}>
            <Button type="submit">{t('save')}</Button>
          </Col>
        </Form.Group>
        <Row>
          <Form.Label column sm={1}>
            {t('Tags')}
          </Form.Label>
          <Col sm={8}>
            <Form.Control
              as="select"
              multiple
              {...register('tags')}
              isInvalid={!!errors.tags}
            >
              {tagOptions(project.tags)}
            </Form.Control>
            {errors.needId && (
              <Form.Control.Feedback as={Col} type="invalid">
                {errors.needId?.message}
              </Form.Control.Feedback>
            )}
          </Col>
        </Row>
        <Form.Group as={Row}>
          <Form.Label column sm={1}>
            {t('Need')}
          </Form.Label>
          <Col sm={8}>
            <Form.Control
              as="select"
              disabled
              {...register('needId')}
              defaultValue={requirement.needId}
              isInvalid={!!errors.needId}
              onChange={(e) => changeNeed(e.target.value)}
            >
              {needOptions(project.needs)}
            </Form.Control>
            {errors.needId && (
              <Form.Control.Feedback as={Col} type="invalid">
                {errors.needId?.message}
              </Form.Control.Feedback>
            )}
          </Col>
        </Form.Group>
        <Row>
          <Col sm={1} />
          <Col sm={8}>
            <TagsAsChips tags={requirement.tags} />
          </Col>
        </Row>
        <VariantArray
          control={control}
          register={register}
          formState={formState}
          project={project}
        />
        <ErrorSummary errors={errors} />
        {process.env.NODE_ENV === 'development' && (
          <DevTool control={control} />
        )}
      </Form>
    </>
  );
}

export default withProjectAndNeedAndRequirement(RequirementEditor);
