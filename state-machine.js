// inspired by http://lamehacks.net/blog/implementing-a-state-machine-in-javascript/

StateMachine = (function () {
	return function (states) {
		var _states = states;
		var _indexes = {}; // just for convinience
		var _currentState;

		if (states) {
			for (var i = 0; i < _states.length; i++) {
				_indexes[_states[i].name] = i;
				if (_states[i].initial) {
					_currentState = _states[i];
				}
			}
		}
		else {
			console.log('error: states JSON required');
		}

		return {
			consumeEvent: function (e) {
				if (_currentState.events[e]) {
					_currentState = _states[_indexes[_currentState.events[e]]];
				}
			},
			getStatus: function () {
				return _currentState.name;
			}
		}
	}
} ());