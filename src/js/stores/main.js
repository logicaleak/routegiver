var EventEmitter = require('events').EventEmitter;
var AppDispatcher = require('../dispatcher/AppDispatcher');
var _ = require('underscore');

var actions = require('../constants/main');

var MapStore = _.extend({}, EventEmitter.prototype, {

	// Emit Change event
	emitChange: function() {
		this.emit('change');
	},

	// Add change listener
	addChangeListener: function(callback) {
		this.on('change', callback);
	},

	// Remove change listener
	removeChangeListener: function(callback) {
		this.removeListener('change', callback);
	},
    
    addExecutionListener: function(callback) {
        this.on('execution', callback);
    },
    
    emitExecution: function() {
        this.emit('execution');  
    }
});
	
AppDispatcher.register(function(action) {

	switch (action.actionType) {
        case actions.EXECUTE:
            MapStore.emitExecution();
		default:
			return true;
	}
});

module.exports = MapStore;