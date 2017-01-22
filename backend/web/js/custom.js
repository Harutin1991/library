var url = window.location.pathname;
var language = url.split('/')[1];
var product_language;
$(document).ready(function () {
    var body = $('body');
    var $select2Event = $('#product-category_id');
    //$select2Event.on('change', function () {
    //    var category_id = $(this).val();
    //    if (category_id == '') {
    //        $('.area').html('')
    //    } else {
    //
    //    }
    //});

    var spl_url = url.split("/"), controller = spl_url[1];
    $('li.menu-link a').each(function (i, v) {
        var href = $(v).attr('href').split("/");
        if (href[1] == controller) {
            $('li.menu-link').removeClass('active');
            $(this).parent('li.menu-link').addClass('active');
        }
    });
    $('.menu-link a').click(function () {
        $('.menu-link').removeClass('active');
        $(this).parent('.menu-link').addClass('active');
    });
    $('.image-preview').click(function () {
        $('.image-preview').removeClass('default-view');
        $(this).addClass('default-view');
    });
    $(function () {
        function updateOrdering(selector) {
            var ordering = {};
            $('#tbl_' + selector + ' .ui-sortable tr').each(function (i, v) {
                $(this).attr('data-pjax', i + 1);
                ordering[i] = {
                    id: $(this).attr('data-key'),
                    ordering: $(this).attr('data-pjax')
                }
            });
            $.ajax({
                method: 'post',
                data: ordering,
                url: '/' + language + '/' + selector + '/update-ordering',
                success: function (res) {
                }
            });

        }

        //for inline ordering
        var tbl_category = $("#tbl_category> tbody");
        tbl_category.sortable();
        // tbody.disableSelection();
        tbl_category.sortable({
            stop: function (event, ui) {

                updateOrdering('category')
            }
        });
        var tbl_brand = $("#tbl_brand> tbody");
        tbl_brand.sortable();
        // tbody.disableSelection();
        tbl_brand.sortable({
            stop: function (event, ui) {

                updateOrdering('brand')
            }
        });
        // $( "#tbl_product> tbody" ).disableSelection();
    });

    $("#customerCreate").validate({
        rules: {},
        onfocusout: function (element) {
            $(element).valid();
        },
        errorClass: 'has-error',
        validClass: 'has-success',
        errorPlacement: function (error, element) {
            element.parent().next('.help-block').html(error.text())
        },
        highlight: function (element, errorClass, validClass) {
            $(element).parent().parent().parent().addClass(errorClass).removeClass(validClass);
            $(element).parent().parent().parent().addClass(errorClass);
        },
        unhighlight: function (element, errorClass, validClass) {
            $(element).parent().parent().parent().removeClass(errorClass).addClass(validClass);
            $(element).parent().parent().parent().removeClass(errorClass);
        }
    });
    $.validator.addMethod(
        "regex",
        function (value, element, regexp) {
            var re = new RegExp(regexp);
            return this.optional(element) || value.match(re);
        },
        "Please check your input."
    );

   /* // add new address start!
    body.on('click', '#add-address', function () {
        var c = 0;
        $('#tab1_2').find('.br_').each(function () {
            c += 1;
        });
        var def_addr = $('.b_' + (c - 1)).clone();
        var val = [];

        def_addr.find('input[type=text]').each(function (i, v) {
            var b = v.value;
            var t = typeof b;
            if ((b != '') && (t !== 'undefined')) {
                val.push(b);
            }
            var str = $(v).attr('name'),
                name = 'default';
            if (c > 1) {
                name = 'address' + (c - 1);
            }
            var sid = $(v).attr('id'),
                id = '';
            if (c > 1) {
                id = c - 1
            }
            var res_id = sid.replace(id, c);
            $(v).attr('id', res_id);
            var res = str.replace(name, 'address' + c);
            $(v).attr('name', res);
            $(v).val('');
        });
        if (val.length >= 1) {
            var cl = def_addr.attr('class');
            var newcl = cl.replace('b_' + (c - 1), 'b_' + c);
            def_addr.attr('class', newcl);
            def_addr.find('.has-success').removeClass('has-success');
            def_addr.find('.has-error').removeClass('has-error');
            def_addr.removeAttr('id');
            def_addr.find('.section-divider > span').text("Address" + c);
            c += 1;
            $(def_addr).appendTo($('#default-address').parent());
            $('.addr-err').remove();
            console.log("#customeraddress-lat" + (c - 1));
            $("#customeraddress-lat" + (c - 1)).rules("add", {
                regex: "^[a-zA-Z ]*$",
                messages: {
                    regex: "Enter valid lat."
                }
            });
            $("#customeraddress-long" + (c - 1)).rules("add", {
                regex: "^[a-zA-Z ]*$",
                messages: {
                    required: "Enter valid long."
                }
            });
            $("#customeraddress-city" + (c - 1)).rules("add", {
                regex: "^[a-zA-Z ]*$",
                messages: {
                    regex: "Enter valid city name."
                }
            });
            $("#customeraddress-address" + (c - 1)).rules("add", {
                regex: "^[A-Za-z0-9'\.\-\s\,\\]",
                messages: {
                    regex: "Amount in stock must be an integer"
                }
            });
            $("#customeraddress-state" + (c - 1)).rules("add", {
                regex: "^[a-zA-Z ]*$",
                messages: {
                    regex: "Enter valid state name."
                }
            });
            $("#customeraddress-country" + (c - 1)).rules("add", {
                regex: "^[a-zA-Z ]*$",
                messages: {
                    regex: "Enter valid country name."
                }
            });
        } else {
            if ($('.addr-err').length == 0) {
                $('.b_' + (c - 1) + ' > #spy1').append('<p class="addr-err">Please write in fields before add new address!</p>');
            }
        }


    });
    // add address end
    // remove address
    body.on('click', '#remove-address', function () {
        var c = 0;
        $('#tab1_2').find('.br_').each(function () {
            c += 1;
        });
        if (c != 1) {
            c -= 1;
            $('.b_' + c).remove();
            $("#customeraddress-lat" + c).rules("remove");
            $("#customeraddress-long" + c).rules("remove");
            $("#customeraddress-city" + c).rules("remove");
            $("#customeraddress-address" + c).rules("remove");
            $("#customeraddress-state" + c).rules("remove");
            $("#customeraddress-country" + c).rules("remove");
            return true;
        } else {
            return false;
        }
    });
    // remove address end
*/
    body.on('click', '.image-preview1', function () {
        $('.image-preview1').removeClass('default-img');
        $(this).addClass('default-img');
        var key = $(this).attr('data-id');
        $('#def_img_part_-1').val(key);
        $('#def_img_part_-1').prop('checked', true);

    });

    body.on('submit', '#productCreate', (function (e) {
        e.preventDefault();
        var form = $('#productCreate');
        var url = form.attr('action');
        var formData = new FormData(this);
        $.ajax({
            method: 'POST',
            url: url,
            data: formData,
            cache: false,
            dataType: 'json',
            processData: false, // Don't process the files
            contentType: false, // Set content type to false as jQuery will tell
            success: function (res) {
                if (res) {
                    document.getElementById("productCreate").reset();
                    $.pjax.reload({container: '#productPjaxtbl'});
                }
            }
        });
    }));

//    body.on('submit', '#productUpdate', (function (e) {
//        e.preventDefault();
//        var form = $('#productUpdate');
//        var url = form.attr('action');
//        if ($('input#product_id').val() != "") {
//            var product_id = $('input#product_id').val();
//        } else {
//            var product_id = "";
//        }
//        var formData = new FormData(this);
//        formData.append('product_id',product_id);
//        formData.append('language', product_language);
//        $.ajax({
//            method: 'POST',
//            url: url,
//            data: formData,
//            cache: false,
//            dataType: 'json',
//            processData: false, // Don't process the files
//            contentType: false, // Set content type to false as jQuery will tell
//            success: function (res) {
//                if (res) {                  
//                    document.getElementById("productUpdate").reset();
//                    $.pjax.reload({container: '#productPjaxtbl'});
//                }
//            }
//        });
//    }));
    body.on('submit', '#repairerCreate', (function (e) {
        e.preventDefault();
        var form = $('#repairerCreate');
        var url = form.attr('action');
        var formData = form.serialize();
        $.ajax({
            method: 'POST',
            url: url,
            data: formData,
            dataType: 'json',
            success: function (res) {
                if (res) {
                    document.getElementById("repairerCreate").reset();
                    $.pjax.reload({container: '#repaierPjaxtbl'});
                }
            }
        });
    }));
    body.on('submit', '#repairerUpdate', (function (e) {
        e.preventDefault();
        var form = $('#repairerUpdate');
        var url = form.attr('action');
        var formData = form.serialize();
        $.ajax({
            method: 'POST',
            url: url,
            data: formData,
            dataType: 'json',
            success: function (res) {
                if (res) {
                    document.getElementById("repairerUpdate").reset();
                    $.pjax.reload({container: '#repaierPjaxtbl'});
                }
            }
        });
    }));

    body.on('submit', '#customerCreate', (function (e) {
        e.preventDefault();
        var form = $('#customerCreate');
        var url = form.attr('action');
        var formData = form.serialize();
        $.ajax({
            method: 'POST',
            url: url,
            data: formData,
            success: function (res) {
                if (res) {
                    document.getElementById("customerCreate").reset();
                    $.pjax.reload({container: '#customerPjaxtbl'});
                }
            }
        });
    }));

    body.on('submit', '#repairCreate', (function (e) {
        e.preventDefault();
        var form = $('#repairCreate');
        var url = form.attr('action');
        var formData = form.serialize();
        $.ajax({
            method: 'POST',
            url: url,
            data: formData,
            dataType: 'json',
            success: function (res) {
                if (res) {
                    document.getElementById("repairCreate").reset();
                    $.pjax.reload({container: '#repairPjaxtbl'});
                }
            }
        });
    }));
    body.on('submit', '#repairUpdate', (function (e) {
        e.preventDefault();
        var form = $('#repairUpdate');
        var url = form.attr('action');
        var formData = form.serialize();
        $.ajax({
            method: 'POST',
            url: url,
            data: formData,
            dataType: 'json',
            success: function (res) {
                if (res) {
                    document.getElementById("repairUpdate").reset();
                    $.pjax.reload({container: '#repairPjaxtbl'});
                }
            }
        });
    }));
    body.on('submit', '#brandCreate', (function (e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        var form = $('#brandCreate');
        var url = form.attr('action');
        var formData = form.serialize();
        $.ajax({
            method: 'POST',
            url: url,
            data: formData,
            dataType: 'json',
            success: function (res) {
                if (res) {
                    $('#admin-alerts div').html('Brand successfully created');
                    $('#admin-alerts').show();
                    document.getElementById("brandCreate").reset();
                    $.pjax.reload({container: '#brandPjaxtbl'});
                }
            }
        });
    }));

    body.on('submit', '#serviceCreate', (function (e) {
        e.preventDefault();
        var form = $('#serviceCreate');
        var url = form.attr('action');
        var formData = new FormData(this);
        $.ajax({
            method: 'POST',
            url: url,
            data: formData,
            cache: false,
            dataType: 'json',
            processData: false, // Don't process the files
            contentType: false, // Set content type to false as jQuery will tell
            success: function (res) {
                if (res) {
                    document.getElementById("serviceCreate").reset();
                    $.pjax.reload({container: '#servicePjaxtbl'});
                }
            }
        });
    }));

    body.on('submit', '#serviceUpdate', (function (e) {
        e.preventDefault();
        var form = $('#serviceUpdate');
        var url = form.attr('action');
        var formData = new FormData(this);
        $.ajax({
            method: 'POST',
            url: url,
            data: formData,
            cache: false,
            dataType: 'json',
            processData: false, // Don't process the files
            contentType: false, // Set content type to false as jQuery will tell
            success: function (res) {
                if (res) {
                    document.getElementById("serviceUpdate").reset();
                    $.pjax.reload({container: '#servicePjaxtbl'});
                }
            }
        });
    }));

    body.on('submit', '#attrCreate', (function (e) {
        e.preventDefault();
        var form = $('#attrCreate');
        var url = form.attr('action');
        var formData = new FormData(this);
        $.ajax({
            method: 'POST',
            url: url,
            data: formData,
            cache: false,
            dataType: 'json',
            processData: false, // Don't process the files
            contentType: false, // Set content type to false as jQuery will tell
            success: function (res) {
                if (res) {
                    document.getElementById("attrCreate").reset();
                    $.pjax.reload({container: '#attrPjaxtbl'});
                }
            }
        });
    }));

    body.on('submit', '#attrUpdate', (function (e) {
        e.preventDefault();
        var form = $('#attrUpdate');
        var url = form.attr('action');
        var formData = new FormData(this);
        $.ajax({
            method: 'POST',
            url: url,
            data: formData,
            cache: false,
            dataType: 'json',
            processData: false, // Don't process the files
            contentType: false, // Set content type to false as jQuery will tell
            success: function (res) {
                if (res) {
                    document.getElementById("attrUpdate").reset();
                    //$.pjax.reload({container: '#attrPjaxtbl'});
                    $.pjax.reload({container: '#attrPjaxForm'});
                }
            }
        });
    }));

    // body.on('submit', '#categoryCreate', (function (e) {
    //     e.preventDefault();
    //     var form = $('#categoryCreate');
    //     var url = form.attr('action');
    //     var formData = form.serialize();
    //     $.ajax({
    //         method: 'POST',
    //         url: url,
    //         data: formData,
    //         dataType: 'json',
    //         success: function (res) {
    //             if (res) {
    //                 document.getElementById("categoryCreate").reset();
    //                 $.pjax.reload({container: '#categoryPjaxtbl'});
    //             }
    //         }
    //     });
    // }));
//    body.on('submit', '#categoryUpdate', (function (e) {
//        e.preventDefault();
//        var form = $('#categoryUpdate');
//        var url = form.attr('action');
//        var formData = form.serialize();
//        $.ajax({
//            method: 'POST',
//            url: url,
//            data: formData,
//            dataType: 'json',
//            success: function (res) {
//                if (res) {
//                    document.getElementById("categoryUpdate").reset();
//                    $.pjax.reload({container: '#categoryPjaxtbl'});
//                }
//            }
//        });
//    }));

    $('#product-imageFiles').on('fileselect', function (event, numFiles, label) {
        var first = $('.file-live-thumbs').find('.kv-file-content').first();
        first.parent().addClass('default-view');
        var index = first.parent().attr('data-fileindex');
        var key = parseInt(index);
        $('#def_img').val(key + 1);
        $('#def_img').prop('checked', true);
    });
});

