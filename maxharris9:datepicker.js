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
	remove: function () {
		Blaze.remove(renderedView);
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

Template.datePicker.events({
	'click .openButton': function (event, template) {
		if (template.data) {
			var saveCallback = function (newlySelectedDate) {
				template.data.theDate = newlySelectedDate;
				template.data.topSaveCallback(template.data.theDate.getStringEncoding());
				ti.changed('currentDateDep');

				template.data.openedState = false;
			};

			var elementId = 'date-picker-popup-anchor-' + template.data.guid;
			var domElement = document.getElementById(elementId);

			var popupOffset = getOffset('date-picker-calendar-button-' + template.data.guid, template.data.popupOffset);

			template.data.datePickerPopupView = Template.datePickerPopup.setup(saveCallback, template.view, popupOffset, domElement, template.data.theDate);
			template.data.openedState = true;

			template.datePickerOpen.set(true);
		}
	},
	'click #datePickerOff': function (event, template) {
		if (template.data && template.data.openedState) {
			Blaze.remove(template.data.datePickerPopupView);
			template.data.openedState = false;
			
			template.datePickerOpen.set(false);
		}
	}
});