var url = window.location.pathname;
var language = url.split('/')[1];
jQuery(document).ready(function ($) {
$('.freight').css('width', '100%');
    $('#block_freightmethod  li:first-child').find('input').trigger('click');
    // if($('#block_freightmethod .zones_f').length !== 0){
    //     $('#block_freightmethod  li:first-child').trigger('click');
    //      $('.postnor_fr>input').trigger('click');
    // }else{
    //      $('#block_freightmethod input:first-child').trigger('click');
    // }
    // $('.zones_f').trigger('click');
    calculatePriceForPaying(false);
    $( ".payment_types" ).click(function () {
        var id = $(this).attr('id');
        if($('#block_freightmethod  input').find(':checked').length ==0){
            $('#block_freightmethod  li:first-child').find('input').trigger('click');
        }
        calculatePriceForPaying(false);
        if(id == 'cash-on'){
            $('.postnor_fr').fadeOut(500);
            $('#block_freightmethod  li:first-child').find('input').trigger('click');
           // $('#block_freightmethod input:checked').prop('checked', false);
           $('.postnor_fr input:checked').prop('checked', false);
            // $('.zones_f').trigger('click');
        }else {
            $('.postnor_fr').fadeIn(500);
        }

    });
    //store service items
    var fillingBlocks = $('.cd-service').not('.cd-service-divider');
    if (fillingBlocks.length != 0){
    console.log(fillingBlocks);
    //store service items top position into an array
    var topValueFillingBlocks = [];
    fillingBlocks.each(function (index) {
        var topValue = $(this).offset().top;
        topValueFillingBlocks[topValueFillingBlocks.length] = topValue;
    });

    //add the .focus class to the first service item
    fillingBlocks.eq(0).addClass('focus');

    $(window).on('scroll', function () {
        //check which service item is in the viewport and add the .focus class to it
        updateOnFocusItem(fillingBlocks.slice(1));
        //evaluate the $(window).scrollTop value and change the .red-line-img::after and .red-line-img::before background accordingly (using the new-color-n classes)
        imgBackground(topValueFillingBlocks);
    });
    }
    $('.w_review_stars div.w_stars div.w_star_hover').click(function () {
        console.log($(this).attr('data-rating'))
        var rate = $(this).attr('data-rating');
        var product_id = $('#product_id').val();
        $.ajax({
            url: '/' + language + "/product/rate",
            method: "post",
            data: {rate: rate, id: product_id},
            success: function (res) {

            }
        });
    });

    // Set cookie for languages

    $(function () {
        var language = $.cookie('language');

        $('.languages').on('click', function () {
            language = $(this).attr('value');
            $.cookie('language', language);
        })
    });

    // Set cookie for Currency

    $(function () {
        var currency = $.cookie('currency');

        $('.currency').on('click', function () {
            currency = $(this).attr('value');
            $.cookie('currency', currency);
        })
    });

    $('#add-to-buket .material-icons').click(function () {
        buyProduct($(this).parent().attr('data-id'))
    });
    $('.order_by .material-icons').click(function () {
        var attrProductStatus = $(this).parent().attr('data-product-status');
        if (typeof attrProductStatus !== typeof undefined && attrProductStatus !== false) {
            buyProduct($(this).parent().attr('data-product-id'), $(this).parent().attr('data-package-id'), attrProductStatus);
        } else {
            buyProduct($(this).parent().attr('data-product-id'), $(this).parent().attr('data-package-id'));
        }
        $(this).parent().parent().parent().parent().parent().find(".product_overlay").css({
            'z-index': '10',
            'opacity': '1',
            'transition': 'all ease-in-out .3s',
        }).delay(1500).queue(function () {
            $(this).css({
                'opacity': '0',
                'z-index': '-1',
                'transition': 'all ease-in-out .3s'
            }).dequeue();
        });

        $(this).parent().parent().parent().parent().parent().find(".product_overlay i").css({
            'transition': 'all ease-in-out .3s',
            '-webkit-transform': 'translateY(10px)',
            'transform': 'translateY(10px)'
        }).delay(1500).queue(function () {
            $(this).css({
                'transition': 'all ease-in-out .3s',
                '-webkit-transform': 'translateY(-50px)',
                'transform': 'translateY(-50px)'
            }).dequeue();
        });

        $(this).parent().parent().parent().parent().parent().find(".product_overlay h2").css({
            'transition': 'all ease-in-out .3s',
            '-webkit-transform': 'translateY(10px)',
            'transform': 'translateY(10px)'
        }).delay(1500).queue(function () {
            $(this).css({
                'transition': 'all ease-in-out .3s',
                '-webkit-transform': 'translateY(50px)',
                'transform': 'translateY(50px)'
            }).dequeue();
        });
    });
});

