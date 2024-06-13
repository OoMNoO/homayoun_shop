(function ($) {
  "use strict";
  if (
    window.location.href.endsWith("/") ||
    window.location.href.endsWith("index.html")
  ) {
    get_products();
  }
  let token = localStorage.getItem("token");
  let user_data = localStorage.getItem("user_data");
  if (token && user_data) {
    token = JSON.parse(token);
    user_data = JSON.parse(user_data);
    console.log(token);
    $("#login_nav").hide();
    $("#signup_nav").hide();
    $("#profile_nav").removeClass("d-none");
    $("#profile_nav").addClass("d-flex");
    $("#profile_nav a #user-name").html(user_data.name);

    $("#logout_btn").on("click", function () {
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
          $("#profile_nav").removeClass("d-flex");
          $("#profile_nav a #user-name").html("");
          location.href = "/login.html";
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

async function get_products() {
  $.ajax({
    url: "/api/products",
    type: "GET",
    contentType: "application/json",
    success: function (data) {
      console.log("get_products success");
      if (data["products"]) {
        let products = data["products"];
        console.log("products: ", products);
        console.log("products: ", products.length % 3);
        let products_carousel_counter = 1;
        let products_carousels_items = 0;
        products.forEach((product) => {
          console.log("items", products_carousels_items);
          console.log("counter", products_carousel_counter);
          if (products_carousels_items == 0) {
            $("#main_slider .carousel-inner").append(`
              <div class="carousel-item ${
                products_carousel_counter == 1 ? "active" : ""
              }">
                <div class="container">
                  <h1 class="fashion_taital">Man & Woman Fashion</h1>
                  <div class="fashion_section_products">
                    <div class="row" id="products_list_${products_carousel_counter}"></div>
                  </div>
                </div>
              </div>
            `);
          }
          $(
            `#main_slider .carousel-inner #products_list_${products_carousel_counter}`
          ).append(`
            <div class="col-lg-4 col-sm-4">
                <div class="box_main">
                  <h4 class="shirt_text">${product.name}</h4>
                  <p class="price_text">Price  <span style="color: #262626;">$ ${product.price}</span></p>
                  <div class="tshirt_img"><img src=${product.img[0]}></div>
                  <div class="btn_main">
                      <div class="buy_bt"><a href="/product.html?product=${product.id}">Buy Now</a></div>
                      <div class="seemore_bt"><a href="/product.html?product=${product.id}">See More</a></div>
                  </div>
                </div>
            </div>
          `);
          products_carousels_items++;
          if (products_carousels_items >= 3) {
            products_carousels_items = 0;
            products_carousel_counter++;
          }
        });
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log("get_products failure");
      console.log(jqXHR);
      console.log(textStatus);
      console.log(errorThrown);
      if (jqXHR.responseJSON) {
        let error_message = jqXHR.responseJSON;
        console.log(error_message);
      }
    },
  });
}
