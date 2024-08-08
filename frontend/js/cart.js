(function ($) {
  "use strict";
  let shopping_cart = localStorage.getItem("shopping_cart");
  if (shopping_cart) {
    shopping_cart = JSON.parse(shopping_cart);
    console.log("shopping_cart: ", shopping_cart);
    let products_count_in_cart = shopping_cart.length;
    console.log("products_count_in_cart: ", products_count_in_cart);
    if (!window.location.href.endsWith("/cart.html")) {
      if (products_count_in_cart) {
        $(".header_section_top .cart-badge").removeClass("d-none");
        $(".header_section_top .cart-badge").text(products_count_in_cart);
      }
    }
  }
  show_cart_products(shopping_cart);
})(jQuery);

async function show_cart_products(shopping_cart) {
  if (shopping_cart && shopping_cart.length) {
    console.log("shopping_cart: ", shopping_cart);
    console.log("shopping_cart length: ", shopping_cart.length);
    shopping_cart.forEach((product, index) => {
      $(`#main_slider .carousel-inner #products_list`).append(`
        <div class="col-lg-4 col-sm-4">
            <div class="box_main">
              <h4 class="shirt_text">${product.name}</h4>
              <p class="price_text">Price  <span style="color: #262626;">$ ${product.price}</span></p>
              <div class="tshirt_img"><img src=${product.image}></div>
              <div class="btn_main">
                  <div class="buy_bt"><a href="/product.html?product=${product.id}">Buy Now</a></div>
                  <div class="seemore_bt"><a href="/product.html?product=${product.id}">See More</a></div>
              </div>
            </div>
        </div>
      `);
    });
  } else {
    $(`#main_slider .carousel-inner #products_list`).append(`
      <div class="col-12 d-flex flex-column justify-content-center">
        <span class="rounded text-primary h2">your shopping cart is empty</span>
        <span class="rounded text-secondary mt-3">select and purchase the clothes you need from our website</span>
      </div>
    `);
  }
}
