(function ($) {
  "use strict";
  let shopping_cart = localStorage.getItem("shopping_cart");
  let all_products_count_in_cart = 0;
  let total_price = 0;
  if (shopping_cart) {
    shopping_cart = JSON.parse(shopping_cart);
    console.log("shopping_cart: ", shopping_cart);
    shopping_cart.forEach((shopping_cart_product, index) => {
      all_products_count_in_cart += shopping_cart_product.quantity;
      total_price +=
        shopping_cart_product.price * shopping_cart_product.quantity;
    });
    console.log("all_products_count_in_cart: ", all_products_count_in_cart);
    if (!window.location.href.endsWith("/cart.html")) {
      if (all_products_count_in_cart) {
        $(".header_section_top .cart-badge").removeClass("d-none");
        $(".header_section_top .cart-badge").text(all_products_count_in_cart);
      }
    }
  }
  show_cart_products(shopping_cart, all_products_count_in_cart, total_price);

  $(".decrease_count").on("click", function () {
    const product_id = $(this).parent().attr("id").replace("_count", "");
    const cart_index = find_product_index_in_cart(shopping_cart, product_id);
    console.log("cart_index: ", cart_index);
    if (cart_index == -1) {
      console.error(
        "error: product not found in shopping cart or shopping cart data is curropted!"
      );
      console.error(
        "to solve this delete the shopping_cart localstorage data and refresh the page"
      );
      return;
    }
    const count_holder = $(this).parent().find(".count")[0];
    const prev_count = parseInt($(count_holder).val());
    const product_price = parseInt(
      $(`#${product_id} .offer-price`).text().replace("$", "")
    );
    all_products_count_in_cart -= 1;
    $(`#main_slider .carousel-inner .total_items`).text(
      `all items: ${all_products_count_in_cart}`
    );
    $(`#main_slider #checkout_box #checkout_box_count`).text(
      `all items: ${all_products_count_in_cart}`
    );
    total_price -= product_price;
    $(`#main_slider #checkout_box .total_cart_price`).text(`$${total_price}`);
    if (prev_count > 1) {
      $(count_holder).val(prev_count - 1);
      if (prev_count == 2) {
        $(this).html(`<i class="fa fa-trash text-danger"></i>`);
      }
      $(`#${product_id} .total_price`).text(
        "$" + product_price * (prev_count - 1)
      );
      console.log("shopping_cart[cart_index]: ", shopping_cart[cart_index]);
      shopping_cart[cart_index].quantity -= 1;
      localStorage.setItem("shopping_cart", JSON.stringify(shopping_cart));
    } else {
      console.log("remove from cart");
      $($(`#${product_id}`).parent()).slideUp(() => {
        $($(`#${product_id}`).parent()).remove();
        console.log("shopping_cart[cart_index]: ", shopping_cart[cart_index]);
        shopping_cart.splice(cart_index, 1);
        localStorage.setItem("shopping_cart", JSON.stringify(shopping_cart));
        if (!shopping_cart || all_products_count_in_cart == 0) {
          $(`#main_slider .carousel-inner #products_list`).html(`
              <div class="col-12 d-flex flex-column justify-content-center">
                <span class="rounded text-primary h2">your shopping cart is empty</span>
                <span class="rounded text-secondary mt-3">select and purchase the clothes you need from our website</span>
                <div class="buynow_bt">
                  <a href="/index.html">Buy Now</a>
                </div>
              </div>
            `);
          $(`#main_slider .carousel-inner .total_items`).remove();
        }
      });
    }
  });

  $(".increase_count").on("click", function () {
    const product_id = $(this).parent().attr("id").replace("_count", "");
    const cart_index = find_product_index_in_cart(shopping_cart, product_id);
    console.log("cart_index: ", cart_index);
    if (cart_index == -1) {
      console.error(
        "error: product not found in shopping cart or shopping cart data is curropted!"
      );
      console.error(
        "to solve this delete the shopping_cart localstorage data and refresh the page"
      );
      return;
    }
    const count_holder = $(this).parent().find(".count")[0];
    const prev_count = parseInt($(count_holder).val());
    $(count_holder).val(prev_count + 1);
    const product_price = parseInt(
      $(`#${product_id} .offer-price`).text().replace("$", "")
    );
    $(`#${product_id} .total_price`).text(
      "$" + product_price * (prev_count + 1)
    );
    console.log("shopping_cart[cart_index]: ", shopping_cart[cart_index]);
    shopping_cart[cart_index].quantity += 1;
    all_products_count_in_cart += 1;
    $(`#main_slider .carousel-inner .total_items`).text(
      `all items: ${all_products_count_in_cart}`
    );
    $(`#main_slider #checkout_box #checkout_box_count`).text(
      `all items: ${all_products_count_in_cart}`
    );
    total_price += product_price;
    $(`#main_slider #checkout_box .total_cart_price`).text(`$${total_price}`);
    localStorage.setItem("shopping_cart", JSON.stringify(shopping_cart));
    if (prev_count == 1) {
      const decrease_count = $(this).parent().find(".decrease_count")[0];
      $(decrease_count).html(`-`);
    }
  });
})(jQuery);

function find_product_index_in_cart(shopping_cart, product_id) {
  console.log("shopping_cart in find: ", shopping_cart);
  console.log("product_id in find: ", product_id);
  let product_found_index = -1;
  shopping_cart.forEach((product, index) => {
    if (product.cart_id == product_id) {
      product_found_index = index;
    }
  });
  return product_found_index;
}

async function show_cart_products(
  shopping_cart,
  all_products_count_in_cart,
  total_price
) {
  if (shopping_cart && all_products_count_in_cart) {
    $($(`#main_slider .carousel-inner #products_list`).parent()).prepend(`
      <span class="total_items">all items: ${all_products_count_in_cart}</span>
    `);
    shopping_cart.forEach((product, index) => {
      $(`#main_slider .carousel-inner #products_list`).append(`
        <div class="col-12">
          <div class="box_main row" id="${product.cart_id}">
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
              <div class="btn_main" id="${product.cart_id}_count">
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
    $(`#main_slider .carousel-inner #products_list`).append(`
      <div class="col-12">
        <div class="box_main row" id="checkout_box">
          <div class="col-6 d-flex m-auto text-center">
            <span class="w-100" id="checkout_box_count">all items: ${all_products_count_in_cart}</span>
          </div>
          <div class="col-2 d-flex total_price_col">
            <span class="total_cart_price">$${total_price}</span>
          </div>
        </div>
      </div>
    `);
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
