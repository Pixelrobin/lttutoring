const
	express      = require( "express"              ),
	path         = require( "path"                 ),
	favicon      = require( "serve-favicon"        ),
	logger       = require( "morgan"               ),
	cookieParser = require( "cookie-parser"        ),
	bodyParser   = require( "body-parser"          ),
	nodemailer   = require( "nodemailer"           ),
	pug          = require( "pug"                  ),
	passport     = require( "passport"             ),
	Strategy     = require( "passport-local"       ),
	morgan       = require( "morgan"               ),
	session      = require( "express-session"      ),
	ensureLogin  = require( "connect-ensure-login" );

const app = express();

// --------------
// PASSPORT SETUP
// --------------

// A little bit overkill imo, since there's only one login
passport.use( new Strategy( {
		usernameField: "u",
		passwordField: "p"
	}, ( user, pass, cb ) => {
		if ( user === "admin" && pass === process.env.ADMIN_KEY )
			return cb( null, { id: "admin" } );
		else
			return cb( null, false );
	}
) );

// Uhh, do I really need these?
passport.serializeUser( ( user, cb ) => { cb( null, user.id ) } );
passport.deserializeUser( ( id, cb ) => { cb( null, { id: "admin" } ) } );

function checkIfLoggedIn( req ) {
	return !( !req.isAuthenticated || !req.isAuthenticated() );
}

// -------------
// EXPRESS SETUP
// -------------

// View Engine
app.set( "views", path.join( __dirname, "views" ) );
app.set( "view engine", "pug" );

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, "public", "favicon.ico")));
app.use( logger("dev" ) );
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( { extended: true } ) );
app.use( cookieParser() );
app.use( express.static(path.join(__dirname, "public") ) );

app.use( morgan( "combined" ) );
app.use( session( {
	secret: "banana pie face",
	resave: false,
	saveUninitialized: false
} ) );

app.use( passport.initialize() );
app.use( passport.session() );

// ----------------
// NODEMAILER SETUP
// ----------------

const transporter = nodemailer.createTransport({
	service: "hotmail",
	auth: {
		user: process.env.ADMIN_EMAIL,
		pass: process.env.ADMIN_EMAIL_PASS
	}
});

// ------
// ROUTES
// ------

app.get( "/", (req, res, next) => {
	var authed = checkIfLoggedIn( req );

	res.render("index", {
		selected: "home",
		authed: authed
	});
});

app.get( "/contact", (req, res, next) => {
	res.render( "contact", {
		selected: "contact"
	});
});

app.get( "/pricing",
	ensureLogin.ensureLoggedIn( "/admin" ),

	(req, res, next) => {
		res.render( "pricing", {
			selected: "pricing"
		});
	}
);

app.get( "/admin", ( req, res, next ) => {
	res.render( "admin", {
		selected: null
	} );
} );

app.get( "/test", ( req, res, next ) => {
	res.render( "test" );
});

//app.get( "/edit/:page" )

app.post( "/admin",
	passport.authenticate( "local", {
		failureRedirect: "/admin"
	} ),
	
	( req, res, next ) => {
		res.render( "index" )
	}
);

app.post("/thanks", function(req, res, next) {
	if (req.body.banana === "banana") {

		var mailOptions = {
			from: process.env.ADMIN_EMAIL,
			to: "yjk40599@sjuaq.com",
			subject: "Sending Email using Node.js",
			text: `
Name: ${req.body.name}
Phone: ${req.body.phone}
email: ${req.body.email}
message: ${req.body.message}
			`
		};

		transporter.sendMail(mailOptions, function(error, info){
			if (error) {
				console.log(error);
			} else {
				console.log("Email sent: " + info.response);
			}
		});

		res.render("thanks", {});
	} else {
		res.redirect( "/" );
	}
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
	var err = new Error("Not Found");
	err.status = 404;
	next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
