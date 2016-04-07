var AppDispatcher = require('../dispatcher/AppDispatcher');
var actionConstants = require('../constants/main');

var actions = {
    executeFromPolyline: function() {
        AppDispatcher.dispatch({
            actionType: actionConstants.EXECUTE_FROM_POLYLINE
        });
    },
    
    executeFromWkt: function(wkt) {
        AppDispatcher.dispatch({
            actionType: actionConstants.EXECUTE_FROM_WKT,
            wkt: wkt
        });
    },
    
    executePolygonFromWkt: function(wkt) {
        AppDispatcher.dispatch({
            actionType: actionConstants.EXECUTE_POLYGON_FROM_WKT,
            wkt: wkt
        });
    },
    
    sendWkt: function(wkt) {
        AppDispatcher.dispatch({
            actionType: actionConstants.SEND_WKT,
            wkt: wkt
        })
    }
}

module.exports = actions;




