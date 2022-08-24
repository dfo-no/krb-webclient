import CustomJoi from '../CustomJoi';
import { QuestionBaseSchema } from '../../entities/IQuestionBase';
import VariantType from '../../entities/VariantType';
import { v1 as uuidv1, v4 as uuidv4 } from 'uuid';
import { QuestionVariant } from '../../enums';

describe('VariantJoi', () => {
  test('Joi validateVariantType() should show error message if multiple question', () => {
    const schema = CustomJoi.object().keys({
      type: CustomJoi.validateVariantType(),
      questions: CustomJoi.validateUniqueArray(QuestionBaseSchema)
    });

    const reportError = schema.validate({
      type: VariantType.info,
      questions: [
        {
          id: uuidv4(),
          type: QuestionVariant.Q_TEXT,
          config: {},
          answer: {},
          sourceOriginal: null,
          sourceRel: null
        },
        {
          id: uuidv4(),
          type: QuestionVariant.Q_TEXT,
          config: {},
          answer: {},
          sourceOriginal: null,
          sourceRel: null
        }
      ]
    });
    const reportSuccess1 = schema.validate({
      type: VariantType.info,
      questions: [
        {
          id: uuidv4(),
          type: QuestionVariant.Q_TEXT,
          config: {},
          answer: {},
          sourceOriginal: null,
          sourceRel: null
        }
      ]
    });
    const reportSuccess2 = schema.validate({
      type: VariantType.requirement,
      questions: [
        {
          id: uuidv4(),
          type: QuestionVariant.Q_TEXT,
          config: {},
          answer: {},
          sourceOriginal: null,
          sourceRel: null
        },
        {
          id: uuidv4(),
          type: QuestionVariant.Q_TEXT,
          config: {},
          answer: {},
          sourceOriginal: null,
          sourceRel: null
        }
      ]
    });
    expect(reportError?.error?.details[0].message).toEqual(
      'For mange spørsmål for variant av typen Info'
    );
    expect(reportSuccess1?.error?.details[0].message).toBeUndefined();
    expect(reportSuccess2?.error?.details[0].message).toBeUndefined();
  });

  test('Joi validateVariantProducts() should show error message if useProducts not matches products', () => {
    const schema = CustomJoi.object().keys({
      useProduct: CustomJoi.validateBoolean(),
      products: CustomJoi.validateVariantProducts()
    });

    const reportError1 = schema.validate({
      useProduct: false,
      products: [uuidv4()]
    });
    const reportError2 = schema.validate({
      useProduct: true,
      products: []
    });
    const reportError3 = schema.validate({
      useProduct: true,
      products: [uuidv1()]
    });
    const reportSuccess = schema.validate({
      useProduct: true,
      products: [uuidv4()]
    });
    expect(reportError1?.error?.details[0].message).toEqual(
      'Produkter er lagt til, men ikke valgt for varianten'
    );
    expect(reportError2?.error?.details[0].message).toEqual(
      'Det må velges produkter for varianten'
    );
    expect(reportError3?.error?.details[0].message).toEqual(
      'Noe har gått galt med skjemaet. "products[0]" er ikke en gyldig guid'
    );
    expect(reportSuccess?.error?.details[0].message).toBeUndefined();
  });
});
