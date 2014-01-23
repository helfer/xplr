Meteor.startup(function() {

    //pre-populate with locations if empty:
    if (Locations.find().count() == 0){
        //load json file with locations, insert
    }


    Meteor.publish("guesses", function () {
    	return Guesses.find({user: this.userId});

        //for later, if there are too many guesses, just publish the ones near location
        //use geohashing for that, it could be very useful.
    });

    Meteor.publish("locations", function () {
    	return Locations.find({}); //for now, publish all locations
    
        //for later, publish only the locations within someone's area of interest
    });
 

});



