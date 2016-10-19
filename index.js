module.change_code = 1;
'use strict';

var alexa = require( 'alexa-app' );
var app = new alexa.app( 'test-skill' );


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
    "slots":{"studentName":"LITERAL"},
    "utterances":[ 
		"how much did {john|studentName} scored",
		"give me the test score of {john|studentName}",
		"tell me how much did {john|studentName} scored"]
  },
  function(request,response) {
    var studentName = request.slot('studentName');
    response.say(studentName+" has scored 82 percent");
  }
);

module.exports = app;