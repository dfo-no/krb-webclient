import { Weekdays } from '../enums';
import UuidService from '../services/UuidService';

export const weekdaysData = [
  {
    id: new UuidService().generateId(),
    day: Weekdays.MONDAY,
    isChecked: false,
  },
  {
    id: new UuidService().generateId(),
    day: Weekdays.TUESDAY,
    isChecked: false,
  },
  {
    id: new UuidService().generateId(),
    day: Weekdays.WEDNESDAY,
    isChecked: false,
  },
  {
    id: new UuidService().generateId(),
    day: Weekdays.THURSDAY,
    isChecked: false,
  },
  {
    id: new UuidService().generateId(),
    day: Weekdays.FRIDAY,
    isChecked: false,
  },
  {
    id: new UuidService().generateId(),
    day: Weekdays.SATURDAYS,
    isChecked: false,
  },
  {
    id: new UuidService().generateId(),
    day: Weekdays.SUNDAY,
    isChecked: false,
  },
];
