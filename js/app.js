var sesionEmail;
var moneyDataTable;
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
  		moneyDataTable = $('#money-data').DataTable({
	        "bProcessing": true,
	        "aaData": data,
	        "aoColumns": [
	            { "mData": "startOfWeek" },
	            { "mData": "spent" },
	            { "mData": "allowance" },
	            { "mData": "saved" }
	        ]
  		});

  		moneyDataTable.MakeCellsEditable({
        "onUpdate": updateRecord
    });
	});
}

function signOut() {
	var auth2 = gapi.auth2.getAuthInstance();
	auth2.signOut().then(function () {
		console.log('User signed out.');
		sesionEmail = null;
		$('#status').html('Logged out - See you soon!');
		moneyDataTable.destroy();
		$('#money-data').empty();
	});
}

function addEntry() {
	var startOfWeek = $('.startOfWeek').val();
	var spent = $('.spent').val();
	var allowance = $('.allowance').val();
	var saved = allowance - spent;
	console.log('Adding new entry for ' + startOfWeek);
	$.post( "/diary/entry/new",
        {
          email: sesionEmail,
          startOfWeek: startOfWeek,
          spent: spent,
          allowance: allowance,
          saved: saved
        }, function( data ) {
		$( ".result" ).html( data );
	});
}

function updateRecord(updatedCell, updatedRow, oldValue) {
    console.log("The new value for the cell is: " + updatedCell.data());
    console.log("The old value for that cell was: " + oldValue);
    console.log("The values for each cell in that row are: " + JSON.stringify(updatedRow.data()));
}