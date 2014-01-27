Guesses = new Meteor.Collection("guesses"); //user guess locations
Locations = new Meteor.Collection("locations"); //deprecated; populated from db
Places = new Meteor.Collection("places"); //populated from google places API
Visits = new Meteor.Collection("visits"); //user 'visits' to places



categories = ['resto','cafe','shop','arts'];
google_queries = {
    'resto':['Restaurant',['restaurant']],
    'cafe':['Coffee Tea',['cafe','bakery']],
    'shop':['Shopping',[
        'department_store',
        'grocery_or_supermarket',
        'book_store',
        'convenience_store',
        'clothing_store',
        'electronics_store']],
    'arts':['Entertainment',[
        'aquarium',
        'casino',
        'museum',
        'movie_theater',
        'stadium',
        'zoo']]};