jQuery(document).ready(function () {
    var body = $('body');
    "use strict";


    // Add Gallery Item to Lightbox
    $('.mix img').magnificPopup({
        type: 'image',
        gallery: {
            enabled: true,
            navigateByImgClick: true,
            preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
        },
        image: {
            titleSrc: false
        },
        callbacks: {
            beforeOpen: function (e) {
                // we add a class to body to indicate overlay is active
                // We can use this to alter any elements such as form popups
                // that need a higher z-index to properly display in overlays
                body.addClass('mfp-bg-open');

                // Set Magnific Animation
                this.st.mainClass = 'mfp-zoomIn';

                // Inform content container there is an animation
                this.contentContainer.addClass('mfp-with-anim');
            },
            afterClose: function (e) {

                setTimeout(function () {
                    body.removeClass('mfp-bg-open');
                    $(window).trigger('resize');
                }, 1000)

            },
            elementParse: function (item) {
                // Function will fire for each target element
                // "item.el" is a target DOM element (if present)
                // "item.src" is a source that you may modify
                item.src = item.el.attr('src');
            },
        },
        overflowY: 'scroll',
        removalDelay: 200, //delay removal by X to allow out-animation
        prependTo: $('#content_wrapper')
    });

    $('.cust_change_status').click(function () {
        var data = $(this).attr('data-pjax');
        $.ajax({
            url: '/' + language + '/customer/changestatus',
            method: 'post',
            data: {data: data},
            success: function (res) {
                if (res == 'true') {
                    $.pjax.reload({container: '#customerPjaxtbl'});
                }
            }
        });
    });
    body.on('click', '.comment_change_status', function () {
        var data = $(this).attr('data-pjax');
        $.ajax({
            url: '/' + language + '/comment/changestatus',
            method: 'post',
            data: {data: data},
            success: function (res) {
                if (res == 'true') {
                    $.pjax.reload({container: '#commentPj'});
                }
            }
        });
    });

    $('.prod_change_status ').click(function () {
        var data = $(this).find('a').attr('data-pjax');

        $.ajax({
            url: '/' + language + '/product/changestatus',
            method: 'post',
            data: {data: data},
            success: function (res) {
                if (res == 'true') {
                    $.pjax.reload({container: '#productPjaxtbl'})
                }
            }
        });
        return false;
    });

    $('.rep_change_status').click(function () {
        var data = $(this).attr('data-pjax');

        $.ajax({
            url: '/' + language + '/repairer/changestatus',
            method: 'post',
            data: {data: data},
            success: function (res) {
                if (res == 'true') {
                    $.pjax.reload({container: '#repaierPjaxtbl'})
                }
            }
        });
    });
//    $('.br_change_status').click(function () {
//        var data = $(this).attr('data-pjax');
//
//        $.ajax({
//            url: '/' + language + '/brand/changestatus',
//            method: 'post',
//            data: {data: data},
//            success: function (res) {
//                if (res == 'true') {
//                    $.pjax.reload({container: '#brandPjaxtbl'})
//                }
//            }
//        });
//    });
    $('.ser_change_status').click(function () {
        var data = $(this).attr('data-pjax');

        $.ajax({
            url: '/' + language + '/service/changestatus',
            method: 'post',
            data: {data: data},
            success: function (res) {
                if (res == 'true') {
                    $.pjax.reload({container: '#servicePjaxtbl'})
                }
            }
        });
    });
    $('.delete-product').click(function () {
        var data = $(this).find('a').attr('data-pjax');
        $.ajax({
            url: '/' + language + '/product/delete',
            method: 'post',
            data: {id: data},
            success: function (res) {
                if (res == '1') {
                    location.reload();
                }
            }
        });
    });
    $('button[type="reset"]').click(function () {
        var form = $(this).closest('form');
        form[0].reset();
        location.href = form.attr('action');
    })
});
function getProductAttr(category_id, language) {
    $.ajax({
        method: 'post',
        url: '/' + language + '/product/product-details',
        data: {category_id: category_id},
        success: function (res) {
            var input = '';
            for (var key in res) {
                var uc = res[key].charAt(0).toUpperCase() + res[key].slice(1).toLowerCase();
                input += '<div class="form-group field-productattribute-value">' +
                    '<div class="col-md-12" style="padding: 0"><label for="customer-name" class="field prepend-icon">' +
                    '<input class="form-control" name="ProductAttribute[value][' + key + ']" placeholder="' + uc + '" type="text">' +
                    '<label for="customer-name" class="field-icon"><i class="fa fa-tags"></i></label>' +
                    '</label><div class="help-block"></div></div></div>';
            }
            $('.area').html(input);
        }
    });
}

