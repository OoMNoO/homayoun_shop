(function ($) {
  "use strict";

  let token = localStorage.getItem("token");
  let user_data = localStorage.getItem("user_data");
  if (token && user_data) {
    token = JSON.parse(token);
    user_data = JSON.parse(user_data);
    console.log(token);
    $("#login_nav").hide();
    $("#signup_nav").hide();
    $("#profile_nav").removeClass("d-none");
    $("#profile_nav a #user-name").html(user_data.name);

    $("#profile_nav").on("click", function () {
      event.preventDefault();
      $.ajax({
        url: "/api/logout",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({
          token: token,
        }),
        datatype: "json",
        success: function (data) {
          console.log("on logout success");
          localStorage.removeItem("token");
          localStorage.removeItem("user_data");
          $("#login_nav").slideDown();
          $("#signup_nav").slideDown();
          $("#profile_nav").hide();
          $("#profile_nav a #user-name").html("");
        },
        error: function (jqXHR, textStatus, errorThrown) {
          console.log("on logout failure");
          console.log(jqXHR);
          console.log(textStatus);
          console.log(errorThrown);
          if (jqXHR.responseJSON) {
            let error_message = jqXHR.responseJSON;
            console.log(error_message);
          }
        },
      });
    });
  }
})(jQuery);
