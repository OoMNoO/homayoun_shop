
(function ($) {
    "use strict";

    /*==================================================================
    [ Validate ]*/
    var input = $('.validate-input .input100');

    $('.validate-form #login').on('click',function(){
        event.preventDefault()
        var check = true;

        for(var i=0; i<input.length; i++) {
            if(validate(input[i]) == false){
                showValidate(input[i]);
                check=false;
            }
        }
        if(check){
            console.log("on login : ", check)
            let login_info = {
                "username": $("#username").val(),
                "password": $("#password").val()
            } 
            $.ajax({
                url: "/api/login",
                type: 'POST',
                contentType: "application/json",
                data: JSON.stringify(login_info),
                datatype: 'json',
                success: function (data) { 
                    console.log("on login success")
                    console.log("data: ", data)
                    if (data.user_data){
                        let user_data = data.user_data
                        console.log(user_data);
                        // TODO: save user data in localstorage
                        // TODO: nav to main page
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) { 
                    console.log("on login failure")
                    console.log(jqXHR);
                    console.log(textStatus);
                    console.log(errorThrown);
                    if (jqXHR.responseJSON){
                        let error_message = jqXHR.responseJSON
                        console.log(error_message);
                    }
                }
            });
        }
    });

    $('.validate-form #signup').on('click',function(){
        event.preventDefault()
        var check = true;

        for(var i=0; i<input.length; i++) {
            if(validate(input[i]) == false){
                showValidate(input[i]);
                check=false;
            }
        }
        if(check){
            console.log("on signup : ", check)
            let signup_info = {
                "username": $("#username").val(),
                "password": $("#password").val(),
                "name": $("#name").val(),
                "email": $("#email").val(),
                "address": $("#address").val()
            } 
            $.ajax({
                url: "/api/signup",
                type: 'POST',
                contentType: "application/json",
                data: JSON.stringify(signup_info),
                datatype: 'json',
                success: function (data) { 
                    console.log("on login success")
                    console.log("data: ", data)
                    if (data.user_data){
                        let user_data = data.user_data
                        console.log(user_data);
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) { 
                    console.log("on login failure")
                    console.log(jqXHR);
                    console.log(textStatus);
                    console.log(errorThrown);
                    if (jqXHR.responseJSON){
                        let error_message = jqXHR.responseJSON
                        console.log(error_message);
                    }
                }
            });
        }
    });


    $('.validate-form .input100').each(function(){
        $(this).focus(function(){
           hideValidate(this);
        });
    });

    function validate (input) {
        if($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
            if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                return false;
            }
        }
        else {
            if($(input).val().trim() == ''){
                return false;
            }
        }
    }

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }
    
    

})(jQuery);