Template.instruction.events({
	'click #gotit': function (){
      	//setTimeout(setTime,1000);
      	//TimerId = setInterval(setTime, 1000);
		$("#instruction").css("display","none");
		generate_next_location();
        clearOverlays();
        state = 'GUESS';

	}
});		
       