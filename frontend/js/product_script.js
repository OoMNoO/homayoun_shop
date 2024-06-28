(async function ($) {
  "use strict";

  const params = new URLSearchParams(window.location.search);

  if (params.has("product")) {
    let product = params.get("product");
    console.log(product);
    await $.ajax({
      url: `/api/product/${product}`,
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
          $(".offer-price").html("$" + product.price);
          if (product.sale_price) {
            $(".sale-price").html("$" + product.sale_price);
          }
          $(".product-details p").html(product.detail);
          let id = 1;
          product.sizes.forEach((size) => {
            $(".size-layout").append(`
              <input type="radio" name="size" value="${size}" id="${id}" class="size-input">
              <label for="${id}" class="size">${size}</label>
            `);
            id++;
          });
          for (var i = 0; i < product.rating; i++) {
            $(".product-rating").append(
              `<span><i class="bx bxs-star"></i></span>`
            );
          }
          $(".product-rating").append(
            `<span class="review">(${product.reviews} Review)</span>`
          );

          product.colors.forEach((color) => {
            $(".color-layout").append(`
              <input type="radio" name="color" value=${color} class="color-input">
              <label for=${color} class=${color}></label>
            `);
          });
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
})(jQuery);
