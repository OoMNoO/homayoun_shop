$(document).ready(function () {
  function generateBarCode() {
    website_address = "https://homayounshop.ir";
    var url =
      "https://api.qrserver.com/v1/create-qr-code/?data=" +
      website_address +
      "&amp;size=100x100";
    $("#barcode").attr("src", url);
  }
  generateBarCode();
});
