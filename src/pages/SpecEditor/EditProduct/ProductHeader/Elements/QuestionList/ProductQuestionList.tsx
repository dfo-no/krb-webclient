import React, { ReactElement, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { useFormContext, useWatch } from 'react-hook-form';

import css from '../Variant/EditProductVariant.module.scss';
import QuestionAnswer from '../../../QuestionAnswer/QuestionAnswer';
import QuestionSpecification from '../../../QuestionSpecification/QuestionSpecification';
import { IRequirementAnswer } from '../../../../../../Nexus/entities/IRequirementAnswer';
import { IVariant } from '../../../../../../Nexus/entities/IVariant';
import { VariantType } from '../../../../../../Nexus/enums';

interface IProps {
  variant: IVariant;
  handleAwardCriteria: (value: boolean) => void;
}

const ProductQuestionsList = ({
  variant,
  handleAwardCriteria,
}: IProps): ReactElement => {
  const { control, setValue } = useFormContext<IRequirementAnswer>();
  const useQuestionId = useWatch({ name: 'questionId', control });
  const item = variant.questions[0];

  useEffect(() => {
    if (
      variant.questions.length > 0 &&
      variant.questions[0].id !== useQuestionId
    ) {
      setValue('question', item);
      setValue('questionId', item.id);
    }
  }, [useQuestionId, setValue, variant, item]);

  if (!item) {
    return <Typography className={css.infoText}>-</Typography>;
  }

  return (
    <Box>
      {variant.type === VariantType.info ? (
        <QuestionAnswer item={item} />
      ) : (
        <QuestionSpecification
          item={item}
          handleAwardCriteria={handleAwardCriteria}
        />
      )}
    </Box>
  );
};

export default ProductQuestionsList;
