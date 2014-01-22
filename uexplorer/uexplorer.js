if (Meteor.isClient) {
  Template.hello.greeting = function () {
    return "Welcome to uexplorer.";
  };

  Template.hello.events({
    'click input' : function () {
      // template data, if any, is available in 'this'
      if (typeof console !== 'undefined')
        console.log("You pressed the button");
    }
  });

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
        var mapOptions = {
          center: new google.maps.LatLng(-34.397, 150.644),
          zoom: 8
        };
        var myDOMobj = document.getElementById("map-canvas");
        var map = new google.maps.Map(myDOMobj,mapOptions);
  }

}
if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
