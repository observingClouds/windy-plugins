"use strict";

/**
 * This is main plugin loading function
 * Feel free to write your own compiler
 */
W.loadPlugin(
/* Mounting options */
{
  "name": "windy-plugin-examples",
  "version": "0.4.0",
  "author": "Windyty, S.E.",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/windycom/windy-plugins"
  },
  "description": "Windy plugin system enables anyone, with basic knowledge of Javascript to enhance Windy with new functionality (default desc).",
  "displayName": "Multiple formats",
  "hook": "menu",
  "className": "plugin-rhpane plugin-mobile-rhpane",
  "exclusive": "rhpane",
  "dependencies": ["https://cdnjs.cloudflare.com/ajax/libs/leaflet-omnivore/0.3.4/leaflet-omnivore.min.js"]
},
/* HTML */
'<div class="plugin-content"> Using excellent <b>Leaflet Omnivore</b> we can display whichever format we want. <ul data-ref="links"></ul> </div>',
/* CSS */
'.onwindy-plugin-examples .right-border{right:180px}@media screen and (max-device-width:1024px){.onwindy-plugin-examples #search,.onwindy-plugin-examples #detail,.onwindy-plugin-examples #user,.onwindy-plugin-examples #logo-wrapper,.onwindy-plugin-examples #login,.onwindy-plugin-examples #plugin-picker,.onwindy-plugin-examples #open-in-app,.onwindy-plugin-examples #bottom{display:none !important}}#windy-plugin-examples{width:180px;z-index:10}#windy-plugin-examples .closing-x{left:initial;font-size:30px;z-index:10;top:0}#windy-plugin-examples .plugin-content{padding:15px 10px;color:white;font-size:12px;line-height:1.6;background-color:#343d4f}#windy-plugin-examples .plugin-content ul{margin:10px 0}#windy-plugin-examples .plugin-content ul li{text-decoration:underline}#windy-plugin-examples .plugin-content small{display:block}',
/* Constructor */
function () {
  var _this = this;

  var map = W.require('map');

  var layer = null;
  var formats = 'csv,gpx,kml,polyline,topojson,wkt'.split(',');
  formats.forEach(function (f) {
    var el = document.createElement('li');
    el.className = 'clickable-size';
    el.onclick = loadFile.bind(_this, f);
    el.textContent = "Display ".concat(f.toUpperCase());

    _this.refs.links.appendChild(el);
  });

  this.onclose = function () {
    return removeFile();
  };

  function loadFile(f) {
    removeFile();
    var url = "https://gist.githubusercontent.com/observingClouds/0b7aae90f77e7906346344aa1fb7d070/raw/149eac5934a75573dda58c4a3ca3fea9f17dea0c/a.kml";
    console.log('Loading:', url);
    layer = omnivore[f](url).addTo(map);

    switch (f) {
      case 'wkt':
        map.setView([26, 26], 4);
        break;

      case 'csv':
        map.setView([50, 14], 4);
        break;

      case 'gpx':
        map.setView([44.9, 6.05], 11);
        break;

      case 'kml':
        map.setView([11, -52], 7);
        break;

      case 'polyline':
        map.setView([40, -121], 6);
        break;

      case 'topojson':
        map.setView([51, 52], 3);
        break;
    }
  }

  var removeFile = function removeFile() {
    if (layer) {
      map.removeLayer(layer);
      layer = null;
    }
  };
});