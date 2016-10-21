module.change_code = 1;
'use strict';

var alexa = require( 'alexa-app' );
var app = new alexa.app( 'test-skill' );

var buddy={
	john:{
		name:"john",
		percent:82,
		mathematics:95,
		physics:88,
		english:86
	},
	pete:{
		name:"linda",
		percent:65,
		mathematics:69,
		physics:70,
		english:66 
	} 
};

app.launch( function( request, response ) {
	response.say( 'Welcome to Study buddy How may i help you.' ).reprompt( 'Way to go. You got it to run' ).shouldEndSession( false );
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

		"how much did {john|studentName} scored in {physics|subject}",
		"tell me how much did {john|studentName} scored in {physics|subject}"
		]
  },
  function(request,response) {
    var studentName = request.slot('studentName');
    var subject=request.slot('subject');

    console.log("student:"+studentName);
    console.log("subject:"+subject);

    studentName=studentName.toLowerCase();

    if(subject)
    {
    	subject=subject.toLowerCase();
    	response.say(studentName+" has scored "+ buddy[studentName][subject] +" in "+subject).shouldEndSession( false );
    }
    else
    {
    	response.say(studentName+" has scored "+ buddy[studentName]["percent"] +" percent").shouldEndSession( false );
    }
  }
);

app.intent('compareMarks',
  {
    "slots":{"firstStudent":"LITERAL","secondeStudent":"LITERAL","subject":"LITERAL"},
    "utterances":[ 
		"who scored more {john|firstStudent} or {linda|secondeStudent}",
		"compare test results of  {john|firstStudent} or {linda|secondeStudent}",
		"who scored more {john|firstStudent} or {linda|secondeStudent} in {physics|subject}",
		"compare test results of  {john|firstStudent} or {linda|secondeStudent} in {physics|subject}"
		]
  },
  function(request,response) {
    var studentName = request.slot('firstStudent').toLowerCase();
    var studentName1 = request.slot('secondeStudent').toLowerCase();
    var subject=request.slot('subject');

    console.log("student:"+studentName);
    console.log("student1:"+studentName1);

    if(subject||subject=="")
    {
    	subject=subject.toLowerCase();

    	console.log("compare in subject");

    	var s1_subj=buddy[studentName][subject];
    	var s2_subj=buddy[studentName1][subject];

    	var ls="",us="";

    	if(s1_subj<s2_subj)
    	{
    		ls=studentName;
    		us=studentName1;
    	}
    	else
    	{
    		us=studentName1;
    		ls=studentName;
    	}

    	response.say(us+" has topped in "+ subject+" with "+s1_subj+" while "+ls+" scored "+ s2_subj).shouldEndSession( false );
    }
    else
    {
    	console.log("compare total");
    	response.say("jhon has scored more than pete. John score is 82 while pete scored 65").shouldEndSession( false );	
    }
	
  }
);

app.sessionEnded()

module.exports = app;