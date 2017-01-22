var url = window.location.pathname;
var language = url.split('/')[1];
$(document).ready(function () {

// owl settings for main page slider
    var owl = $('#owl-demo');
    owl.owlCarousel({
        navigation: true,
        slideSpeed: 1500,
        paginationSpeed: 1500,
        singleItem: true,
        autoPlay: 5000,
        navigationText: ['<i class="material-icons">chevron_left</i>', '<i class="material-icons">chevron_right</i>'],
        loop: true,
    });

// Owl settings for kit widget
    $("#owl-kits").owlCarousel({
        slideSpeed: 300,
        paginationSpeed: 400,
        singleItem: true,
        autoPlay: 3000,
    });

    // comment box height changer
    var box_height = $('.prd_comments').innerHeight();
    $('.comment_login').css('height', box_height);

    // Run Bootstrap Tooltip

// user account dropdown hover function

    jQuery(function ($) {
        $('.my-account').hover(function () {
            $(this).find('.dropdown-menu').first().stop(true, true).delay(0).slideDown(200);
        }, function () {
            $(this).find('.dropdown-menu').first().stop(true, true).delay(100).slideUp(200);
        });
    });

// Check All Brands Button
    $('body').on('click', '.check-all', function () {
        if ($(this).hasClass('allChecked')) {
            $('.filter-brand input[type="checkbox"]').prop('checked', false);
          //  filterByBrands([]);
        } else {
            $('.filter-brand input[type="checkbox"]').prop('checked', true);
        }
        $(this).toggleClass('allChecked');
    });

    var movementStrength = 50;
    var height = movementStrength / $(window).height();
    var width = movementStrength / $(window).width();
    $("body").mousemove(function(e){
        var pageX = e.pageX - ($(window).width() / 2);
        var pageY = e.pageY - ($(window).height() / 2);
        var newvalueX = width * pageX * -1 - 250;
        var newvalueY = height * pageY * -1 - 50;
        $('.bs-example').css("background-position", newvalueX+"px     "+newvalueY+"px");
    });

    $('.popscrb').popover({
        html : true,
        'content': '<div class="prd_subscrb pd10">' +
        '<div class="discount-form text-center">'+
        '<i class="material-icons">mail_outline</i>'+
        '<input type="text" id="inputDiscount" class="form-control" placeholder="Enter your email address">'+
        '<p> </p>'+
        '<button class="btn-blue" onclick="subscribe(null)">Subscribe to product</button>'+
        '</div>' +
        '</div>',
    });

        $('.pop_comment').popover({
            html : true,
            'content':'<div class="text-center pd10">For add comment you need to login</div>'+
            '<a href="/site/login"><button class="btn-blue">Login</button></a>'
        });

    $('.popfvrt').popover({
        html : true,
        'content': '<div class="prd_fvrt pd10">' +
        '<div class="discount-form text-center">'+
        '<p>You must Logged in for adding product in favorites!</p><br>'+
        '<a href="/site/login" class="btn-blue">Log In</a>'+
        '</div>' +
        '</div>',
    })

    $('.popshare').popover({
        html : true,
        'content': $('.share_').html(),
    })

    // fancy select option run

    $('.edit-country').fancySelect();

    $('.basic').fancySelect().on('change.fs', function () {
        updateFreightForm();
    });
    $('.tw').click(function(){
        $('.btn-twitter').click();
    });

    $('.fb').click(function(){
        $('.btn-facebook').click();
    });

     $('.gg_ic').click(function(){
        $('.btn-google-plus').click();
    });
});
// run bootstrap tooltip
$('body').tooltip({
    selector: '[data-toggle=tooltip]'
});

// product image zoom function
$(".image-zoom").elevateZoom({
    zoomType: "inner",
    cursor: "crosshair",
    easing : true
});

/*
* toggle faved class
* */
// $('button').on('click', function () {
//     $(this).toggleClass('faved');
// });

// Quantity Product control
//$(".js-qty").on("click", function () {
//
//    
//});


