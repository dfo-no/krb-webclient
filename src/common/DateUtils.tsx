const padToTwo = (nr: number) => {
  return nr > 9 ? nr : `0${nr}`;
};

const formatDate = (date: Date): string => {
  const dateStr = date.toISOString();

  const year = dateStr.substring(0, 4);
  const month = dateStr.substring(5, 7);
  const day = dateStr.substring(8, 10);
  const hour = dateStr.substring(11, 13);
  const minutes = dateStr.substring(14, 16);
  const seconds = dateStr.substring(17, 19);
  const milli = dateStr.substring(20, 23);

  return `${year}-${month}-${day}T${hour}:${minutes}:${seconds}.${milli}Z`;
};

export default formatDate;
