var gulp =               require('gulp'),
    concat =             require('gulp-concat'),
    uglify =             require('gulp-uglify'),
    less =               require('gulp-less'),
    rename =             require('gulp-rename'),
    del =                require('del'),
    refresh =            require('gulp-livereload'),
    inject =             require("gulp-inject"),
    html2js =            require('gulp-html2js'),
    jshint =             require('gulp-jshint'),
    stylish =            require('jshint-stylish'),
    debug =              require('gulp-debug'),
    svgstore =           require('gulp-svgstore'),
    merge =              require('merge-stream'),
    watch =              require('gulp-watch'),
    connect =            require('gulp-connect'),
    changed =            require('gulp-changed'),
    historyApiFallback = require('connect-history-api-fallback'),
    livereload =         require('gulp-livereload'),

    paths = {
      scripts: [ 'src/**/*.js', '!src/**/*.spec.js', '!src/assets/**/*.js' ],
      images: ['src/assets/img/**/*'],
      less: ['src/less/main.less']
    },

    vendorjs = [
        'vendor/jquery/dist/jquery.js',
        'vendor/angular/angular.js',
        'vendor/lodash/dist/lodash.js',
        'vendor/angular-strap/dist/angular-strap.js',
        'vendor/angular-strap/dist/angular-strap.tpl.js',
        'vendor/angular-sanitize/angular-sanitize.js',
        'vendor/angular-animate/angular-animate.js',
        'vendor/angular-ui-router/release/angular-ui-router.js',
        'vendor/angular-ui-utils/modules/route/route.js',
        'vendor/d3/d3.js',
        'vendor/nvd3/nv.d3.js',
        'vendor/angularjs-nvd3-directives/dist/angularjs-nvd3-directives.js',
        'vendor/moment/moment.js',
        'vendor/ng-notifications-bar/dist/ngNotificationsBar.min.js',
        'vendor/ng-table/ng-table.js',
        'vendor/jquery-bridget/jquery.bridget.js',
        'vendor/get-style-property/get-style-property.js',
        'vendor/get-size/get-size.js',
        'vendor/eventEmitter/EventEmitter.min.js',
        'vendor/eventie/eventie.js',
        'vendor/doc-ready/doc-ready.js',
        'vendor/matches-selector/matches-selector.js',
        'vendor/outlayer/item.js',
        'vendor/outlayer/outlayer.js',
        'vendor/masonry/dist/masonry.pkgd.js',
        'vendor/imagesloaded/imagesloaded.pkgd.min.js',
        'vendor/angular-masonry/angular-masonry.js',
        'vendor/ng-token-auth/dist/ng-token-auth.js',
        'vendor/angular-cookies/angular-cookies.js',
        'vendor/angular-pusher/angular-pusher.js',
        'vendor/moment/min/moment.min.js',
        'vendor/angular-moment/angular-moment.js'

    ],

    vendorcss = [
        'src/assets/font-awesome.css',
        'vendor/nvd3/nv.d3.css',
        'vendor/bootstrap-additions/bs-additions.css',
        'vendor/angular-motion/dist/angular-motion.css',
        'vendor/font-awesome/css/font-awesome.css',
        'vendor/ng-notifications-bar/dist/ngNotificationsBar.min.css',
        'vendor/ng-table/ng-table.css'
    ],

    atpl = './src/app/**/*.tpl.html',
    ctpl = './src/common/**/*.tpl.html'
    ;


gulp.task('jshint', function() {
    return gulp.src([ 'src/**/*.js', '!src/**/*.spec.js', '!src/assets/**/*.js' ])
        .pipe(jshint({
            curly: true,
            immed: true,
            newcap: false,
            noarg: true,
            sub: true,
            boss: true,
            eqnull: true
        }))
        .pipe(jshint.reporter(stylish))
        .pipe(jshint.reporter('fail'));
});



gulp.task('clean', function(cb) {
    del(['build'], cb);
});


