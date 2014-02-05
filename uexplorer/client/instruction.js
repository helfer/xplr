Template.instruction.events({
	'click #instruction': function (){
 		remove_instruction();
	}
});		


remove_instruction = function(){
	$("#instruction").css("display","none");
	if(Session.get("mode") == "guess" && round == 0)
	{
		generate_next_location();
	    clearOverlays();
    }	
}

Template.instruction.isactive = function(session){
	return Session.get("mode") == session;
}

