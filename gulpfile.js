var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var path = require('path');
var derequire = require('gulp-derequire');

const SRC = './src/';
const DIST = './dist/';

function buildFile(in_file, out_dir) {
  var filename = new_filename;

  if(filename === undefined) {
    var tokens = in_file.split(/\/+/);
    filename = tokens[tokens.length - 1];
  }

  var filename = path.basename(in_file);
  var name = path.basename(filename, ".js");

  return new Promise(function(resolve) {
    var stream = browserify(in_file, {standalone: name})
      .bundle()
      .pipe(source(filename))
      .pipe(derequire())
      .pipe(gulp.dest(out_dir));

    stream.on('end', function() {
      resolve(out_dir+"/"+filename);
    });
  });
};

function build() {
  return Promise.all([
//    buildFile(CLIENT_SRC+'/WarpClient.js', CLIENT_DIST),
  ]);
};

gulp.task('build', build);
gulp.task('default', gulp.series('build'));
