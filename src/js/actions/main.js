var AppDispatcher = require('../dispatcher/AppDispatcher');
var actionConstants = require('../constants/main');

var actions = {
    execute: function() {
        AppDispatcher.dispatch({
            actionType: actionConstants.EXECUTE
        });
    }
}

module.exports = actions;

	


