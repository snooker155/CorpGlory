WindowError = {
  show: function(title, message) {
    $("#windowError")
        .show()
        .find(".windowTitle").text(title);
    $("#windowError .windowDescription")
        .text(message);
  },
  hide: function() {
    $("#windowError").hide();
  }
};