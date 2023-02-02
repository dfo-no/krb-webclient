import { IRequirementAnswer } from '../Nexus/entities/IRequirementAnswer';

class ValidationUtils {
  static confirmationQuestion = (requirementAnswer: IRequirementAnswer) => {
    return (
      'value' in requirementAnswer.question.answer &&
      requirementAnswer.question.answer.value
    );
  };

  static checkboxQuestion = (requirementAnswer: IRequirementAnswer) => {
    return (
      'value' in requirementAnswer.question.answer &&
      'preferedAlternative' in requirementAnswer.question.config &&
      requirementAnswer.question.answer.value ===
        requirementAnswer.question.config.preferedAlternative
    );
  };

  static sliderQuestion = (requirementAnswer: IRequirementAnswer) => {
    const answer =
      'value' in requirementAnswer.question.answer &&
      requirementAnswer.question.answer.value
        ? requirementAnswer.question.answer.value
        : 0;
    const min =
      'min' in requirementAnswer.question.config &&
      requirementAnswer.question.config.min
        ? requirementAnswer.question.config.min
        : 0;
    const max =
      'max' in requirementAnswer.question.config &&
      requirementAnswer.question.config.max
        ? requirementAnswer.question.config.max
        : null;
    const step =
      'step' in requirementAnswer.question.config &&
      requirementAnswer.question.config.step
        ? requirementAnswer.question.config.step
        : null;

    if (answer >= 0 && min >= 0 && max && step) {
      return answer >= min && answer <= max && (answer as number) % step === 0;
    }
  };

  static textQuestion = (requirementAnswer: IRequirementAnswer) => {
    const text =
      'text' in requirementAnswer?.question?.answer &&
      requirementAnswer.question.answer.text
        ? requirementAnswer.question.answer.text.length
        : 0;
    const maxText =
      'max' in requirementAnswer.question.config &&
      requirementAnswer.question.config.max
        ? requirementAnswer.question.config.max
        : null;
    if (text > 1 && maxText) return text < maxText;
  };

  static periodDateQuestion = (requirementAnswer: IRequirementAnswer) => {
    // To Do Weeks Day Validation ?
    const periodMin =
      'periodMin' in requirementAnswer.question.config &&
      requirementAnswer.question.config.periodMin
        ? requirementAnswer.question.config.periodMin
        : 0;
    const periodMax =
      'periodMax' in requirementAnswer.question.config &&
      requirementAnswer.question.config.periodMax
        ? requirementAnswer.question.config.periodMax
        : 0;
    const fromBoundary =
      'fromBoundary' in requirementAnswer.question.config &&
      requirementAnswer.question.config.fromBoundary
        ? new Date(requirementAnswer.question.config.fromBoundary).getTime()
        : null;
    const toBoundary =
      'toBoundary' in requirementAnswer.question.config &&
      requirementAnswer.question.config.toBoundary
        ? new Date(requirementAnswer.question.config.toBoundary).getTime()
        : null;
    const fromDate =
      'fromDate' in requirementAnswer.question.answer &&
      requirementAnswer.question.answer.fromDate
        ? new Date(requirementAnswer.question.answer.fromDate).getTime()
        : null;
    const toDate =
      'toDate' in requirementAnswer.question.answer &&
      requirementAnswer.question.answer.toDate
        ? new Date(requirementAnswer.question.answer.toDate).getTime()
        : null;
    const dayInMilliseconds = 86400000;
    if (fromDate && toDate && fromBoundary && toBoundary) {
      const numberOfDays =
        (toDate - fromDate + dayInMilliseconds) / dayInMilliseconds;
      return (
        fromDate >= fromBoundary &&
        toDate <= toBoundary &&
        numberOfDays <= periodMax &&
        numberOfDays >= periodMin
      );
    } else if (fromDate && fromBoundary) {
      return fromDate >= fromBoundary;
    }
  };

  static timeQuestion = (requirementAnswer: IRequirementAnswer) => {
    const fromTimeBoundary =
      'fromBoundary' in requirementAnswer.question.config &&
      requirementAnswer.question.config.fromBoundary
        ? new Date(requirementAnswer.question.config.fromBoundary).getTime()
        : null;
    const toTimeBoundary =
      'toBoundary' in requirementAnswer.question.config &&
      requirementAnswer.question.config.toBoundary
        ? new Date(requirementAnswer.question.config.toBoundary).getTime()
        : null;
    const fromTime =
      'fromTime' in requirementAnswer.question.answer &&
      requirementAnswer.question.answer.fromTime
        ? new Date(requirementAnswer.question.answer.fromTime).getTime()
        : null;
    const toTime =
      'toTime' in requirementAnswer.question.answer &&
      requirementAnswer.question.answer.toTime
        ? new Date(requirementAnswer.question.answer.toTime).getTime()
        : null;
    const timePeriodMax =
      'timePeriodMax' in requirementAnswer.question.config
        ? requirementAnswer.question.config.timePeriodMax
        : null;
    if (
      fromTime &&
      toTime &&
      fromTimeBoundary &&
      toTimeBoundary &&
      timePeriodMax
    ) {
      const timePeriodMaxToDay = new Date(timePeriodMax);
      const timePeriodMaxToMinutes =
        timePeriodMaxToDay.getHours() * 60 + timePeriodMaxToDay.getMinutes();
      const timePeriodDifferenceToDay = new Date(toTime - fromTime);
      const timePeriodDifferenceToMinutes =
        timePeriodDifferenceToDay.getHours() * 60 +
        timePeriodDifferenceToDay.getMinutes();
      return (
        fromTime >= fromTimeBoundary &&
        toTime <= toTimeBoundary &&
        timePeriodDifferenceToMinutes <= timePeriodMaxToMinutes
      );
    } else if (fromTime && fromTimeBoundary && toTimeBoundary) {
      return fromTime >= fromTimeBoundary && fromTime <= toTimeBoundary;
    }
  };
}

export default ValidationUtils;