$(document).ready(function () {
    var hoverStar = $('.w_modal_rating .w_star_hover'),
        modalRatingContainer = $('.w_review_stars.w_modal_rating'),
        changeRatingStars = modalRatingContainer.attr('data-mark'),
        inputRatingModal = $('#test_input');

    function myRatingStars(hoverRatingStars) {
        modalRatingContainer.attr('data-mark', hoverRatingStars);
    }
    ;

    hoverStar.hover(
        function (e) {
            var hoverRatingStars = $(this).attr('data-rating');
            myRatingStars(hoverRatingStars);
        },
        function (e) {
            modalRatingContainer.attr('data-mark', changeRatingStars);
        }
    );

    hoverStar.on('click', function (e) {
        changeRatingStars = $(this).attr('data-rating');
        inputRatingModal.val(changeRatingStars);
    });


    if ($('#ex2').slider({})) {

        $('#ex2').slider().on('slideStop', function (ev) {
            var newVal = $('#ex2').data('slider').getValue();
            $('#low_count').val(newVal[0]);
            $('#high_count').val(newVal[1]);
            var view = $('#current-view').val();
            filterByPrice(newVal[0], newVal[1], view);

           /* $.ajax({
                url: '/' + language + "/product/filter",
                method: "post",
                data: {fromPrice: newVal[0], toPrice: newVal[1], view: view},
                success: function (res) {

                    $('#product_content').html(res)
                }
            })*/
        });
    }
    $()
    // $('body').on("click", ".brand-filter", function () {
    //     var Ids = [];
    //     $(".filter-brand").find(".brand-filter").each(function (i, elem) {
    //         var id = $(elem).attr('id');
    //         if($(elem).prop("checked")){
    //             Ids.push(id);
    //         }
    //     });
    //     filterByBrands(Ids);
    // });


    // // Price filter inputs
    // $(".price_val").bind('keyup change click', function (e) {
    //     if (! $(this).data("previousValue") ||
    //         $(this).data("previousValue") != $(this).val()
    //     )
    //     {
    //         var distance = [];
    //         var elem = $(this).attr('id');
    //         if( elem == 'low_count'){
    //             distance = [parseInt($(this).val()), parseInt($('#high_count').val())];
    //             $('#ex2').slider(
    //                 {
    //                     setValue: distance
    //                 }
    //             );
    //         }
    //         else if( elem == 'high_count'){
    //             distance = [$('#low_count').val(), $(this).val()];
    //             $('#ex2').slider(setValue, distance);
    //
    //         }
    //         console.log(distance);
    //         // $(this).data("previousValue", $(this).val());
    //     }
    //
    // });


//     $("input.price_val").each(function () {
//             var newVal = $('#ex2').data('slider').getValue();
//             console.log(newVal);
//             $('#low_count').val(newVal[0]);
//             $('#high_count').val(newVal[1]);
//             var view = $('#current-view').val();
//
//             $.ajax({
//                 url: '/' + language + "/product/index",
//                 method: "post",
//                 data: {value1: newVal[0], value2: newVal[1],view:view},
//                 success: function (res) {
//                     console.log(res)
//                     $('#product_content').html(res)
//                 }
//             })
//         });
// });

});

// function filterByBrands(ids){
//     var view = $('#current-view').val();
//     $.ajax({
//         url: '/' + language + "/product/index",
//         method: "post",
//         data: {brand_id: ids,view:view},
//         success: function (res) {
//             $('#product_content').html(res)
//         }
//     })
// }
function filterByPrice(from, to, view) {
    $.ajax({
        url: '/' + language + "/product/filter",
        method: "post",
        data: {fromPrice: from, toPrice: to, view: view},
        success: function (res) {

            $('#product_content').html(res)
        }
    })
}
(function (exports) {
    function PasswordStrengthValidator() {
        function createReturnValue(text, strength, isLongEnough, hasSpecialCharacter) {
            return {
                text: text,
                strength: strength,
            };
        }

        this.validate = function (input) {
            var validityRegexp = /^((?=.*?(\d|\W))(?=.*?[a-zA-Z])|((?=.*?[a-z])(?=.*?[A-Z])))[\x21-\x7E]{6,}$/,
                specialCharacterRegexp = /(\d|[A-Z])/;

            var isEmpty = !input || input.length === 0,
                hasSpecialCharacter = specialCharacterRegexp.test(input),
                isValid = validityRegexp.test(input);

            if (isEmpty) {
                return createReturnValue('', 0, false, false);
            }

            if (isValid) {
                if (input.length > 10) {
                    return createReturnValue('very strong', 4, true, hasSpecialCharacter);
                } else if (input.length > 7) {
                    return createReturnValue('strong', 3, true, hasSpecialCharacter);
                } else {
                    return createReturnValue('ok', 2, true, hasSpecialCharacter);
                }
            } else {
                if (input.length < 6) {
                    return createReturnValue('too short', 1, false, hasSpecialCharacter);
                } else {
                    return createReturnValue('invalid', 1, true, hasSpecialCharacter);
                }
            }
        }
    }

    exports.PasswordStrengthValidator = PasswordStrengthValidator;
})(window);

