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

Template.datePickerPopup.setup = function (parentUpdateCallback, parentView, popupOffset, anchorElement, theDate) {
	var dataContext = {
		'popupOffset': popupOffset,
		'theDate': theDate,
		'guid': generateGuid(),
		'parentUpdateCallback': parentUpdateCallback
	};

	var renderedView = Blaze.renderWithData(Template.datePickerPopup, dataContext, anchorElement, undefined, parentView );

	rv.set(renderedView);

//	// WTF - why do I seem to need to store a reference so that the remove helper can destroy the right instance?
//	renderedView.dataVar.curValue.renderedView = renderedView; // I must be doing something wrong, but I know not what.

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
			return { style: "display: block; top: " + data.popupOffset.top + "px; left: " + data.popupOffset.left + "px;" };
		});
	}
});

Template.datePickerPopup.events({
	'click .calendarDay': function (event, template) {
		if (template.data) {
			var newlySelectedDate = SimpleDate();
			newlySelectedDate.decodeId(event.target.id);
			//Blaze.remove(template.data.renderedView);
			//Blaze.remove(rv.get());

			template.data.parentUpdateCallback(newlySelectedDate);
			//Template.datePickerPopup.remove();
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