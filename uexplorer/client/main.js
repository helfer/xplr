if (Meteor.isClient) {
  var marker, pano, map;
  var map_ready = false;
  var state = 'GUESS';






  Meteor.subscribe('guesses');
  Meteor.subscribe('locations');

  Deps.autorun(function () {
    //draw them points :)
    var gu = Guesses.find().fetch();
    if(!map_ready){
        console.log("map_ready",map_ready);
        return;
    }
    if(!Meteor.user()){
      console.log('logging out, eh?');

      $("path.leaflet-clickable").remove();
      $("img[src='icon_circle_g.png']").remove();
      $("img[src='icon_circle.png']").remove();
      $("img[src='icon_g.png']").remove(); 
      //remove the guess locations
    }
    console.log('outorun'); 
    _.each(gu,function(g){
        console.log(g.real_lat,g.real_lng);
        var dotIcon = g.score < 150 ? circleIcon_g:circleIcon;
        var boo = L.marker([g.real_lat, g.real_lng], {
                    icon: dotIcon                  
                }).addTo(map);
    });
  });

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
        map = L.mapbox.map('map', 'heshan0131.h074i536');
        map_ready = true;

        circleIcon = L.icon({
          iconUrl: 'icon_circle.png',
          iconRetinaUrl: 'icon_circle.png',
          iconSize: [15, 15],
          iconAnchor: [7, 7],
          popupAnchor: [-3, -76],
        });

        circleIcon_g = L.icon({
          iconUrl: 'icon_circle_g.png',
          iconRetinaUrl: 'icon_circle.png',
          iconSize: [15, 15],
          iconAnchor: [7, 7],
          popupAnchor: [-3, -76],
        });

        Loc_Icon_b = L.icon({
          iconUrl: 'icon_b.png',
          iconRetinaUrl: 'icon_b.png',
          iconSize: [26, 40],
          iconAnchor: [13, 40],
          popupAnchor: [-3, -76],
        });

        Loc_Icon_g = L.icon({
          iconUrl: 'icon_g.png',
          iconRetinaUrl: 'icon_g.png',
          iconSize: [26, 40],
          iconAnchor: [13, 40],
          popupAnchor: [-3, -76],
        });


        //add marker  
        marker = L.marker([42.381, -71.106], {
                    icon: Loc_Icon_b,
                    draggable: true,
                    title: "Drag me to guess"
                }).addTo(map);

  }

  Template.panel.events({
    'click #guess': function (){

      switch(state){
        case 'GUESS':
          check_guess();
          state = 'NEXT';
        break;
        case 'NEXT':
          prompt_new_guess();
          state = 'GUESS';
        break;
      }
           
    },

  });

  function check_guess(){
      var marker_loc = marker.getLatLng();      
      var pano_loc = pano.getPosition();
      pano_latlng = L.latLng(pano_loc["d"], pano_loc["e"]);
      var distance = parseInt(marker_loc.distanceTo(pano_latlng));
      var msg;

      if (distance > 4000) msg = "No comment...You are " + distance + " meters away!";
      else if (distance <= 4000 && distance > 2000) msg = "Oops...You are " + distance + " meters away!";
      else if (distance <= 1000 && distance > 1000) msg = "Not bad...You are just " + distance + " meters away!";
      else if (distance < 1000) msg = "OMG...You are only " + distance + " meters away!";

      $("#message").text(msg);
      $("#message").css("display","block");
      $("#guess").val("Next");      
      $("#guess").css("background-color","#3BB98C");
     
      if(Meteor.user()){ 
          Guesses.insert({
            user:Meteor.userId(),
            lat:marker_loc.lat,
            lng:marker_loc.lng,
            real_lat:pano_loc["d"],
            real_lng:pano_loc["e"],
            score:distance
          });
      }

      var answer = L.marker(pano_latlng, {
            icon: Loc_Icon_g,
            draggable: false
        }).addTo(map);
      // create a red polyline from an arrays of LatLng points
      var polyline = L.polyline([marker_loc,pano_latlng], {color: 'red'}).addTo(map);

      // zoom the map to the polyline
      map.fitBounds(polyline.getBounds());      

  }

  function prompt_new_guess(){

      $("path.leaflet-clickable").remove();
      $("img[src='icon_g.png']").remove();
      $("img[src='icon_b.png']").remove();    
      
      // new marker
      marker = L.marker([42.381, -71.106], {
                    icon: Loc_Icon_b,
                    draggable: true,
                    title: "Drag me to guess"
                }).addTo(map);

      //answer.setIcon(circleIcon);
      var dot = L.marker(pano_latlng, {icon: circleIcon}).addTo(map);

      $("#guess").val("Guess!");      
      $("#guess").css("background-color","#E16C4E");
      $("#message").css("display","none");


      var pcount = Locations.find().count();
      var pick = Math.floor(Math.random()*pcount);
      var next_location = Locations.findOne({index:pick});
      if(next_location == "undefined")
        console.log("Houston, we have a problem");
      pano.setPosition(new google.maps.LatLng(next_location['lat'],next_location['lng'])); 
  }

}
if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
