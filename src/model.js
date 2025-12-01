var mainUrl = "http://192.168.1.118:8001";

if (process.env.NODE_ENV === 'development') {
  mainUrl = "http://localhost:8001";
}

var logoUrl = 'https://amsenterprise.jiobp.com:8001/images/jio.png';

// var logoUrl = 'http://localhost:3000/images/jio.png';

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