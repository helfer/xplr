
Template.achievement.username = function(){
    if(Meteor.user()){
        return Meteor.user().username;
    }
}

Template.achievement.cname = function(){
    if(Session.get("current_place")){
        return Session.get("current_place").name;
    } else {
        return "";
    }
}

Template.city.events(
    {   
        'mouseenter li': function(ev, template){
            var src = ev.target.children[0].style.visibility="visible";
        },

        'mouseleave li': function(ev, template){
            var src = ev.target.children[0].style.visibility="hidden";
        },
        'click a': function(ev, template){
            //console.log(template);
            Session.set("current_place",template.data.place);
        }
    });

Template.cities.visited = function(){
    return CityVisits.find().fetch();
}

Template.collections.categories = function(){
    return cat_titles;
}


Template.stickers.visits = function(cat){
    //console.log("looking for " + cat);
    var n = Visits.find({'cat':cat}).fetch();
    _.each(n,function(x,i){
        x.index = i;
    });
    //console.log("returning " + n.length);
    //console.log(n);
    return n;
}

Template.stickers.minusvisits = function(cat){
    return Visits.find({'cat':cat}).count();
}

Template.stickers.position = function(i,o){
    return "top:"+sticker_grid[i+o]['top'] + "px; left:" + sticker_grid[i+o]['left'] + "px;";
}
//sticker image location
sticker_grid=[];
for (var n=0; n<20; n++){
    if (n<3)
        sticker_grid.push({"top":0 ,"left":24*(n+1)});
    else if(n >=3 && n<8)
        sticker_grid.push({"top":24 ,"left":24*(n-3)});
    else if(n>=8 && n<10)
        sticker_grid.push({"top":48 ,"left":24*(n-8)});
    else if(n>=10 && n<12)
        sticker_grid.push({"top":48 ,"left":24*(n-7)});
    else if(n>=12 && n<17)
        sticker_grid.push({"top":72 ,"left":24*(n-12)});
    else if(n>=17)
        sticker_grid.push({"top":96 ,"left":24*(n-16)});              
}

Handlebars.registerHelper('fora', function(from, to, incr, block) {
    //console.log("for",from,to,incr);
    var accum = '';
    for(var i = from; i < to; i += incr){
        //console.log("i " + i);
        accum += block.fn(i);
    }
    return accum;
});

Handlebars.registerHelper('times', function(n, block) {
    var accum = '';
    for(var i = 0; i < n; ++i)
        accum += block.fn(i);
    return accum;
});
