import { IPrefilledResponse } from '../../../../models/IPrefilledResponse';
import { IRequirement } from '../../../../Nexus/entities/IRequirement';

export class AnswerUtils {
  public static getVariantText(
    requirement: IRequirement,
    variantId: string
  ): [string, string] {
    const variant = requirement.variants.find((v) => v.id === variantId);
    return variant ? [variant.requirementText, variant.instruction] : ['', ''];
  }

  public static isValueSet(
    productId: string,
    answerId: string,
    prefilledResponse: IPrefilledResponse
  ): boolean {
    const product = prefilledResponse.products.find(
      (entity) => entity.id === productId
    );

    return !!product?.requirementAnswers.find(
      (answer) => answer.id === answerId
    );
  }
}
