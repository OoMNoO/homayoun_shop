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

  $(".decrease_count").on("click", function () {
    const product_id = $(this).parent().attr("id").replace("_count", "");
    const count_holder = $(this).parent().find(".count")[0];
    const prev_count = parseInt($(count_holder).val());
    $(count_holder).val(prev_count - 1);
  });

  $(".increase_count").on("click", function () {
    const product_id = $(this).parent().attr("id").replace("_count", "");
    const count_holder = $(this).parent().find(".count")[0];
    const prev_count = parseInt($(count_holder).val());
    $(count_holder).val(prev_count + 1);
  });
})(jQuery);

async function show_cart_products(shopping_cart) {
  if (shopping_cart && shopping_cart.length) {
    console.log("shopping_cart: ", shopping_cart);
    console.log("shopping_cart length: ", shopping_cart.length);

    const processedCart = [];

    shopping_cart.forEach((item) => {
      const existingItem = processedCart.find((processedItem) => {
        return JSON.stringify(processedItem) === JSON.stringify(item);
      });

      if (existingItem) {
        existingItem.quantity = (existingItem.quantity || 1) + 1;
      } else {
        processedCart.push(item);
      }
    });

    console.log("processedCart: ", processedCart);

    shopping_cart.forEach((product, index) => {
      $(`#main_slider .carousel-inner #products_list`).append(`
        <div class="col-12">
          <div class="box_main row" id="${product.id}">
            <div class="col-6 row mr-auto">
              <div class="product_img col-12"><img src=${product.image}></div>
              <div class="col-12">
                <h4 class="product_text">${product.name}</h4>
                <div class="product-price">
                  <p class="price_text">Price  
                    <span class="offer-price">$${product.price}</span>
                    ${
                      product.no_sale_price
                        ? `<span class="no-sale-price">$${product.no_sale_price}</span>`
                        : ``
                    }
                  </p>
                </div>
              </div>
            </div>
            <div class="col-3 d-flex mx-auto">
              <div class="btn_main" id="${product.id}_count">
                <button class="increase_count">+</button>
                <input
                  class="count"
                  type="text"
                  name="count"
                  placeholder="1"
                  value="1"
                  readonly
                />
                <button class="decrease_count"">-</button>
              </div>
            </div>
            <div class="col-2 d-flex total_price_col">
              <span class="total_price">$${product.price}</span>
            </div>
          </div>
        </div>
      `);
    });
    $(`#main_slider .carousel-inner #products_list`).append(`
      <div class="checkout_bt">
        <a href="#">Check out</a>
      </div>
    `);
  } else {
    $(`#main_slider .carousel-inner #products_list`).append(`
      <div class="col-12 d-flex flex-column justify-content-center">
        <span class="rounded text-primary h2">your shopping cart is empty</span>
        <span class="rounded text-secondary mt-3">select and purchase the clothes you need from our website</span>
        <div class="buynow_bt">
          <a href="/index.html">Buy Now</a>
        </div>
      </div>
    `);
  }
}
