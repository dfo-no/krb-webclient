/**
 * The value here is used by Select to post a value via <option>
 * As the value is posted as a string here, if you want to have a string | number typing here, you must
 * consult the Joi documentation and read about "converting" strings to numbers. This can be done when validating, so
 * it could be added to the Schema like this pseudocode: "cars": CustomJoi.string().convert(convertToNumber)
 */
export interface IOption {
  value: string;
  label: string;
}
