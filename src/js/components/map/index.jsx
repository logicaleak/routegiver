var React = require('react');
var GoogleMaps = require('./../react-google-maps/index.jsx');
var MainStore = require('../../stores/main.js');
var GeoUtil = require('../../util/geo.js');

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
        var wkt = GeoUtil.convertPolylineToLineStringWKT(polyline);
        this.props.onWkt(wkt);
    } ,
    
    _onClick(event) {
        var lat = event.latLng.lat();
        var lng = event.latLng.lng();
        var marker = {};
        marker.coordinates = {lat:lat, lng:lng};
        marker.content = '<div class="markerTextDiv">Start</div>'
        var markers = this.state.markers;
        markers[0] = marker;
        
        this.setState({markers: markers});
    },
    
    _onRightClick(event) {
        var lat = event.latLng.lat();
        var lng = event.latLng.lng();
        var marker = {};
        marker.coordinates = {lat:lat, lng:lng};
        marker.content = '<div class="markerTextDiv">End</div>'
        var markers = this.state.markers;
        markers[1] = marker;
        
        this.setState({markers: markers});
    },
    
    componentDidMount: function() {
        var that = this;
        MainStore.addExecutionListener(function() {
            
            if (that.state.markers.length === 2) {
                console.log('GOT IN');
                console.log(that.state.markers.length);
                var start = that.state.markers[0];
                var end = that.state.markers[1];
                var direction = {startPoint:{lat: start.coordinates.lat, lng: start.coordinates.lng}, endPoint:{lat: end.coordinates.lat, lng:end.coordinates.lng}};
                that.setState({direction:direction});
            } else {
                alert('Not enough markers!');
            }
        });
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
                    direction={this.state.direction}
                    onDirectionCalculatedPolylineMode={this._onDirectionCalculated}
                    onClick={this._onClick}
                    onRightClick={this._onRightClick}
                />
            </div>
        );
   } 
});

module.exports = TheMap;