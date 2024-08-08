(async function ($) {
  "use strict";

  const params = new URLSearchParams(window.location.search);
  let product_id = "";
  if (params.has("product")) {
    product_id = params.get("product");
    console.log(product_id);
    await $.ajax({
      url: `/api/product/${product_id}`,
      type: "GET",
      contentType: "application/json",
      success: function (data) {
        console.log("on get product success");
        if (data["product_data"]) {
          let product = data["product_data"];
          console.log("product: ", product);
          $(".product-image-main").html(`
            <img src="${product.img[0]}" alt="" id="product-main-image"></img>
          `);
          product.img.forEach((img) => {
            $(".product-image-slider").append(`
              <img src="${img}" alt="" class="image-list">
            `);
          });
          $(".product_name").html(product.name);
          $(".product-title h2").html(product.name);
          if (product.sale_price) {
            $(".sale-price").html("$" + product.price);
            $(".offer-price").html("$" + product.sale_price);
          } else {
            $(".offer-price").html("$" + product.price);
          }
          $(".product-details p").html(product.detail);

          let default_size_checked = false;
          product.sizes.forEach((size, index) => {
            if (default_size_checked) {
              $(".size-layout").append(`
                <input type="radio" name="size" value="${size}" id="size-${index}" class="size-input">
                <label for="size-${index}" class="size">${size}</label>
              `);
            } else {
              $(".size-layout").append(`
                <input checked type="radio" name="size" value="${size}" id="size-${index}" class="size-input">
                <label for="size-${index}" class="size">${size}</label>
              `);
              default_size_checked = true;
            }
          });
          for (var i = 0; i < product.rating; i++) {
            $(".product-rating").append(
              `<span><i class="bx bxs-star"></i></span>`
            );
          }
          $(".product-rating").append(
            `<span class="review">(${product.reviews} Review)</span>`
          );

          let default_color_selected = false;
          product.colors.forEach((color, index) => {
            if (default_color_selected) {
              $(".color-layout").append(`
              <input type="radio" name="color" value=${color} id="color-${index}" class="color-input">
              <label for=color-${index} class=${color}></label>
            `);
            } else {
              $(".color-layout").append(`
                <input checked type="radio" name="color" value=${color} id="color-${index}" class="color-input">
                <label for="color-${index}" class=${color}></label>
              `);
              default_color_selected = true;
            }
          });

          let shopping_cart = localStorage.getItem("shopping_cart");
          if (shopping_cart) {
            shopping_cart = JSON.parse(shopping_cart);
            let products_count_in_cart = 0;
            shopping_cart.forEach((shopping_cart_product, index) => {
              console.log("product_id:: ", product_id);
              console.log(
                "shopping_cart product_id:: ",
                shopping_cart_product.product_id
              );
              if (shopping_cart_product.product_id == product_id) {
                products_count_in_cart++;
              }
            });
            if (products_count_in_cart) {
              $(".add-cart-badge").removeClass("d-none");
              $(".add-cart-badge").text(products_count_in_cart);
            }
          }
        }
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log("on get product failure");
        console.log(jqXHR);
        console.log(textStatus);
        console.log(errorThrown);
        if (jqXHR.responseJSON) {
          let error_message = jqXHR.responseJSON;
          console.log(error_message);
        }
      },
    });
  } else {
    location.href = "/";
  }

  const sliderMainImage = document.getElementById("product-main-image");
  const sliderImageList = document.getElementsByClassName("image-list");

  $(sliderImageList[0]).on("click", function () {
    sliderMainImage.src = sliderImageList[0].src;
    console.log(sliderMainImage.src);
  });

  $(sliderImageList[1]).on("click", function () {
    sliderMainImage.src = sliderImageList[1].src;
    console.log(sliderMainImage.src);
  });

  $(sliderImageList[2]).on("click", function () {
    sliderMainImage.src = sliderImageList[2].src;
    console.log(sliderMainImage.src);
  });

  $(sliderImageList[3]).on("click", function () {
    sliderMainImage.src = sliderImageList[3].src;
    console.log(sliderMainImage.src);
  });

  $(".add-cart").on("click", function () {
    const product_name = $(".product_name").text();
    console.log("product_name:", product_name);
    console.log("add to cart");
    const selectedSize = $('div.size-layout input[type="radio"]:checked').val();
    console.log("Selected size:", selectedSize);
    const selectedColor = $(
      'div.color-layout input[type="radio"]:checked'
    ).val();
    console.log("Selected color:", selectedColor);
    const price = $(".offer-price").text();
    console.log("price:", price);

    let shopping_cart = localStorage.getItem("shopping_cart");
    if (shopping_cart) {
      shopping_cart = JSON.parse(shopping_cart);
      shopping_cart.push({
        product_id: product_id,
        product_name: product_name,
        selectedSize: selectedSize,
        selectedColor: selectedColor,
        price: price,
      });
    } else {
      shopping_cart = [
        {
          product_id: product_id,
          product_name: product_name,
          selectedSize: selectedSize,
          selectedColor: selectedColor,
          price: price,
        },
      ];
    }
    localStorage.setItem("shopping_cart", JSON.stringify(shopping_cart));
    let products_count_in_cart = 0;
    shopping_cart.forEach((shopping_cart_product, index) => {
      console.log("product_id:: ", product_id);
      console.log(
        "shopping_cart product_id:: ",
        shopping_cart_product.product_id
      );
      if (shopping_cart_product.product_id == product_id) {
        products_count_in_cart++;
      }
    });
    if (products_count_in_cart) {
      $(".add-cart-badge").removeClass("d-none");
      $(".add-cart-badge").text(products_count_in_cart);
    }
  });
})(jQuery);
