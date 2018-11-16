"use strict";

let $ = require('jquery');

// placeholder log. need to write to filter on the this ID list
$('.categorySearchInput').keyup(function(){
    console.log('character entered');
  });

$("#btnFederal").click(function(){
    $(this).toggleClass("active");
});
