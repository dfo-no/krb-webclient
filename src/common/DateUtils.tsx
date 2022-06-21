import { t } from 'i18next';

class DateUtils {
  static formatDate = (date: Date): string => {
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

  static prettyFormatDate = (date: string | null): string => {
    if (date) {
      const dateStr = new Date(date).toISOString();

      const year = dateStr.substring(0, 4);
      const month = dateStr.substring(5, 7);
      const monthStr = t(`MONTH_${month}`);
      const day = dateStr.substring(8, 10);
      const dayNum = +day;

      return `${dayNum}. ${monthStr} ${year}`;
    }
    return '-';
  };
}

export default DateUtils;
