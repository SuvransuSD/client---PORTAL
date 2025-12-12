var mainUrl = "http://45.120.138.103:8001";

if (process.env.NODE_ENV === 'development') {
  mainUrl = "http://45.120.138.103:8001";
}

var logoUrl = 'http://45.120.138.103:8001/images/jio.png';

// var logoUrl = 'http://45.120.138.103:3000/images/jio.png';

//var dataRole = sessionStorage.getItem("role");
var dataUserId = sessionStorage.getItem("userId");
//var role = JSON.parse(dataRole);
var userId = JSON.parse(dataUserId);
//console.log(role);
module.exports = {
  //role: role,
  mainUrl: mainUrl,
  userId: userId,
  logoUrl: logoUrl
};