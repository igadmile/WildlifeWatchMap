// take parameters from url and add them to object
var wwwMap ={};
wwwMap.params = {};
window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
    wwwMap.params[key] = decodeURIComponent(value);
});