function updateOnFocusItem(items) {
    items.each(function () {
        ($(this).offset().top - $(window).scrollTop() <= $(window).height() / 2) ? $(this).addClass('focus') : $(this).removeClass('focus');
    });
}

function imgBackground(itemsTopValues) {
    var topPosition = $(window).scrollTop() + $(window).height() / 2,
        servicesNumber = itemsTopValues.length;
    $.each(itemsTopValues, function (key, value) {
        if ((itemsTopValues[key] <= topPosition && itemsTopValues[key + 1] > topPosition) || (itemsTopValues[key] <= topPosition && key + 1 == servicesNumber)) {
            $('.red-line-img').removeClass('new-color-' + (key - 1) + ' new-color-' + (key + 1)).addClass('new-color-' + key);
        }
    });
}

function favorite(product_id) {
    var heart = $('#heart_'+product_id);
    if(!heart.hasClass("popfvrt")){
        $.ajax({
            url: '/' + language + "/product/favorite",
            method: "post",
            data: {id: product_id},
            dataType: "json",
            success: function (res) {
                var type = 'danger';
                if(res.success){
                    var content_selector = 'fvrt_'+product_id;
                    heart.toggleClass('faved');
                    if(heart.hasClass('faved')){
                        heart.parents('a.add-favorite').attr('title', 'remove from favorite');
                        heart.parents('a.add-favorite').attr('data-original-title', 'remove from favorite');

                    }else{
                        heart.parents('a.add-favorite').attr('title', 'add to favorite');
                        heart.parents('a.add-favorite').attr('data-original-title', 'add to favorite');
                    }
                    if($('#'+content_selector).length > 0){
                        $('#'+content_selector).remove();
                    }
                    type = "info";
                }
                $.notify({
                    // options
                    icon: 'fa fa-check-circle',
                    title: false,
                    message: res.message
                }, {
                    // settings
                    element: 'body',
                    position: null,
                    type: type,
                    allow_dismiss: true,
                    newest_on_top: false,
                    showProgressbar: false,
                    placement: {
                        from: "top",
                        align: "right"
                    },
                    offset: 20,
                    spacing: 10,
                    z_index: 1031,
                    delay: 3000,
                    timer: 500,
                    animate: {
                        enter: 'animated fadeInDown',
                        exit: 'animated fadeOutUp'
                    }
                });

            }
        });
    }
}
function getCartForm(){
    $.ajax({
        url: '/' + language + "/product/cart-list",
        method: "post",
        success: function (res) {

            $('.cart-overlay').html(res);
            //$('#basket-product-prices').html('$' + obj.basketTotalPrice);
            $(".cart-overlay").fadeToggle(100);
        }
    });
}


function subscribe(product_id) {
    var sbscrb = $('#sbscrb');console.log(sbscrb);
    var popscrb = $('#popscrb');
    var data ={};
    if(sbscrb.length > 0){
        data.id = product_id
    }else{
        data.id = popscrb.attr('data-key');
        var emailRegex = new RegExp(/^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$/i);
        var valid = emailRegex.test($('#inputDiscount').val());
        if (valid) {
            data.email = $('#inputDiscount').val();
        } else {
            alertmsg1($('#inputDiscount'), 'The value is not email');
            return false;
        }
    }
    $.ajax({
        url: '/' + language + "/product/subscribe",
        method: "post",
        data: data,
        dataType: "json",
        success: function (res) {
            var type = 'danger';
            if (res.success) {
                if(sbscrb.length > 0){
                    sbscrb.attr('title', res.type);
                    sbscrb.attr('data-original-title', res.type);
                }

                type = "info";
            }
            $.notify({
                // options
                icon: 'fa fa-check-circle',
                title: false,
                message: res.message
            }, {
                // settings
                element: 'body',
                position: null,
                type: type,
                allow_dismiss: true,
                newest_on_top: false,
                showProgressbar: false,
                placement: {
                    from: "top",
                    align: "right"
                },
                offset: 20,
                spacing: 10,
                z_index: 1031,
                delay: 3000,
                timer: 500,
                animate: {
                    enter: 'animated fadeInDown',
                    exit: 'animated fadeOutUp'
                }
            });

        }
    });
}

