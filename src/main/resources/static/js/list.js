oi = {};

function nextLine() {
	createClone();
	$(".numberInput").last().focus();
}

$(document).ready(function() {

	createClone = function() {
		clone = $(".form-container").first().clone(true);
		$(clone).find(".input").val("");
		$(clone).find(".numberInput").css("opacity", "100%");
		$(clone).find(".numberLabel").text("");
		oi = clone;
		clone.appendTo($("#allForms"));
	}

	$(".numberInput").blur(function(event) {
		if ($(event.target).val().length <= 0) {
			return;
		}
		$(event.target).animate({
			opacity : "15%"
		}, 1000);
	});
	
	$(".numberInput").click(function(event){
		$(event.target).focus();
	});

	$(".numberInput").focus(function(event) {
		$(event.target).animate({
			width : "4em",
			opacity : "100%"
		}, 1000);
	});

	$(".numberInput").on("input", function(event) {

		event.preventDefault();

		input = $(event.target).val();
		
		if(input.length <= 0){
			$(event.target.parentElement).find(".numberLabel").text("");
			return;
		}

		ean = $.ajax({
			type : "GET",
			url : "/complete?an=" + input,
			async : false
		}).responseText;

		$(event.target.parentElement).find(".numberLabel").text(ean);

	});

	$("#plus").click(function(event) {
		nextLine();
	});

	$(".minus").click(function(event) {
		if ($(".form-container").length <= 1) {
			// if there is only one line left in the list, clear that line but
			// keep it
			$(".form-container").first().find(".input").val("");
			$(".form-container").first().find(".numberLabel").text("");
			$(".form-container").first().find(".input").focus();
			return;
		}
		$(event.target).closest(".form-container").remove();
	});

});