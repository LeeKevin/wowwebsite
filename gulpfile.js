var elixir = require('laravel-elixir');

elixir(function (mix) {
    mix
        .sass('main.scss', './public/css')
        .browserify('main.js', './public/js', null, {
            paths: ['./node_modules'],
            debug: !mix.production
        })
        .copy('./resources/assets/fonts', './public/fonts')
        .copy('./resources/assets/images', './public/images')
        .copy('./resources/services', './public/services')
        .copy('./resources/pages', './public')
    ;
});