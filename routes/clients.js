const express = require('express');
const passport = require("passport");
const ensureAuthenticated = require('../config/ensureAuthenticated');

const router = express.Router();

/* GET people page. */
router.get('/', ensureAuthenticated, function (req, res, next) {
    res.render('clients', {
        title: 'Clientes :: Softek - SGI',
        css: [
            '/plugins/select2/dist/css/select2.min.css',
            '/plugins/bootstrap-daterangepicker/daterangepicker.css',
            '/plugins/bootstrap-dialog/css/bootstrap-dialog.min.css',
            '/plugins/bootstrap-validator/dist/css/bootstrapValidator.min.css'
        ],
        script: [
            '/plugins/select2/dist/js/select2.min.js',
            '/plugins/select2/dist/js/i18n/pt-BR.js',
            '/plugins/bootstrap-daterangepicker/daterangepicker.js',
            '/plugins/typeahead/typeahead.bundle.min.js',
            '/plugins/bootstrap-dialog/js/bootstrap-dialog.min.js',
            '/plugins/jquery.inputmask/dist/min/jquery.inputmask.bundle.min.js',
            '/plugins/bootstrap-validator/dist/js/bootstrapValidator.min.js',
            '/plugins/bootstrap-validator/dist/js/language/pt_BR.js',
            '/js/app/utilities.js',
            '/js/pages/client.js'
        ]
    });
});

/* GET people registration page. */
router.get('/novo', ensureAuthenticated, function (req, res, next) {
    res.render('clients', {
        title: 'cadastro :: Softek - SGI',
        css: [
            '/plugins/select2/dist/css/select2.min.css',
            '/plugins/bootstrap-daterangepicker/daterangepicker.css',
            '/plugins/bootstrap-dialog/css/bootstrap-dialog.min.css',
            '/plugins/bootstrap-validator/dist/css/bootstrapValidator.min.css',
            '/plugins/sweetAlert2/css/sweetalert2.min.css',
            '/css/pages/client.css'
        ],
        script: [
            '/plugins/select2/dist/js/select2.min.js',
            '/plugins/select2/dist/js/i18n/pt-BR.js',
            '/plugins/bootstrap-daterangepicker/daterangepicker.js',
            '/plugins/typeahead/typeahead.bundle.min.js',
            '/plugins/bootstrap-dialog/js/bootstrap-dialog.min.js',
            '/plugins/jquery.inputmask/dist/min/jquery.inputmask.bundle.min.js',
            '/plugins/bootstrap-validator/dist/js/bootstrapValidator.min.js',
            '/plugins/bootstrap-validator/dist/js/language/pt_BR.js',
            '/plugins/sweetAlert2/js/sweetalert2.min.js',
            '/js/app/utilities.js',
            '/js/pages/client.js'
        ],
        client: req.params.id
    });
});

/* GET person page. */
router.get('/:id', function (req, res, next) {
    res.render('clients', {
        title: 'Cliente :: Softek - SGI',
        css: [
            '/plugins/select2/dist/css/select2.min.css',
            '/plugins/bootstrap-daterangepicker/daterangepicker.css',
            '/plugins/bootstrap-dialog/css/bootstrap-dialog.min.css',
            '/plugins/bootstrap-validator/dist/css/bootstrapValidator.min.css',
            '/plugins/sweetAlert2/css/sweetalert2.min.css',
            '/css/pages/client.css'
        ],
        script: [
            '/plugins/select2/dist/js/select2.min.js',
            '/plugins/select2/dist/js/i18n/pt-BR.js',
            '/plugins/bootstrap-daterangepicker/daterangepicker.js',
            '/plugins/typeahead/typeahead.bundle.min.js',
            '/plugins/bootstrap-dialog/js/bootstrap-dialog.min.js',
            '/plugins/jquery.inputmask/dist/min/jquery.inputmask.bundle.min.js',
            '/plugins/bootstrap-validator/dist/js/bootstrapValidator.min.js',
            '/plugins/bootstrap-validator/dist/js/language/pt_BR.js',
            '/plugins/sweetAlert2/sweetalert2.min.js',
            '/js/app/utilities.js',
            '/js/pages/client.js'
        ],
        client: req.params.id
    });
});

module.exports = router;