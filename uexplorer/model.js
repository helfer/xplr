Guesses = new Meteor.Collection("guesses"); //user guess locations
Locations = new Meteor.Collection("locations"); //deprecated; populated from db
Places = new Meteor.Collection("places"); //populated from google places API
Visits = new Meteor.Collection("visits"); //user 'visits' to places
CityVisits = new Meteor.Collection("cityvisits"); //cities a user has played in
Scores = new Meteor.Collection("scores"); //scores from the guessing game, guess 5



categories = ['resto','cafe','shop','arts'];//this link to the client side code, don't change them without notice...
cat_titles = [
    {cat:'resto',name:'Restaurant'},
    {cat:'cafe',name:'Coffee & Tea'},
    {cat:'bars',name:'Bars & Nightlife'},
    {cat:'educ',name:'Education'},
    {cat:'arts',name:'Entertainment'},
    {cat:'shop',name:'Shopping'},
];
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
//add bars and educ!!
