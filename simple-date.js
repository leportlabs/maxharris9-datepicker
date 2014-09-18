// TODO: write unit tests

SimpleDate = (function () {
	"use strict";
	return function (day, month, year, guid) {
		var _clamp = function (number, min, max) {
			return Math.min(Math.max(number, min), max);
		};
		var _clampDay = function (day) {
			return _clamp(day, 1, 365);
		};
		var _clampMonth = function (month) {
			return _clamp(month, 1, 12);
		};
		var _clampYear = function (year) {
			return _clamp(year, 0, 2500);
		};

		var _day = _clampDay(day);
		var _month = _clampMonth(month);
		var _year = _clampYear(year);
		var _guid = guid;

		return {
			parse: function (date) {
				if (date) {
					var dateParts = date.split('/');

					if (3 === dateParts.length) {
						_month = parseInt(dateParts[0], 10);
						_day = parseInt(dateParts[1], 10);
						_year = parseInt(dateParts[2], 10);
					}
				}
				else {
					_month = 1;
					_day = 1;
					_year = 2000;
				}
			},
			getStringEncoding: function () {
				return _month + '/' + _day + '/' + _year;
			},

			getDay: function () {
				return _day;
			},
			getMonth: function () {
				return _month;
			},
			getYear: function () {
				return _year;
			},

			setDay: function (day) {
				_day = _clampDay(day);
			},
			setMonth: function (month) {
				_month = _clampMonth(month);
			},
			setYear: function (year) {
				_year = _clampYear(year);
			},

			encodeId: function () {
				return _month + '-' + _day + '-' + _year + '-' + _guid;
			},
			decodeId: function (id) {
				var tokenizedId = id.split('-');

				_month = parseInt(tokenizedId[0]);
				_day = parseInt(tokenizedId[1]);
				_year = parseInt(tokenizedId[2]);
				_guid = tokenizedId[3];
			},

			flowIntoAdjacentYear: function (direction, overflowMonth) {
				var newMonth = _clampMonth(_month + direction);

				if (newMonth === _month) { // if the month hasn't changed, we know we started with January or December
					_month = overflowMonth;
					_year = _clampYear(_year + direction); // in that case, flow to the previous or next year, depending on our direction
				}
				else { // default case: switch to adjacent month, without changing the year
					_month = newMonth;
				}
			}
		};
	};
} ());