// *******************************************
// ********* GOOGLE SIGN-IN METHODS **********
// *******************************************
function onSignIn(googleUser) {
	var profile = googleUser.getBasicProfile();
	$('#status').html('Thank you for signing in ' + profile.getName());

	console.log('Email: ' + profile.getEmail());
	$.get( "/diary/entries/" + profile.getEmail(), function(data) {
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
		$('#status').html('Logged out - See you soon!');
		$('#money-data').parents('div.dataTables_wrapper').first().hide(); //TODO: this needs to be done in a better way!
	});
}