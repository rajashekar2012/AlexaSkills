module.change_code = 1;
'use strict';

var alexa = require( 'alexa-app' );
var app = new alexa.app( 'test-skill' );

var buddy={
marks:{
	john:{
		name:"john",
		percent:82,
		math:95,
		physics:88,
		english:86
	},
	linda:{
		name:"linda",
		percent:65,
		math:69,
		physics:70,
		english:66 }
	}
};

app.launch( function( request, response ) {
	response.say( 'Welcome to your test skill' ).reprompt( 'Way to go. You got it to run. Bad ass.' ).shouldEndSession( false );
} );


app.error = function( exception, request, response ) {
	console.log(exception)
	console.log(request);
	console.log(response);	
	response.say( 'Sorry an error occured ' + error.message);
};

app.intent('getMarks',
  {
    "slots":{"studentName":"LITERAL","subject":"LITERAL"},
    "utterances":[ 
		"how much did {john|studentName} scored",
		"give me the test score of {john|studentName}",
		"tell me how much did {john|studentName} scored",
		
		"how much did {john|studentName} scored in {physics|subject} ",
		"tell me how much did {john|studentName} scored in {physics|subject}"
		]
  },
  function(request,response) {
    var studentName = request.slot('studentName');
    var subject=request.slot('subject');

    if(subject)
    {
    	response.say(studentName+" has scored "+ buddy[studentName][subject] +" in "+subject);
    }
    else
    {
    	response.say(studentName+" has scored "+ buddy[studentName]["percent"] +" percent");
    }
  }
);

module.exports = app;