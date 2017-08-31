function validateForm() {
	var checkIfBlank = function( el ) {
		return el.value !== "";
	}

	// TODO: Add additional checks if needed
	var inputs = [
		[
			document.getElementById( "name-input" ),
			checkIfBlank
		], [
			document.getElementById( "phone-input" ),
			checkIfBlank
		], [
			document.getElementById( "email-input" ),
			checkIfBlank
		], [
			document.getElementById( "message-input" ),
			checkIfBlank
		]
	]

	var check = true;

	for ( e = 0; e < inputs.length; e ++ ) {
		check &= inputs[ e ][ 1 ]( inputs[ e ][ 0 ] );
		if ( !check ) break;
	}

	return check;
}