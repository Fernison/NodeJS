/*
Proj4js (http://proj4js.org/)
JavaScript library to transform coordinates from one coordinate system to another, including datum transformations
*/

const proj4=require('proj4');

// CRTM05
var firstProjection = '+proj=tmerc +lat_0=0 +lon_0=-84 +k=0.9999 +x_0=500000 +y_0=0 +ellps=WGS84 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs"';
// WGS84
var secondProjection = "+title=WGS 84 (long/lat) +proj=longlat +ellps=WGS84 +datum=WGS84 +units=degrees";

// Conversion de CRTM05 a WGS84 (compatible con Google Maps) //
var conv=proj4(firstProjection,secondProjection,[401516.953,1146641.636]);

console.log(conv);
// [ -84.89933226210813, 10.368526503153142 ]

// Para probarlo con Google Maps //
// https://www.google.com/maps/search/?api=1&query=10.368526503153142,-84.89933226210813
