(function ($) {
  "use strict";
  let shopping_cart = localStorage.getItem("shopping_cart");
  if (shopping_cart) {
    shopping_cart = JSON.parse(shopping_cart);
    console.log("shopping_cart: ", shopping_cart);
    let products_count_in_cart = shopping_cart.length;
    console.log("products_count_in_cart: ", products_count_in_cart);
    if (products_count_in_cart) {
      $(".header_section_top .cart-badge").removeClass("d-none");
      $(".header_section_top .cart-badge").text(products_count_in_cart);
    }
  }
})(jQuery);
