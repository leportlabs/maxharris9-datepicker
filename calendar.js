var encodeId = function (day, month, year, guid) {
	return month + '-' + day + '-' + year + '-' + guid;
};

renderCalendar = function (calItems, pre, newRow, blank, filledDateFunc, post) {
	var output = [];
	var endHere = calItems.startingDay + calItems.monthLength;
	var i = 0;

	output.push(pre);

	while (i < endHere) {
		if (0 === (i % 7)) {
			output.push(newRow);
		}

		if (i < calItems.startingDay) {
			output.push(blank);
		}
		else {
			var day = i - calItems.startingDay + 1;
			output.push(filledDateFunc(day));
		}
		i += 1;
	}
	output.push(post);

	return output.join('');
};

Calendar = (function () {
	return function (day, month, year, guid) {
		var _day = day; // TODO: use day to mark the current day in the calendar HTML we emit
		var _month = month;
		var _year = year;
		var _guid = guid;

		var _getWeekDay = function () {
			// inspired by http://stackoverflow.com/questions/18664548/print-a-12-month-calendar-with-only-input-being-the-year-using-c

			// Math.floor simulates integer divisions
			var startDay = 1;
			var offset = Math.floor((14 - _month) / 12); // for Jan and Feb, this is 1, otherwise it's 0
			var offsetYear = Math.floor(_year - offset); // the year, offset by two months; so Jan and Feb 2000 -> 1999, while Mar 2000 -> 2000
			var offsetMonth = Math.floor(_month + (12 * offset) - 2); // for Jan and Feb, this is 11 and 12, respectively

			var offsetMonthShim = Math.floor((31 * offsetMonth) / 12); // 28, 31, 2, 5, 7, 10, 12, 15, 18, 20, 23, 25 - what does this do?
			var leapDayCount = Math.floor(offsetYear / 4); // number of leap days since 4 AD
			var centuryOffset = Math.floor(offsetYear / 100); // the century, offset by two months
			var leapDayCountFirstDigit = Math.floor(offsetYear / 400); // is this valid past 4000 AD?

			// return the day of the week for particular date. sunday: 0, monday: 1, tuesday: 2, ... saturday: 6
			return (startDay + offsetYear + leapDayCount - centuryOffset + leapDayCountFirstDigit + offsetMonthShim) % 7;
		};

		var _fillCalendar = function () {
			var monthLengths = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

			if (year % 400 === 0 || ((year % 4 === 0) && (year % 100 !== 0))) {
				monthLengths[1] = 29; // leap years add a day to February
			}

			return { startingDay: _getWeekDay(), monthLength: monthLengths[_month - 1] };
		};

		var _calItems = _fillCalendar();

		return {
			renderHtmlCalendar: function () {
				return renderCalendar(
					_calItems,
					"<tr>",
					"<tr>",
					"<td></td>",
					function (day) { return "<td class='day calendarDay' id='" + encodeId(day, _month,  _year, _guid) + "'>" + day + "</td>"; },
					"<tr>");
			},
			__getTestState__: function () {
				return _calItems;
			}
		};
	};
} ());