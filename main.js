"use strict";

//let $ = require('jquery');

// placeholder log. need to write to filter on the this ID list
$('.categorySearchInput').keyup(function(){
    console.log('character entered');
  });

$("#btnFederal").click(function(){
    $(this).toggleClass("active");
    console.log('federal toggled');
});

$("#openSideFilters").click(function(){
    $("#sideNavFilters").css("width", "450px");
    $("#main").css("marginLeft", "450px");
    $("#cover").removeClass("d-none");
});

$(".closebtn").click(function(){
    $("#sideNavFilters").css("width", "0px");
    $("#main").css("marginLeft", "0px");
    $("#cover").addClass("d-none");
});

$('.btn-download').click(function(){
    console.log('remember to add analytics event listener to downloads');
});

$(document).on('click', '.clickable', function(e){
    var $this = $(this);
	if(!$this.hasClass('card-collapsed')) {
        $this.parents('.card').find('.card-body').slideUp();
		$this.addClass('card-collapsed');
		$this.find('i').removeClass('fa fa-plus').addClass('fa fa-minus');
		
	} else {
		$this.parents('.card').find('.card-body').slideDown();
		$this.removeClass('card-collapsed');
		$this.find('i').removeClass('fa fa-minus').addClass('fa fa-plus');
		
	}
})