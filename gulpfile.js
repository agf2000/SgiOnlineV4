const gulp = require('gulp');
const run = require('gulp-run');
const imagemin = require('gulp-imagemin');

let src = './process',
    app = './public';

gulp.task('js', function () {
    return gulp.src(src + '/js/*.js')
        .pipe(gulp.dest(app + '/js'));
});

gulp.task('css', function () {
    return gulp.src(src + '/css/*.css')
        .pipe(gulp.dest(app + '/css'));
});

gulp.task('vendors', function () {
    gulp.src('node_modules/bootstrap/dist/fonts/**/*')
        .pipe(gulp.dest(app + '/lib/bootstrap/fonts'));

    gulp.src('node_modules/bootstrap/dist/css/bootstrap.min.css')
        .pipe(gulp.dest(app + '/lib/bootstrap/css'));

    gulp.src('node_modules/bootstrap/dist/css/bootstrap-theme.min.css')
        .pipe(gulp.dest(app + '/lib/bootstrap/css'));

    gulp.src('node_modules/bootstrap/dist/js/bootstrap.min.js')
        .pipe(gulp.dest(app + '/lib/bootstrap/js'));

    gulp.src('node_modules/jquery/dist/jquery.min.js')
        .pipe(gulp.dest(app + '/lib/jquery'));

    gulp.src('node_modules/knockout/build/output/knockout-latest.js')
        .pipe(gulp.dest(app + '/lib/knockout'));

    gulp.src('node_modules/moment/min/moment.min.js')
        .pipe(gulp.dest(app + '/lib/moment'));

    gulp.src('node_modules/moment-timezone/builds/moment-timezone.min.js')
        .pipe(gulp.dest(app + '/lib/moment/timezone'));

    gulp.src('node_modules/moment-timezone/builds/moment-timezone-with-data.min.js')
        .pipe(gulp.dest(app + '/lib/moment/timezone'));

    gulp.src('node_modules/moment-timezone/builds/moment-timezone-with-data-2012-2022.min.js')
        .pipe(gulp.dest(app + '/lib/moment/timezone'));

    gulp.src('node_modules/moment/locale/pt-br.js')
        .pipe(gulp.dest(app + '/lib/moment/locale'));

    gulp.src('node_modules/select2/dist/js/select2.min.js')
        .pipe(gulp.dest(app + '/lib/select2/js'));

    gulp.src('node_modules/select2/dist/js/i18n/pt-BR.js')
        .pipe(gulp.dest(app + '/lib/select2/i18n'));

    gulp.src('node_modules/select2/dist/css/select2.min.css')
        .pipe(gulp.dest(app + '/lib/select2/css'));

    gulp.src('node_modules/select2-bootstrap-theme/dist/select2-bootstrap.min.css')
        .pipe(gulp.dest(app + '/lib/select2-bootstrap-theme/css'));

    gulp.src('node_modules/pnotify/dist/pnotify.css')
        .pipe(gulp.dest(app + '/lib/pnotify/css'));

    gulp.src('node_modules/pnotify/dist/pnotify.buttons.css')
        .pipe(gulp.dest(app + '/lib/pnotify/css'));

    gulp.src('node_modules/pnotify/dist/pnotify.js')
        .pipe(gulp.dest(app + '/lib/pnotify/js'));

    gulp.src('node_modules/pnotify/dist/pnotify.buttons.js')
        .pipe(gulp.dest(app + '/lib/pnotify/js'));

    gulp.src('node_modules/pnotify/dist/pnotify.callbacks.js')
        .pipe(gulp.dest(app + '/lib/pnotify/js'));

    gulp.src('node_modules/pnotify/dist/pnotify.confirm.js')
        .pipe(gulp.dest(app + '/lib/pnotify/js'));

    gulp.src('node_modules/pnotify/dist/pnotify.mobile.js')
        .pipe(gulp.dest(app + '/lib/pnotify/js'));

    gulp.src('node_modules/corejs-typeahead/dist/typeahead.bundle.min.js')
        .pipe(gulp.dest(app + '/lib/corejs-typeahead'));

    gulp.src('node_modules/font-awesome/fonts/**/*')
        .pipe(gulp.dest(app + '/lib/font-awesome/fonts'));

    gulp.src('node_modules/font-awesome/css/font-awesome.min.css')
        .pipe(gulp.dest(app + '/lib/font-awesome/css'));

    // gulp.src('node_modules/daterangepicker/daterangepicker.min.js')
    //     .pipe(gulp.dest(app + '/lib/daterangepicker/js'));
    // gulp.src('node_modules/daterangepicker/daterangepicker-bs3.min.css')
    //     .pipe(gulp.dest(app + '/lib/daterangepicker/css'));

    gulp.src('node_modules/bootstrap3-dialog/dist/css/bootstrap-dialog.min.css')
        .pipe(gulp.dest(app + '/lib/bootstrap3-dialog/css'));

    gulp.src('node_modules/bootstrap3-dialog/dist/js/bootstrap-dialog.min.js')
        .pipe(gulp.dest(app + '/lib/bootstrap3-dialog/js'));

    gulp.src('node_modules/bootstrap-fileinput/css/fileinput.min.css')
        .pipe(gulp.dest(app + '/lib/bootstrap-fileinput/css'));

    gulp.src('node_modules/bootstrap-fileinput/js/fileinput.min.js')
        .pipe(gulp.dest(app + '/lib/bootstrap-fileinput/js'));

    gulp.src('node_modules/bootstrap-fileinput/js/locales/pt-BR.js')
        .pipe(gulp.dest(app + '/lib/bootstrap-fileinput/js/locales'));

    gulp.src('node_modules/bootstrap-switch/dist/css/bootstrap3/bootstrap-switch.min.css')
        .pipe(gulp.dest(app + '/lib/bootstrap-switch/css'));

    gulp.src('node_modules/bootstrap-switch/dist/js/bootstrap-switch.min.js')
        .pipe(gulp.dest(app + '/lib/bootstrap-switch/js'));

    gulp.src('node_modules/sweetalert2/dist/sweetalert2.min.css')
        .pipe(gulp.dest(app + '/lib/sweetalert2/css'));

    gulp.src('node_modules/sweetalert2/dist/sweetalert2.min.js')
        .pipe(gulp.dest(app + '/lib/sweetalert2/js'));

    gulp.src('node_modules/jquery-form-validator/form-validator/jquery.form-validator.min.js')
        .pipe(gulp.dest(app + '/lib/jquery-form-validator/js'));

    gulp.src('node_modules/jquery-form-validator/form-validator/theme-default.min.css')
        .pipe(gulp.dest(app + '/lib/jquery-form-validator/css'));

    gulp.src('node_modules/jquery-touchswipe/jquery.touchSwipe.min.js')
        .pipe(gulp.dest(app + '/lib/jquery-touchswipe'));

    gulp.src('node_modules/jquery-mask-plugin/dist/jquery.mask.min.js')
        .pipe(gulp.dest(app + '/lib/jquery-mask/js'));

    gulp.src('node_modules/bootstrap-fileinput/css/fileinput.min.css')
        .pipe(gulp.dest(app + '/lib/bootstrap-fileinput/css'));

    gulp.src('node_modules/bootstrap-fileinput/img/*.gif')
        .pipe(gulp.dest(app + '/lib/bootstrap-fileinput/img'));

    gulp.src('node_modules/bootstrap-fileinput/js/fileinput.min.js')
        .pipe(gulp.dest(app + '/lib/bootstrap-fileinput/js'));

    gulp.src('node_modules/bootstrap-fileinput/js/locales/pt-br.js')
        .pipe(gulp.dest(app + '/lib/bootstrap-fileinput/js/locales'));

    gulp.src('node_modules/bootstrap-tagsinput/dist/bootstrap-tagsinput.css')
        .pipe(gulp.dest(app + '/lib/bootstrap-tagsinput/css'));

    gulp.src('node_modules/bootstrap-tagsinput/dist/bootstrap-tagsinput.min.js')
        .pipe(gulp.dest(app + '/lib/bootstrap-tagsinput/js'));

    // gulp.src('node_modules/webui-popover/dist/jquery.webui-popover.min.css')
    //     .pipe(gulp.dest(app + '/lib/webui-popover/css'));

    // gulp.src('node_modules/webui-popover/dist/jquery.webui-popover.min.js')
    //     .pipe(gulp.dest(app + '/lib/webui-popover/js'));

    gulp.src('node_modules/pikaday/css/pikaday.css')
        .pipe(gulp.dest(app + '/lib/pikaday/css'));

    gulp.src('node_modules/pikaday/pikaday.js')
        .pipe(gulp.dest(app + '/lib/pikaday/js'));

    gulp.src('process/js/pikaday.pt-BR.js')
        .pipe(gulp.dest(app + '/lib/pikaday/js/locales'));

    // gulp.src('node_modules/bootstrap-datepicker/dist/css/bootstrap-datepicker3.min.css')
    //     .pipe(gulp.dest(app + '/lib/bootstrap-datepicker/css'));

    gulp.src('node_modules/isotope-layout/dist/isotope.pkgd.min.js')
        .pipe(gulp.dest(app + '/lib/isotope-layout/js'));

    // gulp.src('node_modules/jquery.counterup/jquery.counterup.min.js')
    //     .pipe(gulp.dest(app + '/lib/jquery.counterup/js'));

    gulp.src('node_modules/fancybox/dist/img/*')
        .pipe(gulp.dest(app + '/lib/fancybox/img'));

    gulp.src('node_modules/fancybox/dist/css/jquery.fancybox.css')
        .pipe(gulp.dest(app + '/lib/fancybox/css'));

    gulp.src('node_modules/fancybox/dist/helpers/js/*.js')
        .pipe(gulp.dest(app + '/lib/fancybox/helpers/js'));

    gulp.src('node_modules/fancybox/dist/js/*.js')
        .pipe(gulp.dest(app + '/lib/fancybox/js'));

    gulp.src('node_modules/jquery-placeholder/jquery.placeholder.js')
        .pipe(gulp.dest(app + '/lib/jquery-placeholder/js'));

    gulp.src('node_modules/smoothscroll/smoothscroll.min.js')
        .pipe(gulp.dest(app + '/lib/smoothscroll/js'));

    gulp.src('node_modules/jquery-mousewheel/jquery.mousewheel.js')
        .pipe(gulp.dest(app + '/lib/jquery-mousewheel/js'));

    gulp.src('node_modules/response.js/response.min.js')
        .pipe(gulp.dest(app + '/lib/response.js/js'));

    gulp.src('node_modules/jquery.easing/jquery.easing.min.js')
        .pipe(gulp.dest(app + '/lib/jquery.easing/js'));

    gulp.src('node_modules/slider-pro/dist/css/slider-pro.min.css')
        .pipe(gulp.dest(app + '/lib/slider-pro/css'));

    gulp.src('node_modules/slider-pro/dist/css/images/*')
        .pipe(gulp.dest(app + '/images'));

    gulp.src('node_modules/slider-pro/dist/js/jquery.sliderPro.min.js')
        .pipe(gulp.dest(app + '/lib/slider-pro/js'));

    gulp.src('node_modules/slick-carousel/slick/ajax-loader.gif')
        .pipe(gulp.dest(app + '/lib/slick-carousel/slick/css'));

    gulp.src('node_modules/slick-carousel/slick/slick-theme.css')
        .pipe(gulp.dest(app + '/lib/slick-carousel/slick/css'));

    gulp.src('node_modules/slick-carousel/slick/slick.css')
        .pipe(gulp.dest(app + '/lib/slick-carousel/slick/css'));

    gulp.src('node_modules/slick-carousel/slick/slick.min.js')
        .pipe(gulp.dest(app + '/lib/slick-carousel/slick/js'));

    gulp.src('node_modules/fitvids/dist/fitvids.min.js')
        .pipe(gulp.dest(app + '/lib/fitvids/js'));

    gulp.src('node_modules/jquery-waypoints/waypoints.min.js')
        .pipe(gulp.dest(app + '/lib/jquery-waypoints/js'));

    gulp.src('node_modules/rateyo/min/jquery.rateyo.min.css')
        .pipe(gulp.dest(app + '/lib/rateyo/css'));

    gulp.src('node_modules/rateyo/min/jquery.rateyo.min.js')
        .pipe(gulp.dest(app + '/lib/rateyo/js'));

    gulp.src('node_modules/pace-js/themes/blue/pace-theme-center-radar.css')
        .pipe(gulp.dest(app + '/lib/pace-js/themes'));

    gulp.src('node_modules/pace-js/pace.min.js')
        .pipe(gulp.dest(app + '/lib/pace-js/js'));
});

gulp.task('imageMin', function () {
    gulp.src(src + '/img/**')
        .pipe(imagemin())
        .pipe(gulp.dest(app + '/images'))
});

// gulp.task('watch', ['serve'], function () {
//     gulp.watch(src + '/js/*', ['js']);
//     gulp.watch(src + '/css/*', ['css']);
// });

// gulp.task('serve', ['js', 'css', 'imageMin'], function () {
//     run('node ./bin/www').exec();
// });

// gulp.task('default', ['watch', 'vendors', 'serve']);

gulp.task('watch', ['js', 'css', 'imageMin'], function () {
    gulp.watch(src + '/js/*', ['js']);
    gulp.watch(src + '/css/*', ['css']);
});

gulp.task('default', ['watch', 'vendors']);