(function (exports) {
    function getCheckmarkSvg() {
        return '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="13" height="10" viewBox="0 0 13 10" style="enable-background:new 0 0 13 10;" xml:space="preserve"><path d="M12.942,1.187l-0.391-0.411V0.775l-0.267-0.281l-0.412-0.433c-0.077-0.081-0.202-0.081-0.279,0l-0.434,0.456L4.802,7.201L1.453,3.68c-0.077-0.081-0.202-0.081-0.279,0L0.058,4.853c-0.077,0.081-0.077,0.213,0,0.293l4.558,4.793c0.077,0.081,0.202,0.081,0.279,0l7.634-8.026h0.002l0.412-0.433C13.019,1.399,13.019,1.267,12.942,1.187z"/></svg>';
    }

    function getBox() {
        return $('<div />').addClass('password-indicator__box');
    }

    function PasswordStrengthPopover(options) {
        this.options = options;

        this.render = function (validity) {
            var passwordIndicator = $('<div />')
                .addClass('password-indicator')
                .addClass('password-indicator--strength-' + validity.strength)

            var header = $('<div />')
                .addClass('password-indicator__header')
                .text('Password strength: ');

            var headerSuffix = $('<span />')
                .addClass('password-indicator__header-suffix')
                .text(validity.text);

            header.append(headerSuffix);

            var boxes = $('<div />')
                .addClass('password-indicator__boxes')
                .append(getBox)
                .append(getBox)
                .append(getBox)
                .append(getBox);

            var requirements = $('<div />')
                .addClass('password-indicator__requirements')

            $(validity.requirements).each(function () {
                var requirement = $('<div />')
                    .addClass('password-indicator__requirement')
                    .toggleClass('password-indicator__requirement--valid', this.isMet)
                    .append(getCheckmarkSvg())
                    .append($('<span>').text(this.text));

                requirements.append(requirement);
            })

            passwordIndicator
                .append(boxes)

            $(options.mount)
                .empty()
                .append(passwordIndicator);
        }
    }

    exports.PasswordStrengthPopover = PasswordStrengthPopover;
})(window);

var validator = new PasswordStrengthValidator();
var popover = new PasswordStrengthPopover({mount: '.popover-content'});

function render(password) {
    popover.render(validator.validate(password));
}

render();
$('#signupform-password').keyup(function (e) {
    render(e.target.value);
});

function turndelivery(elem) {
    if(elem.checked){
        $('#order-delivery').fadeIn();
    }
    else {
        $('#order-delivery').fadeOut();
    }
};


$('.discount_btnn').click( function () {
    var discountCode = $('#inputDiscount').val();
    if(discountCode.length >=4){
        $.ajax({
            url: "/"+language+'/customer/discount',
            method: 'post',
            dataType: 'json',
            data: {discountCode: discountCode, use: null},
            success: function (res) {
                if(res.message){
                    $('.modal-title').text('Discount error message');
                    $('.discount_field').text(res.message);
                    $('.modal-footer').html(
                        "<button type='button' class='btn btn-default' data-dismiss='modal'>OK</button>"
                    );
                }else{
                    if(res.type == 'price'){
                        var discountType = "kr";
                    }
                    if( res.type == 'percent'){
                        var discountType = "%";
                    }
                    $('.modal-footer').html(
                        "<button type='button' class='btn btn-default' data-dismiss='modal'>Cancel</button>" +
                        "<button type='button' id='Coupon_apply' class='btn btn-success' data-dismiss='modal'>Apply</button>"
                    );
                    $('.discount_field').text('Your discount '+res.discount+ discountType);

                }$('#discountModal').modal();
            }
        })
    }
});

$('body').on('click',"#Coupon_apply", function () {console.log("fgdfgfd");
    var discountCode = $('#inputDiscount').val();
    $.ajax({
        url: "/"+language+'/customer/discount',
        method: 'post',
        dataType: 'json',
        data: {discountCode: discountCode, use:'yes'},
        success: function (res) {console.log(res);
            if(res.status == 'success'){
                location.reload('/'+language+'/cart/list/');
                // window.location('/'+language+'/cart/list/');
            }else {
                $('.modal-title').text('Discount error message');
                $('.discount_field').text(res.message);
                $('.modal-footer').html(
                    "<button type='button' class='btn btn-default' data-dismiss='modal'>OK</button>"
                );
                $('#discountModal').modal();
            }

        }
    })

});
