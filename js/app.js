// *******************************************
// ********* GOOGLE SIGN-IN METHODS **********
// *******************************************
function onSignIn(googleUser) {
	var profile = googleUser.getBasicProfile();
	console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
	console.log('Name: ' + profile.getName());
	console.log('Image URL: ' + profile.getImageUrl());
	console.log('Email: ' + profile.getEmail());
	document.getElementById('google-status').innerHTML = "Welcome " + profile.getName();
}

function signOutFromGoogle() {
	var auth2 = gapi.auth2.getAuthInstance();
	auth2.signOut().then(function () {
		console.log('User signed out.');
		document.getElementById('google-status').innerHTML = 'Logged out successfully';
	});
}