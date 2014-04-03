'use strict';
// Generated on 2014-03-29 using generator-codenberg-webapp 0.0.2

var gulp = require('gulp');
var path = require('path');
var express = require('express');
var fs = require('fs');

// Load plugins
var $ = require('gulp-load-plugins')();

var LIVERELOAD_PORT = 35727;

var partialPath = __dirname + '/app/';

// Styles
gulp.task('styles', function () {
    // return gulp.src('app/styles/main.scss')
    //     .pipe($.rubySass({
    //       style: 'expanded',
    //       loadPath: ['app/bower_components']
    //     }))
    //     .pipe($.autoprefixer('last 1 version'))
    //     .pipe(gulp.dest('app/styles'))
    //     .pipe($.size());
    return gulp.src('app/styles/less/*.less')
        .pipe($.less({
            paths: [ path.join(__dirname, 'less', 'includes') ]
        }))
        .pipe(gulp.dest('app/styles'));
});

// Scripts
gulp.task('scripts', function () {
    return gulp.src('app/scripts/**/*.js')
        .pipe($.jshint('.jshintrc'))
        .pipe($.jshint.reporter('default'))
        .pipe($.size());
});

// HTML
gulp.task('html', function () {
    return gulp.src('app/*.html')
      .pipe($.useref())
      .pipe(gulp.dest('dist'))
      .pipe($.size());
});

//Mustache
gulp.task('stache', function() {
    // fs.readFile(partialPath + 'nav.html', function (err, data) {
    //     if (err) throw err;
    //     var s = data.toString();
    // });
    return gulp.src('app/html/*.mustache')
        .pipe($.mustache({},{}, {} ))
        .pipe(gulp.dest('app'));
});

// Images
gulp.task('images', function () {
    return gulp.src('app/images/**/*')
        .pipe($.cache($.imagemin({
            optimizationLevel: 3,
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest('dist/images'))
        .pipe($.size());
});

// Clean
gulp.task('clean', function () {
    return gulp.src(['dist/styles', 'dist/scripts', 'dist/images'], {read: false}).pipe($.clean());
});

// Bundle
gulp.task('bundle', ['styles', 'scripts'], $.bundle('./app/*.html'));

// Build
gulp.task('build', ['html', 'bundle', 'images']);

// Default task
gulp.task('default', ['clean','watch']);

// Connect
gulp.task('connect', $.connect.server({
    root: ['app'],
    port: 5000,
    livereload: true
}));

// Watch
gulp.task('watch', function () {

    startExpress();
    startLivereload();
    
    // Watch .less files
    gulp.watch('app/styles/less/*.less', ['styles']);
    
    // Watch .js files
    gulp.watch('app/scripts/*.js', ['scripts']);

    // Watch image files
    gulp.watch('app/images/*', ['images']);

    // watch mustache
    gulp.watch('app/html/*', ['stache']);

    // Watch for changes in `app` folder
    gulp.watch([
        'app/*.html',
        'app/styles/*.css',
        'app/scripts/**/*.js',
        'app/images/**/*'
    ], notifyLivereload);
});


function startExpress() {
    var express = require('express');
    var app = express();
     app.use(require('connect-livereload')());
    app.use(express.static(__dirname + '/app'));
    app.listen(5000);
}

// function startLivereload() {
//     var server = $.livereload(LIVERELOAD_PORT);

//     // Watch for changes in `app` folder
//     gulp.watch([
//         'app/*.html',
//         'app/styles/*.css',
//         'app/scripts/**/*.js',
//         'app/images/**/*'
//     ], function(e) {
//         console.log('changed');
//         server.changed(e.path);
//     });
// }


//livereload
var lr;
function startLivereload() {
 
  lr = require('tiny-lr')();
  lr.listen(35729);
}

//update livereload
function notifyLivereload(event) {
 
  // var fileName = path.relative(__dirname, event.path);
  // console.log(fileName);
 
  // lr.changed({
  //   body: {
  //     files: [fileName]
  //   }
  // });
    gulp.src(event.path, {read: false})
        .pipe($.livereload(lr));
}