$('body').on('click', '#btn-subscribeNewsLetters', function () {
    // var sbscrb = $('#sbscrb');
    // var popscrb = $('#popscrb');
    var email = $('#inputsubscribeNewsLetters').val();
    var data ={};
    if(email.length > 0){
        var emailRegex = new RegExp(/^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$/i);
        var valid = emailRegex.test($('#inputsubscribeNewsLetters').val());
        if (valid) {
            data.email = $('#inputsubscribeNewsLetters').val();
        } else {
            alertmsg1($('#inputsubscribeNewsLetters'), 'The value is not email');
            return false;
        }
    }
    $.ajax({
        url: '/' + language + "/site/subscribe-newsletters",
        method: "post",
        data: data,
        dataType: "json",
        success: function (res) {
            var type = 'danger';
            if (res.success) {
                // if(sbscrb.length > 0){
                //     sbscrb.attr('title', res.type);
                //     sbscrb.attr('data-original-title', res.type);
                // }
                type = "info";
            }
            $.notify({
                // options
                icon: 'fa fa-check-circle',
                title: false,
                message: res.message
            }, {
                // settings
                element: 'body',
                position: null,
                type: type,
                allow_dismiss: true,
                newest_on_top: false,
                showProgressbar: false,
                placement: {
                    from: "top",
                    align: "right"
                },
                offset: 20,
                spacing: 10,
                z_index: 1031,
                delay: 3000,
                timer: 500,
                animate: {
                    enter: 'animated fadeInDown',
                    exit: 'animated fadeOutUp'
                }
            });
        }
    });
})
function alertmsg1(elem, message) {
    if (elem.next('p').length > 0) {

        elem.next('p').html(message).delay(3000)
            .fadeOut(function () {
                elem.next('p').html('&nbsp;');
                elem.next('p').css('display','block')
            });
        elem.focus();
        return false;
    }
}


(function () {

    $("#customer_card_link").on("click", function () {
        getCartForm();

    });
    $(".cart-overlay, .cart-overlay .container").on("click", function (e) {
        if (e.target !== this)
            return;
        $('.cart-overlay').fadeOut(100);
    });

})();

$(".menu").click(function () {
    $(this).toggleClass("open");
});


$(function () {

    "use strict"

    //  var init = "0";
    // var counter = 0;

    // Initial Cart
    // $(".counter").html(init);

//    // Add Items To Basket
//    function addToBasket() {
//        counter++;
//        $(".counter").html(counter).animate({
//            'opacity': '0'
//        }, 300, function () {
//            $(".counter").delay(300).animate({
//                'opacity': '1'
//            })
//        })
//    }

    // Add To Basket Animation

});

var changebox, reset_value;

