$(document).ready(function () {
    var clickedValue = 0;

    // change thumb to filled upon hover
    $('#thumb1').hover(function () {
        $('#showTitle').html('Terrible');

        $('#thumb1').attr('src', '/images/filled.png');
        $('#thumb2').attr('src', '/images/empty.png');
        $('#thumb3').attr('src', '/images/empty.png');
        $('#thumb4').attr('src', '/images/empty.png');
        $('#thumb5').attr('src', '/images/empty.png');
    });

    // event handler for when a thumb is actually clicked
    $('#thumb1').on('click', () => {
        clickedValue = 1;
        console.log(clickedValue)
    })

    // change thumb to filled upon hover
    $('#thumb2').hover(function () {
        $('#showTitle').html('Bad');

        $('#thumb1').attr('src', '/images/filled.png');
        $('#thumb2').attr('src', '/images/filled.png');
        $('#thumb3').attr('src', '/images/empty.png');
        $('#thumb4').attr('src', '/images/empty.png');
        $('#thumb5').attr('src', '/images/empty.png');
    });

    // event handler for when a thumb is actually clicked
    $('#thumb2').on('click', () => {
        clickedValue = 2;
        console.log(clickedValue)
    })

    // change thumb to filled upon hover
    $('#thumb3').hover(function () {
        $('#showTitle').html('Average');

        $('#thumb1').attr('src', '/images/filled.png');
        $('#thumb2').attr('src', '/images/filled.png');
        $('#thumb3').attr('src', '/images/filled.png');
        $('#thumb4').attr('src', '/images/empty.png');
        $('#thumb5').attr('src', '/images/empty.png');
    });

    // event handler for when a thumb is actually clicked
    $('#thumb3').on('click', () => {
        clickedValue = 3;
        console.log(clickedValue)
    })

    // change thumb to filled upon hover
    $('#thumb4').hover(function () {
        $('#showTitle').html('Good');

        $('#thumb1').attr('src', '/images/filled.png');
        $('#thumb2').attr('src', '/images/filled.png');
        $('#thumb3').attr('src', '/images/filled.png');
        $('#thumb4').attr('src', '/images/filled.png');
        $('#thumb5').attr('src', '/images/empty.png');
    });

    // event handler for when a thumb is actually clicked
    $('#thumb4').on('click', () => {
        clickedValue = 4;
        console.log(clickedValue)
    })

    // change thumb to filled upon hover
    $('#thumb5').hover(function () {
        $('#showTitle').html('Excellent');

        $('#thumb1').attr('src', '/images/filled.png');
        $('#thumb2').attr('src', '/images/filled.png');
        $('#thumb3').attr('src', '/images/filled.png');
        $('#thumb4').attr('src', '/images/filled.png');
        $('#thumb5').attr('src', '/images/filled.png');
    });

    // event handler for when a thumb is actually clicked
    $('#thumb5').on('click', () => {
        clickedValue = 5;
        console.log(clickedValue)
    })

    $('#rate').on('click', () => {
        var isValid = true;
        var review = $('#review').val();
        var sender = $('#sender').val();
        var id = $('#id').val();

        if (clickedValue === 0) {
            isValid = false;
            console.log(clickedValue);
            $('#error').html('<div class="alert alert-danger">Please click on a thumb for a rating.</div>');
        } else {
            $('#error').html('');
        }

        if (isValid) {
            $.ajax({
                url: '/review/' + id,
                type: 'POST',
                data: {
                    clickedValue: clickedValue,
                    review: review,
                    sender: sender
                },
                success: function () {
                    $('#review').val('');
                    $('#sender').val('');
                    $('#id').val();
                }
            });
        } else {
            return false;
        }
    })
})