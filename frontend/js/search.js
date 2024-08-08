(function ($) {
  "use strict";
  get_products();
})(jQuery);

async function get_products() {
  // get search_text
  const urlParams = new URLSearchParams(window.location.search);
  const search_text = urlParams.get("search") || "";
  console.log("search_text: ", search_text == "");
  await $.ajax({
    url: `/api/search/${search_text}`,
    type: "GET",
    contentType: "application/json",
    success: function (data) {
      console.log("get_products success");
      $("#main_slider .carousel-inner").append(`
        <div class="carousel-item active">
          <div class="container">
            <h1 class="fashion_taital">search for: ${search_text}</h1>
            <div class="fashion_section_products">
              <div class="row" id="products_list"></div>
            </div>
          </div>
        </div>
      `);
      if (data["products"]) {
        let products = data["products"];
        console.log("no result found");
        console.log("products: ", products);
        console.log("products: ", products.length);
        let products_carousels_items = 0;
        products.forEach((product) => {
          console.log("items", products_carousels_items);
          $(`#main_slider .carousel-inner #products_list`).append(`
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
        });
        if (products.length == 0) {
          $(`#main_slider .carousel-inner #products_list`).append(`
            <div class="col-12 d-flex justify-content-center">
              <span class="bg-danger rounded text-white p-3 h2">no result found</span>
            </div>
          `);
        }
      } else {
        $(`#main_slider .carousel-inner #products_list`).append(`
          <div class="col-lg-4 col-sm-4">
            <span class="bg-danger font-weight-bold">Error in searching for ${search_text}!!!</span>
          </div>
        `);
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
