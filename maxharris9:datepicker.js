ti = TrackedItems();
var renderedView;

Template.datePicker.helpers({
	setup: function (currentDate, saveCallback, elementId, popupOffsetX, popupOffsetY) {
		var domElement = document.getElementById(elementId);
		var originalDate = SimpleDate();
		originalDate.parse(currentDate);

		var dataContext = {
			'saveCallback': saveCallback,
			'theDate': originalDate,
			'guid': generateGuid(),
			'popupOffsetX': popupOffsetX,
			'popupOffsetY': popupOffsetY
		};

		renderedView = Blaze.renderWithData(Template.datePicker, dataContext, domElement);
	},
	currentDate: function () {
		ti.depend('currentDateDep');
		return wrapTemplateInstance(function (data) {
			return data.theDate.getStringEncoding();
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

			var saveCallback = function () {
				template.data.saveCallback(template.data.theDate.getStringEncoding());
				ti.changed('currentDateDep');

				template.data.openedState = false;
			};

			var elementId = 'date-picker-popup-anchor-' + template.data.guid;
			var domElement = document.getElementById(elementId);

			var p = jQuery('#' + 'date-picker-calendar-button-' + template.data.guid);
			var position = p.position();
			position.left -= template.data.popupOffsetX;
			position.top += template.data.popupOffsetY;

			template.data.datePickerPopupView = Template.datePickerPopup.setup(saveCallback, template.view, position.left, position.top, domElement, template.data.theDate);
			template.data.openedState = true;
		}
	}
});