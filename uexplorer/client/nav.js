
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
            var source = $(this).find('img').attr('src');
            console.log(source);
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

