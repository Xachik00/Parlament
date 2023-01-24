import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
import {  isValidMonthsOption } from './Utils'
import Year from './Year'
import { ICalendarPropTypes, IYear } from './types'

dayjs.extend(isBetween)

const Calendar = ({
 
  showNumberOfMonths = 12,

}: ICalendarPropTypes): JSX.Element => {
  const initialMonth = 1

  const totalCalendarMonths = 12
  const _showNumberOfMonths = isValidMonthsOption(showNumberOfMonths) ? showNumberOfMonths : totalCalendarMonths
  const monthsFrom = (initialMonth)
 
  const configYear: IYear = {
    showNumberOfMonths: _showNumberOfMonths,
    monthsFrom,
  }


 

  return (
    <section className={`calendar `} >
      <div className='wrap'>
        

        <Year {...configYear} />

       
      </div>
    </section>
  )
}

export default Calendar
