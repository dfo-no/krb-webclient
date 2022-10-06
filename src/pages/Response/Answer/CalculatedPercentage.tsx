import React, { useEffect, useState } from 'react';
import { t } from 'i18next';

import css from '../../Stylesheets/EditorFullPage.module.scss';
import Nexus from '../../../Nexus/Nexus';
import { IPointsCalculation } from '../../../Nexus/entities/IPointsCalculation';
import { useAppSelector } from '../../../store/hooks';
import { useProductIndexState } from '../../../components/ProductIndexContext/ProductIndexContext';

export default function CalculatedPercentage(): React.ReactElement {
  const { response } = useAppSelector((state) => state.response);
  const { productIndex } = useProductIndexState();
  const nexus = Nexus.getInstance();
  const [evaluation, setEvaluation] = useState<IPointsCalculation | null>(null);

  useEffect(() => {
    if (productIndex === -1) {
      setEvaluation(nexus.evaluationService.calculateGeneralPoints(response));
    } else {
      setEvaluation(
        nexus.evaluationService.calculateProductPoints(
          response.products[productIndex]
        )
      );
    }
  }, [nexus, productIndex, response]);

  const calcEvaluation = (calc: IPointsCalculation) => {
    if (calc.max === 0) {
      return 100;
    }
    return Math.round((calc.total / calc.max) * 100);
  };

  return (
    <div className={css.Percentage}>
      {evaluation && `${t('Achieved')}: ${calcEvaluation(evaluation)}%`}
    </div>
  );
}
