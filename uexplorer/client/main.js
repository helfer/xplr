if (Meteor.isClient) {
  var marker, pano, map;

  Meteor.subscribe('guesses');
  Meteor.subscribe('locations');

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
                    draggable: true,
                    title: "Drag me to guess"
                }).addTo(map);

  }

  Template.panel.events({
    'click #guess': function (){
      var marker_loc = marker.getLatLng();      
      var pano_loc = pano.getPosition();
      var pano_latlng = L.latLng(pano_loc["d"], pano_loc["e"]);
      var distance = parseInt(marker_loc.distanceTo(pano_latlng));
      var msg;
      
      if (distance > 4000) msg = "No comment...You are " + distance + " meters away!";
      else if (distance <= 4000 && distance > 2000) msg = "Oops...You are " + distance + " meters away!";
      else if (distance <= 1000 && distance > 1000) msg = "Not bad...You are " + distance + " meters away!";
      else if (distance < 1000) msg = "OMG...You are only " + distance + " meters away!";

      $("#message").text(msg);
      $("#message").css("display","block");
      
      console.log(distance);

      Guesses.insert({
        user:Meteor.userId(),
        lat:marker_loc.lat,
        lng:marker_loc.lng,
        real_lat:pano_loc["d"],
        real_lng:pano_loc["e"],
        score:0
      });

      var answer = L.marker(pano_latlng, {
            icon: L.mapbox.marker.icon({
                'marker-color': '#3BB98C'
            }),
            draggable: false
        }).addTo(map);

      // create a red polyline from an arrays of LatLng points
      var polyline = L.polyline([marker_loc,pano_latlng], {color: 'red'}).addTo(map);

      // zoom the map to the polyline
      map.fitBounds(polyline.getBounds());

      //this totally doesn't work unless we get all points, but who cares for now?
      var pcount = Locations.find().count();
      var pick = Math.floor(Math.random()*pcount);
      var next_location = Locations.findOne({index:pick});
      console.log(next_location);
      if(next_location == "undefined")
        console.log("Houston, we have a problem");
      pano.setPosition(new google.maps.LatLng(next_location['lat'],next_location['lng']));

    
    }

  });

}
if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
