//server code


var make_cb = function(city,cat,offset){
    return function(response) {
          //console.log("search count: ", response.results.length);
          //console.log("result: ", JSON.stringify(response.results[0]));
          _.each(response.results,function(p,i){
            //console.log(p.name + " " + JSON.stringify(p.geometry.location));
            //console.log('offset ' + offset + ' total ' + (offset + i));
            Places.insert({
                'city_id':city.id,
                'place_id':p.id,
                'name':p.name,
                'place_ref':p.reference,
                'category':cat,
                'lat':p.geometry.location.lat,
                'lng':p.geometry.location.lng,
                'index':offset*20+i//google search returns 20...
            });
          });
        };
}


Meteor.startup(function() {

    //pre-populate with locations if empty:
    //if (Locations.find().count() == 0){
    //Locations.remove({}); //JUST FOR DEVELOPMENT!

        /*var fs = Npm.require('fs');
        var file = fs.readFile('./poi.json',function(err,data){
            if(err){
                console.log(err);
                console.log('could not read file poi.json');
            } else {
                var poi = JSON.parse(data);
                _.each(poi,function(p){
                    Locations.insert(p);
                });
            }
        });*/
     //   _.each(POI,function(p,i){
     //       p['index'] = i; //for random retrieval
     //       Locations.insert(p);
     //   });
    //}


    Meteor.publish("guesses", function () {
    	return Guesses.find({user: this.userId});

        //for later, if there are too many guesses, just publish the ones near location
        //use geohashing for that, it could be very useful.
    });

    Guesses.allow({
        'insert': function(userId,doc){
            return userId == doc.user;
        }
    });

    Meteor.publish("cityvisits", function () {
    	return CityVisits.find({user: this.userId});
    });

    CityVisits.allow({
        'insert': function(userId,doc){
            return userId == doc.user;
        }
    });

    Meteor.publish("scores", function () {
    	return Scores.find();
    });

    Scores.allow({
        'insert': function(userId,doc){
            return userId == doc.user;
        },
        'update': function(userId, doc, fields, modifier) {
            return userId == doc.user;
        }
    });

    Scores.deny({
      update: function (userId, docs, fields, modifier) {
        // can't change user
        return _.contains(fields, 'user');
      }
    });

    Meteor.publish("visits", function (city) {
    	return Visits.find({user: this.userId,'city':city.id});
    });

    Visits.allow({
        'insert': function(userId,doc){
            return userId == doc.user;
        }
    });



    Meteor.publish("locations", function () {
    	return Locations.find({}); //for now, publish all locations
    
        //for later, publish only the locations within someone's area of interest
    });

    Meteor.publish("places", function(city) {
        //console.log('city');
        //console.log(city);

        if(Places.findOne({'city_id':city.id}) == undefined){
            fetch_google_places(city);
        } else {
            //console.log("places already fetched");
        }
        return Places.find({'city_id':city.id});
    });
 
    fetch_google_places = function(city){
        var GooglePlaces = Meteor.require("googleplaces");
        var gplaces = new GooglePlaces("AIzaSyDg6ii7P9b5YtGJaC9ArE6lPU-RXLa-mrA","json");
        var loc = city.geometry.location.d+","+city.geometry.location.e;


        _.each(categories,function(cat,i){        
            var cb = Meteor.bindEnvironment(make_cb(city,cat,i), function(e) {
              var message = "Something went wrong! " +
                            "Everything is broken! " + 
                            "Your life is ruined!";

              //console.log(message, e.stack);
            });

            gquery = google_queries[cat][0]  + " " + city.name;
            gtypes = google_queries[cat][1].join("|");

            gplaces.textSearch({
                query: gquery,
                location:loc,
                radius:2000,
                types:gtypes
            },cb);
        });
    }
});

    /*
        console.log(loc);
        gplaces.placeSearch({
              location:loc,
              radius:3000,
              types:"restaurant",
              rankby:"prominence"*/


