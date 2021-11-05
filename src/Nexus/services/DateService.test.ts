import DateService from './DateService';

describe('DateService', () => {
  it('Should post date as UTC', () => {
    const date = new Date();
    const isoString = date.toISOString();
    const jsonFormat = date.toJSON();
    expect(isoString).toEqual(jsonFormat);

    // Setup: Prove that Axios/JSON dont change the date
    const obj = {
      now: DateService.getDateString(date)
    };

    interface DateTest {
      now: string;
    }
    // Prove JSONIFY does not change the date timezone
    const stringResult = JSON.stringify(obj);
    const objectResult = JSON.parse(stringResult) as DateTest;

    expect(objectResult.now).toEqual(isoString);
  });
});
