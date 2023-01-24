import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'

import {
  IGetMonthName,
  DaysOfWeekType,
  Days,
  DaysOfWeekOffsetType,
  DayOffset,
} from '../types'


dayjs.extend(customParseFormat)


export const daysOfTheWeek: DaysOfWeekType = [
  Days.Monday,
  Days.Tusday,
  Days.Wednesday,
  Days.Thursday,
  Days.Friday,
  Days.Saturday,
  Days.Sunday,
]

export const daysOfTheWeekOffset: DaysOfWeekOffsetType = [
  DayOffset.Monday,
  DayOffset.Tusday,
  DayOffset.Wednesday,
  DayOffset.Thursday,
  DayOffset.Friday,
  DayOffset.Saturday,
  DayOffset.Sunday,
]

export const isValidMonthsOption = (numOfMonths: number): boolean => {
  if (!numOfMonths || typeof numOfMonths !== 'number') return false

  const validOptions = [12, 4, 2, 1]
  const isValid = validOptions.includes(numOfMonths)

  return isValid
}

export const getMonthName = (month: number): string => {
  const months: IGetMonthName = {
    1: 'Հունվար',
    2: 'Փետրվար',
    3: 'Մարտ',
    4: 'Ապրիլ',
    5: 'Մայիս',
    6: 'Հունիս',
    7: 'Հուլիս',
    8: 'Օգոստոս',
    9: 'Սեպտեմբեր',
    10: 'Հոկտեմբեր',
    11: 'Նոյեմբեր',
    12: 'Դեկտեմբեր',
  }

  return months[month]
}


