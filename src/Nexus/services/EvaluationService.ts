/* eslint-disable class-methods-use-this */

import { IResponse } from '../../models/IResponse';
import QuestionEnum from '../../models/QuestionEnum';
import { ICheckboxQuestion } from '../entities/ICheckboxQuestion';
import { ICodelistQuestion } from '../entities/ICodelistQuestion';
import { IEvaluatedResponse } from '../entities/IEvaluatedResponse';
import { ISliderQuestion, ScoreValuePair } from '../entities/ISliderQuestion';

export default class EvaluationService {
  /**
   * We assume the specification has already been met
   */
  async evaluateAll(responses: IResponse[]): Promise<IEvaluatedResponse[]> {
    const evaluations: IEvaluatedResponse[] = [];
    responses.forEach((response) => {
      const result = this.evaluate(response);
      evaluations.push(result);
    });
    return evaluations;
  }

  evaluateCodelist(question: ICodelistQuestion): number {
    const answeredAmount = question.answer.codes.length;
    const min = question.config.optionalCodeMinAmount;
    const max = question.config.optionalCodeMaxAmount;
    let score = 0;
    if (answeredAmount < min) {
      return score;
    }
    if (answeredAmount === min) {
      return score;
    }
    for (let i = min; i < max; i += 1) {
      if (min === 0) {
        score += 1 / max;
      } else {
        score += 1 / (max - min + 1);
      }
      if (i === answeredAmount) break;
    }
    return score;
  }

  evaluateCheckBox(question: ICheckboxQuestion): number {
    if (question.answer.value === question.config.preferedAlternative) {
      return 1;
    }

    return question.config.pointsNonPrefered / 100;
  }

  /* When we have found the value our answer is closest to, we have to find the range our answer is
  placed between
  */
  findValueRange(
    list: ScoreValuePair[],
    element: ScoreValuePair,
    answer: number
  ): [number, number] {
    // Distance to the closest value mark that besides the one we already sent in
    let distance: number =
      list[0].value !== element.value
        ? Math.abs(list[0].value - element.value)
        : Math.abs(list[1].value - element.value);
    // The score of the top or bottom of the range
    let closestScore =
      list[0].value !== element.value ? list[0].score : list[1].score;
    list.forEach((e) => {
      /* checks that e is not the element we already has passsed in, and that if our answer is below the element we 
      have passed as an argument, the other element we found also has to be below it for it to be the range our value is placed in
      */
      if (
        e !== element &&
        ((answer > element.value && e.value > element.value) ||
          (answer < element.value && e.value < element.value))
      ) {
        const tempDist = Math.abs(e.value - element.value);

        distance = tempDist < distance ? tempDist : distance;
        closestScore = tempDist < distance ? e.score : closestScore;
      }
    });

    return [distance, closestScore];
  }

  evaluateSlider(question: ISliderQuestion): number {
    let closestValueMark = question.config.scoreValues[0];
    let distanceFromValueMark = Math.abs(
      question.config.scoreValues[1].value - question.answer.value
    );
    for (let i = 0; i < question.config.scoreValues.length; i += 1) {
      if (question.answer.value === question.config.scoreValues[i].value) {
        return question.config.scoreValues[i].score / 100;
      }
      const tempDistance = Math.abs(
        question.config.scoreValues[i].value - question.answer.value
      );
      if (tempDistance < distanceFromValueMark) {
        distanceFromValueMark = tempDistance;
        closestValueMark = question.config.scoreValues[i];
      }
    }

    const [rangeLength, closestScore] = this.findValueRange(
      question.config.scoreValues,
      closestValueMark,
      question.answer.value
    );

    const scoreMultiple =
      question.answer.value < closestValueMark.value
        ? distanceFromValueMark / rangeLength
        : (rangeLength - distanceFromValueMark) / rangeLength;

    let score;

    if (closestValueMark.score > closestScore) {
      score = closestValueMark.score * scoreMultiple;
    } else {
      score = closestScore * scoreMultiple;
    }

    return score / 100;
  }

  evaluate(response: IResponse): IEvaluatedResponse {
    const evaluation: IEvaluatedResponse = {
      supplier: response.supplier,
      points: 0
    };

    response.requirementAnswers.forEach((requirementAnswer) => {
      // check if answer also exist in specification
      const ix = response.spesification.requirementAnswers.findIndex(
        (elem) => elem.questionId === requirementAnswer.questionId
      );
      if (ix === -1) {
        throw Error('Answer does not exist in specification');
      }

      if (requirementAnswer.question.type === QuestionEnum.Q_CHECKBOX) {
        evaluation.points += this.evaluateCheckBox(requirementAnswer.question);
      }
      if (requirementAnswer.question.type === QuestionEnum.Q_SLIDER) {
        evaluation.points += this.evaluateSlider(requirementAnswer.question);
      }

      if (requirementAnswer.question.type === QuestionEnum.Q_CODELIST) {
        evaluation.points += this.evaluateCodelist(requirementAnswer.question);
      } else {
        evaluation.points += 1;
      }
    });

    // TODO, if check of answer exisiting in corresponding product is necessary, add this
    response.products.forEach((product) => {
      product.requirementAnswers.forEach((answer) => {
        if (answer.question.type !== QuestionEnum.Q_CHECKBOX) {
          evaluation.points += 1;
        }
      });
    });

    // TODO, if check of answer exisiting in corresponding product is necessary, add this
    response.products.forEach((product) => {
      product.requirementAnswers.forEach((answer) => {
        if (answer.question.type !== QuestionEnum.Q_CHECKBOX) {
          evaluation.points += 1;
        }
      });
    });

    return evaluation;
  }

  checkIfEligbleForEvaluation(responses: IResponse[]): boolean {
    return true;
  }
}
