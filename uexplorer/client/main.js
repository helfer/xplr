

if (Meteor.isClient) {


  update_places = function(){
    console.log('subscription complete');
  }

  //subscribe to places, when city is updated.
  //this function runs automatically, when current_place changes.
  //subscribe/unsubscribe is magic in deps autorun, no need to worry about it.
  Deps.autorun(function(){
      var place = Session.get("current_place");
      if(place){
          console.log("place");
          console.log(place.formatted_address);
          Meteor.subscribe("places",place.formatted_address,update_places());
      }
  });


  load_map = function(){

    var lng = -71.09245089365557;
    var lat = 42.36345602184655;
    var point = new google.maps.LatLng(lat,lng);
    

    var panoramaOptions = {
        //position:point,
        addressControl: true,
        linksControl: true,
        panControl: true,
        zoomControl:true,
        enableCloseButton: false
    };
    var myDOMobj = document.getElementById("streetview");
    pano = new google.maps.StreetViewPanorama(myDOMobj, panoramaOptions);
    panosvc = new google.maps.StreetViewService();

    var placesearch = document.getElementById("placesearch");
    /*var opts = {
        types: ['(cities)'],
        componentRestrictions: {country: 'us'}
    }*/ 
    autocomplete = new google.maps.places.Autocomplete(
    /** @type {HTMLInputElement} */(document.getElementById('autocomplete')),
    {
      types: ['(cities)'],
      componentRestrictions: {country: 'us'}
    });

    console.log('auto start');
  }

  map_rendered = false;

  
  marker = null;
  pano = null;
  panosvc = null;
  autocomplete = null;
  map = null;
  pano_start_loc = null;
  map_start_bound = null;
  var map_ready = false;
  var state = 'GUESS';
  var last_guess = null;

  steps = [
    {"title":"Guess",
      "description":"Find out where the pictures were taken.",
      "image":"Guess.png",
      "color":"#E16C4E"},
    {"title":"Explore",
      "description":"Discover places you didn’t know.",
      "image":"Explore.png",
      "color":"#28AFC3"},
    {"title":"Share",
      "description":"Tell your friends about your achievements.",
      "image":"Share.png",
      "color":"#E3E478"}
  ];


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
    //console.log('outorun'); 
    _.each(gu,function(g){
        //console.log(g.real_lat,g.real_lng);
        //var dotIcon = g.score < 150 ? circleIcon_g:circleIcon;
        if (g.score > 0 && g.score <= 150) {
          var boo = L.marker([g.real_lat, g.real_lng], {
                      icon: circleIcon_g                  
                  }).addTo(map);
        }
    });
  });

  Template.steps.steps = function () {
    return steps;
  };


  Template.streetview.rendered = function (){
    if(!this._rendered) {
        this._rendered = true;
          $.getScript("https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=places&key=AIzaSyD0jX52108t9mXy9L9_FysYCF6KN1_triE&sensor=false&callback=load_map");
    }
  }

  Template.map.events({
    'click #play': function (){
      var place = autocomplete.getPlace();
      if(place == undefined){
        alert("Please enter a city! Shan, please make this prettier :)");
        return;
      }
      Session.set("current_place",place);
      var vp = place.geometry.viewport;
      map.fitBounds([[vp.ta.d,vp.ia.d],[vp.ta.b,vp.ia.b]]);
      map.zoomIn();
      map_start_bound = map.getBounds();
      marker.setLatLng([place.geometry.location.d,place.geometry.location.e]);
      pano.setPosition(place.geometry.location);
      pano_start_loc = pano.getPosition();
      
      $("#intro-overlay").css("display","none");
      $("#circle").animate({"top":"315px"},1000); 
      $("#intro").animate({"height":"380px"},1000);
      $("#top").animate({"height":"660px"},1000);

      $("#intro2").animate({"top":"380px","height":"280px"},1000);         
      $("#streetview").animate({"opacity":"1"},1000);         
      $("#steps").animate({"opacity":"0"},1000);


      $("#intro2").animate({"left":"0px","width":"900px"},1000).delay(1000);  
      $("#intro").animate({"width":"900px"},1000).delay(1000);
      $("#map").animate({"opacity":"1"},1000).delay(1000);      
      $("#circle").animate({"left":"725px"},1000).delay(1000);
      $("#panel").animate({"left":"680px"},1000).delay(3000);

      function displaynone(){
          $("#intro-img").css("display","none");
          $("#intro-img-2").css("display","none");
      }

      setTimeout(displaynone,2000);
    },
  });

  Template.header.events({
    'click #logo': function (){

      $("#intro-img").css("display","block");
      $("#intro-img-2").css("display","block");
      $("#panel").animate({"left":"900px"},1000);
      $("#circle").animate({"left":"385px"},1000);
      $("#map").animate({"opacity":"0"},1000);
      $("#intro").animate({"width":"450px"},1000);
      $("#intro2").animate({"left":"450px","width":"450px"},1000);
      $("#steps").animate({"opacity":"1"},1000);            

      setTimeout(function(){$("#top").animate({"height":"320px"},1000);},1000); 
      setTimeout(function(){$("#intro-overlay").css("display","block");},2000); 
      $("#streetview").animate({"opacity":"0"},1000).delay(1000);         
      $("#intro2").animate({"top":"0px","height":"320px"},1000).delay(2000);            
           

      
      $("#circle").animate({"top":"95px"},1000).delay(1000);  
      $("#intro").animate({"height":"320px"},1000).delay(1000);             
    }
  });


  Template.map.rendered = function (){
        map = L.mapbox.map('map', 'heshan0131.h074i536', {
            doubleClickZoom: false
        });
        
        map_ready = true;

        map.on('dblclick', function(e) {
            map.setView(e.latlng, map.getZoom() + 1);
        });

        circleIcon = L.icon({
          iconUrl: 'icon_circle.png',
          iconRetinaUrl: 'icon_circle.png',
          iconSize: [15, 15],
          iconAnchor: [7, 7],
          popupAnchor: [-3, -76]

        });

        circleIcon_g = L.icon({
          iconUrl: 'icon_circle_g.png',
          iconRetinaUrl: 'icon_circle.png',
          iconSize: [15, 15],
          iconAnchor: [7, 7],
          popupAnchor: [-3, -76]
        });


        mark_Icon_b = L.icon({
          iconUrl: 'icon_p_b.png',
          iconRetinaUrl: 'icon_p_b.png',
          iconSize: [24, 42],
          iconAnchor: [12, 42],
          popupAnchor: [-3, -76]
        });

        mark_Icon_guess = L.icon({
          iconUrl: 'marker_r_guess.png',
          iconRetinaUrl: 'marker_r_guess.png',
          iconSize: [24, 40],
          iconAnchor: [12, 37],
          popupAnchor: [-3, -76]
        });

        /*
        Loc_Icon_g = L.icon({
          iconUrl: 'marker_g.png',
          iconRetinaUrl: 'marker_g.png',
          iconSize: [26, 43],
          iconAnchor: [13, 40],
          popupAnchor: [-3, -76]          
        });
*/

        //add marker 
        
        marker = L.marker([42.381, -71.106], {
                    icon: mark_Icon_guess,
                    draggable: true,
                    title: "Drag me to guess"
                }).addTo(map);
        
        map.on('click', function(e){
          var mouse_position = e.latlng;
          marker.setLatLng(mouse_position);
        });
  }

  Template.panel.events({
    'click #guess': function (){

          check_guess();        
          state = 'NEXT';
    },

    'click #next': function (){
          prompt_new_guess();
          state = 'GUESS';
    },
   
   'click #return':function(){
      pano.setPosition(pano_start_loc);
   }   
           
  });

  function check_guess(){
      //display address in streetview

      var addr_container = $(".gm-style div").filter(function() {
                  return $(this).css('left') == '88px';
               });

      addr_container.css("display","block");

      var marker_loc = marker.getLatLng();      
      var pano_loc = pano.getPosition();
      pano_latlng = L.latLng(pano_loc["d"], pano_loc["e"]);
      var distance = parseInt(marker_loc.distanceTo(pano_latlng));
      last_guess = distance;
      var msg;

      if (distance > 4000) msg = "No comment...You are " + distance + " meters away!";
      else if (distance <= 4000 && distance > 2000) msg = "Oops...You are " + distance + " meters away!";
      else if (distance <= 1000 && distance > 1000) msg = "Not bad...You are just " + distance + " meters away!";
      else if (distance < 1000) msg = "OMG...You are only " + distance + " meters away!";

      $("#message").text(msg);
      $("#message").css("visibility","visible");
      $("#guess").css("display","none");
      $("#next").css("display","block");
      $(".gmnoprint svg text").css("display","block");
     
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
            icon: mark_Icon_b,
            draggable: false
        }).addTo(map);
      // create a red polyline from an arrays of LatLng points
      var polyline = L.polyline([marker_loc,pano_latlng], {color: 'red'}).addTo(map);

      // zoom the map to the polyline
      map.fitBounds(polyline.getBounds().pad(0.07)); 
 

  }


  function get_random_location(){
    var pcount = Locations.find().count();
    var pick = Math.floor(Math.random()*pcount);
    var next_location = Locations.findOne({index:pick});
    if(next_location == "undefined")
        console.log("Houston, we have a problem");
    //var pr = panosvc.getPanoramaByLocation(loc);
    return next_location
   
  }

  function prompt_new_guess(){

      //hide address
      var addr_container = $(".gm-style div").filter(function() {
                  return $(this).css('left') == '88px';
               });

      addr_container.css("display","none");

      map.fitBounds(map_start_bound);
      var center = map.getCenter();

      var next_location = get_random_location();
      pano.setPosition(new google.maps.LatLng(next_location['lat'],next_location['lng']));
      pano_start_loc =  pano.getPosition();
      pano.disableDefaultUI=true; 

      $("path.leaflet-clickable").remove();
      $("img[src='marker_g.png']").remove();
      $("img[src='icon_p_b.png']").remove();
      $("img[src='marker_r_guess.png']").remove();
      $(".gmnoprint svg text").css("display","none");

         
      
      // new marker
      marker = L.marker(center, {
                    icon: mark_Icon_guess,
                    draggable: true,
                    title: "Drag me to guess"
                }).addTo(map);

      //answer.setIcon(circleIcon);
      if (last_guess <= 150)
      var dot = L.marker(pano_latlng, {icon: circleIcon_g}).addTo(map);
    
      $("#guess").css("display","block");
      $("#next").css("display","none");
      $("#message").css("visibility","hidden");
  }


}
if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
