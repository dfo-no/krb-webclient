import { v1 as uuidv1, v4 as uuidv4 } from 'uuid';

import CustomJoi from '../CustomJoi';

describe('IdJoi', () => {
  test('Joi validateId() should show error message if not a valid guid is empty', () => {
    const schema = CustomJoi.object().keys({
      id: CustomJoi.validateId(),
    });

    const reportError = schema.validate({
      id: uuidv1(),
    });
    const reportSuccess = schema.validate({
      id: uuidv4(),
    });
    expect(reportError?.error?.details[0].message).toEqual(
      'Noe har gått galt med skjemaet. "id" er ikke en gyldig guid'
    );
    expect(reportSuccess?.error?.details[0].message).toBeUndefined();
  });

  test('Joi validateEmptyId() should show error if not empty', () => {
    const schema = CustomJoi.object().keys({
      id: CustomJoi.validateEmptyId(),
    });

    const reportError = schema.validate({
      id: uuidv4(),
    });
    const reportSuccess = schema.validate({
      id: '',
    });
    expect(reportError?.error?.details[0].message).toEqual(
      'Noe har gått galt med skjemaet. "id" er ugyldig'
    );
    expect(reportSuccess?.error?.details[0].message).toBeUndefined();
  });

  test('Joi validateOptionalId() should show error message on not a valid id', () => {
    const schema = CustomJoi.object().keys({
      id1: CustomJoi.validateOptionalId(),
      id2: CustomJoi.validateOptionalId(),
    });

    const reportError = schema.validate({
      id1: uuidv1(),
      id2: null,
    });
    const reportSuccess = schema.validate({
      id1: uuidv4(),
      id2: null,
    });
    expect(reportError?.error?.details[0].message).toEqual(
      'Noe har gått galt med skjemaet. "id1" er ikke en gyldig guid'
    );
    expect(reportSuccess?.error?.details[0].message).toBeUndefined();
  });

  test('Joi validateParentId() should show error message on wrong id', () => {
    const schema = CustomJoi.object().keys({
      parent1: CustomJoi.validateParentId(),
      parent2: CustomJoi.validateParentId(),
    });

    const reportError = schema.validate({
      parent1: uuidv1(),
      parent2: '',
    });
    const reportSuccess = schema.validate({
      parent1: uuidv4(),
      parent2: '',
    });
    expect(reportError?.error?.details[0].message).toEqual(
      'Noe har gått galt med skjemaet. "parent1" er ikke en gyldig guid'
    );
    expect(reportSuccess?.error?.details[0].message).toBeUndefined();
  });

  test('Joi validateIdArray() should show error message on equal ids', () => {
    const schema = CustomJoi.object().keys({
      list: CustomJoi.validateIdArray(),
    });

    const reportError1 = schema.validate({
      list: [uuidv1()],
    });
    const sameId = uuidv4();
    const reportError2 = schema.validate({
      list: [sameId, sameId],
    });
    const reportSuccess1 = schema.validate({
      list: [uuidv4(), uuidv4()],
    });
    const reportSuccess2 = schema.validate({
      list: [],
    });
    expect(reportError1?.error?.details[0].message).toEqual(
      'Noe har gått galt med skjemaet. "list[0]" er ikke en gyldig guid'
    );
    expect(reportError2?.error?.details[0].message).toEqual(
      'Noe har gått galt med skjemaet. 2 like IDer er funnet i skjemaet'
    );
    expect(reportSuccess1?.error?.details[0].message).toBeUndefined();
    expect(reportSuccess2?.error?.details[0].message).toBeUndefined();
  });
});
