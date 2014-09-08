TrackedItems = (function () {
	return function () {
		var _trackedItems = {};

		var _checkTrackedItem = function (trackedKey) {
			if (!_trackedItems[trackedKey]) {
				_trackedItems[trackedKey] = new Tracker.Dependency();
			}
		};

		return {
			depend: function (trackedKey) {
				_checkTrackedItem(trackedKey);
				_trackedItems[trackedKey].depend();
			},
			changed: function (trackedKey) {
				_checkTrackedItem(trackedKey);
				_trackedItems[trackedKey].changed();
			}
		}
	}
} ());