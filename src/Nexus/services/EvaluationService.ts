/* eslint-disable class-methods-use-this */

import { IResponse } from '../../models/IResponse';
import QuestionEnum from '../../models/QuestionEnum';
import { ICheckboxQuestion } from '../entities/ICheckboxQuestion';
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

  evaluateCheckBox(question: ICheckboxQuestion): number {
    if (question.answer.value === true) {
      return question.config.weightTrue / 100;
    }

    if (question.answer.value === false) {
      return question.config.weightFalse / 100;
    }

    return 0;
  }

  findClosestScore(
    list: ScoreValuePair[],
    element: ScoreValuePair,
    answer: number
  ): [number, number] {
    let distance: number =
      list[0].value !== element.value
        ? Math.abs(list[0].value - element.value)
        : Math.abs(list[1].value - element.value);
    let closestScore =
      list[0].value !== element.value ? list[0].score : list[1].score;
    list.forEach((e) => {
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
    // eslint-disable-next-line consistent-return
    let closestValue = question.config.scoreValues[0];
    let distance = Math.abs(
      question.config.scoreValues[1].value - question.answer.value
    );
    for (let i = 0; i < question.config.scoreValues.length; i += 1) {
      if (question.answer.value === question.config.scoreValues[i].value) {
        return question.config.scoreValues[i].score / 100;
      }
      const tempDistance = Math.abs(
        question.config.scoreValues[i].value - question.answer.value
      );
      if (tempDistance < distance) {
        distance = tempDistance;
        closestValue = question.config.scoreValues[i];
      }
    }

    const [step, closestScore] = this.findClosestScore(
      question.config.scoreValues,
      closestValue,
      question.answer.value
    );

    const scoreMultiple =
      question.answer.value < closestValue.value
        ? distance / step
        : (step - distance) / step;

    let score;

    if (closestValue.score > closestScore) {
      score = closestValue.score * scoreMultiple;
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

      if (
        requirementAnswer.question.type !== QuestionEnum.Q_CHECKBOX &&
        requirementAnswer.question.type !== QuestionEnum.Q_SLIDER
      ) {
        evaluation.points += 1;
      }
      if (requirementAnswer.question.type === QuestionEnum.Q_CHECKBOX) {
        evaluation.points += this.evaluateCheckBox(requirementAnswer.question);
      }
      if (requirementAnswer.question.type === QuestionEnum.Q_SLIDER) {
        evaluation.points += this.evaluateSlider(requirementAnswer.question);
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