// Profile Information Real Time Function
$('.edit').click(function () {
    editCancel();
    changebox = $(this).parent().children('span');
    reset_value = changebox.html();

    $(this).parent().addClass('editing');
    if (changebox.children('span').hasClass('unverfy')) {
        changebox.children('span').remove();
    }
    $(this).hide().parent().append("<i class='material-icons change-done edit-actions'>done</i> <i class='material-icons change-cancel edit-actions'>highlight_off</i>");
    changebox.addClass('editable').attr('contenteditable', 'true').focus();
    changebox.on('keydown', function (e) {
        if (e.keyCode == 13) {
            e.preventDefault();
        }
    });

    // Done

    $('.change-done').click(function () {
        var editbtn = $(this);

        function alertmsg(elem, message) {
            if (!elem.parent().children('span').hasClass('msg')) {
                $('<span class="text-danger msg">' + message + '</span>')
                    .insertAfter(elem.parent().children('i').last()).delay(3000)
                    .fadeOut(function () {
                        $(this).remove();
                    });
                changebox.focus();
                return false;
            }
        }

        function savechanges(elem) {
            elem.each(function () {
                elem.parent().find('.edit-actions').remove();
            })
            changebox.removeClass('editable').attr('contenteditable', 'false').blur().next('i').show();

            var Customer = {}, cur_lang = $('html').attr('lang'),
                attr = changebox.attr('data-name');
            Customer[attr] = changebox.text();

            $.ajax({
                type: "post",
                url: '/' + cur_lang + "/user/update-item",
                data: {Customer: Customer},
                success: function (res) {

                }
            });
        }

        function saveAdress(elem) {
            elem.each(function () {
                elem.parent().find('.edit-actions').remove();
            })
            changebox.removeClass('editable').attr('contenteditable', 'false').blur().next('i').show();

            var CustomerAddress = {}, cur_lang = $('html').attr('lang'),
                attr = changebox.attr('data-name');
            CustomerAddress[attr] = changebox.text();

            $.ajax({
                type: "post",
                url: '/' + cur_lang + "/customer/update-item",
                data: {CustomerAddress: CustomerAddress},
                success: function (res) {

                }
            });
        }



        if (changebox.text().length == 0) {
            alertmsg(editbtn, 'Please enter your ' + changebox.attr('data-name'))
        } else {

            if (changebox.attr('data-type') == 'adrress') {
                saveAdress(editbtn);
            } else if (changebox.attr('data-name') == 'phone') {
                var filter = /^[0-9-+]+$/;
                if (filter.test(changebox.text())) {
                    savechanges(editbtn);
                } else {
                    alertmsg(editbtn, 'The value is not phone number');
                }
            } else if (changebox.attr('data-name') == 'email') {
                var emailRegex = new RegExp(/^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$/i);
                var valid = emailRegex.test(changebox.text());
                if (valid) {
                    savechanges(editbtn);
                } else {
                    alertmsg(editbtn, 'The value is not email');
                }
            } else {
                savechanges(editbtn);
            }
        }
    });

    function editCancel() {
        $('.editing').each(function () {
            $(this).each(function () {
                $(this).find('.edit-actions').remove();
            });
            $(this).children('.msg').remove();
            changebox.removeClass('editable')
                .html(reset_value)
                .attr('contenteditable', 'false')
                .blur();
            $(this).children('.edit').show();
            $(this).removeClass('editing')
        });
    }

    // Cancel
    $('.change-cancel').click(function () {
        editCancel();
    });
});

function loadProducts() {
    var offset = $('#product-limit').val();
    $.ajax({
        url: '/' + language + "/product/index",
        method: "get",
        data: {page: offset, siteIndex: true},
        success: function (res) {
            var obj = jQuery.parseJSON(res);
            $('#more-products').append(obj.html);
            $('#product-limit').val(parseInt(offset) + 1);
            console.log(obj.show)
            if (!obj.show) {
                $('.load_more').remove();
            }
        }
    });
}


function addToBasket(countBasket, product_id, package_id) {
    // console.log(countBasket, product_id, package_id);
    $.ajax({
        url: '/' + language + "/product/product-to-basket",
        method: "post",
        data: {id: product_id, package_id: package_id, count: countBasket},
        success: function (res) {
            var obj = jQuery.parseJSON(res);
            $("#card_pods_cnt").html(obj.ProductCount).animate({
                'opacity': '0'
            }, 300, function () {
                $(".counter").delay(300).animate({
                    'opacity': '1'
                })
            })

        }
    });

}

function changeView(view) {

    $.ajax({
        url: window.location.href,
        method: 'post',
        data: {view: view},
        beforeSend: function( xhr ) {
            loader('on');
        },
        success: function (res) {
            $('#product_content').html(res);

            if (view == 'list') {
                $('#grid-icon').removeClass('active');
                $('#list-icon').addClass('active');
                $.cookie('view', 'list');
            } else {
                $('#list-icon').removeClass('active');
                $('#grid-icon').addClass('active');
                $.cookie('view', 'grid');

            }

            $('#current-view').val(view);
            $('#ex2').slider();
            loader('off');
        }
    });
}

function buyProduct(product_id, package_id, productStatus) {
    var basketCount = 0;
    if (typeof productStatus != "undefined") {
        basketCount = $('#input-number-' + productStatus + "-" + package_id).val();
    } else {
        basketCount = $('#input-number-' + package_id).val();
    }
    addToBasket(basketCount, product_id, package_id);
    $('#product-overley-' + product_id).css({
        'opacity': '1',
        'transition': 'all ease-in-out .45s'
    }).delay(1500).queue(function () {
        $(this).css({
            'opacity': '0',
            'transition': 'all ease-in-out .45s'
        }).dequeue();
    });
}
function orderProduct(product_id) {
    var canCount = $('#input-number-2').val();
    var package_id = $('#package-id').val();
    addToBasket(canCount, product_id, package_id);
}
function addAnswer(faq_id, answer) {
    $.ajax({
        url: '/' + language + '/faq/add-faqanswer/',
        method: 'post',
        data: {faq_id: faq_id, answer: answer},
        success: function (res) {
            console.log(res);
            //$('#products-part').html(res)
        }
    })
}

