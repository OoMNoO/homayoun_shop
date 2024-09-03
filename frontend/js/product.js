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
            $(".no-sale-price").html("$" + product.price);
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
            let product_count_in_cart = 0;
            shopping_cart.forEach((shopping_cart_product, index) => {
              console.log("product_id:: ", product_id);
              console.log(
                "shopping_cart product_id:: ",
                shopping_cart_product.id
              );
              if (shopping_cart_product.id == product_id) {
                product_count_in_cart += shopping_cart_product.quantity;
              }
            });
            if (product_count_in_cart) {
              $(".add-cart-badge").removeClass("d-none");
              $(".add-cart-badge").text(product_count_in_cart);
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
    const product_price = $(".offer-price").text().replace("$", "");
    console.log("product_price:", product_price);
    const product_no_sale_price = $(".no-sale-price").text().replace("$", "");
    console.log("product_no_sale_price:", product_no_sale_price);
    const product_image = $(".product-image-main img").attr("src");
    console.log("product_image:", product_image);

    let shopping_cart = localStorage.getItem("shopping_cart");
    if (shopping_cart) {
      shopping_cart = JSON.parse(shopping_cart);
    } else {
      shopping_cart = [];
    }

    let item = {
      cart_id: (Math.random() + 1).toString(36).substring(7),
      id: product_id,
      name: product_name,
      size: selectedSize,
      color: selectedColor,
      price: product_price,
      no_sale_price: product_no_sale_price,
      image: product_image,
      quantity: 1,
    };

    const existingItem = shopping_cart.find((processedItem) => {
      var temp_item = JSON.parse(JSON.stringify(item));
      var temp_processedItem = JSON.parse(JSON.stringify(processedItem));
      delete temp_item["cart_id"];
      delete temp_item["quantity"];
      delete temp_processedItem["cart_id"];
      delete temp_processedItem["quantity"];
      console.log("temp_item: ", temp_item);
      console.log("processedItem: ", temp_processedItem);
      if (JSON.stringify(temp_processedItem) === JSON.stringify(temp_item)) {
        return processedItem;
      } else {
        return false;
      }
    });

    if (existingItem) {
      console.log("existingItem: ", existingItem);
      console.log("existingItem id: ", existingItem.id);
      console.log("existingItem quantity: ", existingItem.quantity);
      existingItem.quantity = (existingItem.quantity || 1) + 1;
    } else {
      console.log("not existingItem");
      shopping_cart.push(item);
    }

    localStorage.setItem("shopping_cart", JSON.stringify(shopping_cart));
    let all_products_count_in_cart = 0;
    let product_count_in_cart = 0;
    console.log("shopping_cart:: ", shopping_cart);
    shopping_cart.forEach((shopping_cart_product, index) => {
      console.log("product_id:: ", product_id);
      console.log("shopping_cart product_id:: ", shopping_cart_product.id);
      if (shopping_cart_product.id == product_id) {
        product_count_in_cart += shopping_cart_product.quantity;
      }
      all_products_count_in_cart += shopping_cart_product.quantity;
    });
    if (product_count_in_cart) {
      $(".add-cart-badge").removeClass("d-none");
      $(".add-cart-badge").text(product_count_in_cart);
      $(".header_section_top .cart-badge").removeClass("d-none");
      $(".header_section_top .cart-badge").text(all_products_count_in_cart);
    }
  });
})(jQuery);
