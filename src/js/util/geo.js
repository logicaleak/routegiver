
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

module.exports = {
    convertPolylineToLineStringWKT: convertPolylineToLineStringWKT
}