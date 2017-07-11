// take parameters from url and add them to object
var wwwMap = {};
wwwMap.params = {};
window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
    'use strict';
    wwwMap.params[key] = decodeURIComponent(value);
});
