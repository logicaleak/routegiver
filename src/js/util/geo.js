
function convertPolylineToLineStringWKT(polyline) {
    var wkt = "SRID=4326;LINESTRING(";
    var counter = 0;
    var pointCount = polyline.path.length;
    polyline.path.forEach(function(point) {
        if (counter == pointCount - 1) {
            wkt = wkt + point.lat.toString() + " " + point.lng.toString() + ")";
        } else {
            wkt = wkt + point.lat.toString() + " " + point.lng.toString() + ",";    
        }
        counter += 1;
    });
    return wkt;
}

function convertWKTtoPolyline(wkt) {
    var regExp = /\(([^)]+)\)/;
    var matches = regExp.exec(wkt);
    var coordinates = matches[1];
    var coordinatePairs = coordinates.split(",");
    var polyline = {};
    polyline.path = [];
    coordinatePairs.forEach(function(pair) {
        var lat_lng = pair.split(" ");
        var lat = lat_lng[0];
        var lng = lat_lng[1];
        polyline.path.push({
            lat: parseFloat(lat),
            lng: parseFloat(lng)
        });
    });
    return polyline;
}

function convertWKTtoPolygon(wkt) {
    var regExp = /\(\(([^)]+)\)\)/;
    var matches = regExp.exec(wkt);
    var coordinates = matches[1];
    var coordinatePairs = coordinates.split(",");
    
    //Settings should not be here but whatever for now
    var polygon = {
        coordinates : [],
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35    
    }
    coordinatePairs.forEach(function(pair) {
        var lat_lng = pair.split(" ");
        var lat = lat_lng[0];
        var lng = lat_lng[1];
        polygon.coordinates.push({
            lat: parseFloat(lat),
            lng: parseFloat(lng)
        });
    });
    
    return polygon;
}

module.exports = {
    convertPolylineToLineStringWKT: convertPolylineToLineStringWKT,
    convertWKTtoPolyline: convertWKTtoPolyline,
    convertWKTtoPolygon: convertWKTtoPolygon
}