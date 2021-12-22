import React, { useState } from 'react';
import Calendar from 'rc-calendar';
import 'rc-calendar/assets/index.css';
import enGB from 'rc-calendar/lib/locale/en_GB';

import moment from 'moment';
import 'moment/locale/en-gb';

export default function CalendarWeekly({
  showCalendar,
  setShowCalendar,
  setSelectedWeeks,
  setSelectedYear,
  setContext,
  refetch,
  setDateName,
}) {
  const format = 'YYYY-wo';
  const now = moment();

  const weekOfYear = async (current) => {
    let WoY = await moment(current?._d).week();
    let Year = await moment(current?._d).format('YYYY');
    setSelectedWeeks(WoY);
    setSelectedYear(Year);
    setContext('weekly');
    setShowCalendar(false);
    setMonth(current);
    getWeekOfMonth(current);
  };

  const [month, setMonth] = useState(now);
  const selectedMonth = moment(month._d).month();
  let date = moment().year('y').month(selectedMonth).date(1).day(8);
  if (date.date() > 7) date.day(-6);

  const getAlltime = () => {
    setContext(null);
    setSelectedWeeks(null);
    setShowCalendar(false);
    setDateName(`all time`);
    setMonth(now);
  };

  const getLastWeek = async () => {
    const lastWeek = (await moment(now._d).week()) - 1;
    setSelectedWeeks(lastWeek);
    setSelectedYear(moment(now._d).year());
    setShowCalendar(false);
    let lastweekMonth = moment(lastWeek, 'w').day('Monday');
    getWeekOfMonth(lastweekMonth);
    setMonth(moment().week(lastWeek));
  };

  function getWeekOfMonth(current) {
    let d = current?._d;

    let currentStartMonth = moment(current).startOf('week').format('MM');
    let currentEndMonth = moment(current).endOf('week').format('MM');

    if (currentStartMonth === currentEndMonth) {
      setDateName(
        `${moment(d).startOf('week').format('DD')} - ${moment(d)
          .endOf('week')
          .format('DD')} ${moment(d).format('MMMM YYYY')} `
      );
    } else {
      setDateName(
        `${moment(current).startOf('week').format('DD')} ${moment(current)
          .startOf('week')
          .format('MMMM')} - ${moment(current)
          .endOf('week')
          .format('DD')} ${moment(current).endOf('week').format('MMMM YYYY')}`
      );
    }
  }
  function disabledDate(current) {
    const WeekNow = moment(now._d).week();
    const firstDate = moment('8 november 2021');
    const date = moment().weekday(7);
    date.hour(0);
    date.minute(0);
    date.second(0);
    // console.log(firstDate);
    return current.isAfter(date) || current.isBefore(firstDate);
  }

  let disabledLastWeek = moment().isBefore('15 november 2021');

  if (!showCalendar) {
    return <></>;
  } else {
    return (
      <div className="w-full ">
        <div
          onClick={() => {
            setShowCalendar(false);
          }}
          className=" top-0 left-0 absolute z-20 w-screen h-screen"
        ></div>
        <div className="relative">
          <div className="absolute z-40 right-0 flex mobile:flex-col border rounded-xl shadow ">
            <div
              className="week-calendar-sidebar reg-14 text-gray-900 p-4 text-left bg-white border-r-2 flex flex-col gap-2"
              key="sidebar"
            >
              <button className="text-left" onClick={getAlltime}>
                All Time
              </button>
              <button
                disabled={disabledLastWeek}
                className="text-left disabled:text-gray-300"
                onClick={getLastWeek}
              >
                Last Week
              </button>
            </div>
            <Calendar
              className="week-calendar "
              showWeekNumber
              format={format}
              defaultValue={month}
              open={false}
              onSelect={weekOfYear}
              disabledDate={disabledDate}
              showDateInput={false}
              showToday={false}
              locale={enGB}
            />
          </div>
        </div>
      </div>
    );
  }
}
