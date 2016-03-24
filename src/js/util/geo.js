
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

module.exports = {
    convertPolylineToLineStringWKT: convertPolylineToLineStringWKT,
    convertWKTtoPolyline: convertWKTtoPolyline
}