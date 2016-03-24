var render = require('react-dom').render;
var reactRouter = require('react-router');
var TheMap = require('./components/map/index.jsx');

var Router = reactRouter.Router;
var Route = reactRouter.Route;
var React = require('react');

var actions = require('./actions/main.js');

var ReactTabs = require('react-tabs');
var Tab = ReactTabs.Tab;
var Tabs = ReactTabs.Tabs;
var TabList = ReactTabs.TabList;
var TabPanel = ReactTabs.TabPanel;


var AppDispatcher = require('./dispatcher/AppDispatcher.js');
var actionConstants = require('./constants/main');

var App = React.createClass({
    
    onExecuteFromPolylineClick: function() {
        actions.executeFromPolyline();
    },
    
    onExecuteFromWKT: function() {
        var wkt = this.refs.textareaFromWkt.value;
        actions.executeFromWkt(wkt);
    },
    
    onResetClick: function() {
    
    },
    handleSelect: function(index, last) {
            
    },
    
    componentDidMount: function() {
        var that = this;
        AppDispatcher.register(function(action) {
            switch (action.actionType) {
                case actionConstants.SEND_WKT:
                    var wkt = action.wkt;
                    that.refs.textareaFromPolyline.value = wkt;
                    break;
                default:
                    return true;
            }
        });
    },
	render: function() {
        
		return (
			<div className="container">
                <div className="mapBox">
                    <TheMap onWkt={this._onWkt}/>
                </div>
                
                <div className="controlBox">
                    <Tabs   onSelect={this.handleSelect}
                            selectedIndex={0}>
                        <TabList>
                            <Tab>
                                FromPolyline
                            </Tab>
                            <Tab>
                                FromWkt
                            </Tab>
                        </TabList>
                        <TabPanel>
                            <div className="controlPanel">
                                <div className="buttonDiv">
                                    <button onClick={this.onExecuteFromPolylineClick} className="execute">Execute</button>
                                </div>
                            </div>
                            
                            <div className="dataPanel">
                                <div className="dataDiv">
                                    <textarea ref="textareaFromPolyline" className="datatextarea" />
                                </div>
                            </div>
                        </TabPanel>
                        
                        <TabPanel>
                            <div className="controlPanel">
                                
                                <div className="buttonDiv">
                                    <button onClick={this.onExecuteFromWKT} className="execute">Execute</button>
                                </div>
                            </div>
                            
                            <div className="dataPanel">
                                <div className="dataDiv">
                                    <textarea ref="textareaFromWkt" className="datatextarea" />
                                </div>
                            </div>
                        </TabPanel>
                    </Tabs>
                </div>
                
			</div>
		)
	}
});

render((
  <Router>
    <Route path="/" component={App}>
      
    </Route>
  </Router>
), document.getElementById('container'));