var render = require('react-dom').render;
var reactRouter = require('react-router');
var TheMap = require('./components/map/index.jsx');

var Router = reactRouter.Router;
var Route = reactRouter.Route;
var React = require('react');

var actions = require('./actions/main.js');

var App = React.createClass({
    
    onExecuteClick: function() {
        actions.execute();
    },
    
    onResetClick: function() {
    
    },
    
    _onWkt: function(wkt) {
        this.refs.textarea.value = wkt;
    },
	render: function() {
		return (
			<div className="container">
                <div className="mapBox">
                    <TheMap onWkt={this._onWkt}/>
                </div>
                
                <div className="controlBox">
                    <div className="controlPanel">
                        <div className="buttonDiv">
                            <button className="reset">Reset</button>
                        </div>
                        <div className="buttonDiv">
                            <button className="googleMode">Google Mode</button>
                            <button className="lineMode">Line Mode</button>
                        </div>
                        <div className="buttonDiv">
                            <button onClick={this.onExecuteClick} className="execute">Execute</button>
                        </div>
                    </div>
                    
                    <div className="dataPanel">
                        <div className="dataDiv">
                            <textarea ref="textarea" className="datatextarea" />
                        </div>
                    </div>
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