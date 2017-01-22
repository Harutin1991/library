
$('.contact-form-send').click(function () {
    var subject = $('#contactform-subject').val();
    var name = $('#contactform-name').val();
    var surname = $('#contactform-surname').val();
    var email = $('#contactform-email').val();
    var body = $('#contactform-body').val();
    $.ajax({
        type: "POST",
        url: "/" + language + '/site/contact',
        cache: false,
        async: false,
        data: {ContactForm: {name: name, surname: surname, email:  email, subject: subject, body: body}},
        dataType: 'json',
        success: function (response) {
            location.reload();
        }
    });
});
$('.support-btn').hover( function () {
    $(this).hide("slow");
    $('.support_message').show("slow");
});
$('.send-email-btn').on('click', function () {
    $('.support_message').hide("slow");
});
$('.close').on('click', function () {
    $('.support-btn').show("slow");
});

$('.close').on('click', function () {
    $('.support_message').hide("slow");
});
