directionEnum = {
	"prevYear": -1,
	"nextYear": 1
};
Object.freeze(directionEnum);

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

var rv = new ReactiveVar();

Template.datePickerPopup.setup = function (parentUpdateCallback, parentView, popupOffset, anchorElement, activeDate) {
	// make a copy of the activeDate so that it persists - this lets us have different markup for the currently selected date
	var originalDate = SimpleDate();
	originalDate.parse(activeDate.getStringEncoding());

	var dataContext = {
		popupOffset: popupOffset,
		activeDate: activeDate,
		originalDate: originalDate,
		guid: generateGuid(),
		parentUpdateCallback: parentUpdateCallback
	};

	var renderedView = Blaze.renderWithData(Template.datePickerPopup, dataContext, anchorElement, undefined, parentView );

	rv.set(renderedView);

	return renderedView;
};

Template.datePickerPopup.helpers({
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
			var cal = Calendar(data.activeDate, data.originalDate, data.guid);
			return cal.renderHtmlCalendar();
		});
	},
	selectedMonth: function () {
		ti.depend('month');
		return wrapTemplateInstance(function (data) {
			return allMonths[data.activeDate.getMonth() - 1].month;
		});
	},
	selectedYear: function () {
		ti.depend('year');
		return wrapTemplateInstance(function (data) {
			return data.activeDate.getYear();
		});
	},
	getStyle: function () {
		return wrapTemplateInstance(function (data) {
			return { style: "display: block; top: " + data.popupOffset.top + "px; left: " + data.popupOffset.left + "px;" };
		});
	}
});

Template.datePickerPopup.events({
	'click .calendarDay': function (event, template) {
		if (template.data) {
			var newlySelectedDate = SimpleDate();
			newlySelectedDate.decodeId(event.target.id);

			template.data.parentUpdateCallback(newlySelectedDate);
		}
	},
	'click .prevMonth': function (event, template) {
		if (template.data) {
			template.data.activeDate.flowIntoAdjacentYear(directionEnum.prevYear, 12);

			ti.changed('month');
			ti.changed('year');
		}
	},
	'click .nextMonth': function (event, template) {
		if (template.data) {
			template.data.activeDate.flowIntoAdjacentYear(directionEnum.nextYear, 1);

			ti.changed('month');
			ti.changed('year');
		}
	},
	'click .decYear': function (event, template) {
		if (template.data) {
			template.data.activeDate.setYear(template.data.activeDate.getYear() - 1); // writing incYear and decYear methods isn't warranted yet
			ti.changed('year');
		}
	},
	'click .incYear': function (event, template) {
		if (template.data) {
			template.data.activeDate.setYear(template.data.activeDate.getYear() + 1);

			ti.changed('year');
		}
	}
});