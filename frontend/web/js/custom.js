$(document).ready(function () {
    var $body = $('body');
    $(".menu a").click(function () {
        $(".toggle").toggleClass("rotate-icon");
        $(".side-navigation").toggleClass("rotate-angle");
    });
    $('#select-brand').on('change', function () {
        var brand_id = $(this).val();
        if (brand_id != '') {
            $.ajax({
                method: 'post',
                data: {brand_id: brand_id},
                url: '/service/filterbrand',
                success: function (res) {
                    var data = JSON.parse(res);
                    var opt = '<option value="">Select product ...</option>';
                    for (var i in data) {
                        opt += '<option value="' + i + '">' + data[i] + '</option>'
                    }
                    $('#select-product').html(opt);
                }
            });
        }
    });

    $('#select-product').on('change', function () {
        $('.loder-icon').css('display', 'block');
        var product_id = $(this).val();
        if (product_id != '') {
            $.ajax({
                url: '/service/filterproduct',
                method: 'post',
                data: {product_id: product_id},
                success: function (res) {
                    $('.loder-icon').css('display', 'none');
                    $('#serv-container').html(res);
                    var owl = $("#serv-carusel");
                    owl.owlCarousel({
                        autoPlay: false,
                        lazyLoad: true,
                        navigation: false, // Show next and prev buttons
                        slideSpeed: 300,
                        paginationSpeed: 400,
                        singleItem: true
                    });

                    $(".next").click(function () {
                        owl.trigger("owl.next");
                    });
                    $(".prev").click(function () {
                        owl.trigger("owl.prev");
                    })
                }
            })

        }
    });

    $body.on('click', '.add-to-cart', function () {
        var servid = $(this).attr('data-key');
        var price = $(this).parent().prev('.srv-price').text();
        var total = $('#total-price').text();
        total = parseFloat(total);
        price = parseFloat(price);
        total += price;
        $('#total-price').text(total + "€");
        var cart_count = $('#cart-count').text(),
                count = parseInt(cart_count);
        count += 1;
        $('#cart-count').text(count);
        $.ajax({
            url: '/cart/add',
            data: {service_id: servid, price: price},
            method: 'post',
            success: function (res) {

            }
        })
    });

    $('#see-phone').click(function () {
        $('#phone').css('display', 'inline-block');
        $(this).css('display', 'none');
    });

    $('#phone').click(function () {
        $('#see-phone').css('display', 'inline-block');
        $(this).css('display', 'none');
    });

    $('#add_new-address').submit(function (e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        var form = $('#add_new-address');
        var url = form.attr('action');
        var formData = $('#add_new-address').serializeArray();
        var obj = {};
        for (var i in formData) {
            obj[formData[i].name] = formData[i].value
        }

        $.ajax({
            url: url,
            data: formData,
            method: 'post',
            success: function (res) {
                var data = JSON.parse(res);
                if (data.success == true) {
                    var lastAddr = $('#address-cont').find('.col-md-4').last();
                    var address = obj['Address[strnumb]'] + ' ' + obj['Address[addr1]'];
                    var addr = address.trim(),
                            city = obj['Address[city]'].trim(),
                            state = obj['Address[state]'].trim(),
                            country = obj['Address[country]'].trim(),
                            phone = obj['Address[phone]'].trim(),
                            email = obj['Address[email]'].trim(),
                            name = obj['Address[name]'].trim();
                    var first = name.split(" ")[0];
                    var last = '';
                    if (name.split(" ")[1]) {
                        last = name.split(" ")[1];
                    }
                    if (lastAddr.length > 0) {
                        var newAddr = lastAddr.clone();
                        newAddr.attr('id', data.message);
                        newAddr.find('.addr').text(addr);
                        newAddr.find('.cs').text(city + ' ' + state);
                        newAddr.find('.co').text(country);
                        newAddr.find('.phone').text(": " + phone);
                        newAddr.find('.email').text(": " + email);
                        newAddr.find('.edit').attr('data-key', data.message);
                        newAddr.find('.remove').attr('data-key', data.message);
                        newAddr.find('.url').attr('href', '/service/pay?address=' + data.message);
                        $(newAddr).appendTo('#address-cont');
                    } else {
                        var asd = '<div class="col-md-4 pt15" id="' + data.message + '">' +
                                '<div class="step-2-inner">' +
                                '<div class="step-2-content">' +
                                '<h4>' + first + ' ' + last + '</h4>' +
                                '<address>' +
                                '<div class="addr">' + addr +
                                '</div><div class="cs">' + city + ' ' + state +
                                '</div><div class="co">' + country +
                                '</div></address>' +
                                '<h6><span>Phone</span><a class="phone" href="tel:0987654321">: ' + phone + '</a></h6>' +
                                '<h6><span>Email</span><a class="email" href="mailto:">: ' + email + '</a></h6>' +
                                '<div class="step-2-btn">' +
                                '<div class="col-md-12 pn">' +
                                '<div class="col-md-2 pn" style="margin-right: 12px">' +
                                '<a href="javasqript: void(0)" data-key="' + data.message + '" class="edit plr15">Edit </a>' +
                                '</div>' +
                                '<div class="col-md-3 pn mr5">' +
                                '<a href="javasqript: void(0)" data-key="' + data.message + '" class="remove dlt-btn plr15">Delete</a>' +
                                '</div>' +
                                '<div class="col-md-6 pn">' +
                                '<a class="url plr15" href="/service/pay?address=' + data.message + '">Use this Address</a>' +
                                '</div> </div></div></div></div></div>';
                        $(asd).appendTo('#address-cont');
                    }

                    form[0].reset()
                } else if (data.success == false) {
                    $.notify({
                        // options
                        icon: 'fa fa-exclamation-triangle ',
                        title: false,
                        message: data.message
                    }, {
                        // settings
                        element: 'body',
                        position: null,
                        type: "danger",
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
                        delay: 5000,
                        timer: 1000,
                        animate: {
                            enter: 'animated fadeInDown',
                            exit: 'animated fadeOutUp'
                        }
                    });
                } else if (data.success == 'error') {
                    var mess = '';
                    for (var i in data.message) {
                        mess += '<p>' + data.message[i] + '</p>'
                    }

                    $.notify({
                        // options
                        icon: 'fa fa-exclamation-triangle ',
                        title: false,
                        message: mess
                    }, {
                        // settings
                        element: 'body',
                        position: null,
                        type: "danger",
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
                        delay: 5000,
                        timer: 1000,
                        animate: {
                            enter: 'animated fadeInDown',
                            exit: 'animated fadeOutUp'
                        }
                    });
                }
                return true;
            }
        });
        return true;
    });
    $body.on('click', '.remove', function () {
        var key = $(this).attr('data-key');
        if (confirm("Are you sure you want to delete address?")) {
            $.ajax({
                url: '/customer/delete',
                data: {id: key},
                method: 'post',
                success: function (res) {
                    var data = JSON.parse(res);
                    if (data.success) {
                        $('#' + key).remove();
                    }
                }
            })
        }
    });
    $body.on('click', '.edit', function () {
        var key = $(this).attr('data-key');

        $.ajax({
            url: '/customer/edite-address',
            data: {id: key},
            method: 'post',
            success: function (res) {
                $('#myModal-body').html(res);
                $('#myModal').modal({
                    backdrop: 'static'
                }).on("shown.bs.modal", function () {
                    var autocomplete1;
                    var componentForm = {
                        x_street_number: 'short_name',
                        x_route: 'long_name',
                        x_sublocality_level_1: 'long_name',
                        x_locality: 'long_name',
                        x_administrative_area_level_1: 'short_name',
                        x_country: 'long_name',
                        x_postal_code: 'short_name'
                    };

                    function init() {
                        // Create the autocomplete1 object, restricting the search
                        // to geographical location types.

                        autocomplete1 = new google.maps.places.Autocomplete(
                                /** @type {HTMLInputElement} */(document.getElementById('searchText')),
                                {types: ['geocode']});
                        // When the user selects an address from the dropdown,
                        // populate the address fields in the form.

                        google.maps.event.addDomListener(autocomplete1, 'place_changed', function () {
                            fillInAddress();
                        });
                    }


                    // [START region_fillform]
                    function fillInAddress() {
                        // Get the place details from the autocomplete1 object.
                        var place = autocomplete1.getPlace();
                        var address, loc;
                        for (var component in componentForm) {
                            if (component == 'x_sublocality_level_1') {
                            } else {
                                document.getElementById(component).value = '';
                                document.getElementById(component).disabled = false;
                            }
                        }

                        if (place['address_components'] == null) {
                            $.get({
                                url: "https://maps.googleapis.com/maps/api/geocode/json?address=" + place.name,
                                success: function (res) {
                                    address = res.results[0];
                                    // Get each component of the address from the place details
                                    // and fill the corresponding field on the form.
                                    for (var i = 0; i < address.address_components.length; i++) {
                                        var addressType = address.address_components[i].types[0];
                                        var component = 'x_' + addressType;
                                        if (componentForm[component]) {
                                            if (component == 'x_sublocality_level_1') {
                                                loc = address.address_components[i][componentForm[component]];
                                                document.getElementById('x_locality').value = loc;
                                            } else {
                                                var val = address.address_components[i][componentForm[component]];
                                                document.getElementById(component).value = val;
                                            }
                                        }
                                    }
                                }
                            });
                        } else {
                            address = autocomplete1.getPlace();
                            // Get each component of the address from the place details
                            // and fill the corresponding field on the form.

                            for (var i = 0; i < address.address_components.length; i++) {
                                var addressType = address.address_components[i].types[0];
                                var component = 'x_' + addressType;
                                if (componentForm[component]) {
                                    if (component == 'x_sublocality_level_1') {
                                        loc = address.address_components[i][componentForm[component]];
                                        document.getElementById('x_locality').value = loc;
                                    } else {
                                        var val = address.address_components[i][componentForm[component]];
                                        document.getElementById(component).value = val;
                                    }
                                }
                            }
                        }
                    }

                    init();
                    // google.maps.event.addDomListener(autocomplete1, 'clock', init);
                    // [END region_fillform]
                });
                $('#myModal').on('hidden.bs.modal', function () {
                    $('#myModal .error-block').css('display', 'none').html('')
                });
                $('#save-address').on('submit', function (e) {
                    e.preventDefault();
                    e.stopImmediatePropagation();
                    var formData = $(this).serializeArray();
                    var obj = {};
                    for (var i in formData) {
                        obj[formData[i].name] = formData[i].value
                    }
                    var addr = $('#' + key);

                    $.ajax({
                        url: $(this).attr('action'),
                        data: formData,
                        method: 'post',
                        success: function (res) {
                            var data = JSON.parse(res);
                            if (data.success == true) {
                                var str_num = obj['CustomerAddress[str_num]'],
                                        address = (str_num) ? str_num + ' ' + obj['CustomerAddress[address]'] : obj['CustomerAddress[address]'],
                                        city = obj['CustomerAddress[city]'].trim(),
                                        state = obj['CustomerAddress[state]'].trim(),
                                        country = obj['CustomerAddress[country]'].trim();
                                $('#myModal').modal('hide');
                                addr.find('.addr').text(address);
                                addr.find('.cs').text(city + ' ' + state);
                                addr.find('.co').text(country);
                            } else {
                                var mess = '',
                                        p_start = '<p class="pn mn">',
                                        p_end = '</p>';
                                if (typeof data.message == 'object') {
                                    for (var i  in data.message) {
                                        mess += p_start + data.message[i][0] + p_end;
                                    }
                                } else {
                                    mess += p_start + data.message + p_end;
                                }
                                $.notify({
                                    // options
                                    icon: 'fa fa-exclamation-triangle ',
                                    title: false,
                                    message: mess
                                }, {
                                    // settings
                                    element: 'body',
                                    position: null,
                                    type: "danger",
                                    allow_dismiss: true,
                                    newest_on_top: false,
                                    showProgressbar: false,
                                    placement: {
                                        from: "top",
                                        align: "right"
                                    },
                                    offset: 20,
                                    spacing: 10,
                                    z_index: 99999,
                                    delay: 5000,
                                    timer: 1000,
                                    animate: {
                                        enter: 'animated fadeInDown',
                                        exit: 'animated fadeOutUp'
                                    }
                                });
                            }
                            // $('#myModal').on('hidden.bs.modal', function () {
                            //     $('#myModal .error-block').css('display', 'none').html('')
                            // })
                        }
                    })
                })
            }
        })
    });
    $('#cancl-ordr').click(function () {
        var Ids = $(this).attr('data-key');
        if (confirm("Are you sure you want to cancel order?")) {
            $.ajax({
                url: '/service/cansel-order',
                method: 'post',
                data: {ids: Ids},
                success: function (res) {
                    if (!res) {
                        location.replace('/site/index')
                    } else {
                        var data = JSON.parse(res);
                        $.notify({
                            // options
                            icon: 'fa fa-exclamation-triangle ',
                            title: false,
                            message: data.message
                        }, {
                            // settings
                            element: 'body',
                            position: null,
                            type: "danger",
                            allow_dismiss: true,
                            newest_on_top: false,
                            showProgressbar: false,
                            placement: {
                                from: "top",
                                align: "right"
                            },
                            offset: 20,
                            spacing: 10,
                            z_index: 99999,
                            delay: 5000,
                            timer: 1000,
                            animate: {
                                enter: 'animated fadeInDown',
                                exit: 'animated fadeOutUp'
                            }
                        });
                    }

                }
            })
        }
    });

    $(function () {

        $('button[data-toggle="collapse"]').on('click', function () {
            var $this = $(this);
            if ($this.hasClass('active')) {
                $this.removeClass('active');
            } else {
                $this.addClass('active');
            }
        });
    });

    setInterval(function () {
        var data = $('#cancl-ordr').attr('data-key');
        if (data) {
            var datares = JSON.parse(data)[0];
            $.ajax({
                url: '/service/progress',
                data: {id: datares},
                method: 'post',
                success: function (res) {
                    var line = $('.bg-line #line');
                    if (res == 2) {
                        $('#complete').addClass('blank');
                        $('#despatch').addClass('blank');
                        line.animate({"width": "0%"}, "slow");
                    }
                    if (res == 1) {

                        $('#despatch').addClass('blank');
                        line.animate({"width": "34%"}, "slow");
                    }
                    if (res == 0) {
                        line.animate({"width": "68%"}, "slow");
                    }
                }
            })
        }
    }, 2000);
});

