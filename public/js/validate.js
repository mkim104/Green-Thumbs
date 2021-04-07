$(document).ready(function () {
    $('#register').on('click', function () {
        var name = $.trim($('#name').val());
        var address = $.trim($('#address').val());
        var city = $.trim($('#city').val());
        var country = $.trim($('#country').val());
        var sector = $.trim($('#sector').val());
        var website = $.trim($('#website').val());
        // save name of image (not the path) in database
        var image = $.trim($('#upload-input').val());

        // if there is an error, isValid will be set to false
        var isValid = true;

        // validate name (input can't be empty)
        if (name == '') {
            isValid = false;
            $('#errorMsg1').html('<div class="alert alert-danger">Name field is empty</div>');
        } else {
            $('#errorMsg1').html('');
        }

        // validate address (input can't be empty)
        if (address == '') {
            isValid = false;
            $('#errorMsg2').html('<div class="alert alert-danger">Address field is empty</div>');
        } else {
            $('#errorMsg2').html('');
        }

        // validate city (input can't be empty)
        if (city == '') {
            isValid = false;
            $('#errorMsg3').html('<div class="alert alert-danger">City field is empty</div>');
        } else {
            $('#errorMsg3').html('');
        }

        // validate country (input can't be empty)
        if (country == '') {
            isValid = false;
            $('#errorMsg4').html('<div class="alert alert-danger">Country field is empty</div>');
        } else {
            $('#errorMsg4').html('');
        }

        // validate sector (input can't be empty)
        if (sector == '') {
            isValid = false;
            $('#errorMsg5').html('<div class="alert alert-danger">Sector field is empty</div>');
        } else {
            $('#errorMsg5').html('');
        }

        // validate website (input can't be empty)
        if (website == '') {
            isValid = false;
            $('#errorMsg6').html('<div class="alert alert-danger">Website field is empty</div>');
        } else {
            $('#errorMsg6').html('');
        }

        // if all inputs are valid, use ajax to send the data from the form to the server
        if (isValid == true) {
            var organizationData = {
                name: name,
                address: address,
                city: city,
                country: country,
                sector: sector,
                website: website,
                img: img
            };

            $.ajax({
                url: '/organization/create',
                type: 'POST',
                data: organizationData,
                // if the request is successful, empty all input fields
                success: function (data) {
                    $('#name').val('');
                    $('#address').val('');
                    $('#city').val('');
                    $('#country').val('');
                    $('#sector').val('');
                    $('#website').val('');
                    // $('#img').val('');
                }
            });

        } else {
            return false;
        }
    });
});