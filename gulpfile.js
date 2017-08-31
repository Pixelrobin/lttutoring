const
	gulp    = require( "gulp" ),
	webpack = require( "gulp-webpack" ),
	rename  = require( "gulp-rename" );

gulp.task( "react/admin", function() {
	return gulp.src( "./react/admin/index.jsx" )
	.pipe( webpack({
		/*module: {
			loader: {
				test: /\.js$/,
				include: "./react/admin/",
				loader: "babel"
			}
		}*/
		module: {
			/*rules: [
				{
					test: /\.js$/,
					exclude: /(node_modules|bower_components)/,
					use: {
						loader: 'babel-loader',
						options: {
							"presets" : ["es2015", "react"]
						}
					}
				}
			]*/
			loaders: [
				{
					test: /\.jsx?$/,
					loader: 'babel',
					exclude: /node_modules/,
					query: {
					    presets: ['react', 'es2015']
					}
				},
			]
		}
	}))
	.pipe( rename( "admin.js" ))
	.pipe( gulp.dest( "./public/javascripts/admin/" ))
});