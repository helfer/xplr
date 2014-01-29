
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

Template.stickers.events(
    {
        'mouseenter img': function(ev, template){
            if(ev.target.id){
                var title = ev.target.title;
                var id=ev.target.id;
                var parentId = ev.target.parentNode.id;
                var top = parseInt(ev.target.style.top.replace("px",""));
                var left = parseInt(ev.target.style.left.replace("px",""));
                var tooltip = '<span id="t-'+id+'" class="tooltip">' + title + '<span class="arrow"></span></span>';
               

                $("#"+parentId).append(tooltip);
                var ttop = top - $("#t-"+id).height() - 10;
                var tleft = left - 34;
                $("#t-"+id).css("top",ttop);
                $("#t-"+id).css("left",tleft);
             }   
        },

        'mouseleave img': function(ev, template){
            if(ev.target.id){
                var id = ev.target.id;
                $("#t-"+id).remove();
            }    
        },


    });

Template.city.events(
    {   
        'mouseenter li': function(ev, template){
            if (Session.get("current_place").name == ev.target.id) return;
            else
            var src = ev.target.children[0].style.visibility="visible";

        },

        'mouseleave li': function(ev, template){
            if (Session.get("current_place").name == ev.target.id) return;
            else
            var src = ev.target.children[0].style.visibility="hidden";
        },
        'click a': function(ev, template){
            //console.log(template);
            Session.set("current_place",template.data.place);
        }
    });

Template.city.active = function(name){
    return Session.get("current_place").name == name;
}

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
    console.log(n);
    return n;
}

Template.stickers.minusvisits = function(cat){
    return Visits.find({'cat':cat}).count();
}

Template.stickers.position = function(i,o){
    return "top:"+sticker_grid[i+o]['top'] + "px; left:" + sticker_grid[i+o]['left'] + "px;";
}

Template.rankings.getranks = function(){
    if(Session.get("current_place")){
        var cc = Session.get("current_place").id;
        var sc = Scores.find({'city':cc},{sort: {score:-1},limit:10}).fetch();
        _.each(sc,function(s,i){
            console.log(JSON.stringify(s) + " rank " + i);
            s.rank = i+1;
        });
        return sc;
    }
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
