$(document).ready(function () {

    $("#an-input").on("input", function (event) {

        event.preventDefault();

		input = $("#an-input").val();

		if(input.length <= 0){
			$("#barcode-image").attr("src", "");
       		$("#article-number-text").text("");
       		return;
		}

		ean = $.ajax({type: "GET", url: "/complete?an=" + input , async: false}).responseText;

        $("#barcode-image").attr("src", "/barcode?an=" + ean);
        $("#article-number-text").text(ean);

    });

});