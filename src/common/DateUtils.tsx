import enLocale from 'date-fns/locale/en-US';
import nbLocale from 'date-fns/locale/nb';
import { t } from 'i18next';

class DateUtils {
  static localeMap: { [key: string]: Locale } = {
    en: enLocale,
    nb: nbLocale
  };

  static formatDate = (date: Date): string => {
    return date.toISOString();
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

  static prettyFormat = (date: string | Date | null): string => {
    if (!date) {
      return '-';
    }

    let dateStr = date as string;
    if (typeof date !== typeof '') {
      dateStr = new Date(date).toISOString();
    }

    return (
      this.prettyFormatDate(dateStr) + ', ' + this.prettyFormatTime(dateStr)
    );
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

  static prettyFormatDateError = (dateStr: string | null): string => {
    if (dateStr) {
      const date = new Date(dateStr);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = date.getDate();

      return `${day}.${month}.${year}`;
    }
    return '-';
  };

  static prettyFormatTime = (time: string | null): string => {
    if (time) {
      const date = new Date(time);
      const hour = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');

      return `${hour}:${minutes}`;
    }
    return '-';
  };
}

export default DateUtils;
