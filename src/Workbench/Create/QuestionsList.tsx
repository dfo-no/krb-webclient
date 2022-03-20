import React from 'react';
import { FormProvider, useFieldArray, useFormContext } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import VerticalTextCtrl from '../../FormProvider/VerticalTextCtrl';
import QuestionEnum from '../../models/QuestionEnum';
import { QuestionType } from '../../models/QuestionType';
import { QuestionTypes } from '../../models/QuestionTypes';
import { IRequirement } from '../../Nexus/entities/IRequirement';

interface IProps {
  index: number;
}

const QuestionsList = ({ index }: IProps) => {
  /*   const { control, register, watch } = useFormContext<IRequirement>();
   */
  const { fields } = useFieldArray<IRequirement>({
    name: `variants.${index}.questions` as 'variants.0.questions'
  });

  return (
    <div>
      {fields.map((item, i) => {
        return (
          <div key={uuidv4()}>
            <VerticalTextCtrl
              name={`variants.${index}.questions.${i}.id` as const}
              label="id"
              placeholder=""
            />
            <VerticalTextCtrl
              name={`variants.${index}.questions.${i}.type` as const}
              label="type"
              placeholder=""
            />
            <VerticalTextCtrl
              name={
                `variants.${index}.questions.${i}.config.defaultPoint` as const
              }
              label="type"
              placeholder=""
            />
            <VerticalTextCtrl
              name={`variants.${index}.questions.${i}.config.max` as const}
              label="type"
              placeholder=""
            />
            {/* <TextCtrl
              name={`variants.${index}.questions.${i}.sourceRel` as const}
              label="sourceRel"
            />
            <TextCtrl
              name={`variants.${index}.questions.${i}.sourceOriginal` as const}
              label="sourceOriginal"
            /> */}
          </div>
        );
      })}
    </div>
  );
};

export default QuestionsList;
