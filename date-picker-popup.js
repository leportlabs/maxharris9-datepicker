var clamp = function (number, min, max) {
	return Math.min(Math.max(number, min), max);
};

var clampYear = function (year) {
	return clamp(year, 0, 2500);
};

var clampMonth = function (month) {
	return clamp(month, 1, 12);
};

var flowIntoAdjacentYear = function (month, year, direction, overflowMonth) {
	var newMonth = clampMonth(month + direction);

	if (newMonth === month) { // if the month hasn't changed, we know we started with January or December
		return {
			month: overflowMonth,
			year: clampYear(year + direction) // in that case, flow to the previous or next year, depending on our direction
		};
	}

	return { // default case: switch to adjacent month, without changing the year
		month: newMonth,
		year: year
	};
};

var decodeId = function (id) {
	var tokenizedId = id.split('-');

	return {
		'month': parseInt(tokenizedId[0]),
		'day': parseInt(tokenizedId[1]),
		'year': parseInt(tokenizedId[2]),
		'guid': tokenizedId[3]
	};
};

var allMonths = [
	{ 'month': "Jan" },
	{ 'month': "Feb" },
	{ 'month': "Mar" },
	{ 'month': "Apr" },
	{ 'month': "May" },
	{ 'month': "Jun" },
	{ 'month': "Jul" },
	{ 'month': "Aug" },
	{ 'month': "Sep" },
	{ 'month': "Oct" },
	{ 'month': "Nov" },
	{ 'month': "Dec" }
];

var allWeekdays = [
	{ 'weekday': "Sun" },
	{ 'weekday': "Mon" },
	{ 'weekday': "Tue" },
	{ 'weekday': "Wed" },
	{ 'weekday': "Thu" },
	{ 'weekday': "Fri" },
	{ 'weekday': "Sat" }
];

Template.datePickerPopup.helpers({
	setup: function (parentUpdateCallback, parentView, x, y, anchorElement, month, day, year) {
		var renderedView = Blaze.renderWithData(Template.datePickerPopup, { 'x': x, 'y': y, 'month': month, 'day': day, 'year': year, 'guid': generateGuid(), 'parentUpdateCallback': parentUpdateCallback }, anchorElement, undefined, parentView );

		renderedView.dataVar.curValue.renderedView = renderedView; // store a reference so that the remove helper can destroy the right instance

		return renderedView;
	},
	remove: function () {
		Template.parentData(1).openedState = false;
		console.log('Template.instance():', Template.instance());
		Blaze.remove(Template.instance().data.renderedView);
	},
	weekdays: function () {
		return allWeekdays;
	},
	months: function () {
		return allMonths;
	},
	calendarHtml: function () {
		ti.depend('month');
		ti.depend('year');
		return wrapTemplateInstance(function (data) {
			var cal = Calendar(data.day, data.month, data.year, data.guid);
			return cal.renderHtmlCalendar();
		});
	},
	selectedMonth: function () {
		ti.depend('month');
		return wrapTemplateInstance(function (data) {
			return allMonths[data.month - 1].month;
		});
	},
	selectedYear: function () {
		ti.depend('year');
		return wrapTemplateInstance(function (data) {
			return data.year;
		});
	},
	getStyle: function () {
		return wrapTemplateInstance(function (data) {
			return { style: "display: block; top: " + data.y + "px; left: " + data.x + "px;" };
		});
	}
});

Template.datePickerPopup.events({
	'click .calendarDay': function (event, template) {
		if (template.data) {
			console.log(decodeId(event.target.id));

			var date = decodeId(event.target.id);
			var dateString = date.month + '/' + date.day + '/' + date.year;
			Template.parentData(1).currentDate = dateString;

			Template.parentData(1).month = date.month;
			Template.parentData(1).day = date.day;
			Template.parentData(1).year = date.year;

			template.data.parentUpdateCallback();
			Template.datePickerPopup.remove();
		}
	},
	'click .prevMonth': function (event, template) {
		if (template.data) {
			var newDate = flowIntoAdjacentYear(template.data.month, template.data.year, -1, 12);

			template.data.month = newDate.month;
			template.data.year = newDate.year;

			ti.changed('month');
			ti.changed('year');
		}
	},
	'click .nextMonth': function (event, template) {
		if (template.data) {
			var newDate = flowIntoAdjacentYear(template.data.month, template.data.year, 1, 1);

			template.data.month = newDate.month;
			template.data.year = newDate.year;

			ti.changed('month');
			ti.changed('year');
		}
	},
	'click .decYear': function (event, template) {
		if (template.data) {
			template.data.year = clampYear(template.data.year - 1);
			ti.changed('year');
		}
	},
	'click .incYear': function (event, template) {
		if (template.data) {
			template.data.year = clampYear(template.data.year + 1);
			ti.changed('year');
		}
	}
});