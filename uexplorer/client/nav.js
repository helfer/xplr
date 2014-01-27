
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
            var new_src = src.replace(".png","_hover.png");
            ev.target.children[0].src = new_src;
        },

        'mouseleave .menu': function(ev, template){
            var src = ev.target.children[0].src;
            var new_src = src.replace("_hover.png",".png");
            ev.target.children[0].src = new_src;
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

