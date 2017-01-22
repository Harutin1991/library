/**
 * Created by comp3 on 20.11.2016.
 */
var url = window.location.pathname;
var language = url.split('/')[1];

$(document).ready(function(){

    $('#send_comment').click(function () {

        $('#comment_area').parent().removeClass('has-error');

        var user_id = $('#user_id').val();
        var product_id = $('#product_id').val();
        var comment = $('#comment_area');

        if(comment.val().trim() != ""){
            $.ajax({
                url: '/' + language + "/product/add-comment",
                type:'post',
                data:{
                    userId:user_id,
                    productId:product_id,
                    comment:comment.val()
                },
                beforeSend: function( xhr ) {
                    loader('on');
                },
                success:function(data){
                    if(data == 1){
                        comment.val(' ');
                        $.ajax({
                            url: '/' + language + "/product/refresh-comments",
                            type:'post',
                            data:{
                                productId:product_id
                            },
                            success:function(data){

                                $('.comment_show_area').html(data);
                                $('#verify_message').html('Soon your message will be approved by admin');
                            }

                        })
                    }
                    loader('off');
                }
            })
        }else{
            $('#comment_area').parent().addClass('has-error');
        }
    });

    // setInterval(function(){
    //     var url = window.location.pathname;
    //     var language = url.split('/')[1];
    //     $.ajax({
    //         url: '/' + language + "/site/mess-count",
    //
    //         dataType: 'json',
    //
    //         success: function(data){
    //             $(".messCount").html(data);
    //         }
    //
    //     });
    // }, 3000);

    $('.sendmess').click(function(event){
        //event.preventDefault();
        var url = window.location.pathname;
        var data  = $("#contact-form").serializeArray();
        var language = url.split('/')[1];
        var sender_user = $("#sendmess-sender_user_id").val();
        var title = $("#sendmess-title").val();
        var recipient_user = $("#sendmess-recipient_user_id").val();
        var content = $("#sendmess-content").val();
        if(title == '' || content == ''){
            alert('Empty field!!!');
            return false;
        }else {
            $.ajax({
                url: '/' + language + "/user/send-message",
                type: 'POST',
                data: data,
                dataType: 'json',
                success: function (res) {
                    $("#user_mess").append("<h2 style='font-size: 23px'>"+title+"</h2>" +
                        "<div>"+res.name+"&nbsp;"+res.surname+"</div>"+"<span style='font-size: 12px'>"+res.date+"</span>"+ "<div>"+content+"</div>"
                    );
                    $("#sendmess-title").val('');
                    $("#sendmess-content").val('');

                }
            });
        }
    });




});
