import formatDate from './DateUtils';

describe('DateUtils', () => {
  test('DateUtils.truncate', () => {
    const d = new Date('2021-12-02T16:00:00.000Z');

    const result = formatDate(d);

    expect(result).toEqual('2021-12-02T16:00:00.0Z');
  });
});
