import DateUtils from './DateUtils';
import i18n from 'i18next';

describe('DateUtils', () => {
  test('DateUtils.truncate', () => {
    i18n.init({});

    const dStr = '2021-12-02T16:00:00.000Z';
    const d = new Date(dStr);

    const result = DateUtils.formatDate(d);
    const resultPrettyDate = DateUtils.prettyFormatDate(dStr);
    const resultPrettyTime = DateUtils.prettyFormatTime(dStr);

    expect(result).toEqual('2021-12-02T16:00:00.000Z');
    expect(resultPrettyDate).toEqual('2. MONTH_11 2021');
    expect(resultPrettyTime).toEqual(`${d.getHours()} : 00`);
  });
});
