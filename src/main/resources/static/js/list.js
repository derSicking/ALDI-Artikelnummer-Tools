oi = {};

$(document).ready(function () {

	createClone = function(){
	    clone = $(".form-container").first().clone(true);
	    $(clone).find(".input").val("");
	    $(clone).find(".numberLabel").text("");
	    oi = clone;
	    clone.appendTo("body");
	}

	$(".numberInput").blur(function(event) {
	    $(event.target).animate({
	    	opacity: "15%"
	    }, 1000);
	});
	
	$(".numberInput").focus(function(event) {
	    $(event.target).animate({
	    	width: "5em",
	    	opacity: "100%"
	    }, 1000);
	});
	
	$(".numberInput").on("input", function (event) {

        event.preventDefault();

		input = $(event.target).val();

		ean = $.ajax({type: "GET", url: "/complete?an=" + input , async: false}).responseText;

        $(event.target.parentElement).find(".numberLabel").text(ean);

    });
    
    $(".input").keypress(function(event){
    	var keycode = (event.keyCode ? event.keyCode : event.which);
	    if(keycode == '13'){
	    	createClone();
	    	$(".numberInput").last().focus();
	    }
    });
    
    $(".numberInput").first().focus();
	
});