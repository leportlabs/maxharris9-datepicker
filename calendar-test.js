// TODO: let's hook this up to tinytest

CalendarTest = (function () {
	"use strict";
	return function () {
		var _tests = {};

		return {
			addTest: function (key, array) {
				_tests[key] = array;
			},
			getTest: function (key) {
				return _tests[key];
			}
		};
	};
} ());

testCalendarGenerator = function () {
	var calTest = CalendarTest();
	calTest.addTest( '1/1800', { startingDay: 3, monthLength: 31 } );
	calTest.addTest( '2/1800', { startingDay: 6, monthLength: 28 } ); // 1800 is not a leap year
	calTest.addTest( '3/1800', { startingDay: 6, monthLength: 31 } );
	calTest.addTest( '4/1800', { startingDay: 2, monthLength: 30 } );
	calTest.addTest( '5/1800', { startingDay: 4, monthLength: 31 } );
	calTest.addTest( '6/1800', { startingDay: 0, monthLength: 30 } );
	calTest.addTest( '7/1800', { startingDay: 2, monthLength: 31 } );
	calTest.addTest( '8/1800', { startingDay: 5, monthLength: 31 } );
	calTest.addTest( '9/1800', { startingDay: 1, monthLength: 30 } );
	calTest.addTest('10/1800', { startingDay: 3, monthLength: 31 } );
	calTest.addTest('11/1800', { startingDay: 6, monthLength: 30 } );
	calTest.addTest('12/1800', { startingDay: 1, monthLength: 31 } );

	calTest.addTest( '1/1900', { startingDay: 1, monthLength: 31 } );
	calTest.addTest( '2/1900', { startingDay: 4, monthLength: 28 } ); // 1900 is not a leap year
	calTest.addTest( '3/1900', { startingDay: 4, monthLength: 31 } );
	calTest.addTest( '4/1900', { startingDay: 0, monthLength: 30 } );
	calTest.addTest( '5/1900', { startingDay: 2, monthLength: 31 } );
	calTest.addTest( '6/1900', { startingDay: 5, monthLength: 30 } );
	calTest.addTest( '7/1900', { startingDay: 0, monthLength: 31 } );
	calTest.addTest( '8/1900', { startingDay: 3, monthLength: 31 } );
	calTest.addTest( '9/1900', { startingDay: 6, monthLength: 30 } );
	calTest.addTest('10/1900', { startingDay: 1, monthLength: 31 } );
	calTest.addTest('11/1900', { startingDay: 4, monthLength: 30 } );
	calTest.addTest('12/1900', { startingDay: 6, monthLength: 31 } );

	calTest.addTest( '1/1980', { startingDay: 2, monthLength: 31 } );
	calTest.addTest( '2/1980', { startingDay: 5, monthLength: 29 } );
	calTest.addTest( '3/1980', { startingDay: 6, monthLength: 31 } );
	calTest.addTest( '4/1980', { startingDay: 2, monthLength: 30 } );
	calTest.addTest( '5/1980', { startingDay: 4, monthLength: 31 } );
	calTest.addTest( '6/1980', { startingDay: 0, monthLength: 30 } );
	calTest.addTest( '7/1980', { startingDay: 2, monthLength: 31 } );
	calTest.addTest( '8/1980', { startingDay: 5, monthLength: 31 } );
	calTest.addTest( '9/1980', { startingDay: 1, monthLength: 30 } );
	calTest.addTest('10/1980', { startingDay: 3, monthLength: 31 } );
	calTest.addTest('11/1980', { startingDay: 6, monthLength: 30 } );
	calTest.addTest('12/1980', { startingDay: 1, monthLength: 31 } );

	calTest.addTest( '1/1983', { startingDay: 6, monthLength: 31 } );
	calTest.addTest( '2/1983', { startingDay: 2, monthLength: 28 } );
	calTest.addTest( '3/1983', { startingDay: 2, monthLength: 31 } );
	calTest.addTest( '4/1983', { startingDay: 5, monthLength: 30 } );
	calTest.addTest( '5/1983', { startingDay: 0, monthLength: 31 } );
	calTest.addTest( '6/1983', { startingDay: 3, monthLength: 30 } );
	calTest.addTest( '7/1983', { startingDay: 5, monthLength: 31 } );
	calTest.addTest( '8/1983', { startingDay: 1, monthLength: 31 } );
	calTest.addTest( '9/1983', { startingDay: 4, monthLength: 30 } );
	calTest.addTest('10/1983', { startingDay: 6, monthLength: 31 } );
	calTest.addTest('11/1983', { startingDay: 2, monthLength: 30 } );
	calTest.addTest('12/1983', { startingDay: 4, monthLength: 31 } );

	calTest.addTest( '1/1984', { startingDay: 0, monthLength: 31 } );
	calTest.addTest( '2/1984', { startingDay: 3, monthLength: 29 } );
	calTest.addTest( '3/1984', { startingDay: 4, monthLength: 31 } );
	calTest.addTest( '4/1984', { startingDay: 0, monthLength: 30 } );
	calTest.addTest( '5/1984', { startingDay: 2, monthLength: 31 } );
	calTest.addTest( '6/1984', { startingDay: 5, monthLength: 30 } );
	calTest.addTest( '7/1984', { startingDay: 0, monthLength: 31 } );
	calTest.addTest( '8/1984', { startingDay: 3, monthLength: 31 } );
	calTest.addTest( '9/1984', { startingDay: 6, monthLength: 30 } );
	calTest.addTest('10/1984', { startingDay: 1, monthLength: 31 } );
	calTest.addTest('11/1984', { startingDay: 4, monthLength: 30 } );
	calTest.addTest('12/1984', { startingDay: 6, monthLength: 31 } );

	calTest.addTest( '1/1990', { startingDay: 1, monthLength: 31 } );
	calTest.addTest( '2/1990', { startingDay: 4, monthLength: 28 } );
	calTest.addTest( '3/1990', { startingDay: 4, monthLength: 31 } );
	calTest.addTest( '4/1990', { startingDay: 0, monthLength: 30 } );
	calTest.addTest( '5/1990', { startingDay: 2, monthLength: 31 } );
	calTest.addTest( '6/1990', { startingDay: 5, monthLength: 30 } );
	calTest.addTest( '7/1990', { startingDay: 0, monthLength: 31 } );
	calTest.addTest( '8/1990', { startingDay: 3, monthLength: 31 } );
	calTest.addTest( '9/1990', { startingDay: 6, monthLength: 30 } );
	calTest.addTest('10/1990', { startingDay: 1, monthLength: 31 } );
	calTest.addTest('11/1990', { startingDay: 4, monthLength: 30 } );
	calTest.addTest('12/1990', { startingDay: 6, monthLength: 31 } );

	calTest.addTest( '1/2000', { startingDay: 6, monthLength: 31 } );
	calTest.addTest( '2/2000', { startingDay: 2, monthLength: 29 } ); // 2000 is a leap year
	calTest.addTest( '3/2000', { startingDay: 3, monthLength: 31 } );
	calTest.addTest( '4/2000', { startingDay: 6, monthLength: 30 } );
	calTest.addTest( '5/2000', { startingDay: 1, monthLength: 31 } );
	calTest.addTest( '6/2000', { startingDay: 4, monthLength: 30 } );
	calTest.addTest( '7/2000', { startingDay: 6, monthLength: 31 } );
	calTest.addTest( '8/2000', { startingDay: 2, monthLength: 31 } );
	calTest.addTest( '9/2000', { startingDay: 5, monthLength: 30 } );
	calTest.addTest('10/2000', { startingDay: 0, monthLength: 31 } );
	calTest.addTest('11/2000', { startingDay: 3, monthLength: 30 } );
	calTest.addTest('12/2000', { startingDay: 5, monthLength: 31 } );

	calTest.addTest( '1/2006', { startingDay: 0, monthLength: 31 } );
	calTest.addTest( '2/2006', { startingDay: 3, monthLength: 28 } );
	calTest.addTest( '3/2006', { startingDay: 3, monthLength: 31 } );
	calTest.addTest( '4/2006', { startingDay: 6, monthLength: 30 } );
	calTest.addTest( '5/2006', { startingDay: 1, monthLength: 31 } );
	calTest.addTest( '6/2006', { startingDay: 4, monthLength: 30 } );
	calTest.addTest( '7/2006', { startingDay: 6, monthLength: 31 } );
	calTest.addTest( '8/2006', { startingDay: 2, monthLength: 31 } );
	calTest.addTest( '9/2006', { startingDay: 5, monthLength: 30 } );
	calTest.addTest('10/2006', { startingDay: 0, monthLength: 31 } );
	calTest.addTest('11/2006', { startingDay: 3, monthLength: 30 } );
	calTest.addTest('12/2006', { startingDay: 5, monthLength: 31 } );

	calTest.addTest( '1/2015', { startingDay: 4, monthLength: 31 } );
	calTest.addTest( '2/2015', { startingDay: 0, monthLength: 28 } );
	calTest.addTest( '3/2015', { startingDay: 0, monthLength: 31 } );
	calTest.addTest( '4/2015', { startingDay: 3, monthLength: 30 } );
	calTest.addTest( '5/2015', { startingDay: 5, monthLength: 31 } );
	calTest.addTest( '6/2015', { startingDay: 1, monthLength: 30 } );
	calTest.addTest( '7/2015', { startingDay: 3, monthLength: 31 } );
	calTest.addTest( '8/2015', { startingDay: 6, monthLength: 31 } );
	calTest.addTest( '9/2015', { startingDay: 2, monthLength: 30 } );
	calTest.addTest('10/2015', { startingDay: 4, monthLength: 31 } );
	calTest.addTest('11/2015', { startingDay: 0, monthLength: 30 } );
	calTest.addTest('12/2015', { startingDay: 2, monthLength: 31 } );

	calTest.addTest( '1/2100', { startingDay: 5, monthLength: 31 } );
	calTest.addTest( '2/2100', { startingDay: 1, monthLength: 28 } ); // 2100 is not a leap year
	calTest.addTest( '3/2100', { startingDay: 1, monthLength: 31 } );
	calTest.addTest( '4/2100', { startingDay: 4, monthLength: 30 } );
	calTest.addTest( '5/2100', { startingDay: 6, monthLength: 31 } );
	calTest.addTest( '6/2100', { startingDay: 2, monthLength: 30 } );
	calTest.addTest( '7/2100', { startingDay: 4, monthLength: 31 } );
	calTest.addTest( '8/2100', { startingDay: 0, monthLength: 31 } );
	calTest.addTest( '9/2100', { startingDay: 3, monthLength: 30 } );
	calTest.addTest('10/2100', { startingDay: 5, monthLength: 31 } );
	calTest.addTest('11/2100', { startingDay: 1, monthLength: 30 } );
	calTest.addTest('12/2100', { startingDay: 3, monthLength: 31 } );

	calTest.addTest( '1/2200', { startingDay: 3, monthLength: 31 } );
	calTest.addTest( '2/2200', { startingDay: 6, monthLength: 28 } ); // 2200 is not a leap year
	calTest.addTest( '3/2200', { startingDay: 6, monthLength: 31 } );
	calTest.addTest( '4/2200', { startingDay: 2, monthLength: 30 } );
	calTest.addTest( '5/2200', { startingDay: 4, monthLength: 31 } );
	calTest.addTest( '6/2200', { startingDay: 0, monthLength: 30 } );
	calTest.addTest( '7/2200', { startingDay: 2, monthLength: 31 } );
	calTest.addTest( '8/2200', { startingDay: 5, monthLength: 31 } );
	calTest.addTest( '9/2200', { startingDay: 1, monthLength: 30 } );
	calTest.addTest('10/2200', { startingDay: 3, monthLength: 31 } );
	calTest.addTest('11/2200', { startingDay: 6, monthLength: 30 } );
	calTest.addTest('12/2200', { startingDay: 1, monthLength: 31 } );

	calTest.addTest( '1/2300', { startingDay: 1, monthLength: 31 } );
	calTest.addTest( '2/2300', { startingDay: 4, monthLength: 28 } ); // 2300 is not a leap year
	calTest.addTest( '3/2300', { startingDay: 4, monthLength: 31 } );
	calTest.addTest( '4/2300', { startingDay: 0, monthLength: 30 } );
	calTest.addTest( '5/2300', { startingDay: 2, monthLength: 31 } );
	calTest.addTest( '6/2300', { startingDay: 5, monthLength: 30 } );
	calTest.addTest( '7/2300', { startingDay: 0, monthLength: 31 } );
	calTest.addTest( '8/2300', { startingDay: 3, monthLength: 31 } );
	calTest.addTest( '9/2300', { startingDay: 6, monthLength: 30 } );
	calTest.addTest('10/2300', { startingDay: 1, monthLength: 31 } );
	calTest.addTest('11/2300', { startingDay: 4, monthLength: 30 } );
	calTest.addTest('12/2300', { startingDay: 6, monthLength: 31 } );

	calTest.addTest( '1/2400', { startingDay: 6, monthLength: 31 } );
	calTest.addTest( '2/2400', { startingDay: 2, monthLength: 29 } ); // 2400 is a leap year
	calTest.addTest( '3/2400', { startingDay: 3, monthLength: 31 } );
	calTest.addTest( '4/2400', { startingDay: 6, monthLength: 30 } );
	calTest.addTest( '5/2400', { startingDay: 1, monthLength: 31 } );
	calTest.addTest( '6/2400', { startingDay: 4, monthLength: 30 } );
	calTest.addTest( '7/2400', { startingDay: 6, monthLength: 31 } );
	calTest.addTest( '8/2400', { startingDay: 2, monthLength: 31 } );
	calTest.addTest( '9/2400', { startingDay: 5, monthLength: 30 } );
	calTest.addTest('10/2400', { startingDay: 0, monthLength: 31 } );
	calTest.addTest('11/2400', { startingDay: 3, monthLength: 30 } );
	calTest.addTest('12/2400', { startingDay: 5, monthLength: 31 } );

	calTest.addTest( '1/2500', { startingDay: 5, monthLength: 31 } );
	calTest.addTest( '2/2500', { startingDay: 1, monthLength: 28 } ); // 2500 is not a leap year
	calTest.addTest( '3/2500', { startingDay: 1, monthLength: 31 } );
	calTest.addTest( '4/2500', { startingDay: 4, monthLength: 30 } );
	calTest.addTest( '5/2500', { startingDay: 6, monthLength: 31 } );
	calTest.addTest( '6/2500', { startingDay: 2, monthLength: 30 } );
	calTest.addTest( '7/2500', { startingDay: 4, monthLength: 31 } );
	calTest.addTest( '8/2500', { startingDay: 0, monthLength: 31 } );
	calTest.addTest( '9/2500', { startingDay: 3, monthLength: 30 } );
	calTest.addTest('10/2500', { startingDay: 5, monthLength: 31 } );
	calTest.addTest('11/2500', { startingDay: 1, monthLength: 30 } );
	calTest.addTest('12/2500', { startingDay: 3, monthLength: 31 } );

	var years = [1800, 1900, 1980, 1983, 1984, 1990, 2000, 2006, 2015, 2100, 2200, 2300, 2400, 2500];

	var iterateCalTest = function (callback) {
		_.each(years, function (year) {
			_.each(_.range(1, 13), function (month) {
				var key = month + '/' + year;
				callback(key, month, year);
			});
		});
	};

	iterateCalTest(function (key, month, year) { // this is called last so that errors don't get buried in the log
		var cal = Calendar(1, month, year, 'testguid0');
		console.assert(_.isEqual(cal.__getTestState__(), calTest.getTest(key)), 'Calendar generation for ' + key + ' failed');
	} );
};