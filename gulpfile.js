var gulp = require('gulp'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),
	sass = require('gulp-sass'),
	cssnano = require('gulp-cssnano'),
	stripCode = require('gulp-strip-code'),
	clean = require('gulp-clean'),
	runSequence = require('run-sequence');

var concatFiles = function (files, name, dest) {
	dest = dest || 'dist/js';

	return gulp.src(files)
		.pipe(concat(name))
		.pipe(gulp.dest(dest));
};

gulp.task('clean-dist', function () {
	return gulp.src('dist')
		.pipe(clean());
});

gulp.task('concatHomepageJs', function () {
	var files = ['js/lib/jQuery.min.js',
		'js/lib/slick.min.js',
		'js/lib/handlebars.js',
		'js/lib/picturefill.min.js',
		'js/utility/namespacer.js',
		'js/flickr-feed.js',
		'js/county-news-snippet.js',
		'js/homepage-template.js'
	];
	return concatFiles(files, 'homepage.js');
});

gulp.task('concatTemplateJs', function () {
	var files = ['js/polyfills/array.some.js',
		'js/utility/namespacer.js',
		'js/utility/form-validator.js',
		'js/skip-nav.js',
		'js/lib/bootstrap-collapse.js',
		'js/text-resizer.js',
		'js/bc-google-analytics.js',
		'js/bc-google-analytics-custom-events.js',
		'js/lib/review.js',
		'js/mobile-search.js',
		'js/template-events.js',
		'js/inside-template.js',
		'js/bc-content-filter.js',
		'js/accordion-menu.js'
	];
	return concatFiles(files, 'template.js');
});

gulp.task('compressConcatenatedFiles', ['concatHomepageJs', 'concatTemplateJs'], function () {
	return gulp.src(['!dist/js/*min.js', 'dist/js/*.js'])
		.pipe(stripCode({
			start_comment: 'test-code',
			end_comment: 'end-test-code'
		}))
		.pipe(uglify())
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(gulp.dest('dist/js'));
});

gulp.task('compressPageSpecificFiles', function () {
	return gulp.src(['!./js/page-specific/*.spec.js', './js/page-specific/*.js'])
		.pipe(stripCode({
			start_comment: 'test-code',
			end_comment: 'end-test-code'
		}))
		.pipe(uglify())
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(gulp.dest('./dist/js/page-specific'));
});

gulp.task('sassAndCompressCss', function () {
	return gulp.src('stylesheets/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(cssnano())
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(gulp.dest('dist/css'));
});

gulp.task('watch', function () {
	gulp.watch(['js/*.js', 'js/lib/*.js', 'js/page-specific/*.js'], ['compressConcatenatedFiles', 'compressPageSpecificFiles']);
	gulp.watch(['stylesheets/*.scss', 'stylesheets/**/**/*.scss'], ['sassAndCompressCss']);
});

gulp.task('default', ['clean-dist'], function (callback) {
	runSequence(['compressPageSpecificFiles', 'compressConcatenatedFiles', 'sassAndCompressCss'], callback);
});