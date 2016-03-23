var React = require('react');
var GoogleMaps = require('./../react-google-maps/index.jsx');

var TheMap = React.createClass({
    getInitialState: function() {
        return {
            polygons: [],
            markers: [],
            arrows: [],
            center: {lat: 41.087242, lng: 29.006901},
            zoom: 12,
            mapTypeControl: true
        };
    },
    
    _onDirectionCalculated: function(polyline) {
       console.log(polyline); 
    } ,
    
    _onClick(event) {
        console.log("on click");
    },
    
    _onRightClick(event) {
        console.log("on right click");
    },
    
    render : function() {
        return (
            <div className="mapsWrapper">
                <GoogleMaps 
                    richMarkers={this.state.markers} 
                    polygons={this.state.polygons} 
                    arrows={this.state.arrows} 
                    center={this.state.center} 
                    zoom={this.state.zoom} 
                    mapTypeControl={this.state.mapTypeControl} 
                    elId="mapId" 
                    googleMapsClassName="googleMaps"    
                    direction={{startPoint:{lat: 41.088067, lng: 29.007115}, endPoint:{lat: 41.091245, lng:29.005088}}}
                    onDirectionCalculatedPolylineMode={this._onDirectionCalculated}
                    onClick={this._onClick}
                    onRightClick={this._onRightClick}
                />
            </div>
        );
   } 
});

module.exports = TheMap;