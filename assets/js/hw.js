// ==========================================================================
// page load function
// ==========================================================================

$(document).ready(function() {

	// ==========================================================================
	// Variables, Arrays, and Objects
	// ==========================================================================

	var categories = ['Leo', 'Bear','Smile','Smoking','Gatsby','Titanic','Oscar',
	'Wolf','Young','Jack','GIF','Inception','The Revenant','Movies','Cry'];

	// ==========================================================================
	// Functions
	// ==========================================================================

	// function to create the buttons based on the categories array
	function category() {

		// empty the div to start fresh
		$('.buttons').empty();

		// loop through the categories array to create the buttons
		for (var i = 0; i < categories.length; i++){
		    
		    // create a button, add the classes, data-name, and text
		    var a = $('<button>')
		    a.addClass('category');
		    a.addClass('btn');
		    if (i % 2 == 0) {
		    	a.addClass('btn-success');
		    } else {
		    	a.addClass('btn-info');	
		    }
		    a.attr('data-name', categories[i]);
		    a.text(categories[i]);

		    // add the button to the buttons area
		    $('.buttons').append(a);
		}
		// run the function to create the click functionality
		buttons('leonardo+dicaprio+');
	}

	// function to build the buttons to create the search option
	function buttons(name) {
		
		// when a button with the class category is clicked
		$('.category').click(function(){
			
			// create the variables to be used later
			var buttonText = $(this).data('name');
			var button = replaceAll(buttonText,' ','+');
			var actor = name;
			var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + actor + button + "&api_key=dc6zaTOxFJmzC&limit=10";
			
			// create ajax request to call API
			$.ajax({url: queryURL, method: 'GET'})
			// when ajax request complete then ...
			.done(function(response) {
		    	
		    	// empty the results div 
		    	$('.results').empty();

		    	// loop through the 10 images returned 
		    	for (var i = 0; i < response.data.length; i++) {

		    		// store the variables to be used later
		    		var still = response.data[i].images.fixed_width_still.url;
		    		var active = response.data[i].images.fixed_width.url;
		    		var alt = response.data[i].slug;
		    		var id = response.data[i].id;

		    		// build the still image, add the src, class, alt, and data-id
		    		var a = $('<img/>');
		    		a.attr('src',still);
		    		a.addClass('stillImage');
		    		a.attr('alt', alt);
		    		a.attr('data-id', id);

		    		// add it ot the results div
		    		$('.results').append(a);
		    	}
		    	stills();
			});

		});
	}
	
	function stills() {
		$('.stillImage').click(function(){
			
			// grab the image id from the data-id attribute
			var id = $(this).data('id');

			// build the new query specifically to the id
    		var queryURL = 'https://api.giphy.com/v1/gifs/'+id+'?api_key=dc6zaTOxFJmzC';

    		// create ajax request to call API
    		$.ajax({url: queryURL, method: 'GET'})
			// when ajax request complete then ...
			.done(function(response) {

		    	var active = response.data.images.fixed_width.url;
		    	var still = response.data.images.fixed_width_still.url
		    	if ($("[data-id='"+id+"']").hasClass('stillImage')) {
		    		$("[data-id='"+id+"']").attr('src', active);
	    			$("[data-id='"+id+"']").removeClass('stillImage').addClass('gifImage');
		    	} else {
		    		$("[data-id='"+id+"']").attr('src', still);
	    			$("[data-id='"+id+"']").removeClass('gifImage').addClass('stillImage');
		    	}
	    		

			});

    	});
	}

	// replace regex characters
	function escapeRegExp(str) {
	    return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
	}
	// create function that will be used to replace spaces in the names with a plus sign
	function replaceAll(str, find, replace) {
	  return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
	}

	
 	
 	

	// ==========================================================================
	// BUTTONS AND ACTIONS
	// ==========================================================================


	category();

	$('#addCategory').on('click', function(){
		
		if ($( '#categoryInput' ).val() !== '') {
			var newCat = $( '#categoryInput' ).val().trim();
			categories.push(newCat);
			category();
			$( '#categoryInput' ).val('');
		} else {
			alert('Please enter some text in the box.');
		}
		
		
		return false; //prevents the page from going anywhere (confused? comment this line out, submit it and watch what the browser does.)
	});
	
});






	

	


	