function removeBucketProduct(bucket_key, product_id,formview) {

    $.ajax({
        url: '/' + language + '/product/remove-from-bucket/',
        method: 'post',
        data: {bucket: bucket_key, product_id: product_id,formview:formview},
        success: function (res) {

            var obj = jQuery.parseJSON(res);

            var page = $('body');

            $('#card_pods_cnt').html(obj.totalCount);
            $('.shopping-cart').hide();
            if (obj.totalCount == 0) {

                $(".order-box").html(
                    '<div class="row"><div class="checkout_empty">'
                    + '<H2><div></div>Your Cart is Empty</H2><br>'
                    + '<div class="text-center"><a href="/product/index" class="btn btn-big btn-ship btn-back""><i class="material-icons">reply</i> Back To Products<i></i></a></div>'
                    + '</div></div>');
            }else{
                if(formview == 'order'){
                    $('.product-list-order').html(obj.html);
                    updateFreightForm();
                }else{
                    $('.cart-overlay').html(obj.html);
                }

            }
        }
    })
}
function changeCount(element, basket_key, product_id, cart) {//console.log($(element).parent().parent().parent());
    var $this = $(element);
    var oldValue = $this.siblings('.input-quantity').val();
    var newVal;
    if ($this.hasClass('plus')) {
        newVal = parseFloat(oldValue) + 1;
    } else {
        if (oldValue >= 1) {
            newVal = parseFloat(oldValue) - 1;
        } else {
            newVal = 0;
        }
    }
    if (typeof basket_key != 'undefined' && typeof product_id != 'undefined') {
        $.ajax({
            url: '/' + language + '/product/update-basket-product/',
            method: 'post',
            data: {package_id: basket_key, product_id: product_id, count: newVal},
            success: function (res) {

                var obj = jQuery.parseJSON(res);
                var status = getCheckProductData(element);
                $('.cart-overlay').html(obj.html);

                if(status.status == false){
                    $('body').find('.status_pr_'+ product_id).html('<i class="material-icons no" style="font-size: 18px; vertical-align: middle; color: orangered;">cancel</i>  ' + status.message);
                    $('body').find('.status_pr_'+ product_id).css( "color", "red");
                }else {
                    $('body').find('.status_pr_'+ product_id).html('<i class="material-icons yes" style="font-size: 18px; vertical-align: middle; color: green">check_circle</i> Available ' + status.message);
                    $('body').find('.status_pr_'+ product_id).css( "color", "green");
                }
                // $('.cart-overlay').html(htmll);
                //$('#basket-product-prices').html('$' + obj.basketTotalPrice);
                $('#bucket-total-price').html(obj.totalPrice);
                $('#bucket-discounted-price').html(obj.newPrice);
                $("input[name=totalPrice]").val(obj.realprice);
                $("input[name=totalDisPrice]").val(obj.totalPrice);
                $('#bucket-total-discount').html(obj.discount);
                $('#bucket-total-weight').html(obj.totalWeight);
                if(typeof cart != 'undefined'){
                    updateFreightForm();
                }
                //$('#order-package-price-' + basket_key).html(obj.packageTotalPrice + "$");
            }
        })
    }
    $this.siblings('.input-quantity').val(newVal);
    if(typeof product_id == 'undefined'){
        // product_id = $(element).parents('form').attr('data-id');
        getCheckProductData(element);
    }


    //console.log(product_id);console.log($(element).parents('form').children('input').val());
    // console.log(element);
    // var el = $(element).parent().parent().parent();
    // changeStatusText(product_id, el);
}

/*
* product append to product-package-selected-block div;
 * form data-id  product id
 * input data-id package id
 * */
