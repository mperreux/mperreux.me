$("#contact input").keypress(function(event) {
    if (event.which == 13) {
        event.preventDefault();
        $("#contact").submit();
    }
});
$(function() {
    // Get the form.
    var form = $('#contact');

    // Get the messages div.
    var formMessages = $('#form-messages');

    $(form).submit(function(event) {
    // Stop the browser from submitting the form.
    	event.preventDefault();
    	var formData = $(form).serialize();
    	$.ajax({
    		type: 'POST',
    		url: $(form).attr('action'),
    		data: formData
		}).success(function(response) {
    	// Make sure that the formMessages div has the 'success' class.
    		$(formMessages).removeClass('alert-danger');
    		$(formMessages).addClass('alert-success');

    	// Set the message text.
    		$(formMessages).text(response);

    	// Clear the form.
    		$('#name').val('');
    		$('#email').val('');
    		$('#message').val('');
		}).fail(function(data) {
    // Make sure that the formMessages div has the 'error' class.
		    $(formMessages).removeClass('alert-success');
		    $(formMessages).addClass('alert-danger');

		    // Set the message text.
		    if (data.responseText !== '') {
		        $(formMessages).text(data.responseText);
		    } else {
		        $(formMessages).text('Oops! An error occured and your message could not be sent.');
		    }
		});
    // TODO
	});
});
