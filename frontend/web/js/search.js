var uri = '/product/search';
var url = window.location.pathname;
var limit = 5;
var language = url.split('/')[1];
$(document).ready(function () {
    $('#search_input').keyup(function () {
        var name = $('#search_input').val();
        if (name.length > 2) {
            var result = getProductsAjaxQuery(name, limit);
            $('.search_overlay').show();
            $('#search_result').css('display', 'block');
            $('#search_result').addClass('block');
            $('#search_result').html();
            $('#search_result').html(result);
        } else {
            $('#search_result').css('display', 'none');
            $('#search_result').css('display', 'none');
            $('.search_overlay').css('display', 'block');
        }
        $('.search_overlay').click(function () {
            $('#search_result').css('display', 'none');
            $('#search_result').css('display', 'none');
            $(this).hide();
        })
    })

})
function getProductsAjaxQuery(pr_name, limit) {
    var res = '';
    $.ajax({
        type: "POST",
        url: "/" + language + uri,
        cache: false,
        async: false,
        data: {name: pr_name, limit: limit},
        dataType: 'json',
        success: function (response) {
            console.log(response)
            //var obj = jQuery.parseJSON(response);
            res = response.html
            if (obj.html != "") {
//                res += '<div class="search_inner"><ul>';
//                for (var i = 0; i < response.length; i++) {
//                    res += "<li><div class='prod_search_img'>" + response[i].image
//                            + "</div><div><a href='/product/index/" + response[i].id + "'>" + response[i].name + "</a></div><div class='pull-right'><a href='/product/view?id=" + response[i].id + "' class='btn buy_btn'>BUY</a></div></li>";
//
//                }
//                if (response.length == 5) {
//                    res += "<a href='/product/products?name=" + pr_name + "' class='search_more_result btn'> More result </a>";
//                }
//                res += '</div></ul>';

            }
        }
    });
    return res;
}