function getCheckProductData(element) {
    var selectedBlock = $(element).parents('.product-package-selected-block');
    var forms = selectedBlock.find('.shop-quantity');
    // var productId = $(forms[0]).attr('data-id');
    var data = {};
    forms.each(function (index, el) {
        var input = $(el).children('input');
        data[$(input).attr('data-id')] = $(input).val();
    });

    var result = changeStatusText(data);
    var tag = selectedBlock.children('.stock-status');console.log(result);

    if(result.status == false){
        tag.html('<i class="material-icons no" style="font-size: 18px; vertical-align: middle; color: orangered">cancel</i>  ' + result.message);
        tag.css( "color", "red");
    }else{
        tag.html('<i class="material-icons yes" style="font-size: 18px; vertical-align: middle; color: green">check_circle</i> Available ' + result.message);
        tag.css('color', 'green');
    }return result;
    // $(tag).fadeIn(2000);
    // $(tag).fadeOut(500);
    // $(tag).fadeIn(2000);


}
function changeStatusText(data) {
// var product = $('.pr_'+product_id);
// el.children('li').each(function (index, element) {console.log()
//     console.log($(element).children().find('input').val());
// });
// var p = $(el).children('input'); console.log(p);
//     var Pckages = $(el).children('input').val();
//     var packs = Pckages.split(',');
//     var data ={};
//     // var form = $('.pr_form_'+ product_id).parent();
//     el.children('li').each(function (index, element) {console.log()
//         data[packs[index]] = $(element).children().find('input').val();
//     });
    var result = '';
    $.ajax({
        url: '/' + language + '/product/product-status',
        method: 'post',
        dataType: 'json',
        async: false,
        data: data,
        success: function (res) {
            result = res;
            // var teg = $(el).parent().parent().children('#status-message'+ product_id);
            // $(teg).html(res.message);
            // if(res.status == false){
            //     $(teg).css({color: "#fff", 'font-size':'14px', 'text-align': 'right'});
            //     $(el).parent().parent().css('background-color', 'salmon');
            //     // $('#status-message'+ product_id).css({color: "#fff", 'font-size':'14px', 'text-right': 'center'});
            //     //
            //     // $('#status-message'+ product_id).html(res.message);
            //     // $('#status-message'+ product_id).fadeIn(2000);
            //     // $('div[data-product-id="'+ product_id +'"]').children('i').unbind("click");
            //     // $('div[data-product-id="'+ product_id +'"]').children('i').removeClass('add-to-cart');
            //
            //     $(teg).show();
            // }else {
                // $(el).parent().parent().css('background-color', '#fff');
                // $(teg).css({color: "green", 'font-size':'14px', 'text-align': 'right'});
                // // $('#status-message'+ product_id).css({color: "green", 'font-size':'14px', 'text-align': 'right'});
                //
                // // $('div[data-product-id="'+ product_id +'"]').children('i').bind("click");
                // // $('#status-message'+ product_id).html('');
                // // $('div[data-product-id="'+ product_id +'"]').children('i').addClass('add-to-cart');
                // $(teg).fadeOut(2000);
            // }
            // $(teg).fadeIn(2000);
            // $(teg).fadeOut(500);
            // $(teg).fadeIn(2000);
            // $('#status-message'+ product_id).fadeIn(2000);
        }
    });
   return result;
}
function updateFreightForm(){
    var country_id =$("#country_list option:selected").val();
    if(!country_id){
        country_id = 58;
    }

    var weight = $("#bucket-total-weight").text();
    var price = $("input[name=totalPrice]").val();
    var checked = $('input[name=freightmethod]:checked').val()

    $.ajax({
        url: '/' + language + '/cart/update-freight-form/',
        method: 'post',
        data: {weight: weight, country_id: country_id, price: price,checked:checked},
        success: function (res) {
            var result = jQuery.parseJSON(res);
            $('.freight-form').html(result.html);
            $('#block_freightmethod  li:first-child').find('input').trigger('click');
            var priceForPay = calculatePriceForPaying(result.vatPercent);
            if(result.klarna && result.klarna=='enable'){
                if($('#klarna_block').hasClass('hide')){
                    $('#klarna_block').removeClass('hide');
                }
            }else{
                if(!$('#klarna_block').hasClass('hide')){
                    if($('#klarna-payment').is( ":checked" )){
                        $('#card-payment').attr('checked', 'checked');
                    }
                    $('#klarna_block').addClass('hide');
                }
            }


        }
    })

}
function calculatePriceForPaying (vat){

    if(!vat){
        vat = parseFloat($('#vat_percent').text());
    }
    var priceForPay =parseFloat($('#bucket-discounted-price').text());
    var payment_type = $('input[name=payment_type]:checked').val();

    var frPrice = $('input[name=freightmethod]:checked').attr('price');
    // if($('input[name=freightmethod]:checked')===false){
    //     $('#block_freightmethod  li:first-child').find('input').trigger('click');
    // }
    if(payment_type == 'cash'){
        priceForPay += parseFloat($('#cash_on_del').text());
        $('.postnor_fr').fadeOut(500);
        if($('input[name=freightmethod]:checked').parent('li').hasClass('postnor_fr')){
            $('.postnor_fr input:checked').prop('checked', false);
            frPrice = 0;
        }
    }


    if(typeof frPrice != 'undefined'){
        priceForPay += parseFloat(frPrice);
    }
    priceForPay= priceForPay + priceForPay*vat/100;

    $('#vat_percent').html(vat);

    if($('#use-coupon').length != 0){
        var couponType =$('#use-coupon').attr('data-type');
        var couponDiscount =$('#use-coupon').attr('value');
        if(couponType == 'percent'){
            priceForPay -=  priceForPay * couponDiscount /100;
        }
        if(couponType == 'price'){
          var priceByCoupon =  priceForPay - couponDiscount;
          if(priceByCoupon <= 0){
              priceForPay = 0.00;
          }
          else {
              priceForPay = priceByCoupon;
          }
        }
    }
    $('#paying-total-price').text(priceForPay.toFixed(2));
    return priceForPay.toFixed(2);
}
function changeCountSingle(element) {
    var $this = $(element);
    var oldValue = $this.parent().parent().find('.input-number').val();
    var newVal;
    if ($this.hasClass('can-increment')) {
        newVal = parseFloat(oldValue) + 1;
    } else {
        if (oldValue > 1) {
            newVal = parseFloat(oldValue) - 1;
        } else {
            newVal = 1;
        }
    }
    $this.parent().parent().find('.input-number').val(newVal);
}

