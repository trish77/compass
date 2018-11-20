"use strict";

let $ = require('jquery');

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