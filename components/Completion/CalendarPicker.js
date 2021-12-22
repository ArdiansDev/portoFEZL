/* This example requires Tailwind CSS v2.0+ */
import 'rc-calendar/assets/index.css';
import React, { useState } from 'react';
import RangeCalendar from 'rc-calendar/lib/RangeCalendar';
import Picker from 'rc-calendar/lib/Picker';

import enUS from 'rc-calendar/lib/locale/en_US';

import moment from 'moment';
import 'moment/locale/zh-cn';
import 'moment/locale/en-gb';

export default function CalendarPicker({
  open,
  onOpenChange,
  value,
  onChange,
  onAllTime,
}) {
  const [hoverValue, sethoverValue] = useState('');

  const formatStr = 'YYYY-MM-DD';
  function format(v) {
    return v ? v.format(formatStr) : '';
  }

  const getDateFormat = (value) => {
    let startDate = value[0];
    let endDate = value[1];

    switch (true) {
      case startDate.format('M') == endDate.format('M') &&
        startDate.format('YYYY') == endDate.format('YYYY'):
        return (
          startDate.format('D') +
          ' - ' +
          endDate.format('D ') +
          startDate.format('MMMM ') +
          startDate.format('YYYY')
        );

      case startDate.format('M') != endDate.format('M') &&
        startDate.format('YYYY') == endDate.format('YYYY'):
        return (
          startDate.format('D ') +
          startDate.format('MMMM') +
          ' - ' +
          endDate.format('D ') +
          endDate.format('MMMM ') +
          startDate.format('YYYY ')
        );

      case startDate.format('M') != endDate.format('M') &&
        startDate.format('YYYY') != endDate.format('YYYY'):
        return (
          startDate.format('D ') +
          startDate.format('MMMM ') +
          startDate.format('YYYY') +
          ' - ' +
          endDate.format('D ') +
          endDate.format('MMMM ') +
          endDate.format('YYYY')
        );

      default:
      // body of default
    }

    return;
  };

  const now = moment();

  now.locale('en-gb').utcOffset(0);

  function isValidRange(v) {
    return v && v[0] && v[1];
  }

  const onHoverChange = (hoverValue) => {
    sethoverValue(hoverValue);
  };
  const calendar = (
    <RangeCalendar
      hoverValue={hoverValue}
      onHoverChange={onHoverChange}
      showWeekNumber={false}
      dateInputPlaceholder={['start', 'end']}
      defaultValue={[now, now.clone().add(1, 'months')]}
      locale={enUS}
      renderFooter={() => <button onClick={onAllTime}>All Time</button>}
      showToday={false}
      className={'range-calendar bg-gray top-8 -right-9'}
    />
  );
  return (
    <Picker
      open={open}
      onOpenChange={onOpenChange}
      onChange={onChange}
      calendar={calendar}
      value={value}
    
    >
      {({ value }) => {
        return (
          <span>
            <input
              placeholder="All Time"
              style={{ minWidth: 257 }}
              readOnly
              className="cursor-pointer ant-calendar-picker-input ant-input"
              value={(isValidRange(value) && `${getDateFormat(value)}`) || ''}
            />
          </span>
        );
      }}
    </Picker>
  );
}
