import enLocale from 'date-fns/locale/en-US';
import nbLocale from 'date-fns/locale/nb';
import { t } from 'i18next';

class DateUtils {
  static localeMap: { [key: string]: Locale } = {
    en: enLocale,
    nb: nbLocale
  };

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

  static sameTime = (time1: string | null, time2: string | null): boolean => {
    if (time1 && time2) {
      return time1.substring(11, 16) === time2.substring(11, 16);
    }
    return time1 === time2;
  };

  static sameDate = (date1: string | null, date2: string | null): boolean => {
    if (date1 && date2) {
      return date1.substring(0, 10) === date2.substring(0, 10);
    }
    return false;
  };

  static prettyFormatDate = (dateStr: string | null): string => {
    if (dateStr) {
      const date = new Date(dateStr);
      const year = date.getFullYear();
      const month = date.getMonth();
      const monthStr = t(`MONTH_${month}`);
      const day = date.getDate();

      return `${day}. ${monthStr} ${year}`;
    }
    return '-';
  };

  static prettyFormatTime = (time: string | null): string => {
    if (time) {
      const date = new Date(time);
      const hour = date.getHours();
      const hourStr = hour < 10 ? `0${hour}` : hour;
      const minutes = date.getMinutes();
      const minutesStr = minutes < 10 ? `0${minutes}` : minutes;

      return `${hourStr}:${minutesStr}`;
    }
    return '-';
  };
}

export default DateUtils;
