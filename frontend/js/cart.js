(function ($) {
  "use strict";
  let shopping_cart = localStorage.getItem("shopping_cart");
  if (shopping_cart) {
    shopping_cart = JSON.parse(shopping_cart);
    console.log("shopping_cart: ", shopping_cart);
    let products_count_in_cart = shopping_cart.length;
    let all_products_count_in_cart = 0;
    shopping_cart.forEach((shopping_cart_product, index) => {
      all_products_count_in_cart += shopping_cart_product.quantity;
    });
    console.log("all_products_count_in_cart: ", all_products_count_in_cart);
    if (!window.location.href.endsWith("/cart.html")) {
      if (all_products_count_in_cart) {
        $(".header_section_top .cart-badge").removeClass("d-none");
        $(".header_section_top .cart-badge").text(all_products_count_in_cart);
      }
    }
  }
  show_cart_products(shopping_cart);

  $(".decrease_count").on("click", function () {
    const product_id = $(this).parent().attr("id").replace("_count", "");
    const count_holder = $(this).parent().find(".count")[0];
    const prev_count = parseInt($(count_holder).val());
    if (prev_count > 1) {
      $(count_holder).val(prev_count - 1);
      if (prev_count == 2) {
        $(this).html(`<i class="fa fa-trash text-danger"></i>`);
      }
      const product_price = $(`#${product_id} .offer-price`)
        .text()
        .replace("$", "");
      $(`#${product_id} .total_price`).text(
        "$" + product_price * (prev_count - 1)
      );
    } else {
      if (prev_count == 1) {
        console.log("remove from cart");
        $($(`#${product_id}`).parent()).slideUp(() => {
          $($(`#${product_id}`).parent()).remove();
        });
      }
    }
  });

  $(".increase_count").on("click", function () {
    const product_id = $(this).parent().attr("id").replace("_count", "");
    const count_holder = $(this).parent().find(".count")[0];
    const prev_count = parseInt($(count_holder).val());
    $(count_holder).val(prev_count + 1);
    const product_price = $(`#${product_id} .offer-price`)
      .text()
      .replace("$", "");
    $(`#${product_id} .total_price`).text(
      "$" + product_price * (prev_count + 1)
    );
    if (prev_count == 1) {
      const decrease_count = $(this).parent().find(".decrease_count")[0];
      $(decrease_count).html(`-`);
    }
  });
})(jQuery);

async function show_cart_products(shopping_cart) {
  if (shopping_cart && shopping_cart.length) {
    console.log("shopping_cart: ", shopping_cart);
    console.log("shopping_cart length: ", shopping_cart.length);

    shopping_cart.forEach((product, index) => {
      $(`#main_slider .carousel-inner #products_list`).append(`
        <div class="col-12">
          <div class="box_main row" id="${product.id}_${index}">
            <div class="col-5 row mx-0">
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
            <div class="col-1 row ml-0 mr-auto d-flex flex-column justify-content-center align-content-center">
              <div class="product-size">
                <div class="size-layout">
                  <label class="size">${product.size}</label>
                </div>
              </div>
              <div class="product-color">
                <div class="color-layout">
                  <label class=${product.color}></label>
                </div>
              </div>
            </div>
            <div class="col-3 d-flex mx-auto">
              <div class="btn_main" id="${product.id}_${index}_count">
                <button class="decrease_count">${
                  product.quantity == 1
                    ? `<i class="fa fa-trash text-danger"></i>`
                    : `-`
                }</button>
                <input
                  class="count"
                  type="text"
                  name="count"
                  placeholder="1"
                  value="${product.quantity ? product.quantity : 1}"
                  readonly
                />
                <button class="increase_count"">+</button>
              </div>
            </div>
            <div class="col-2 d-flex total_price_col">
              <span class="total_price">$${
                product.price * product.quantity
              }</span>
            </div>
          </div>
        </div>
      `);
    });
    // append total price
    // insert here
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
