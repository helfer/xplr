
Template.cities.events(
    {   
        'mouseenter li': function(ev, template){
            var src = ev.target.children[0].style.visibility="visible";
        },

        'mouseleave li': function(ev, template){
            var src = ev.target.children[0].style.visibility="hidden";
        },
    });

//sticker image location
var sticker_grid=[];
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