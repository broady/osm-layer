/**
 * A base layer using OSM tiles.
 *
 * Tiles graciously provided by OSM (tile.openstreetmap.org)
 *
 * To use this layer, you must provide attribution to OSM. See:
 * http://wiki.openstreetmap.org/wiki/Tile_usage_policy
 * http://wiki.openstreetmap.org/wiki/Legal_FAQ#I_would_like_to_use_OpenStreetMap_maps._How_should_I_credit_you.3F
 *
 * You can do this by creating a new OSMBase.Attribution like this:
 * new OSMBase.Attribution(map)
 * The attribution will be shown in the bottom right of the map when the OSM
 * layer is activated.
 */
function OSMBase() {
  var mapType = new google.maps.ImageMapType(this);
  mapType.showOSMAttribution = true;
  return mapType;
}

OSMBase.prototype.tileSize = new google.maps.Size(256, 256);

OSMBase.prototype.alt = 'Open Street Map';

OSMBase.prototype.name = 'OSM Base';

OSMBase.prototype.servers_ = ['a', 'b', 'c'];

OSMBase.prototype.getTileUrl = function(coord, zoom) {
  var numTiles = 1 << zoom;
  var x = coord.x % numTiles;
  x = x >= 0 ? x : x + numTiles;

  var y = coord.y;
  if (y < 0 || y >= numTiles) {
    return null;
  }

  var server = this.servers_[(49 * x + y) % this.servers_.length];
  return 'http://' + server + '.tile.openstreetmap.org/' + zoom + '/' + x + '/' + y + '.png'
};

OSMBase.prototype.minZoom = 0;

OSMBase.prototype.maxZoom = 18;

OSMBase.Attribution = function(map) {
  var el = document.createElement('div');
  var style = el.style;
  style.display = 'none';
  style.fontFamily = 'sans-serif';
  style.fontSize = '12px';

  el.innerHTML = '&copy; OpenStreetMap contributors, CC-BY-SA'

  map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(el);

  google.maps.event.addListener(map, 'maptypeid_changed', function() {
    var show = map.mapTypes.get(map.getMapTypeId()).showOSMAttribution;
    style.display = show ? '' : 'none';
  });
};
