var menu = document.getElementById( "navbar-menu" ),
	mobileNav = document.getElementById( "mobile-nav" );

menu.onclick = function() {
	// Should probably eventually use Element.classList
	if (mobileNav.className === "mobile-nav") {
		mobileNav.className = "mobile-nav open";
	} else mobileNav.className = "mobile-nav";
}