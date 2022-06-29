import React, { useEffect, useState } from 'react';
import { t } from 'i18next';
import { Typography } from '@mui/material';

import css from '../../Stylesheets/Editor.module.scss';
import Nexus from '../../../Nexus/Nexus';
import { IPointsCalculation } from '../../../Nexus/entities/IPointsCalculation';
import { useAppSelector } from '../../../store/hooks';
import { useResponseState } from '../ResponseContext';

export default function CalculatedPercentage(): React.ReactElement {
  const { response } = useAppSelector((state) => state.response);
  const { responseProductIndex } = useResponseState();
  const nexus = Nexus.getInstance();
  const [evaluation, setEvaluation] = useState<IPointsCalculation | null>(null);

  useEffect(() => {
    if (responseProductIndex === -1) {
      setEvaluation(nexus.evaluationService.calculateGeneralPoints(response));
    } else {
      setEvaluation(
        nexus.evaluationService.calculateProductPoints(
          response.products[responseProductIndex]
        )
      );
    }
  }, [nexus, responseProductIndex, response]);

  const calcEvaluation = (calc: IPointsCalculation) => {
    if (calc.max === 0) {
      return 100;
    }
    return Math.round((calc.total / calc.max) * 100);
  };

  return (
    <div className={css.Percentage}>
      {evaluation && (
        <Typography variant="lgBold">{`${t('Achieved')}: ${calcEvaluation(
          evaluation
        )}%`}</Typography>
      )}
    </div>
  );
}
