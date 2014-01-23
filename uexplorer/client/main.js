if (Meteor.isClient) {
  var marker, pano, map;

  Template.streetview.rendered = function (){
    if(!this._rendered) {
        this._rendered = true;

        var lng = -71.09245089365557;
        var lat = 42.36345602184655;
        var point = new google.maps.LatLng(lat,lng);
        var panoramaOptions = {
            position:point,
            disableDefaultUI:true 
        };
        var myDOMobj = document.getElementById("streetview");
        pano = new google.maps.StreetViewPanorama(myDOMobj, panoramaOptions);

    }
  }

  Template.map.rendered = function (){
       // var mapOptions = {
         // center: new google.maps.LatLng(-34.397, 150.644),
          //zoom: 8
        //};
        //var myDOMobj = document.getElementById("map-canvas");
        //var map = new google.maps.Map(myDOMobj,mapOptions);
        map = L.mapbox.map('map', 'heshan0131.h074i536');

        //add marker  
        marker = L.marker([42.381, -71.106], {
                    icon: L.mapbox.marker.icon({
                        'marker-color': '#e16c4e'
                    }),
                    draggable: true
                }).addTo(map)

  }

  Template.panel.events({
    'click input.inc': function (){
      var marker_loc = marker.getLatLng();      
      var pano_loc = pano.getPosition();

      var answer = L.marker([pano_loc["d"] , pano_loc["e"]], {
            icon: L.mapbox.marker.icon({
                'marker-color': '#3BB98C'
            }),
            draggable: false
        }).addTo(map)

    }

  });

}
if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
