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

Template.datePickerPopup.helpers({
	setup: function (parentUpdateCallback, parentView, x, y, anchorElement, theDate) {
		var dataContext = {
			'x': x,
			'y': y,
			'theDate': theDate,
			'guid': generateGuid(),
			'parentUpdateCallback': parentUpdateCallback
		};

		var renderedView = Blaze.renderWithData(Template.datePickerPopup, dataContext, anchorElement, undefined, parentView );

		// WTF - why do I seem to need to store a reference so that the remove helper can destroy the right instance?
		renderedView.dataVar.curValue.renderedView = renderedView; // I must be doing something wrong, but I know not what.

		return renderedView;
	},
	remove: function () {
		Template.parentData(1).openedState = false;
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
			var cal = Calendar(data.theDate.getDay(), data.theDate.getMonth(), data.theDate.getYear(), data.guid);
			return cal.renderHtmlCalendar();
		});
	},
	selectedMonth: function () {
		ti.depend('month');
		return wrapTemplateInstance(function (data) {
			return allMonths[data.theDate.getMonth() - 1].month;
		});
	},
	selectedYear: function () {
		ti.depend('year');
		return wrapTemplateInstance(function (data) {
			return data.theDate.getYear();
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
			var newlySelectedDate = SimpleDate();
			newlySelectedDate.decodeId(event.target.id);

			Template.parentData(1).theDate = newlySelectedDate; // reach into parent data context, and stuff in our updated date information

			template.data.parentUpdateCallback();
			Template.datePickerPopup.remove();
		}
	},
	'click .prevMonth': function (event, template) {
		if (template.data) {
			template.data.theDate.flowIntoAdjacentYear(directionEnum.prevYear, 12);

			ti.changed('month');
			ti.changed('year');
		}
	},
	'click .nextMonth': function (event, template) {
		if (template.data) {
			template.data.theDate.flowIntoAdjacentYear(directionEnum.nextYear, 1);

			ti.changed('month');
			ti.changed('year');
		}
	},
	'click .decYear': function (event, template) {
		if (template.data) {
			template.data.theDate.setYear(template.data.theDate.getYear() - 1); // writing incYear and decYear methods isn't warranted yet
			ti.changed('year');
		}
	},
	'click .incYear': function (event, template) {
		if (template.data) {
			template.data.theDate.setYear(template.data.theDate.getYear() + 1);

			ti.changed('year');
		}
	}
});