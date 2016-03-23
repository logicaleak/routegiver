var render = require('react-dom').render;
var reactRouter = require('react-router');
var TheMap = require('./components/map/index.jsx');

var Router = reactRouter.Router;
var Route = reactRouter.Route;
var React = require('react');

var App = React.createClass({
	render: function() {
		return (
			<div className="container">
                <div className="mapBox">
                    <TheMap />
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
                            <button className="execute">Execute</button>
                        </div>
                    </div>
                    
                    <div className="dataPanel">
                        <div className="dataDiv">
                            <textarea className="datatextarea" />
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