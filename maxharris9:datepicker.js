ti = TrackedItems();
var renderedView;

Template.datePicker.setup = function (currentDate, topSaveCallback, elementId, popupOffset) {
	var domElement = document.getElementById(elementId);
	var originalDate = SimpleDate();
	originalDate.parse(currentDate);

	var dataContext = {
		'topSaveCallback': topSaveCallback,
		'theDate': originalDate,
		'guid': generateGuid(),
		'popupOffset': popupOffset
	};

	renderedView = Blaze.renderWithData(Template.datePicker, dataContext, domElement);
};

Template.datePicker.created = function () {
	this.datePickerOpen = new ReactiveVar(false);
};

Template.datePicker.helpers({
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
	datePickerOpen: function () {
		return Template.instance().datePickerOpen.get();
	}
});

var getOffset = function (elementId, popupOffset) {
	var domElement = document.getElementById(elementId);

	return {
		top: domElement.offsetTop + popupOffset.top,
		left: domElement.offsetLeft - popupOffset.left
	};
};

var closePopover = function (template) {
	Blaze.remove(template.data.datePickerPopupView); // remove the popover itself
	template.data.openedState = false; // mark return unopened state

	template.datePickerOpen.set(false); // shut down the div that looks for clicks outside of the popover
};

Template.datePicker.events({
	'click .openButton': function (event, template) {
		if (template.data) {
			if (template.data.openedState) {
				closePopover(template);
			}
			else {
				var saveCallback = function (newlySelectedDate) {
					template.data.theDate = newlySelectedDate;
					template.data.topSaveCallback(template.data.theDate.getStringEncoding());
					ti.changed('currentDateDep');

					closePopover(template);
				};

				var elementId = 'date-picker-popup-anchor-' + template.data.guid;
				var domElement = document.getElementById(elementId);

				var popupOffset = getOffset('date-picker-calendar-button-' + template.data.guid, template.data.popupOffset);

				template.data.datePickerPopupView = Template.datePickerPopup.setup(saveCallback, template.view, popupOffset, domElement, template.data.theDate);
				template.data.openedState = true;

				template.datePickerOpen.set(true);
			}
		}
	},
	'click #datePickerOff': function (event, template) {
		if (template.data && template.data.openedState) {
			closePopover(template);
		}
	}
});