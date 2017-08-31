var tablesCollection = document.getElementsByClassName( "collapsable-list" ),
	tables           = [];

// Convert HTMLCollection to array
for ( var t = 0; t < tablesCollection.length; t ++ ) {
	tables.push( tablesCollection[ t ] )
}

tables.forEach( function( element, index) {
	var head = element.getElementsByClassName( "title" )[ 0 ],
		icon = head.getElementsByTagName( "span" )[ 0 ],
		body = element.getElementsByTagName( "ul" )[ 0 ];

	head.onclick = function() {
		// Should probably eventually use Element.classList
		if ( body.className === "collapsed" ) {
			body.className = "";
			icon.className = "fa fa-angle-down";
		} else {
			body.className = "collapsed";
			icon.className = "fa fa-angle-right";
		}
	}
} );