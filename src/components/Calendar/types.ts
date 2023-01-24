
export type ShowMonths = 12 | 4 | 2 | 1

export interface ICalendarPropTypes {
 
  showNumberOfMonths?: ShowMonths
 
}

export enum Days {
  Monday = 'Երկ',
  Tusday = 'Երք',
  Wednesday = 'Չրք',
  Thursday = 'Հնգ',
  Friday = 'Ուրբ',
  Saturday = 'Շբթ',
  Sunday = 'Կիր',
}

export type DaysOfWeekType = Days[]

export enum DayOffset {
  Monday = '6',
  Tusday = '5',
  Wednesday = '4',
  Thursday = '3',
  Friday = '2',
  Saturday = '1',
  Sunday = '0',
}

export type DaysOfWeekOffsetType = DayOffset[]

export interface IYear {
  showNumberOfMonths?: ShowMonths


  monthsFrom: number
}

export interface IGetMonthName {
  [key: number]: string
}
