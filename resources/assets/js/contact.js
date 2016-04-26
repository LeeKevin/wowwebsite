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
                            form.find('.error-message').text(response['error']).show();
                            return;
                        }
                    } catch (e) {
                        console.error(e);
                        return;
                    }

                    console.log(res);
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