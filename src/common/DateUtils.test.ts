import DateUtils from './DateUtils';
import i18n from 'i18next';

describe('DateUtils', () => {
  test('DateUtils.truncate', () => {
    i18n.init({});

    const dStr = '2021-12-02T16:00:00.000Z';
    const d = new Date(dStr);

    const result = DateUtils.formatDate(d);
    const resultPretty = DateUtils.prettyFormatDate(dStr);

    expect(result).toEqual('2021-12-02T16:00:00.000Z');
    expect(resultPretty).toEqual('2. MONTH_12 2021');
  });
});
