import React, { useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { selectNeed } from '../../../store/reducers/selectedNeed-reducer';
import { selectRequirement } from '../../../store/reducers/selectedRequirement-reducer';

interface IRouteParams {
  projectId: string;
  needId: string;
  requirementId: string;
}

const withProjectAndNeedAndRequirement =
  <P extends Record<string, unknown>>(
    Component: React.ComponentType<P>
  ): React.FC<P> =>
  ({ ...props }: P) => {
    const dispatch = useAppDispatch();
    const { needId: routeNeedId, requirementId: routeRequirementId } =
      useParams<IRouteParams>();

    const { project } = useAppSelector((state) => state.project);
    const { needId } = useAppSelector((state) => state.selectNeed);
    const { reqId } = useAppSelector((state) => state.selectedRequirement);

    useEffect(() => {
      if (routeNeedId && needId !== routeNeedId) {
        dispatch(selectNeed(routeNeedId));
      }
    }, [routeNeedId, dispatch, needId]);

    useEffect(() => {
      if (routeRequirementId && reqId !== routeRequirementId) {
        dispatch(selectRequirement(routeRequirementId));
      }
    }, [routeRequirementId, dispatch, reqId]);

    const isEverythingLoaded = (): boolean => {
      if (
        project.id &&
        project.id.length === 36 &&
        needId &&
        needId.length === 36
      ) {
        return true;
      }
      return false;
    };

    return isEverythingLoaded() ? (
      <Component {...props} />
    ) : (
      <Spinner animation="border" variant="danger" />
    );
  };
export default withProjectAndNeedAndRequirement;
