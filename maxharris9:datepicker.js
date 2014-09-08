ti = TrackedItems();

var renderedView;

generateGuid = function () {
	function s4 () {
		return Math.floor((1 + Math.random()) * 0x10000)
			.toString(16)
			.substring(1);
	};

	return s4() + s4() + s4() + s4() + s4() + s4() + s4() + s4();
};

wrapTemplateInstance = function (callback) {
	var template = Template.instance();
	if (template.data) {
		return callback(template.data);
	}
};

setTemplateInstance = function (property, value) {
	var template = Template.instance();
	if (template.data) {
		template.data[property] = value;
	}
};

var parseDate = function (date) {
	var dateParts = date.split('/');

	return {
		month: parseInt(dateParts[0], 10),
		day: parseInt(dateParts[1], 10),
		year: parseInt(dateParts[2], 10)
	};
}

Template.datePicker.helpers({
	setup: function (currentDate, saveCallback) {
		var domElement = document.getElementById('editableDateThing');
		var dateParts = parseDate(currentDate);

		renderedView = Blaze.renderWithData(Template.datePicker, { 'saveCallback': saveCallback, 'month': dateParts.month, 'day': dateParts.day, 'year': dateParts.year, 'currentDate': currentDate, 'guid': generateGuid() }, domElement);
	},
	currentDate: function () {
		ti.depend('currentDateDep');
		return wrapTemplateInstance(function (data) {
			return data.currentDate;
		});
	},
	guid: function () {
		return wrapTemplateInstance(function (data) {
			return data.guid;
		});
	},
	remove: function () {
		Blaze.remove(renderedView);
	}
});

Template.datePicker.events({
	'click .openButton': function (event, template) {
		if (template.data) {
			if (template.data.openedState) {
				Blaze.remove(template.data.datePickerPopupView);
				template.data.openedState = false;
				return;
			}

			var biteyCallback = function () {
				template.data.saveCallback(template.data.currentDate);
				ti.changed('currentDateDep');

				template.data.openedState = false;
			};

			var elementId = 'date-picker-popup-anchor-' + template.data.guid;
			var domElement = document.getElementById(elementId);

			var p = jQuery('#' + 'date-picker-calendar-button-' + template.data.guid);
			var position = p.position();

			template.data.datePickerPopupView = Template.datePickerPopup.setup(biteyCallback, template.view, position.left - 12, position.top + 32, domElement, template.data.month, template.data.day, template.data.year);
			template.data.openedState = true;
		}
	}
});