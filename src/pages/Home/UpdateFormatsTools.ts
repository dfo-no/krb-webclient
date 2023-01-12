import produce from 'immer';

export const updateObject = <T extends Record<string, unknown>>(
  unwrappedObject: T
) => {
  return produce(unwrappedObject, (draft) => {
    type Input = Record<string, unknown>;

    function isRecord(value: unknown): value is Record<string, unknown> {
      return typeof value === 'object' && value !== null;
    }

    const translate = (input: Input) => {
      for (const key of Object.keys(input)) {
        if (key.toLowerCase().includes('weight')) {
          // eslint-disable-next-line no-param-reassign
          delete input[key];
        }

        if (key.includes('points')) {
          const keyParts = key.split('points');
          const translatedKey = keyParts[0] + 'discount' + keyParts[1];
          // eslint-disable-next-line no-param-reassign
          input[translatedKey] = input[key];
          // eslint-disable-next-line no-param-reassign
          delete input[key];
          if (
            translatedKey.includes('discountUnconfirmed') ||
            translatedKey.includes('discountNonPrefered')
          ) {
            // eslint-disable-next-line no-param-reassign
            const translatedKeyNew = 'discount';
            // eslint-disable-next-line no-param-reassign
            input[translatedKeyNew] = input[translatedKey];
            // eslint-disable-next-line no-param-reassign
            delete input[translatedKey];
          }
        } else if (key.includes('point')) {
          const keyParts = key.split('point');
          const translatedKey = keyParts[0] + 'discount' + keyParts[1];
          // eslint-disable-next-line no-param-reassign
          input[translatedKey] = input[key];
          // eslint-disable-next-line no-param-reassign
          delete input[key];
        }
        if (key.includes('Points')) {
          const keyParts = key.split('Points');
          const translatedKey = keyParts[0] + 'Discount' + keyParts[1];
          // eslint-disable-next-line no-param-reassign
          input[translatedKey] = input[key];
          // eslint-disable-next-line no-param-reassign
          delete input[key];
        } else if (key.includes('Point')) {
          const keyParts = key.split('Point');
          const translatedKey = keyParts[0] + 'Discount' + keyParts[1];
          // eslint-disable-next-line no-param-reassign
          input[translatedKey] = input[key];
          // eslint-disable-next-line no-param-reassign
          delete input[key];
        } else if (key.includes('timeScores')) {
          const translatedKey = 'timeDiscounts';
          // eslint-disable-next-line no-param-reassign
          input[translatedKey] = input[key];
          // eslint-disable-next-line no-param-reassign
          delete input[key];
        } else if (key.includes('scoreValues')) {
          const translatedKey = 'discountsValue';
          // eslint-disable-next-line no-param-reassign
          input[translatedKey] = input[key];
          // eslint-disable-next-line no-param-reassign
          delete input[key];
        } else if (key.includes('dateScores')) {
          const translatedKey = 'dateDiscounts';
          // eslint-disable-next-line no-param-reassign
          input[translatedKey] = input[key];
          // eslint-disable-next-line no-param-reassign
          delete input[key];
        }

        const toCheck = input[key];

        if (isRecord(toCheck)) {
          translate(toCheck);
        }
      }
    };
    translate(draft);
  });
};
