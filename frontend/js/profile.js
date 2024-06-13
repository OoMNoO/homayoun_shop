(function ($) {
  "use strict";

  let token = localStorage.getItem("token");
  let user_data = localStorage.getItem("user_data");
  console.log(JSON.parse(user_data));
  if (!(token && user_data)) {
    location.href = "/login.html";
  } else {
    token = JSON.parse(token);
    user_data = JSON.parse(user_data);
    console.log(token);
    $("#username").val(user_data.username);
    $("#name").val(user_data.name);
    $("#address").val(user_data.address);
    $("#email").val(user_data.email);
  }
})(jQuery);
