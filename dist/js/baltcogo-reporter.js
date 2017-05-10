!function(e,t){"object"==typeof exports?module.exports=t(require("angular")):"function"==typeof define&&define.amd?define(["angular"],t):t(e.angular)}(this,function(angular){/**
 * AngularJS Google Maps Ver. 1.18.3
 *
 * The MIT License (MIT)
 * 
 * Copyright (c) 2014, 2015, 1016 Allen Kim
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 * the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
return angular.module("ngMap",[]),function(){"use strict";var e,t=function(t,n,o,a,r,i,s,p,c){e=i;var u=this,l=r.startSymbol(),g=r.endSymbol();u.mapOptions,u.mapEvents,u.eventListeners,u.addObject=function(e,t){if(u.map){u.map[e]=u.map[e]||{};var n=Object.keys(u.map[e]).length;u.map[e][t.id||n]=t,u.map instanceof google.maps.Map&&("infoWindows"!=e&&t.setMap&&t.setMap&&t.setMap(u.map),t.centered&&t.position&&u.map.setCenter(t.position),"markers"==e&&u.objectChanged("markers"),"customMarkers"==e&&u.objectChanged("customMarkers"))}},u.deleteObject=function(e,t){if(t.map){var n=t.map[e];for(var o in n)n[o]===t&&(google.maps.event.clearInstanceListeners(t),delete n[o]);t.map&&t.setMap&&t.setMap(null),"markers"==e&&u.objectChanged("markers"),"customMarkers"==e&&u.objectChanged("customMarkers")}},u.observeAttrSetObj=function(t,n,o){if(n.noWatcher)return!1;for(var a=e.getAttrsToObserve(t),r=0;r<a.length;r++){var i=a[r];n.$observe(i,s.observeAndSet(i,o))}},u.zoomToIncludeMarkers=function(){if(null!=u.map.markers&&Object.keys(u.map.markers).length>0||null!=u.map.customMarkers&&Object.keys(u.map.customMarkers).length>0){var e=new google.maps.LatLngBounds;for(var t in u.map.markers)e.extend(u.map.markers[t].getPosition());for(var n in u.map.customMarkers)e.extend(u.map.customMarkers[n].getPosition());u.mapOptions.maximumZoom&&(u.enableMaximumZoomCheck=!0),u.map.fitBounds(e)}},u.objectChanged=function(e){!u.map||"markers"!=e&&"customMarkers"!=e||"auto"!=u.map.zoomToIncludeMarkers||u.zoomToIncludeMarkers()},u.initializeMap=function(){var r=u.mapOptions,i=u.mapEvents,m=u.map;if(u.map=p.getMapInstance(n[0]),s.setStyle(n[0]),m){var f=e.filter(o),v=e.getOptions(f),y=e.getControlOptions(f);r=angular.extend(v,y);for(var h in m){var b=m[h];if("object"==typeof b)for(var M in b)u.addObject(h,b[M])}u.map.showInfoWindow=u.showInfoWindow,u.map.hideInfoWindow=u.hideInfoWindow}r.zoom=r.zoom||15;var O=r.center,w=new RegExp(c(l)+".*"+c(g));if(!r.center||"string"==typeof O&&O.match(w))r.center=new google.maps.LatLng(0,0);else if("string"==typeof O&&O.match(/^[0-9.-]*,[0-9.-]*$/)){var L=parseFloat(O.split(",")[0]),k=parseFloat(O.split(",")[1]);r.center=new google.maps.LatLng(L,k)}else if(!(O instanceof google.maps.LatLng)){var $=r.center;delete r.center,s.getGeoLocation($,r.geoLocationOptions).then(function(e){u.map.setCenter(e);var n=r.geoCallback;n&&a(n)(t)},function(){r.geoFallbackCenter&&u.map.setCenter(r.geoFallbackCenter)})}u.map.setOptions(r);for(var C in i){var j=i[C],A=google.maps.event.addListener(u.map,C,j);u.eventListeners[C]=A}u.observeAttrSetObj(d,o,u.map),u.singleInfoWindow=r.singleInfoWindow,google.maps.event.trigger(u.map,"resize"),google.maps.event.addListenerOnce(u.map,"idle",function(){s.addMap(u),r.zoomToIncludeMarkers&&u.zoomToIncludeMarkers(),t.map=u.map,t.$emit("mapInitialized",u.map),o.mapInitialized&&a(o.mapInitialized)(t,{map:u.map})}),r.zoomToIncludeMarkers&&r.maximumZoom&&google.maps.event.addListener(u.map,"zoom_changed",function(){1==u.enableMaximumZoomCheck&&(u.enableMaximumZoomCheck=!1,google.maps.event.addListenerOnce(u.map,"bounds_changed",function(){u.map.setZoom(Math.min(r.maximumZoom,u.map.getZoom()))}))})},t.google=google;var d=e.orgAttributes(n),m=e.filter(o),f=e.getOptions(m,{scope:t}),v=e.getControlOptions(m),y=angular.extend(f,v),h=e.getEvents(t,m);if(Object.keys(h).length&&void 0,u.mapOptions=y,u.mapEvents=h,u.eventListeners={},f.lazyInit){if(o.id&&0===o.id.indexOf(l,0)&&-1!==o.id.indexOf(g,o.id.length-g.length))var b=o.id.slice(2,-2),M=a(b)(t);else var M=o.id;u.map={id:M},s.addMap(u)}else u.initializeMap();f.triggerResize&&google.maps.event.trigger(u.map,"resize"),n.bind("$destroy",function(){p.returnMapInstance(u.map),s.deleteMap(u)})};t.$inject=["$scope","$element","$attrs","$parse","$interpolate","Attr2MapOptions","NgMap","NgMapPool","escapeRegexpFilter"],angular.module("ngMap").controller("__MapController",t)}(),function(){"use strict";var e,t=function(t,o,a,r){r=r[0]||r[1];var i=e.orgAttributes(o),s=e.filter(a),p=e.getOptions(s,{scope:t}),c=e.getEvents(t,s),u=n(p,c);r.addObject("bicyclingLayers",u),r.observeAttrSetObj(i,a,u),o.bind("$destroy",function(){r.deleteObject("bicyclingLayers",u)})},n=function(e,t){var n=new google.maps.BicyclingLayer(e);for(var o in t)google.maps.event.addListener(n,o,t[o]);return n},o=function(n){return e=n,{restrict:"E",require:["?^map","?^ngMap"],link:t}};o.$inject=["Attr2MapOptions"],angular.module("ngMap").directive("bicyclingLayer",o)}(),function(){"use strict";var e,t,n=function(t,n,o,a,r){a=a[0]||a[1];var i=e.filter(o),s=e.getOptions(i,{scope:t}),p=e.getEvents(t,i),c=n[0].parentElement.removeChild(n[0]),u=r();angular.element(c).append(u);for(var l in p)google.maps.event.addDomListener(c,l,p[l]);a.addObject("customControls",c);var g=s.position;a.map.controls[google.maps.ControlPosition[g]].push(c),n.bind("$destroy",function(){a.deleteObject("customControls",c)})},o=function(o,a){return e=o,t=a,{restrict:"E",require:["?^map","?^ngMap"],link:n,transclude:!0}};o.$inject=["Attr2MapOptions","NgMap"],angular.module("ngMap").directive("customControl",o)}(),function(){"use strict";var e,t,n,o,a=function(e){e=e||{},this.el=document.createElement("div"),this.el.style.display="inline-block",this.el.style.visibility="hidden",this.visible=!0;for(var t in e)this[t]=e[t]},r=function(){a.prototype=new google.maps.OverlayView,a.prototype.setContent=function(e,t){this.el.innerHTML=e,this.el.style.position="absolute",t&&n(angular.element(this.el).contents())(t)},a.prototype.getDraggable=function(){return this.draggable},a.prototype.setDraggable=function(e){this.draggable=e},a.prototype.getPosition=function(){return this.position},a.prototype.setPosition=function(e){e&&(this.position=e);var n=this;if(this.getProjection()&&"function"==typeof this.position.lng){var o=function(){if(n.getProjection()){var e=n.getProjection().fromLatLngToDivPixel(n.position),t=Math.round(e.x-n.el.offsetWidth/2),o=Math.round(e.y-n.el.offsetHeight-10);n.el.style.left=t+"px",n.el.style.top=o+"px",n.el.style.visibility="visible"}};n.el.offsetWidth&&n.el.offsetHeight?o():t(o,300)}},a.prototype.setZIndex=function(e){e&&(this.zIndex=e),this.el.style.zIndex=this.zIndex},a.prototype.getVisible=function(){return this.visible},a.prototype.setVisible=function(e){this.el.style.display=e?"inline-block":"none",this.visible=e},a.prototype.addClass=function(e){var t=this.el.className.trim().split(" ");-1==t.indexOf(e)&&t.push(e),this.el.className=t.join(" ")},a.prototype.removeClass=function(e){var t=this.el.className.split(" "),n=t.indexOf(e);n>-1&&t.splice(n,1),this.el.className=t.join(" ")},a.prototype.onAdd=function(){this.getPanes().overlayMouseTarget.appendChild(this.el)},a.prototype.draw=function(){this.setPosition(),this.setZIndex(this.zIndex),this.setVisible(this.visible)},a.prototype.onRemove=function(){this.el.parentNode.removeChild(this.el)}},i=function(n,r){return function(i,s,p,c){c=c[0]||c[1];var u=e.orgAttributes(s),l=e.filter(p),g=e.getOptions(l,{scope:i}),d=e.getEvents(i,l);s[0].style.display="none";var m=new a(g);t(function(){i.$watch("["+r.join(",")+"]",function(){m.setContent(n,i)},!0),m.setContent(s[0].innerHTML,i);var e=s[0].firstElementChild.className;m.addClass("custom-marker"),m.addClass(e),g.position instanceof google.maps.LatLng||o.getGeoLocation(g.position).then(function(e){m.setPosition(e)})});for(var f in d)google.maps.event.addDomListener(m.el,f,d[f]);c.addObject("customMarkers",m),c.observeAttrSetObj(u,p,m),s.bind("$destroy",function(){c.deleteObject("customMarkers",m)})}},s=function(a,s,p,c,u,l){e=c,t=a,n=s,o=u;var g=p.startSymbol(),d=p.endSymbol(),m=new RegExp(l(g)+"([^"+d.substring(0,1)+"]+)"+l(d),"g");return{restrict:"E",require:["?^map","?^ngMap"],compile:function(e){r(),e[0].style.display="none";var t=e.html(),n=t.match(m),o=[];return(n||[]).forEach(function(e){var t=e.replace(g,"").replace(d,"");-1==e.indexOf("::")&&-1==e.indexOf("this.")&&-1==o.indexOf(t)&&o.push(e.replace(g,"").replace(d,""))}),i(t,o)}}};s.$inject=["$timeout","$compile","$interpolate","Attr2MapOptions","NgMap","escapeRegexpFilter"],angular.module("ngMap").directive("customMarker",s)}(),function(){"use strict";var e,t,n,o=function(e,t){e.panel&&(e.panel=document.getElementById(e.panel)||document.querySelector(e.panel));var n=new google.maps.DirectionsRenderer(e);for(var o in t)google.maps.event.addListener(n,o,t[o]);return n},a=function(e,o){var a=new google.maps.DirectionsService,r=o;r.travelMode=r.travelMode||"DRIVING";var i=["origin","destination","travelMode","transitOptions","unitSystem","durationInTraffic","waypoints","optimizeWaypoints","provideRouteAlternatives","avoidHighways","avoidTolls","region"];for(var s in r)-1===i.indexOf(s)&&delete r[s];r.waypoints&&("[]"==r.waypoints||""===r.waypoints)&&delete r.waypoints;var p=function(n){a.route(n,function(n,o){o==google.maps.DirectionsStatus.OK&&t(function(){e.setDirections(n)})})};r.origin&&r.destination&&("current-location"==r.origin?n.getCurrentPosition().then(function(e){r.origin=new google.maps.LatLng(e.coords.latitude,e.coords.longitude),p(r)}):"current-location"==r.destination?n.getCurrentPosition().then(function(e){r.destination=new google.maps.LatLng(e.coords.latitude,e.coords.longitude),p(r)}):p(r))},r=function(r,i,s,p){var c=r;e=p,t=i,n=s;var u=function(n,r,i,s){s=s[0]||s[1];var p=c.orgAttributes(r),u=c.filter(i),l=c.getOptions(u,{scope:n}),g=c.getEvents(n,u),d=c.getAttrsToObserve(p),m=o(l,g);s.addObject("directionsRenderers",m),d.forEach(function(e){!function(e){i.$observe(e,function(n){if("panel"==e)t(function(){var e=document.getElementById(n)||document.querySelector(n);e&&m.setPanel(e)});else if(l[e]!==n){var o=c.toOptionValue(n,{key:e});l[e]=o,a(m,l)}})}(e)}),e.getMap().then(function(){a(m,l)}),r.bind("$destroy",function(){s.deleteObject("directionsRenderers",m)})};return{restrict:"E",require:["?^map","?^ngMap"],link:u}};r.$inject=["Attr2MapOptions","$timeout","NavigatorGeolocation","NgMap"],angular.module("ngMap").directive("directions",r)}(),function(){"use strict";angular.module("ngMap").directive("drawingManager",["Attr2MapOptions",function(e){var t=e;return{restrict:"E",require:["?^map","?^ngMap"],link:function(e,n,o,a){a=a[0]||a[1];var r=t.filter(o),i=t.getOptions(r,{scope:e}),s=t.getControlOptions(r),p=t.getEvents(e,r),c=new google.maps.drawing.DrawingManager({drawingMode:i.drawingmode,drawingControl:i.drawingcontrol,drawingControlOptions:s.drawingControlOptions,circleOptions:i.circleoptions,markerOptions:i.markeroptions,polygonOptions:i.polygonoptions,polylineOptions:i.polylineoptions,rectangleOptions:i.rectangleoptions});o.$observe("drawingControlOptions",function(e){c.drawingControlOptions=t.getControlOptions({drawingControlOptions:e}).drawingControlOptions,c.setDrawingMode(null),c.setMap(a.map)});for(var u in p)google.maps.event.addListener(c,u,p[u]);a.addObject("mapDrawingManager",c),n.bind("$destroy",function(){a.deleteObject("mapDrawingManager",c)})}}}])}(),function(){"use strict";angular.module("ngMap").directive("dynamicMapsEngineLayer",["Attr2MapOptions",function(e){var t=e,n=function(e,t){var n=new google.maps.visualization.DynamicMapsEngineLayer(e);for(var o in t)google.maps.event.addListener(n,o,t[o]);return n};return{restrict:"E",require:["?^map","?^ngMap"],link:function(e,o,a,r){r=r[0]||r[1];var i=t.filter(a),s=t.getOptions(i,{scope:e}),p=t.getEvents(e,i,p),c=n(s,p);r.addObject("mapsEngineLayers",c)}}}])}(),function(){"use strict";angular.module("ngMap").directive("fusionTablesLayer",["Attr2MapOptions",function(e){var t=e,n=function(e,t){var n=new google.maps.FusionTablesLayer(e);for(var o in t)google.maps.event.addListener(n,o,t[o]);return n};return{restrict:"E",require:["?^map","?^ngMap"],link:function(e,o,a,r){r=r[0]||r[1];var i=t.filter(a),s=t.getOptions(i,{scope:e}),p=t.getEvents(e,i,p),c=n(s,p);r.addObject("fusionTablesLayers",c),o.bind("$destroy",function(){r.deleteObject("fusionTablesLayers",c)})}}}])}(),function(){"use strict";angular.module("ngMap").directive("heatmapLayer",["Attr2MapOptions","$window",function(e,t){var n=e;return{restrict:"E",require:["?^map","?^ngMap"],link:function(e,o,a,r){r=r[0]||r[1];var i=n.filter(a),s=n.getOptions(i,{scope:e});if(s.data=t[a.data]||e[a.data],!(s.data instanceof Array))throw"invalid heatmap data";s.data=new google.maps.MVCArray(s.data);{var p=new google.maps.visualization.HeatmapLayer(s);n.getEvents(e,i)}r.addObject("heatmapLayers",p)}}}])}(),function(){"use strict";var e=function(e,t,n,o,a,r,i){var s=e,p=function(e,r,i){var s;!e.position||e.position instanceof google.maps.LatLng||delete e.position,s=new google.maps.InfoWindow(e);for(var p in r)p&&google.maps.event.addListener(s,p,r[p]);var c=n(function(e){angular.isString(i)?o(i).then(function(t){e(angular.element(t).wrap("<div>").parent())},function(e){throw"info-window template request failed: "+e}):e(i)}).then(function(e){var t=e.html().trim();if(1!=angular.element(t).length)throw"info-window working as a template must have a container";s.__template=t.replace(/\s?ng-non-bindable[='"]+/,"")});return s.__open=function(e,n,o){c.then(function(){a(function(){o&&(n.anchor=o);var a=t(s.__template)(n);s.setContent(a[0]),n.$apply(),o&&o.getPosition?s.open(e,o):o&&o instanceof google.maps.LatLng?(s.open(e),s.setPosition(o)):s.open(e);var r=s.content.parentElement.parentElement.parentElement;r.className="ng-map-info-window"})})},s},c=function(e,t,n,o){o=o[0]||o[1],t.css("display","none");var a,c=s.orgAttributes(t),u=s.filter(n),l=s.getOptions(u,{scope:e}),g=s.getEvents(e,u),d=p(l,g,l.template||t);!l.position||l.position instanceof google.maps.LatLng||(a=l.position),a&&i.getGeoLocation(a).then(function(t){d.setPosition(t),d.__open(o.map,e,t);var a=n.geoCallback;a&&r(a)(e)}),o.addObject("infoWindows",d),o.observeAttrSetObj(c,n,d),o.showInfoWindow=o.map.showInfoWindow=o.showInfoWindow||function(t,n,a){var r="string"==typeof t?t:n,i="string"==typeof t?n:a;if("string"==typeof i)if("undefined"!=typeof o.map.markers&&"undefined"!=typeof o.map.markers[i])i=o.map.markers[i];else{if("undefined"==typeof o.map.customMarkers||"undefined"==typeof o.map.customMarkers[i])throw new Error("Cant open info window for id "+i+". Marker or CustomMarker is not defined");i=o.map.customMarkers[i]}var s=o.map.infoWindows[r],p=i?i:this.getPosition?this:null;s.__open(o.map,e,p),o.singleInfoWindow&&(o.lastInfoWindow&&e.hideInfoWindow(o.lastInfoWindow),o.lastInfoWindow=r)},o.hideInfoWindow=o.map.hideInfoWindow=o.hideInfoWindow||function(e,t){var n="string"==typeof e?e:t,a=o.map.infoWindows[n];a.close()},e.showInfoWindow=o.map.showInfoWindow,e.hideInfoWindow=o.map.hideInfoWindow;var m=d.mapId?{id:d.mapId}:0;i.getMap(m).then(function(t){if(d.visible&&d.__open(t,e),d.visibleOnMarker){var n=d.visibleOnMarker;d.__open(t,e,t.markers[n])}})};return{restrict:"E",require:["?^map","?^ngMap"],link:c}};e.$inject=["Attr2MapOptions","$compile","$q","$templateRequest","$timeout","$parse","NgMap"],angular.module("ngMap").directive("infoWindow",e)}(),function(){"use strict";angular.module("ngMap").directive("kmlLayer",["Attr2MapOptions",function(e){var t=e,n=function(e,t){var n=new google.maps.KmlLayer(e);for(var o in t)google.maps.event.addListener(n,o,t[o]);return n};return{restrict:"E",require:["?^map","?^ngMap"],link:function(e,o,a,r){r=r[0]||r[1];var i=t.orgAttributes(o),s=t.filter(a),p=t.getOptions(s,{scope:e}),c=t.getEvents(e,s),u=n(p,c);r.addObject("kmlLayers",u),r.observeAttrSetObj(i,a,u),o.bind("$destroy",function(){r.deleteObject("kmlLayers",u)})}}}])}(),function(){"use strict";angular.module("ngMap").directive("mapData",["Attr2MapOptions","NgMap",function(e,t){var n=e;return{restrict:"E",require:["?^map","?^ngMap"],link:function(e,o,a,r){r=r[0]||r[1];var i=n.filter(a),s=n.getOptions(i,{scope:e}),p=n.getEvents(e,i,p);t.getMap(r.map.id).then(function(t){for(var n in s){var o=s[n];"function"==typeof e[o]?t.data[n](e[o]):t.data[n](o)}for(var a in p)t.data.addListener(a,p[a])})}}}])}(),function(){"use strict";var e,t,n,o=[],a=[],r=function(n,r,i){var s=i.mapLazyLoadParams||i.mapLazyLoad;if(void 0===window.google||void 0===window.google.maps){a.push({scope:n,element:r,savedHtml:o[a.length]}),window.lazyLoadCallback=function(){e(function(){a.forEach(function(e){e.element.html(e.savedHtml),t(e.element.contents())(e.scope)})},100)};var p=document.createElement("script");p.src=s+(s.indexOf("?")>-1?"&":"?")+"callback=lazyLoadCallback",document.querySelector('script[src="'+p.src+'"]')||document.body.appendChild(p)}else r.html(o),t(r.contents())(n)},i=function(e,t){return!t.mapLazyLoad&&void 0,o.push(e.html()),n=t.mapLazyLoad,void 0!==window.google&&void 0!==window.google.maps?!1:(e.html(""),{pre:r})},s=function(n,o){return t=n,e=o,{compile:i}};s.$inject=["$compile","$timeout"],angular.module("ngMap").directive("mapLazyLoad",s)}(),function(){"use strict";angular.module("ngMap").directive("mapType",["$parse","NgMap",function(e,t){return{restrict:"E",require:["?^map","?^ngMap"],link:function(n,o,a,r){r=r[0]||r[1];var i,s=a.name;if(!s)throw"invalid map-type name";if(i=e(a.object)(n),!i)throw"invalid map-type object";t.getMap().then(function(e){e.mapTypes.set(s,i)}),r.addObject("mapTypes",i)}}}])}(),function(){"use strict";var e=function(){return{restrict:"AE",controller:"__MapController",controllerAs:"ngmap"}};angular.module("ngMap").directive("map",[e]),angular.module("ngMap").directive("ngMap",[e])}(),function(){"use strict";angular.module("ngMap").directive("mapsEngineLayer",["Attr2MapOptions",function(e){var t=e,n=function(e,t){var n=new google.maps.visualization.MapsEngineLayer(e);for(var o in t)google.maps.event.addListener(n,o,t[o]);return n};return{restrict:"E",require:["?^map","?^ngMap"],link:function(e,o,a,r){r=r[0]||r[1];var i=t.filter(a),s=t.getOptions(i,{scope:e}),p=t.getEvents(e,i,p),c=n(s,p);r.addObject("mapsEngineLayers",c)}}}])}(),function(){"use strict";var e,t,n,o=function(e,t){var o;if(n.defaultOptions.marker)for(var a in n.defaultOptions.marker)"undefined"==typeof e[a]&&(e[a]=n.defaultOptions.marker[a]);e.position instanceof google.maps.LatLng||(e.position=new google.maps.LatLng(0,0)),o=new google.maps.Marker(e),Object.keys(t).length>0;for(var r in t)r&&google.maps.event.addListener(o,r,t[r]);return o},a=function(a,r,i,s){s=s[0]||s[1];var p,c=e.orgAttributes(r),u=e.filter(i),l=e.getOptions(u,a,{scope:a}),g=e.getEvents(a,u);l.position instanceof google.maps.LatLng||(p=l.position);var d=o(l,g);s.addObject("markers",d),p&&n.getGeoLocation(p).then(function(e){d.setPosition(e),l.centered&&d.map.setCenter(e);var n=i.geoCallback;n&&t(n)(a)}),s.observeAttrSetObj(c,i,d),r.bind("$destroy",function(){s.deleteObject("markers",d)})},r=function(o,r,i){return e=o,t=r,n=i,{restrict:"E",require:["^?map","?^ngMap"],link:a}};r.$inject=["Attr2MapOptions","$parse","NgMap"],angular.module("ngMap").directive("marker",r)}(),function(){"use strict";angular.module("ngMap").directive("overlayMapType",["NgMap",function(e){return{restrict:"E",require:["?^map","?^ngMap"],link:function(t,n,o,a){a=a[0]||a[1];var r=o.initMethod||"insertAt",i=t[o.object];e.getMap().then(function(e){if("insertAt"==r){var t=parseInt(o.index,10);e.overlayMapTypes.insertAt(t,i)}else"push"==r&&e.overlayMapTypes.push(i)}),a.addObject("overlayMapTypes",i)}}}])}(),function(){"use strict";var e=function(e,t){var n=e,o=function(e,o,a,r){if("false"===a.placesAutoComplete)return!1;var i=n.filter(a),s=n.getOptions(i,{scope:e}),p=n.getEvents(e,i),c=new google.maps.places.Autocomplete(o[0],s);for(var u in p)google.maps.event.addListener(c,u,p[u]);var l=function(){t(function(){r&&r.$setViewValue(o.val())},100)};google.maps.event.addListener(c,"place_changed",l),o[0].addEventListener("change",l),a.$observe("types",function(e){if(e){var t=n.toOptionValue(e,{key:"types"});c.setTypes(t)}}),a.$observe("componentRestrictions",function(t){t&&c.setComponentRestrictions(e.$eval(t))})};return{restrict:"A",require:"?ngModel",link:o}};e.$inject=["Attr2MapOptions","$timeout"],angular.module("ngMap").directive("placesAutoComplete",e)}(),function(){"use strict";var e=function(e,t){var n,o=e.name;switch(delete e.name,o){case"circle":e.center instanceof google.maps.LatLng||(e.center=new google.maps.LatLng(0,0)),n=new google.maps.Circle(e);break;case"polygon":n=new google.maps.Polygon(e);break;case"polyline":n=new google.maps.Polyline(e);break;case"rectangle":n=new google.maps.Rectangle(e);break;case"groundOverlay":case"image":var a=e.url,r={opacity:e.opacity,clickable:e.clickable,id:e.id};n=new google.maps.GroundOverlay(a,e.bounds,r)}for(var i in t)t[i]&&google.maps.event.addListener(n,i,t[i]);return n},t=function(t,n,o){var a=t,r=function(t,r,i,s){s=s[0]||s[1];var p,c,u=a.orgAttributes(r),l=a.filter(i),g=a.getOptions(l,{scope:t}),d=a.getEvents(t,l);c=g.name,g.center instanceof google.maps.LatLng||(p=g.center);var m=e(g,d);s.addObject("shapes",m),p&&"circle"==c&&o.getGeoLocation(p).then(function(e){m.setCenter(e),m.centered&&m.map.setCenter(e);var o=i.geoCallback;o&&n(o)(t)}),s.observeAttrSetObj(u,i,m),r.bind("$destroy",function(){s.deleteObject("shapes",m)})};return{restrict:"E",require:["?^map","?^ngMap"],link:r}};t.$inject=["Attr2MapOptions","$parse","NgMap"],angular.module("ngMap").directive("shape",t)}(),function(){"use strict";var e=function(e,t){var n=e,o=function(e,t,n){var o,a;t.container&&(a=document.getElementById(t.container),a=a||document.querySelector(t.container)),a?o=new google.maps.StreetViewPanorama(a,t):(o=e.getStreetView(),o.setOptions(t));for(var r in n)r&&google.maps.event.addListener(o,r,n[r]);return o},a=function(e,a,r){var i=n.filter(r),s=n.getOptions(i,{scope:e}),p=n.getControlOptions(i),c=angular.extend(s,p),u=n.getEvents(e,i);t.getMap().then(function(e){var t=o(e,c,u);e.setStreetView(t),!t.getPosition()&&t.setPosition(e.getCenter()),google.maps.event.addListener(t,"position_changed",function(){t.getPosition()!==e.getCenter()&&e.setCenter(t.getPosition())});var n=google.maps.event.addListener(e,"center_changed",function(){t.setPosition(e.getCenter()),google.maps.event.removeListener(n)})})};return{restrict:"E",require:["?^map","?^ngMap"],link:a}};e.$inject=["Attr2MapOptions","NgMap"],angular.module("ngMap").directive("streetViewPanorama",e)}(),function(){"use strict";angular.module("ngMap").directive("trafficLayer",["Attr2MapOptions",function(e){var t=e,n=function(e,t){var n=new google.maps.TrafficLayer(e);for(var o in t)google.maps.event.addListener(n,o,t[o]);return n};return{restrict:"E",require:["?^map","?^ngMap"],link:function(e,o,a,r){r=r[0]||r[1];var i=t.orgAttributes(o),s=t.filter(a),p=t.getOptions(s,{scope:e}),c=t.getEvents(e,s),u=n(p,c);r.addObject("trafficLayers",u),r.observeAttrSetObj(i,a,u),o.bind("$destroy",function(){r.deleteObject("trafficLayers",u)})}}}])}(),function(){"use strict";angular.module("ngMap").directive("transitLayer",["Attr2MapOptions",function(e){var t=e,n=function(e,t){var n=new google.maps.TransitLayer(e);for(var o in t)google.maps.event.addListener(n,o,t[o]);return n};return{restrict:"E",require:["?^map","?^ngMap"],link:function(e,o,a,r){r=r[0]||r[1];var i=t.orgAttributes(o),s=t.filter(a),p=t.getOptions(s,{scope:e}),c=t.getEvents(e,s),u=n(p,c);r.addObject("transitLayers",u),r.observeAttrSetObj(i,a,u),o.bind("$destroy",function(){r.deleteObject("transitLayers",u)})}}}])}(),function(){"use strict";var e=/([\:\-\_]+(.))/g,t=/^moz([A-Z])/,n=function(){return function(n){return n.replace(e,function(e,t,n,o){return o?n.toUpperCase():n}).replace(t,"Moz$1")}};angular.module("ngMap").filter("camelCase",n)}(),function(){"use strict";var e=function(){return function(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}};angular.module("ngMap").filter("escapeRegexp",e)}(),function(){"use strict";var e=function(){return function(e){try{return JSON.parse(e),e}catch(t){return e.replace(/([\$\w]+)\s*:/g,function(e,t){return'"'+t+'":'}).replace(/'([^']+)'/g,function(e,t){return'"'+t+'"'}).replace(/''/g,'""')}}};angular.module("ngMap").filter("jsonize",e)}(),function(){"use strict";var isoDateRE=/^(\d{4}\-\d\d\-\d\d([tT][\d:\.]*)?)([zZ]|([+\-])(\d\d):?(\d\d))?$/,Attr2MapOptions=function($parse,$timeout,$log,$interpolate,NavigatorGeolocation,GeoCoder,camelCaseFilter,jsonizeFilter,escapeRegExp){var exprStartSymbol=$interpolate.startSymbol(),exprEndSymbol=$interpolate.endSymbol(),orgAttributes=function(e){e.length>0&&(e=e[0]);for(var t={},n=0;n<e.attributes.length;n++){var o=e.attributes[n];t[o.name]=o.value}return t},getJSON=function(e){var t=/^[\+\-]?[0-9\.]+,[ ]*\ ?[\+\-]?[0-9\.]+$/;return e.match(t)&&(e="["+e+"]"),JSON.parse(jsonizeFilter(e))},getLatLng=function(e){var t=e;if(e[0].constructor==Array)if(e[0][0].constructor==Array&&2==e[0][0].length||e[0][0].constructor==Object){for(var n,o=[],a=0;a<e.length;a++)n=e[a].map(function(e){return new google.maps.LatLng(e[0],e[1])}),o.push(n);t=o}else t=e.map(function(e){return new google.maps.LatLng(e[0],e[1])});else!isNaN(parseFloat(e[0]))&&isFinite(e[0])&&(t=new google.maps.LatLng(t[0],t[1]));return t},toOptionValue=function(input,options){var output;try{output=getNumber(input)}catch(err){try{var output=getJSON(input);if(output instanceof Array)output=output[0].constructor==Object?output:output[0]instanceof Array?output[0][0].constructor==Object?output:getLatLng(output):getLatLng(output);else if(output===Object(output)){var newOptions=options;newOptions.doNotConverStringToNumber=!0,output=getOptions(output,newOptions)}}catch(err2){if(input.match(/^[A-Z][a-zA-Z0-9]+\(.*\)$/))try{var exp="new google.maps."+input;output=eval(exp)}catch(e){output=input}else if(input.match(/^([A-Z][a-zA-Z0-9]+)\.([A-Z]+)$/))try{var matches=input.match(/^([A-Z][a-zA-Z0-9]+)\.([A-Z]+)$/);output=google.maps[matches[1]][matches[2]]}catch(e){output=input}else if(input.match(/^[A-Z]+$/))try{var capitalizedKey=options.key.charAt(0).toUpperCase()+options.key.slice(1);options.key.match(/temperatureUnit|windSpeedUnit|labelColor/)?(capitalizedKey=capitalizedKey.replace(/s$/,""),output=google.maps.weather[capitalizedKey][input]):output=google.maps[capitalizedKey][input]}catch(e){output=input}else if(input.match(isoDateRE))try{output=new Date(input)}catch(e){output=input}else if(input.match(new RegExp("^"+escapeRegExp(exprStartSymbol)))&&options.scope)try{var expr=input.replace(new RegExp(escapeRegExp(exprStartSymbol)),"").replace(new RegExp(escapeRegExp(exprEndSymbol),"g"),"");output=options.scope.$eval(expr)}catch(err){output=input}else output=input}}if(("center"==options.key||"position"==options.key)&&output instanceof Array&&(output=new google.maps.LatLng(output[0],output[1])),"bounds"==options.key&&output instanceof Array&&(output=new google.maps.LatLngBounds(output[0],output[1])),"icons"==options.key&&output instanceof Array)for(var i=0;i<output.length;i++){var el=output[i];el.icon.path.match(/^[A-Z_]+$/)&&(el.icon.path=google.maps.SymbolPath[el.icon.path])}if("icon"==options.key&&output instanceof Object){(""+output.path).match(/^[A-Z_]+$/)&&(output.path=google.maps.SymbolPath[output.path]);for(var key in output){var arr=output[key];"anchor"==key||"origin"==key||"labelOrigin"==key?output[key]=new google.maps.Point(arr[0],arr[1]):("size"==key||"scaledSize"==key)&&(output[key]=new google.maps.Size(arr[0],arr[1]))}}return output},getAttrsToObserve=function(e){var t=[],n=new RegExp(escapeRegExp(exprStartSymbol)+".*"+escapeRegExp(exprEndSymbol),"g");if(!e.noWatcher)for(var o in e){var a=e[o];a&&a.match(n)&&t.push(camelCaseFilter(o))}return t},filter=function(e){var t={};for(var n in e)n.match(/^\$/)||n.match(/^ng[A-Z]/)||(t[n]=e[n]);return t},getOptions=function(e,t){t=t||{};var n={};for(var o in e)if(e[o]||0===e[o]){if(o.match(/^on[A-Z]/))continue;if(o.match(/ControlOptions$/))continue;n[o]="string"!=typeof e[o]?e[o]:t.doNotConverStringToNumber&&e[o].match(/^[0-9]+$/)?e[o]:toOptionValue(e[o],{key:o,scope:t.scope})}return n},getEvents=function(e,t){var n={},o=function(e){return"_"+e.toLowerCase()},a=function(t){var n=t.match(/([^\(]+)\(([^\)]*)\)/),o=n[1],a=n[2].replace(/event[ ,]*/,""),r=$parse("["+a+"]");return function(t){function n(e,t){return e[t]}var a=r(e),i=o.split(".").reduce(n,e);i&&i.apply(this,[t].concat(a)),$timeout(function(){e.$apply()})}};for(var r in t)if(t[r]){if(!r.match(/^on[A-Z]/))continue;var i=r.replace(/^on/,"");i=i.charAt(0).toLowerCase()+i.slice(1),i=i.replace(/([A-Z])/g,o);var s=t[r];n[i]=new a(s)}return n},getControlOptions=function(e){var t={};if("object"!=typeof e)return!1;for(var n in e)if(e[n]){if(!n.match(/(.*)ControlOptions$/))continue;var o=e[n],a=o.replace(/'/g,'"');a=a.replace(/([^"]+)|("[^"]+")/g,function(e,t,n){return t?t.replace(/([a-zA-Z0-9]+?):/g,'"$1":'):n});try{var r=JSON.parse(a);for(var i in r)if(r[i]){var s=r[i];if("string"==typeof s?s=s.toUpperCase():"mapTypeIds"===i&&(s=s.map(function(e){return e.match(/^[A-Z]+$/)?google.maps.MapTypeId[e.toUpperCase()]:e})),"style"===i){var p=n.charAt(0).toUpperCase()+n.slice(1),c=p.replace(/Options$/,"")+"Style";r[i]=google.maps[c][s]}else r[i]="position"===i?google.maps.ControlPosition[s]:s}t[n]=r}catch(u){}}return t};return{filter:filter,getOptions:getOptions,getEvents:getEvents,getControlOptions:getControlOptions,toOptionValue:toOptionValue,getAttrsToObserve:getAttrsToObserve,orgAttributes:orgAttributes}};Attr2MapOptions.$inject=["$parse","$timeout","$log","$interpolate","NavigatorGeolocation","GeoCoder","camelCaseFilter","jsonizeFilter","escapeRegexpFilter"],angular.module("ngMap").service("Attr2MapOptions",Attr2MapOptions)}(),function(){"use strict";var e,t=function(t){var n=e.defer(),o=new google.maps.Geocoder;return o.geocode(t,function(e,t){t==google.maps.GeocoderStatus.OK?n.resolve(e):n.reject(t)}),n.promise},n=function(n){return e=n,{geocode:t}};n.$inject=["$q"],angular.module("ngMap").service("GeoCoder",n)}(),function(){"use strict";var e,t,n=function(n,o){return e=n,t=o,{load:function(n){var o=e.defer();if(void 0===window.google||void 0===window.google.maps){window.lazyLoadCallback=function(){t(function(){o.resolve(window.google)},100)};var a=document.createElement("script");a.src=n+(n.indexOf("?")>-1?"&":"?")+"callback=lazyLoadCallback",document.querySelector('script[src="'+a.src+'"]')||document.body.appendChild(a)}else o.resolve(window.google);return o.promise}}};n.$inject=["$q","$timeout"],angular.module("ngMap").service("GoogleMapsApi",n)}(),function(){"use strict";var e,t=function(t){var n=e.defer();return navigator.geolocation?(void 0===t?t={timeout:5e3}:void 0===t.timeout&&(t.timeout=5e3),navigator.geolocation.getCurrentPosition(function(e){n.resolve(e)},function(e){n.reject(e)},t)):n.reject("Browser Geolocation service failed."),n.promise},n=function(n){return e=n,{getCurrentPosition:t}};n.$inject=["$q"],angular.module("ngMap").service("NavigatorGeolocation",n)}(),function(){"use strict";var e,t,n,o=[],a=function(n){var a=t.createElement("div");a.style.width="100%",a.style.height="100%",n.appendChild(a);var r=new e.google.maps.Map(a,{});return o.push(r),r},r=function(e,t){for(var n,a=0;a<o.length;a++){var r=o[a];if(r.id==t&&!r.inUse){var i=r.getDiv();e.appendChild(i),n=r;break}}return n},i=function(e){for(var t,n=0;n<o.length;n++){var a=o[n];if(!a.id&&!a.inUse){var r=a.getDiv();e.appendChild(r),t=a;break}}return t},s=function(e){var t=r(e,e.id)||i(e);return t?n(function(){google.maps.event.trigger(t,"idle")},100):t=a(e),t.inUse=!0,t},p=function(e){e.inUse=!1},c=function(){for(var e=0;e<o.length;e++)o[e]=null;o=[]},u=function(e){for(var t=0;t<o.length;t++)null!==o[t]&&o[t].id==e&&(o[t]=null,o.splice(t,1))},l=function(a,r,i){return t=a[0],e=r,n=i,{mapInstances:o,resetMapInstances:c,getMapInstance:s,returnMapInstance:p,deleteMapInstance:u}};l.$inject=["$document","$window","$timeout"],angular.module("ngMap").factory("NgMapPool",l)}(),function(){"use strict";var e,t,n,o,a,r,i,s,p={},c=function(n,o){var a;return n.currentStyle?a=n.currentStyle[o]:e.getComputedStyle&&(a=t.defaultView.getComputedStyle(n,null).getPropertyValue(o)),a},u=function(e){var t=p[e||0];return t.map instanceof google.maps.Map?void 0:(t.initializeMap(),t.map)},l=function(t,o){function a(n){var o=Object.keys(p),s=p[o[0]];
t&&p[t]?r.resolve(p[t].map):!t&&s&&s.map?r.resolve(s.map):n>i?r.reject("could not find map"):e.setTimeout(function(){a(n+100)},100)}o=o||{},t="object"==typeof t?t.id:t;var r=n.defer(),i=o.timeout||1e4;return a(0),r.promise},g=function(e){if(e.map){var t=Object.keys(p).length;p[e.map.id||t]=e}},d=function(e){var t=Object.keys(p).length-1,n=e.map.id||t;if(e.map){for(var o in e.eventListeners){var a=e.eventListeners[o];google.maps.event.removeListener(a)}e.map.controls&&e.map.controls.forEach(function(e){e.clear()})}e.map.heatmapLayers&&Object.keys(e.map.heatmapLayers).forEach(function(t){e.deleteObject("heatmapLayers",e.map.heatmapLayers[t])}),s.deleteMapInstance(n),delete p[n]},m=function(e,t){var a=n.defer();return!e||e.match(/^current/i)?o.getCurrentPosition(t).then(function(e){var t=e.coords.latitude,n=e.coords.longitude,o=new google.maps.LatLng(t,n);a.resolve(o)},function(e){a.reject(e)}):r.geocode({address:e}).then(function(e){a.resolve(e[0].geometry.location)},function(e){a.reject(e)}),a.promise},f=function(e,t){return function(n){if(n){var o=i("set-"+e),r=a.toOptionValue(n,{key:e});t[o]&&(e.match(/center|position/)&&"string"==typeof r?m(r).then(function(e){t[o](e)}):t[o](r))}}},v=function(e){var t=e.getAttribute("default-style");"true"==t?(e.style.display="block",e.style.height="300px"):("block"!=c(e,"display")&&(e.style.display="block"),c(e,"height").match(/^(0|auto)/)&&(e.style.height="300px"))};angular.module("ngMap").provider("NgMap",function(){var p={};this.setDefaultOptions=function(e){p=e};var c=function(c,y,h,b,M,O,w,L){return e=c,t=y[0],n=h,o=b,a=M,r=O,i=w,s=L,{defaultOptions:p,addMap:g,deleteMap:d,getMap:l,initMap:u,setStyle:v,getGeoLocation:m,observeAndSet:f}};c.$inject=["$window","$document","$q","NavigatorGeolocation","Attr2MapOptions","GeoCoder","camelCaseFilter","NgMapPool"],this.$get=c})}(),function(){"use strict";var e,t=function(t,n){n=n||t.getCenter();var o=e.defer(),a=new google.maps.StreetViewService;return a.getPanoramaByLocation(n||t.getCenter,100,function(e,t){t===google.maps.StreetViewStatus.OK?o.resolve(e.location.pano):o.resolve(!1)}),o.promise},n=function(e,t){var n=new google.maps.StreetViewPanorama(e.getDiv(),{enableCloseButton:!0});n.setPano(t)},o=function(o){return e=o,{getPanorama:t,setPanorama:n}};o.$inject=["$q"],angular.module("ngMap").service("StreetView",o)}(),"ngMap"});
(function() {
	'use strict';

	angular.module('baltcogoApp', ['ngMap']);
})();
(function(app) {
	'use strict';

	app.factory('createReportService', ['$http', createReportService]);

	function createReportService($http) {

		function post(data, successCallback, errorCallback) {
			var postOptions = {
				headers: {
					'Content-Type': 'application/json'
				}
			};

			$http.post("http://ba224964:1000/api/baltcogo/createreport", data, postOptions)
				.then(
					function (response) {
						successCallback(response.data);
					},
					function (error) {
						errorCallback(error);
					}
				);
		}

		return {
			post: post
		}
	}

})(angular.module('baltcogoApp'));
(function(app) {
	'use strict';

	app.factory('mapService', ['$http', mapService]);

	function mapService($http) {

		var apiKey = 'AIzaSyAqazsw3wPSSxOFVmij32C_LIhBSuyUNi8',
			targetCounty = 'Baltimore County',
			marker,
			
			createMarker = function(map, latitude, longitude) {
				if (marker) {
					marker.setMap(null);
				}

				marker = new google.maps.Marker({
					position: { lat: latitude, lng: longitude},
					map: map,
					draggable: false,
					animation: google.maps.Animation.DROP
				});
			},

			reverseGeocode = function(latitude, longitude, callback) {
				var $target = angular.element('#address');

				$http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + latitude + ',' + longitude + '&key=' + apiKey).then(function (response) {

					var address = getAddress(response.data.results);

					if (address) {
						$target.parent().removeClass('error');
						callback(removeCountry(address));
					} else {
						$target.parent().addClass('error');
						callback('');
					}
				});
			},

			addressLookup = function(addressQuery, callback) {
				$http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + addressQuery + '&key=' + apiKey)
					.then(function (response) {
						if (response.data.results.length) {
							var latitude = response.data.results[0].geometry.location.lat;
							var longitude = response.data.results[0].geometry.location.lng;
														
							callback(response.data.results[0].formatted_address, latitude, longitude);
						} else {
							callback('');
						}
					}, function (error) {
						console.log('error!', error);
					});		
			}

		/*** Private Functions **********/

		function getAddress(reverseGeocodeData) {
			var countyArr = $.grep(reverseGeocodeData, filterCountyResults);
			return isBaltimoreCounty(countyArr) ? reverseGeocodeData[0].formatted_address : false;
		}

		 function isBaltimoreCounty(countyArr) {
			var county = '';
			if (countyArr && countyArr.length)
				county = countyArr[0].formatted_address;
			return county.indexOf(targetCounty) !== -1;
		}

		function filterCountyResults(item, index) {
			return filterResults(item, index, 'administrative_area_level_2');
		}

		function filterResults(item, index, query) {
			var matchArr;
			if (item.types) {
				matchArr = $.grep(item.types, function (item, index) {
					return item === query;
				});
			}
			return matchArr.length ? matchArr : false;
		}

		function removeCountry(addressString) {
			return addressString.replace(', USA', '');
		}

		return {
			createMarker: createMarker,
			reverseGeocode: reverseGeocode,
			addressLookup: addressLookup
		};
	};

})(angular.module('baltcogoApp'));
(function (app) {
	'use strict';

	app.controller('BaltCoGoReporterCtrl', ['$http', '$scope', 'NgMap', 'mapService', 'createReportService', reporterController]);

	function reporterController($http, $scope, NgMap, mapService, createReportService) {

		var self = this;

		var targetCounty = 'Baltimore County';

		$http.get('/sebin/q/l/categories.json').then(categorySuccessHandler, errorHandler);
		$http.get('/sebin/y/z/animal-breeds.json').then(breedSuccessHandler, errorHandler);
		$http.get('/sebin/u/t/animal-colors.json').then(colorSuccessHandler, errorHandler); 
		$http.get('/sebin/a/d/animal-types.json').then(animalTypeSuccessHandler, errorHandler);
		$http.get('/sebin/m/z/pet-types.json').then(petTypeSuccessHandler, errorHandler);
		/*$http.get('categories.json').then(categorySuccessHandler, errorHandler);
		$http.get('animal-breeds.json').then(breedSuccessHandler, errorHandler);
		$http.get('animal-colors.json').then(colorSuccessHandler, errorHandler);
		$http.get('animal-types.json').then(animalTypeSuccessHandler, errorHandler);
		$http.get('pet-types.json').then(petTypeSuccessHandler, errorHandler);*/

		self.isAnimal = false;
		self.page = 1;		
		self.isDone = false;
		self.isSuccess = false;
		self.issueId = '';
		self.isLoading = false;

		NgMap.getMap().then(function (map) {
			self.map = map;
		});	

		self.mapClicked = function (event) {
			self.latitude = event.latLng.lat();
			self.longitude = event.latLng.lng();

			mapService.createMarker(self.map, self.latitude, self.longitude);
			mapService.reverseGeocode(self.latitude, self.longitude, function (address) {
				self.address = address;
			});
		};

		self.autocompletePlaceChanged = function () {
			var place = this.getPlace();

			self.latitude = place.geometry.location.lat();
			self.longitude = place.geometry.location.lng();

			mapService.createMarker(self.map, self.latitude, self.longitude);
			self.map.panTo({
				lat: self.latitude,
				lng: self.longitude
			});
			mapService.reverseGeocode(self.latitude, self.longitude, function (address) {
				self.address = address;
			});
		};

		self.addressLookup = function () {
			mapService.addressLookup(self.address, function (address, latitude, longitude) {
				self.address = address;
				mapService.createMarker(self.map, latitude, longitude);
				self.map.panTo({
					lat: latitude,
					lng: longitude
				});
			});
		};

		self.trackBreed = function () {
			angular.element.each(self.animalBreedData, function (index, breed) {
				if (breed.id === self.petType.id) {
					self.breeds = breed.breeds ? breed.breeds : [];
					self.sex = breed.sex;
					return true;
				}
			});
		};

		self.loadSubCategories = function (categoryId) {
			if (!categoryId) {
				self.subCategories = [];
				return;
			}

			angular.forEach(self.categoryData, function (element) {
				if (element.id == categoryId) {
					self.subCategories = element.types;
					if (element.states) {
						self.states = element.states;
						self.state = element.states[23]; // Maryland
					}
					if (element.fields) {
						self.streetAddressId = element.fields.streetAddress;
						self.cityId = element.fields.city;
						self.zipCodeId = element.fields.zipCode;
					}
					self.isAnimal = element.name.toLowerCase() === 'pets and animals';
				}
			});
		};

		self.nextClick = function () {
			if (validatePanel()) {
				self.page++; 

				setTimeout(function() {
					google.maps.event.trigger(self.map, "resize");
				}, 500);
			}
			else
				$scope.citySourcedReporterForm.$setSubmitted();				
		};

		self.prevClick = function () {
			if (validatePanel()) {
				self.page--; 
				setTimeout(function() {
					google.maps.event.trigger(self.map, "resize");
				}, 500);
			}
		};

		self.fileReportClick = function () {

			if (!validatePanel()) 
				return;

			/*** Static fields **********/
			
			var data = [{
					name: 'Category',
					id: self.category,
					value: getValueForId(self.categoryData, self.category)
				},
				{
					name: 'SubCategory',
					id: self.subCategory,
					value: getValueForId(self.subCategories, self.subCategory)
				},
				{
					name: 'Description',
					id: angular.element('#description').attr('data-cs-id') * 1,
					value: self.description
				},
				{
					name: 'Description Of Location',
					id: angular.element('#locationDescription').attr('data-cs-id') * 1,
					value: self.locationDescription
				},
				{
					name: 'Latitude',
					value: self.latitude
				},
				{
					name: 'Longitude',
					value: self.longitude
				},
				{
					name: 'FirstName',
					value: self.firstName
				},
				{
					name: 'LastName',
					value: self.lastName
				},
				{
					name: 'Email',
					value: self.email
				},
				{
					name: 'DeviceNumber',
					value: self.deviceNumber
				}
			];

			/*** Conditional fields **********/

			if (self.petType) data.push({
				name: 'Pet Type',
				id: self.petType.id,
				value: getValueForId(self.petTypeData, self.petType.id)
			});

			if (self.petSex) data.push({
				name: 'Sex',
				id: self.petSex.id,
				value: getValueForId(self.sex, self.petSex.id)
			});

			if (self.otherPetType) data.push({
				name: 'Other Pet Type',
				id: self.otherPetType,
				value: getValueForId(self.animalTypeData, self.otherPetType)
			});

			if (self.primaryBreed) data.push({
				name: 'Primary Breed',
				id: self.primaryBreed,
				value: getValueForId(self.breeds, self.primaryBreed)
			});

			if (self.primaryColor) data.push({
				name: 'Primary Color',
				id: self.primaryColor,
				value: getValueForId(self.animalColorData, self.primaryColor)
			});

			if (self.animalDescription) data.push({
				name: 'Description Of Animal',
				id: angular.element('#animalDescription').attr('data-cs-id') * 1,
				value: self.animalDescription
			});

			if (self.streetAddress) data.push({
				name: 'Complainant Address',
				id: self.streetAddressId,
				value: self.streetAddress
			});

			if (self.city) data.push({
				name: 'Complainant City',
				id: self.cityId,
				value: self.city
			});

			if (self.state) {
				var stateId = self.state.id ? self.state.id : self.state

				data.push({
					name: 'Complainant State',
					id: stateId,
					value: getValueForId(self.states, stateId)
				});
			}

			if (self.zipCode) data.push({
				name: 'Complainant Zip Code',
				id: self.zipCodeId,
				value: self.zipCode
			});

			/*** POST **********/

			self.isLoading = true;
			self.isDone = true;

			createReportService.post(data, 
				function(responseData) {
					self.isLoading = false;
					self.isSuccess = true;
					self.issueId = JSON.parse(responseData).CsResponse.ReportId;
				}, 
				function(errorData) {
					self.isLoading = false;
					console.log(errorData);
				});
		};

		/*** Private functions *********/

		function getValueForId(nameIdData, id) {
			var name = '';

			angular.forEach(nameIdData, function (element) {
				if (element.id === id) {
					name = element.name;
					return true;
				}
			});

			return name;
		}

		function validatePanel() {
			var requiredElements = angular.element('#citysourced-reporter-form .panel:visible [required]'),
				requiredElementsCount = requiredElements.length,
				visibleRequiredElementsCount = requiredElements.filter('.ng-valid').length,
				controls = $scope.citySourcedReporterForm.$$controls;
			
			angular.forEach(controls, function (value, key, obj) {
				if (value.$$element.is(':visible')) {
					if (value.$pristine)
						value.$setDirty();
				}			
			});

			return requiredElementsCount === visibleRequiredElementsCount;
		}

		function categorySuccessHandler(response) {
			self.categoryData = response.data;
		}

		function breedSuccessHandler(response) {
			self.animalBreedData = response.data;
		}

		function colorSuccessHandler(response) {
			self.animalColorData = response.data;
		}

		function animalTypeSuccessHandler(response) {
			self.animalTypeData = response.data;
		}

		function petTypeSuccessHandler(response) {
			self.petTypeData = response.data;
		}

		function errorHandler(err) {
			console.log(err);
		}

	}

})(angular.module('baltcogoApp'));