// Display a message when an enquiry form is submitted

const forms = document.querySelectorAll("form");

forms.forEach(function(form) {

    form.addEventListener("submit", function(event) {

        event.preventDefault();

        alert("Thank you for contacting The Golden Glaze Bakery!");

    });

});