$(document).ready(function () {
    $('input[type=radio][name=tab-control]').change(function () {
        if ($(this).prop("checked")) {
            alert("Allot Thai Gayo Bhai");
        } else if (this.value == 'transfer') {
            alert("Transfer Thai Gayo");
        }
    });
});

function contineToShipping() {
    var prod_count = $('body').find('tr[id^="bucket-info-"]');
    if (prod_count.length > 0) {
        // $('input[type="radio"][id="tab1"]').prop("disabled", false);
        $('input[type="radio"][id="tab2"]').prop("checked", true);
    }
}
function isValidEmailAddress(emailAddress) {
    var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    return pattern.test(emailAddress);
}
;

function contineToPayment() {
    // $('input').each(function() {
    //     if(!$(this).val()){
    //         alert('Some fields are empty');
    //         return false;
    //     }
    //     else{
    var error = false;
    var texts = [];
    var name = $('#name').val();
    if (name == "") {
        error = true;
        texts.push("Name can't be empty");
    }
    var lastname = $('#lastname').val();
    if (lastname == "") {
        error = true;
        texts.push("Last Name can't be empty");
    }
    var mobile_phone = $('#mobile_phone').val();
    if (mobile_phone == "") {
        error = true;
        texts.push("Mobile Phone can't be empty");
    }
    var email = $('#email').val();
    if (email == "") {
        error = true;
        texts.push("Email can't be empty");
    }
    if (email != "" && !isValidEmailAddress(email)) {
        error = true;
        texts.push("Email not valid");
    }
    var company = $('#company').val();
    if (company == "") {
        error = true;
        texts.push("Company Name can't be empty");
    }
    var country = $('#country').val();
    if (country == "") {
        error = true;
        texts.push("Country can't be empty");
    }
    var state = $('#state').val();
    if (state == "") {
        error = true;
        texts.push("State can't be empty");
    }
    var city = $('#city').val();
    if (city == "") {
        error = true;
        texts.push("City can't be empty");
    }
    var address = $('#address').val();
    if (address == "") {
        error = true;
        texts.push("Address can't be empty");
    }
//    if (address != "" && city != "" && country != "") {
//        var checkingAddress = {
//            'address':address,
//            'city':city,
//            'country':country
//        }
//        if (isValidAddress(checkingAddress)) {
//            error = true;
//            texts.push("Address not valid");
//        }
//    }
    var zip = $('#postcode').val();
    if (zip == "") {
        error = true;
        texts.push("Zip Code can't be empty");
    }

    if (!error) {
        var billingInfo = {
            'name': name,
            'lastname': lastname,
            'mobile_phone': mobile_phone,
            'email': email,
            'phone': $('#phone').val(),
        }
        var shippingInfo = {
            'company': company,
            'address': address,
            'city': city,
            'zip': zip,
            'country': country,
            'state': state
        }
        $.ajax({
            url: '/' + language + '/cart/save-address/',
            method: 'post',
            data: {billingInfo: billingInfo, shippingInfo: shippingInfo},
            success: function (res) {
                console.log(res)
                var obj = jQuery.parseJSON(res);
                if (obj.result) {
                    $('input[type="radio"][id="tab3"]').prop("checked", true);
                }
            }
        })

    } else {
        console.log(texts)
        var appends = "";
        for (i = 0; i < texts.length; i++) {
            appends += "<h1 style='color: red;'>" + texts[i] + "</h1>"
        }
        $("#modal-text").html(appends);
        $.magnificPopup.open({
            removalDelay: 500, //delay removal by X to allow out-animation,
            items: {
                src: '#modal-text'
            },
            // overflowY: 'hidden', //
            callbacks: {
                beforeOpen: function (e) {
                    var Animation = 'mfp-zoomIn';
                    this.st.mainClass = Animation;
                }
            },
            midClick: true // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
        });
    }
    //     }
    // });

}
function backToPrev() {
    var tabs = $('input[type="radio"][name="tab-control"]');
    $('body').find(tabs).each(function (index, value) {
        if ($(value).prop('checked')) {
            $(value).prev('input').prop("checked", true);
        }
    });

}

