import React, { ReactElement } from 'react';
import { Box, Typography } from '@mui/material';
import { t } from 'i18next';

import theme from '../../../theme';
import { ICode } from '../../../Nexus/entities/ICode';
import { IRequirement } from '../../../Nexus/entities/IRequirement';
import { Parentable } from '../../../models/Parentable';
import { QuestionVariant } from '../../../enums/';
import { useAppSelector } from '../../../store/hooks';
import { useSpecificationState } from '../SpecificationContext';
import VariantType from '../../../Nexus/entities/VariantType';

interface IProps {
  requirement: IRequirement;
}

export default function ChosenConfiguration({
  requirement
}: IProps): React.ReactElement {
  const { spec } = useAppSelector((state) => state.specification);
  const { specificationProductIndex } = useSpecificationState();

  const requirementAnswer = (
    specificationProductIndex === -1
      ? spec
      : spec.products[specificationProductIndex]
  ).requirementAnswers.find(
    (reqAns) => reqAns.requirement.id === requirement.id
  );
  if (!requirementAnswer) {
    return <></>;
  }

  const reqAnsVariant = requirementAnswer.requirement.variants.find(
    (variant) => variant.id === requirementAnswer.variantId
  );

  const showAnswer = reqAnsVariant && reqAnsVariant.type === VariantType.info;

  const getAnswerText = (): ReactElement => {
    switch (requirementAnswer.question.type) {
      case QuestionVariant.Q_CHECKBOX:
        return (
          <Typography variant={'smBold'} color={theme.palette.primary.main}>
            {`${requirementAnswer.question.answer.value ? t('Yes') : t('No')}`}
          </Typography>
        );
      case QuestionVariant.Q_SLIDER:
        return (
          <Typography variant={'smBold'} color={theme.palette.primary.main}>
            {`${requirementAnswer.question.answer.value} ${requirementAnswer.question.config.unit}`}
          </Typography>
        );
    }
    return <></>;
  };

  const getConfigText = (): ReactElement => {
    switch (requirementAnswer.question.type) {
      case QuestionVariant.Q_TEXT:
        return (
          <Typography variant={'smBold'} color={theme.palette.primary.main}>
            {`${t(requirementAnswer.question.type)}`}
          </Typography>
        );
      case QuestionVariant.Q_CHECKBOX:
        const preferedAlternative =
          requirementAnswer.question.config.preferedAlternative;
        const pointsNonPrefered =
          requirementAnswer.question.config.pointsNonPrefered;
        return (
          <Typography variant={'smBold'} color={theme.palette.primary.main}>
            {`${preferedAlternative ? t('Yes') : t('No')} 100 ${t('score')}, ${
              preferedAlternative ? t('No') : t('Yes')
            } ${pointsNonPrefered} ${t('score')}`}
          </Typography>
        );
      case QuestionVariant.Q_SLIDER:
        const config = requirementAnswer.question.config;
        const scoreValues = config.scoreValues
          .map((sv) => `${sv.value}: ${sv.score}`)
          .join(', ');
        return (
          <Typography variant={'smBold'} color={theme.palette.primary.main}>
            {`${t('Minimum')}: ${config.min}, ${t('Maximum')}: ${
              config.max
            }, ${t('Step')}: ${config.step}, ${t('Unit')}: ${config.unit}, ${t(
              'Scorevalues'
            )}: ${scoreValues}`}
          </Typography>
        );
      case QuestionVariant.Q_CODELIST:
        const optionalCodeMinAmount =
          requirementAnswer.question.config.optionalCodeMinAmount;
        const optionalCodeMaxAmount =
          requirementAnswer.question.config.optionalCodeMaxAmount;
        const mandatory = requirementAnswer.question.config.mandatoryCodes;
        const optional = requirementAnswer.question.config.optionalCodes;
        const codelistId = requirementAnswer.question.config.codelist;
        const codelist = spec.bank.codelist.find((cl) => cl.id === codelistId);
        if (!codelist) {
          return <></>;
        }
        const optionalText = optional
          .map((codeId) => codelist.codes.find((code) => code.id === codeId))
          .filter((item): item is Parentable<ICode> => !!item)
          .map((code) => code.title)
          .join(', ');
        const mandatoryText = mandatory
          .map((codeId) => codelist.codes.find((code) => code.id === codeId))
          .filter((item): item is Parentable<ICode> => !!item)
          .map((code) => code.title)
          .join(', ');
        if (mandatory.length === 0 && optional.length === 0) {
          return (
            <Typography variant={'smBold'} color={theme.palette.primary.main}>
              {'Ingen valgte koder.'}
            </Typography>
          );
        }
        return (
          <Typography variant={'smBold'} color={theme.palette.primary.main}>
            {`${
              mandatory.length > 0
                ? `${t('Mandatory codes')}: ${mandatoryText}, `
                : ''
            } ${
              optional.length > 0
                ? `${t('Optional codes')}: ${t(
                    'Minimum'
                  )}: ${optionalCodeMinAmount}, ${t(
                    'Maximum'
                  )}: ${optionalCodeMaxAmount}, ${t('Codes')}: ${optionalText}`
                : ''
            }`}
          </Typography>
        );
      case QuestionVariant.Q_PERIOD_DATE:
        const from = requirementAnswer.question.config.fromBoundary;
        const to = requirementAnswer.question.config.toBoundary;
        const isPeriod = requirementAnswer.question.config.isPeriod;
        const min = requirementAnswer.question.config.periodMin;
        const max = requirementAnswer.question.config.periodMax;
        return (
          <Typography variant={'smBold'} color={theme.palette.primary.main}>
            {`${from ? `${t('From')}: ${from}` : ''} ${
              to ? `, ${t('To')}: ${to}` : ''
            } ${
              isPeriod
                ? `, ${t('Minimum')}: ${min}, ${t('Maximum')}: ${max}`
                : ''
            }`}
          </Typography>
        );
      case QuestionVariant.Q_TIME:
        const fromTime = requirementAnswer.question.config.fromBoundary;
        const toTime = requirementAnswer.question.config.toBoundary;
        const isTimePeriod = requirementAnswer.question.config.isPeriod;
        const minutes = requirementAnswer.question.config.periodMinutes;
        const hours = requirementAnswer.question.config.periodHours;
        return (
          <Typography variant={'smBold'} color={theme.palette.primary.main}>
            {`${fromTime ? `${t('From')}: ${fromTime}` : ''} ${
              toTime ? `, ${t('To')}: ${toTime}` : ''
            } ${
              isTimePeriod
                ? `, ${t('Period')}: ${t('Minutes')}: ${minutes}, ${t(
                    'Hours'
                  )}: ${hours}`
                : ''
            }`}
          </Typography>
        );
      case QuestionVariant.Q_FILEUPLOAD:
        const filetypes =
          requirementAnswer.question.config.fileEndings.join(', ');
        const template = requirementAnswer.question.config.template;
        const uploadInSpec = requirementAnswer.question.config.uploadInSpec;
        const allowMultipleFiles =
          requirementAnswer.question.config.allowMultipleFiles;
        return (
          <Typography variant={'smBold'} color={theme.palette.primary.main}>
            {`${t('Filetypes')}: ${filetypes}, ${t('Template')}: ${template}, ${
              uploadInSpec ? t('Upload in specification') : ''
            }, ${allowMultipleFiles ? t('Allow multiple files') : ''}`}
          </Typography>
        );
    }
  };

  return (
    <Box>
      <Typography
        variant={'smBold'}
        color={theme.palette.primary.main}
        sx={{ marginRight: 1 }}
      >
        {showAnswer ? `${t('Answer')}:` : `${t('Chosen')}:`}
      </Typography>
      {showAnswer ? getAnswerText() : getConfigText()}
    </Box>
  );
}
