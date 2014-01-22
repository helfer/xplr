if (Meteor.isClient) {

  Template.streetview.rendered = function (){
    if(!this._rendered) {
        this._rendered = true;

        var lat = -33.867141;
        var lng = 151.207114;
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
        var map = L.mapbox.map('map', 'heshan0131.h074i536');

        //add marker  
        L.marker([42.381, -71.106], {
                    icon: L.mapbox.marker.icon({
                        'marker-color': '#e16c4e'
                    }),
                    draggable: true
                }).addTo(map)

  }

}
if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
