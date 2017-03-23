var gulp 						= require('gulp');
var sass 						= require('gulp-sass');
var browserSync 		= require('browser-sync');
var concat 					= require('gulp-concat');
var concatCss 			= require('gulp-concat-css');
var uglify 					= require('gulp-uglifyjs');
var cssnano 				= require('gulp-cssnano');
var rename 					= require('gulp-rename');
var del 						= require('del');
var autoprefixer 		= require('gulp-autoprefixer');
var babel 					= require('gulp-babel');
var sourcemaps 			= require("gulp-sourcemaps");



gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: './',
            index: 'demo/index.html'
        },
        notify: true
    });
});



gulp.task('sass-default', function() {
	return gulp.src('app/themes/default/main.sass')
	.pipe( sass() )
	.pipe( autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }) )
	.pipe( cssnano() )
	.pipe( rename({
		basename: 'default',
		suffix: '.min',
	}) )
	.pipe( gulp.dest('app/themes/default') );
});



gulp.task('sass-demo', function() {
	return gulp.src('demo/demo.sass')
	.pipe( sass() )
	.pipe( autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }) )
	.pipe( cssnano() )
	.pipe( rename({
		basename: 'demo',
		suffix: '.min',
	}) )
	.pipe( gulp.dest('demo') )
	.pipe( browserSync.reload({stream: true}) );
});



gulp.task('css', function() {
	return gulp.src('app/themes/**/*.min.css')
	.pipe( concatCss('dist/watch.min.css') )
	.pipe( cssnano() )
	.pipe( gulp.dest('./') )
	.pipe( browserSync.reload({stream: true}) );
});



gulp.task('sass', ['sass-default'], function() {});



gulp.task('js', function() {
	return gulp.src('app/*.js')
	.pipe( sourcemaps.init() )
	.pipe( babel({
		'presets': ['env']
	}) )
	.pipe( concat('watch.min.js') )
	.pipe( uglify() )
	.pipe( sourcemaps.write('.') )
	.pipe( gulp.dest('dist') )
	.pipe( browserSync.reload({stream: true}) );
});



gulp.task('watch', [
	'browser-sync', 
	'sass',
	'js',
	], function() {
		gulp.watch('demo/index.html', browserSync.reload);
		gulp.watch('app/**/*.sass', ['sass']);
		gulp.watch('app/**/*.css', ['css']);
		gulp.watch('app/*.js', ['js']);
		gulp.watch('demo/demo.sass', ['sass-demo']);
});



gulp.task('default', ['watch'], function() {});

