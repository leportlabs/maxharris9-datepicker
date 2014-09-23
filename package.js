Package.describe({
	summary: "Native date picker without bootstrap dependency",
	version: "1.0.2",
	git: "https://github.com/maxharris9/maxharris9-datepicker.git"
});

Package.onUse(function(api) {
	api.versionsFrom('METEOR@0.9.1');
	api.use(['standard-app-packages', 'tracker', 'templating', 'underscore', 'maxharris9:template-instance-utils', 'pfafman:font-awesome-4', 'mongo-livedata'], 'client');

	api.add_files('../../public/css/package-components/datepicker.css', 'client');

	api.add_files('maxharris9:datepicker.html', 'client');

	api.add_files('simple-date.js', 'client');
	api.add_files('maxharris9:datepicker.js', 'client');
	api.add_files('calendar.js', 'client');

	api.add_files('calendar-test.js', 'client');

	api.add_files('date-picker-popup.html', 'client');
	api.add_files('date-picker-popup.js', 'client');

	api.export(['Calendar', 'CalendarTest', 'testCalendarGenerator'], 'client');
});

Package.onTest(function(api) {
	api.use('tinytest');
	api.use('maxharris9:datepicker');
	api.addFiles('maxharris9:datepicker-tests.js');
});