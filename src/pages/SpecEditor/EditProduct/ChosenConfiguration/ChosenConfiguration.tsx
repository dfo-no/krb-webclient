import React from 'react';
import { t } from 'i18next';
import TextUtils from '../../../../common/TextUtils';
import { ISpecificationProduct } from '../../../../Nexus/entities/ISpecificationProduct';
import { IRequirement } from '../../../../Nexus/entities/IRequirement';
import { VariantType } from '../../../../Nexus/enums';
import { useSpecificationState } from '../../SpecificationContext';
import ToolbarItem from '../../../../components/UI/Toolbar/ToolbarItem';

interface IProps {
  requirement: IRequirement;
  product?: ISpecificationProduct;
}

export default function ChosenConfiguration({
  requirement,
  product,
}: IProps): React.ReactElement {
  const { specification } = useSpecificationState();

  const requirementAnswer = (product ?? specification).requirementAnswers.find(
    (reqAns) => reqAns.requirement.id === requirement.id
  );

  if (!requirementAnswer) {
    return <></>;
  }

  const reqAnsVariant = requirementAnswer.requirement.variants.find(
    (variant) => variant.id === requirementAnswer.variantId
  );
  const showAnswer = reqAnsVariant && reqAnsVariant.type === VariantType.info;

  return (
    <>
      {showAnswer ? (
        <ToolbarItem
          primaryText={t('Answer')}
          secondaryText={TextUtils.getAnswerText(
            requirementAnswer,
            specification.bank
          )}
          fontSize={'small'}
        />
      ) : (
        TextUtils.getConfigText(requirementAnswer, specification.bank).map(
          (chosenConfig, index) => {
            return (
              <div data-cy={'chosen-configuration'}>
                <ToolbarItem
                  key={index}
                  primaryText={chosenConfig.option}
                  secondaryText={chosenConfig.value}
                  fontSize={'small'}
                />
              </div>
            );
          }
        )
      )}
    </>
  );
}
