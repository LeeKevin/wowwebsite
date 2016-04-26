var $ = require('jquery');
require('jquery-validation');

module.exports = function () {
    var form = $('#contact-form');
    form.validate({
        submitHandler: function () {
            var action = form.attr('action'),
                data = form.serializeArray().reduce(function(obj, item) {
                    obj[item.name] = item.value;
                    return obj;
                }, {});

            $('body').addClass('loading');
            $.ajax({
                url: action,
                method: "POST",
                data: data,
                success: function (res) {
                    $('body').removeClass('loading');

                    try {
                        var response = JSON.parse(res);
                        if (response['error']) {
                            form.find('.error-message').addClass('error').text(response['error']).show();
                            return;
                        }

                        form.find('.error-message').removeClass('error').text('Thank you! We\'ll get back to you shortly.').show();
                    } catch (e) {
                        console.error(e);
                        return;
                    }

                }
            });
        },
        rules: {
            email: {
                required: true,
                email: true
            },
            message: "required"
        },
        errorPlacement: function () {
            //No error message
        }
    });
};