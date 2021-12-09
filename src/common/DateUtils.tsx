const padToTwo = (nr: number) => {
  return nr > 9 ? nr : `0${nr}`;
};

const formatDate = (date: Date): string => {
  const year = date.getUTCFullYear();

  const month = padToTwo(date.getUTCMonth() + 1); // Date provides month index; not month number
  const day = padToTwo(date.getUTCDate());

  const hours = padToTwo(date.getHours() - 1);
  const minutes = padToTwo(date.getMinutes());
  const seconds = padToTwo(date.getSeconds());
  const milliseconds = date.getMilliseconds();

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}Z`;
};

export default formatDate;