function translatePage(category, language) {
    if (category == 'category') {
        var category_id = "";
        if ($('input#ctegory_id').val() != "") {
            var category_id = $('input#ctegory_id').val();
        }
        var category_name = $('#trcategory-name').val();
        var category_short_description = $('#trcategory-short_description').val();
        var category_description = $('#trcategory-description').val();
        var json_data = {
            'name': category_name,
            'short_description': category_short_description,
            'description': category_description,
            'language': language,
            'category_id': category_id
        }
        $.ajax({
            method: 'post',
            url: '/' + language + '/category/create',
            data: {formData: json_data},
            success: function (res) {
                var obj = jQuery.parseJSON(res);
                console.log(obj)
                $('input#ctegory_id').val(obj.category_id);
                $('.table-responsive').html(obj.html);
            }
        });
    }
    if (category == 'attribute') {
        var attribute_id = "";
        if ($('input#ctegory_id').val() != "") {
            var attribute_id = $('input#attribute_id').val();
        }
        var attribute_name = $('#trattribute-name').val();
        var tr_category_id = $('#trattribute-category_id').val();
        var json_data = {
            'name': attribute_name,
            'tr_category_id': tr_category_id,
            'language': language,
            'attribute_id': attribute_id
        }
        $.ajax({
            method: 'post',
            url: '/' + language + '/attribute/create',
            data: {formData: json_data},
            success: function (res) {
                var obj = jQuery.parseJSON(res);
                console.log(obj)
                $('input#attribute_id').val(obj.attribute_id);
                $('.table-responsive').html(obj.html);
            }
        });
    }

    if (category == 'product') {
        console.log(132)
        product_language = language;
        $('form#productUpdate').submit();

    }

}
function changeStatus(data) {
    $.ajax({
        url: '/' + language + '/brand/changestatus',
        method: 'post',
        data: {data: data},
        success: function (res) {
            if (res == 'true') {
                $.pjax.reload({container: '#brandPjaxtbl'})
            }
        }
    });
}
function changePackageStatus(data) {
    $.ajax({
        url: '/' + language + '/product-package/changestatus',
        method: 'post',
        data: {data: data},
        success: function (res) {
            if (res == true) {
                $.pjax.reload({container: '#productPackagePjaxtbl'})
            }
        }
    });
}
function changeOrderStatus(data) {
    $.ajax({
        url: '/' + language + '/order/check-box',
        method: 'post',
        data: {data: data},
        success: function (res) {
            if (res == 1) {
                $.pjax.reload({container: '#orderPjaxtbl'})
            }
        }
    });
}
function changeCoutryStatus(data) {
    $.ajax({
        url: '/' + language + '/countries/changestatus',
        method: 'post',
        data: {data: data},
        success: function (res) {
            if (res == 'true') {
                $.pjax.reload({container: '#countryPjaxtbl'})
            }
        }
    });
}
function changeCountryVat(id) {
    var percent = $("#vat_" + id).val();
    $.ajax({
        url: '/' + language + '/countries/update-vat',
        method: 'post',
        data: {id: id, value: percent},
        success: function (res) {
            if (res == 'true') {
                $.pjax.reload({container: '#countryPjaxtbl'})
            }
        }
    });
}
function addPrice() {
    var price = $("input[name=price]").val();
    var weight_from = $("input[name=weight_from]").val();
    var weight_to = $("input[name=weight_to]").val();
    var zone = $("input[name=zone]").val();

    $.ajax({
        url: '/' + language + '/zones/add-price',
        method: 'post',
        data: {price: price, weight_from: weight_from, weight_to: weight_to, zone_id: zone},
        success: function (res) {
            $('#zone_prices').html(res);
        }
    });
}

