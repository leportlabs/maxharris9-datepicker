var encodeId = function (month, day, year, guid) {
	return month + '-' + day + '-' + year + '-' + guid;
};

Calendar = (function () {
	return function (day, month, year, guid) {
		var _day = day;
		var _month = month;
		var _year = year;
		var _guid = guid;

		// inspired by http://stackoverflow.com/questions/18664548/print-a-12-month-calendar-with-only-input-being-the-year-using-c
		var _getWeekDay = function (day, month, year) {
			// return the day of the week for particular date. sunday: 0, monday: 1, tuesday: 2, ... saturday: 6
			var a = Math.floor((14 - month) / 12); // we need to simulate integer divisions to truncate results
			var y = Math.floor(year - a);
			var m = Math.floor(month + (12 * a) - 2);

			var thing = Math.floor((31 * m) / 12);
			var fourth = Math.floor(y / 4);
			var hundredth = Math.floor(y / 100);
			var fourHundredth = Math.floor(y / 400);

			return (day + y + fourth - hundredth + fourHundredth + thing) % 7;
		};
		var _generateCalendar = function (startingDay, monthLength) {
			var output = [];

			output.push(
				_.map(_.range(0, startingDay), function () { return ""; } )
			);
			output.push(
				_.map(_.range(0, monthLength), function (date) {
					return date + 1;
				} )
			);

			return _.flatten(output);
		};
		var _fillCalendar = function () {
			var monthLengths = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

			if (year % 400 === 0 || ((year % 4 === 0) && (year % 100 !== 0))) {
				monthLengths[1] = 29; // leap years add a day to February
			}

			return _generateCalendar(_getWeekDay(_day, _month, _year), monthLengths[_month - 1]);
		};
		var _calItems = _fillCalendar();

		return {
			renderHtmlCalendar: function () {
				var output = [];
				output.push("<tr>");

				output.push(
					_.map(_calItems, function (day, i) {
						var output = [];
						if (0 === (i % 7)) {
							output.push("<tr>");
						}

						if (day === "") {
							output.push("<td></td>");
						}
						else {
							output.push("<td class='day calendarDay' id='" + encodeId(_month, day, _year, _guid) + "'>" + day + "</td>");
						}

						return output;
					})
				);
				output.push("<tr>");

				return _.flatten(output).join('');
			},
			__getTestArray__: function () {
				return _calItems;
			},
			__getTestWeekDay__: function (day, month, year) {
				return _getWeekDay(day, month, year);
			}
		};
	};
} ());

// var ExtendedCalendar = (function () {
// 	return function () {
// 		var cal = Calendar();
// 		cal.newMethod = function () {
// 			console.log("here's a new method that extends the calendar class");
// 		};
// 		return cal;
// 	}
// } ());