// jQuery wrapper
(function($) {
// Document ready
$(document).ready(function(){

// WPSH Feedback 

	// TODO: 
	// 1. Check if feedback mode is enabled
	// 2. Check if feedback box has text in it - if it does, halt all other actions until submitted
	// 3. Decrease height of textbox if text is removed

	// Setup
   	var	feedbackform = $('#wpsh_feedback').show().detach(),
   		userdetails = {
   			element: "", 
   			viewportsize: "",
   			browsersize: "",
   			devicesize: "",
   			useragent: "",
   			OS: ""
   		};

	// When the user clicks anywhere...
	$(document).on('click',function(event) {
		// Setup
	    var clicked = $(event.target), // Get element that is clicked
	    	el = clicked[0], // Get element that is clicked
	    	xpath = createXPathFromElement(el); // Create a string of where the element is in DOM tree

	    // Do not trigger popup when user clicks in feedback box, feedback threads or adminbar
	    if(!$(el).hasClass('wpsh-fbb') && $(el).parents('.wpsh-fbb').length != 1 && $(el).parents('.wpsh-fbb-wrap').length != 1 && $(el).parents('#wpadminbar').length != 1){

	    	// Close feedback box
	    	if($('.wpsh-fbb-current-target')) {
				$('.wpsh-fbb').unwrap().remove();
				$('.wpsh-fbb-current-target').removeClass('wpsh-fbb-current-target');
			}

			// Save data
			userdetails["element"] = xpath;

		    // Mark as current element
		    $(el).addClass('wpsh-fbb-current-target');

		    // Setup feedback box
		    var feedbackbox =	'<div class="wpsh-fbb auto-position">';
		    	feedbackbox +=		'<h2>Leave feedback</h2>';
		    	feedbackbox +=	'</div>';// Create feedback box	
		    $(el).wrap('<div class="wpsh-fbb-wrap" />').after(feedbackbox);
		    $('.wpsh-fbb').append(feedbackform);

		    // Get click co-ordinates within clicked element
            var	x = event.pageX - $(el).offset().left,
	        	y = event.pageY - $(el).offset().top;
	        // Position feedback box relative to clicked element
	        $(el).next('.wpsh-fbb').removeClass('auto-position').css('top',y).css('left',x);

	        // Autogrow textarea
	        $(".wpsh-fbb textarea").keyup(function(e) {
			    while($(this).outerHeight() < this.scrollHeight + parseFloat($(this).css("borderTopWidth")) + parseFloat($(this).css("borderBottomWidth"))) {
			        $(this).height($(this).height()+1);
			    };
			});

		    // Do not action default behaviour
		    return false;
		}

	});

	// Quick hack to remove feedback comments from regular comments
	$('#comments li.feedback').remove();


// end document ready
});
// end jQuery wrapper
})(jQuery);

// Get element path - http://stackoverflow.com/questions/2661818/javascript-get-xpath-of-a-node
function createXPathFromElement(elm) { 
    var allNodes = document.getElementsByTagName('*'); 
    for (var segs = []; elm && elm.nodeType == 1; elm = elm.parentNode) { 
        if (elm.hasAttribute('id')) { 
                var uniqueIdCount = 0; 
                for (var n=0;n < allNodes.length;n++) { 
                    if (allNodes[n].hasAttribute('id') && allNodes[n].id == elm.id) uniqueIdCount++; 
                    if (uniqueIdCount > 1) break; 
                }; 
                if ( uniqueIdCount == 1) { 
                    segs.unshift('id("' + elm.getAttribute('id') + '")'); 
                    return segs.join('/'); 
                } else { 
                    segs.unshift(elm.localName.toLowerCase() + '[@id="' + elm.getAttribute('id') + '"]'); 
                } 
        } else if (elm.hasAttribute('class')) { 
            segs.unshift(elm.localName.toLowerCase() + '[@class="' + elm.getAttribute('class') + '"]'); 
        } else { 
            for (i = 1, sib = elm.previousSibling; sib; sib = sib.previousSibling) { 
                if (sib.localName == elm.localName)  i++; }; 
                segs.unshift(elm.localName.toLowerCase() + '[' + i + ']'); 
        }; 
    }; 
    return segs.length ? '/' + segs.join('/') : null; 
}; 
function lookupElementByXPath(path) { 
    var evaluator = new XPathEvaluator(); 
    var result = evaluator.evaluate(path, document.documentElement, null,XPathResult.FIRST_ORDERED_NODE_TYPE, null); 
    return  result.singleNodeValue; 
} 