function updatePrice(id) {
    var price = $("input[name='price_" + id + "']").val();
    var weight_from = $("input[name='weight_from_" + id + "']").val();
    var weight_to = $("input[name='weight_to_" + id + "']").val();
    var zone = $("input[name=zone]").val();

    $.ajax({
        url: '/' + language + '/zones/update-price',
        method: 'post',
        data: {price: price, weight_from: weight_from, weight_to: weight_to, zone_id: zone, id: id},
        success: function (res) {
            $('#zone_prices').html(res);
        }
    });
}

function deletePrice(id) {
    var zone = $("input[name=zone]").val();
    $.ajax({
        url: '/' + language + '/zones/delete-price',
        method: 'post',
        data: {zone_id: zone, id: id},
        success: function (res) {
            $('#zone_prices').html(res);
        }
    });
}
function addDiscount() {
    var discount = $("input[name='discount']").val();
    var price_from = $("input[name='price_from']").val();
    var price_to = $("input[name='price_to']").val();
    // var type = $("#type").val();
    // var e = document.getElementById("type");
    // var type = e.options[e.selectedIndex].value;
    var shiping = ($("input[name='shipping']").prop('checked') == true) ? 1 : 0;

    $.ajax({
        url: '/' + language + '/discount/create',
        method: 'post',
        data: {discount: discount, price_from: price_from, price_to: price_to, shipping: shiping, type: 0},
        success: function (res) {
            $('#discount_prices').html(res);
        }
    });
}