// function changePackage(package_id){
//     var product_id = $('#product_id').val();
//     $.ajax({
//         url: '/' + language + '/product/change-package/',
//         method: 'post',
//         data: {package_id: package_id},
//         success: function (res) {
//             var obj = jQuery.parseJSON(res);
//             console.log(obj);
//             $('#package-art-no').text(obj.art_num)
//             $('#package-weight').text(obj.weight)
//             $('#packge-price').text(obj.price)
//             $('#package-id').val(package_id)
//             $('.input-quantity').attr('id','input-number-'+package_id);
//             $('#item_buy').attr('onclick','buyProduct('+product_id+','+package_id+')');
//         }
//     })
// }


$(document).ready(function () {
    $(".tabs-menu a").click(function (event) {
        event.preventDefault();
        $(this).parent().addClass("current");
        $(this).parent().siblings().removeClass("current");
        var tab = $(this).attr("href");
        $(".tab-content").not(tab).css("display", "none");
        $(tab).fadeIn();
    });
});

$('#change-package').on('change', function () {
    if (this.value == 'can') {
        $('.item_can').each(function () {
            $(this).removeClass('hide');
        });
        $('.item_pack').each(function () {
            $(this).addClass('hide');
        });
        var prod_id = $('#product_id').val(), can_id = $('#can_id').attr('value');
        console.log(can_id);
        $("#item_buy").attr("onclick", "buyProduct(" + prod_id + ',' + can_id + ")");
    } else if (this.value == 'pack') {
        $('.item_pack').each(function () {
            $(this).removeClass('hide');
        });
        $('.item_can').each(function () {
            $(this).addClass('hide');
        });
        var prod_id = $('#product_id').val(), pack_id = $('#pack_id').attr('value');
        $("#item_buy").attr("onclick", "buyProduct(" + prod_id + ',' + pack_id + ")");
    }
})


$('.button-class').click(function () {
    var btn = $(this);
    $(btn).buttonLoader('start');
    setTimeout(function () {
        $(btn).buttonLoader('stop');
    }, 5000);
});


function loader(action) {
    if (action == 'on'){
        $(".loader-wrapper").fadeIn(100);
    }
    else if(action == 'off'){
        $(".loader-wrapper").fadeOut();
    }
}

$('body').on('click','div.select-country .options>li', function () {
    var countryName = $(this).attr('data-raw-value');
    $.ajax({
        type: "POST",
        url: "/" + language + '/customer/update-item',
        cache: false,
        async: false,
        data: {CustomerAddress: {country: countryName}},
        dataType: 'json',
        success: function (response) {
        }
    });

});


