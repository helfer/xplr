
Template.header.events(
    {
        'click #signin': function(ev,template){
            console.log('signin');
            $('#signin-modal').modal('toggle');
        },
        'click #signup': function(ev,template){
            console.log('signup');
        },
    
        'mouseenter .menu': function(ev, template){
            var src = ev.target.children[0].src;
            if (src.indexOf("hover") == -1){
                var new_src = src.replace("_inactive.png","_hover.png");
                ev.target.children[0].src = new_src;
            }    
        },

        'mouseleave .menu': function(ev, template){
            var src = ev.target.children[0].src;
            var new_src = src.replace("_hover.png","_inactive.png");
            ev.target.children[0].src = new_src;
        },

        'click .menu':function(ev,template){
            var src = ev.target;
            console.log(src);
        },

        'click #menu-achievement': function(ev,template){
            console.log('achievement');
            Session.set("mode","achievement");
            $("#achievement").animate({"height":"380px"},1000);
        },

        'click #menu-guess': function(ev,template){
            console.log('guess');
            Session.set("mode","guess");
            $("#achievement").animate({"height":"0px"},1000);
        },

        'click #menu-collect': function(ev,template){
            console.log('collect');
            Session.set("mode","collect");
            $("#achievement").animate({"height":"0px"},1000);
        },
        'click #logo': function (){

          Session.set("mode","welcome");
              $(".circle-text-2").css("display","none");
              $("#back-btn").css("display","none");
              $("#achievement").animate({"height":"0px"},1000);

              $("#intro-img").css("display","block");
              $("#intro-img-2").css("display","block");
              $("#panel").animate({"left":"900px"},1000);
              $("#circle").animate({"left":"385px","width":"130px", "height":"130px", "top":"95px"},1000);
              $("#map").animate({"opacity":"0"},1000);
              $("#intro").animate({"width":"450px"},1000);
              $("#intro2").animate({"left":"450px","width":"450px"},1000);
              $("#steps").animate({"opacity":"1"},1000);            

              setTimeout(function(){$("#circle-text").css("display","block");},1000); 
              setTimeout(function(){$("#top").animate({"height":"320px"},1000);},1000); 
              setTimeout(function(){$("#intro-overlay").css("display","block");},2000); 
              $("#streetview").animate({"opacity":"0"},1000).delay(1000);         
              $("#intro2").animate({"top":"0px","height":"320px"},1000).delay(2000);            
              
              $("#circle").animate({"top":"95px"},1000).delay(1000);  
              $("#intro").animate({"height":"320px"},1000).delay(1000);                
        }

    });

Template.header.isactive = function(name){
    console.log("isactive " + name + " " + Session.get("mode"));
    if(Session.get("mode") == name){
        console.log("return hoverrrrrrr");
        return "_active";
    } else {
        return "_inactive";
    }
}

Template.header.loggedin = function(){
    if(Meteor.userId()){
        return true;
    } else {
        return false;
    }
}

Template.header.rendered = function (){
    if(Session.get("mode") == "welcome"){
        $("#menu-collect").css("visibility","hidden");
        $("#menu-achievement").css("visibility","hidden");
        $("#menu-guess").css("visibility","hidden");
    } else {
        if(Meteor.userId()){
            $("#menu-collect").css("visibility","visible");
            $("#menu-achievement").css("visibility","visible");
            $("#menu-guess").css("visibility","visible");
        } else {
            $("#menu-guess").css("visibility","visible");
        }
    }

}
/*
    Accounts.createUser({email: email, username: email,  password: pass}, function (error) {
      if (error) {
        Session.set('loginError', error.reason);
      } else {
        Session.set('showLogin', undefined);
        Session.set('currentPage', 'studentList');

        console.log('new user: ' + Meteor.user());
        
      }
    });
*/