function updateDiscount(id) {
    var discount = $("input[name='discount_" + id + "']").val();
    var price_from = $("input[name='price_from_" + id + "']").val();
    var price_to = $("input[name='price_to_" + id + "']").val();
    // var type = $("#type_"+id+"").val();
    // var e = document.getElementById("type_"+id+"");
    // var type = e.options[e.selectedIndex].value;

    var shiping = ($("input[name='shipping_" + id + "']").prop('checked') == true) ? 1 : 0;
    $.ajax({
        url: '/' + language + '/discount/update',
        method: 'post',
        data: {discount: discount, price_from: price_from, price_to: price_to, id: id, shipping: shiping, type: 0},
        success: function (res) {
            $('#discount_prices').html(res);
        }
    });
}

function deleteDiscount(id) {
    $.ajax({
        url: '/' + language + '/discount/delete',
        method: 'post',
        data: {id: id},
        success: function (res) {
            $('#discount_prices').html(res);
        }
    });
}

$(document).ready(function () {
    // PNotify Plugin Event Init
    $('.notification').on('click', function (e) {
        if ($(this).attr('title') == 'Available Product') {
            e.preventDefault();
        }
        var noteStyle = $(this).data('note-style');
        var noteShadow = $(this).data('note-shadow');
        var noteOpacity = $(this).data('note-opacity');
        var noteStack = $(this).data('note-stack');
        var notetitle = $(this).attr('title');
        var width = "220px";

        // If notification stack or opacity is not defined set a default
        var noteStack = noteStack ? noteStack : "stack_top_right";
        var noteOpacity = noteOpacity ? noteOpacity : "1";

        // We modify the width option if the selected stack is a fullwidth style
        function findWidth() {
            if (noteStack == "stack_bar_top") {
                return "100%";
            }
            if (noteStack == "stack_bar_bottom") {
                return "70%";
            } else {
                return "220px";
            }
        }

        PNotify.prototype.options.styling = "fontawesome";
        // Create new Notification
        new PNotify({
            title: notetitle,
            text: 'Product Available',
            shadow: noteShadow,
            opacity: noteOpacity,
            addclass: noteStack,
            type: noteStyle,
            // stack: Stacks[noteStack],
            width: findWidth(),
            delay: 1400
        });

    });


});
var count_input = document.getElementById("count_input");

if (count_input) {
    count_input.addEventListener("focusout", statusPackage);
}

function statusPackage() {
    var count = $('#count_input').val();
    count = parseInt(count);
    if (count != 0 && typeof count == "number") {
        var productId = $('#productId').val();
        var data = {};
        data.id = productId;
        data.p_count = count;
        $.ajax({
            method: 'POST',
            url: "/" + language + "/product-package/status",
            dataType: 'json',
            data: data,
            cache: false,
            async: false,
            success: function (res) {
                console.log(res.message);
                $('#stock_status input').val(res.message);
                if (res.status == true) {
                    if ($('#info-color').hasClass('has-error')) {
                        $('#info-color').removeClass('has-error').addClass('has-success');
                    }
                    $('#stock_status').removeClass('hide');
                    $('#stock_status').addClass('show');
                } else {
                    if ($('#info-color').hasClass('has-success')) {
                        $('#info-color').addClass('has-error');
                    } else {
                        $('#info-color').addClass('has-error');
                    }
                    $('#stock_status').removeClass('hide');
                    $('#stock_status').addClass('show');
                }
            }
        });
    }
}
// );