gulp.task('html2js', function() {
    var atpls = gulp.src(atpl)
            .pipe(html2js({base: 'src/app', outputModuleName: 'templates-app'}))
            .pipe(changed('./build', {extension: '.js'}))
            .pipe(concat('templates-app.js'))
            .pipe(gulp.dest('./build')),

        ctpls = gulp.src(ctpl)
            .pipe(html2js({base: 'src/common', outputModuleName: 'templates-common'}))
            .pipe(changed('./build', {extension: '.js'}))
            .pipe(concat('templates-common.js'))
            .pipe(gulp.dest('./build'));

    return merge(atpls, ctpls);
});


/**
 * Inject css/js into index.html and place in build dir
 */

gulp.task('index', ['copy', 'html2js', 'less'], function () {
    var target = gulp.src('./src/index.html'),
        filesArr = vendorjs.concat(['src/**/*.js', 'templates-common.js', 'templates-app.js', '!src/**/*.spec.js'], vendorcss, ['assets/ai-webapp-0.0.1.css']),
        sources = gulp.src(filesArr, {read: false, cwd: 'build/'})
        ;

    return target
        .pipe(inject(sources))
        .pipe(gulp.dest('./build'))
        ;
});


/**
 * Copy files to build dir
 */

gulp.task('copy', function() {
    var assets = gulp.src('./src/assets/**/*', { base: './src/assets/' })
        .pipe(changed('./build/assets'))
        .pipe(gulp.dest('./build/assets')),

        svg = gulp.src('./src/assets/svg-defs.svg')
            .pipe(changed('./build/assets'))
            .pipe(gulp.dest('./build/assets')),

        src = gulp.src([ 'src/**/*.js', '!src/**/*.spec.js', '!src/assets/**/*.js' ])
            .pipe(changed('./build/src'))
            .pipe(gulp.dest('./build/src')),

        vendorjsfiles = gulp.src(vendorjs, {base: '.'})
            .pipe(changed('./build'))
            .pipe(gulp.dest('./build')),

        vendorcssfiles = gulp.src(vendorcss, {base: '.'})
            .pipe(changed('./build'))
            .pipe(gulp.dest('./build'))
        ;

    return merge(assets, svg, src, vendorjsfiles, vendorcssfiles);
});


gulp.task('svgstore', ['index'], function () {
    var svgs = gulp.src('./svgs/*.svg')
        .pipe(svgstore({ prefix: 'ai-', inlineSvg: true }));

    function fileContents (filePath, file) {
        return file.contents.toString('utf8');
    }

    return gulp
        .src('./build/index.html')
        .pipe(inject(svgs, { transform: fileContents }))
        .pipe(gulp.dest('build'))
        ;
});

gulp.task('livereload', ['svgstore'], function() {
    refresh.listen();
    gulp.watch('./build/**').on('change', refresh.changed);
});

/**
 * Compile LESS
 */

gulp.task('less', function() {
    return gulp.src(paths.less)
        .pipe(changed('build/assets', {extension: '.css'}))
        .pipe(less())
        .pipe(rename(function(path){
            path.basename = 'ai-webapp-0.0.1';
        }))
        .pipe(gulp.dest('build/assets'))
        ;
});

gulp.task('connect', ['svgstore'], function() {
    connect.server({
        root: 'build',
        port: 8080,
        middleware: function(connect, opt) {
            return [ historyApiFallback ];
        }
    });
});

gulp.task('watch', ['svgstore'], function() {
    gulp.watch(['**/*.less'], ['less']);
    gulp.watch(['./src/**/*.js'], [ 'copy']);
    gulp.watch([atpl, ctpl], ['html2js']);
    gulp.watch('./src/index.html', ['index', 'svgstore']);
    gulp.watch('./svgs/*.svg', ['svgstore']);
});


gulp.task('default', ['less', 'html2js', 'copy', 'index', 'svgstore', 'watch', 'connect', 'livereload']);