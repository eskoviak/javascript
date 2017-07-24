function toRad(x){
	return x * Math.PI / 180;
}

var lat1 = 39.7684,
    lat2 = 42.35281,
    long1 = -86.1581,
    long2 = -71.0552,
    R = 6.371e3;

var phi1 = toRad(lat1),
    phi2 = toRad(lat2),
    delphi = toRad(lat2 - lat1),
    dellambda = toRad(long2 - long1);

var a  = Math.sin(delphi/2) * Math.sin(delphi/2) +
         Math.cos(phi1) * Math.cos(phi2) *
         Math.sin(dellambda/2) * Math.sin(dellambda/2);

var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

console.log(R * c);