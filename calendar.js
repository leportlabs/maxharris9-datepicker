var encodeId = function (day, month, year, guid) {
	return month + '-' + day + '-' + year + '-' + guid;
};

Calendar = (function () {
	return function (day, month, year, guid) {
		var _day = day; // day could be used to mark the highlighted date - not helpful in calculating the calendar
		var _month = month;
		var _year = year;
		var _guid = guid;

		var _getWeekDay = function () {
			// inspired by http://stackoverflow.com/questions/18664548/print-a-12-month-calendar-with-only-input-being-the-year-using-c
			var a = Math.floor((14 - _month) / 12); // Math.floor simulates integer divisions
			var y = Math.floor(_year - a);
			var m = Math.floor(_month + (12 * a) - 2);

			var mysteriousTerm = Math.floor((31 * m) / 12);
			var leapDayCount = Math.floor(y / 4); // number of leap days since March 1st, xx00?
			var centuryOffset = Math.floor(y / 100); // century offset?
			var fourHundredth = Math.floor(y / 400);

			// return the day of the week for particular date. sunday: 0, monday: 1, tuesday: 2, ... saturday: 6
			return (1 + y + leapDayCount - centuryOffset + fourHundredth + mysteriousTerm) % 7;
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
				var output = [];
				var endHere = _calItems.startingDay + _calItems.monthLength;
				var i = 0;

				output.push("<tr>");

				while (i < endHere) {
					if (0 === (i % 7)) {
						output.push("<tr>");
					}
					if (i < _calItems.startingDay) {
						output.push("<td></td>");
					}
					else {
						var day = i - _calItems.startingDay + 1;
						output.push("<td class='day calendarDay' id='" + encodeId(day, _month,  _year, _guid) + "'>" + day + "</td>");
					}
					i += 1;
				}
				output.push("<tr>");

				return output.join('');
			},
			__getTestState__: function () {
				return _calItems;
			}
		};
	};
} ());