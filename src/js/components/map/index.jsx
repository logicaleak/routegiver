var React = require('react');
var GoogleMaps = require('./../react-google-maps/index.jsx');
var GeoUtil = require('../../util/geo.js');
var AppDispatcher = require('../../dispatcher/AppDispatcher');
var actions = require('../../actions/main.js');
var actionConstants = require('../../constants/main');

var TheMap = React.createClass({
    getInitialState: function() {
        return {
            polygons: [],
            markers: [],
            arrows: [],
            polylines: [],
            center: {lat: 41.087242, lng: 29.006901},
            zoom: 12,
            mapTypeControl: true
        };
    },
    
    _onDirectionCalculated: function(customFormatPolylineList) {
        var wktList = customFormatPolylineList.map(function(polyline) {
            var wkt = GeoUtil.convertPolylineToLineStringWKT(polyline);
            return wkt;    
        })
        
        actions.sendWkt(wktList);
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
        
        AppDispatcher.register(function(action) {
            switch (action.actionType) {
                case actionConstants.EXECUTE_FROM_POLYLINE:
                    if (that.state.markers.length === 2) {
                        var start = that.state.markers[0];
                        var end = that.state.markers[1];
                        var direction = {startPoint:{lat: start.coordinates.lat, lng: start.coordinates.lng}, endPoint:{lat: end.coordinates.lat, lng:end.coordinates.lng}};
                        that.setState({direction:direction});
                    } else {
                        alert('Not enough markers!');
                    }
                    break;
                case actionConstants.EXECUTE_FROM_WKT:
                    var wkt = action.wkt;
                    var polyline = GeoUtil.convertWKTtoPolyline(wkt);
                    that.setState({
                        direction: null,
                        markers: [
                            {
                                content: '<div class="markerTextDiv">Start</div>',
                                coordinates : {lat:polyline.path[0].lat, lng:polyline.path[0].lng}
                            },
                            {
                                content: '<div class="markerTextDiv">End</div>',
                                coordinates : {lat:polyline.path[polyline.path.length - 1].lat, lng:polyline.path[polyline.path.length - 1].lng}
                            }
                        ],
                        polylines: [polyline]
                    });
                    break;
                case actionConstants.EXECUTE_POLYGON_FROM_WKT:
                    var wkt = action.wkt;
                    var polygon = GeoUtil.convertWKTtoPolygon(wkt);
                    that.setState({
                       direction: null,
                       polygons: [polygon],
                       markers: [] 
                    });
                default:
                    return true;
            }
        });
        
    },
    
    render : function() {
        console.log("rendering map");
        console.log(this.state.polylines);
        return (
            <div className="mapsWrapper">
                <GoogleMaps 
                    richMarkers={this.state.markers} 
                    polygons={this.state.polygons} 
                    polylines={this.state.polylines}
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