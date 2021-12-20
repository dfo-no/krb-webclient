import formatDate from './DateUtils';

describe('DateUtils', () => {
  test('DateUtils.truncate', () => {
    const d = new Date('2021-12-02T16:17:27.123Z');

    const result = formatDate(d);

    expect(result).toEqual('2021-12-02T16:17:27.123Z');

    // const zoned = zonedTimeToUtc('2021-12-02T15:45:27.0000000Z');
    // console.log(zoned);
    // const result2 = zonedTimeToUtc(result1);
    // console.log(result2);
    /* expect(Utils.truncate(undefined)).toEqual('');

    // Possible bug: integer variable is included in the total: Expected result could be 'abcde$'
    expect(Utils.truncate('abcdefghijk', 5, '$')).toEqual('abcd$');

    // Possible bug: emojii is two bytes, and is included in the integer. Expected result should be 'abcde⚛️'
    expect(Utils.truncate('abcdefghijk', 5, '⚛️')).toEqual('abc⚛️'); */
  });
});
