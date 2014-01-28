
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
                var new_src = src.replace(".png","_hover.png");
                ev.target.children[0].src = new_src;
            }    
        },

        'mouseleave .menu': function(ev, template){
            var src = ev.target.children[0].src;
            var new_src = src.replace("_hover.png",".png");
            ev.target.children[0].src = new_src;
        },

        'click .menu':function(ev,template){
            var src = ev.target;
            console.log(src);
        },

        'click #menu-achievement': function(ev,template){
            console.log('achievement');
            $("#achievement").animate({"height":"380px"},1000);
        },

        'click #menu-guess': function(ev,template){
            console.log('guess');
            $("#achievement").animate({"height":"0px"},1000);
        },

        'click #menu-collect': function(ev,template){
            console.log('guess');
            $("#achievement").animate({"height":"0px"},1000);
        }

    });

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

