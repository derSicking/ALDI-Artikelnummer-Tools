oi = {};

$(document).ready(function () {

	createClone = function(){
	    clone = $(".form-container").first().clone(true);
	    $(clone).find(".input").val("");
	    $(clone).find(".numberInput").css("opacity", "100%");
	    $(clone).find(".numberLabel").text("");
	    oi = clone;
	    clone.appendTo($("#allForms"));
	}

	$(".numberInput").blur(function(event) {
		if($(event.target).val().length <= 0){
			return;
		}
	    $(event.target).animate({
	    	opacity: "15%"
	    }, 1000);
	});
	
	$(".numberInput").focus(function(event) {
	    $(event.target).animate({
	    	width: "4em",
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
    
    $("#plus").click(function(event){
    	createClone();
    });
    
    $(".minus").click(function(event) {
    	if($(".form-container").length <= 1){
    		return;
    	}
		$(event.target).closest(".form-container").remove();
	});
    
    $(".numberInput").first().focus();
	
});