Template.instruction.events({
	'click #gotit': function (){
 		remove_instruction();
	},

	'click #instruction': function (){
 		remove_instruction();
	}
});		


remove_instruction = function(){
	$("#instruction").css("display","none");
	generate_next_location();
    clearOverlays();
    state = 'GUESS';	
}

Template.instruction.isactive = function(session){
	if (Session.get("mode") == session) return true;
}

