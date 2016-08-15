var sesionEmail;
// *******************************************
// ********* GOOGLE SIGN-IN METHODS **********
// *******************************************
function onSignIn(googleUser) {
	var profile = googleUser.getBasicProfile();
	$('#status').html('Thank you for signing in ' + profile.getName());

	sesionEmail = profile.getEmail();
	console.log('Email: ' + sesionEmail);
	$.get( "/diary/entries/" + sesionEmail, function(data) {
  		console.log(JSON.stringify(data));
  		$('#money-data').dataTable({
	        "bProcessing": true,
	        "aaData": data,
	        "aoColumns": [
	            { "mData": "email" }, 
	            { "mData": "weeklyAllowance" }
	        ]
  		});
	});
}

function signOut() {
	var auth2 = gapi.auth2.getAuthInstance();
	auth2.signOut().then(function () {
		console.log('User signed out.');
		sesionEmail = null;
		$('#status').html('Logged out - See you soon!');
		$('#money-data').parents('div.dataTables_wrapper').first().hide(); //TODO: this needs to be done in a better way!
	});
}

function add() {
	var weeklyAllowance = $('.weeklyAllowance').val();
	console.log('Adding...' + weeklyAllowance);
	$.post( "/diary/entry/new",
        {
          email: sesionEmail,
          weeklyAllowance: weeklyAllowance
        }, function( data ) {
		$( ".result" ).html( data );
	});
}