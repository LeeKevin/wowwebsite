var elixir = require('laravel-elixir');

elixir(function (mix) {
    mix
        .sass('main.scss', './public/css')
        .copy('./resources/assets/fonts', './public/fonts')
        .copy('./resources/assets/images', './public/images')
        .copy('./resources/pages/index.html', './public/index.html')
    ;
});