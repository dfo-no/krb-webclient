export const currencyService = (currency: string, number: number) => {
  return `${number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')} ${currency}`;
};
