const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');
const uglify = require('gulp-uglify');
const cleanCSS = require('gulp-clean-css')

gulp.task('uglify', function() {
  return gulp.src('./*.js')
    // Minify the file
    .pipe(uglify())
    // Output
    .pipe(gulp.dest('dist'))
});

gulp.task('uglify-mjs', function() {
  return gulp.src('./*.mjs')
    // Minify the file
    .pipe(uglify())
    // Output
    .pipe(gulp.dest('dist'))
});

gulp.task('minify-html', () => {
  return gulp.src('./*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('dist'));
});

gulp.task('minify-css', () => {
  return gulp.src('*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist'));
});

gulp.task('move-links', () => {
	return gulp.src('links.json')
	.pipe(gulp.dest('dist'));
})

gulp.task('move-manifest', () => {
	return gulp.src('manifest.json')
	.pipe(gulp.dest('dist'));
})


gulp.task('move-src', () => {
	return gulp.src('src/**/*.*')
	.pipe(gulp.dest('dist/src'));
})
gulp.task('default', gulp.series('uglify', 'uglify-mjs', 'minify-html', 'minify-css', 'move-links', 'move-manifest', 'move-src'));