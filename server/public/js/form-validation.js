function validateEmail(email) {
  var regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
  return regex.test(email);
}

$('#form').submit( function(e) {
  var email = $('#inputEmail').val();

  if (!validateEmail(email)) {
      var element = document.getElementById('inputEmail');
      element.style.background = '#ffcccc';
      e.preventDefault();
      return false;
    }
});


$('#inputEmail').click( function() {
  var element = document.getElementById('inputEmail');
  element.style.background = '#fff';
})
