"use strict";

//let $ = require('jquery');

// placeholder log. need to write to filter on the this ID list
$(document).ready(function() {
    var table = $('#compass').DataTable( {
       "dom": '<"toptools"><"toolbar"><l>t<lpi>',
        buttons: [
          {
            extend: 'collection',
            text: 'Download',
            buttons: [
              'copy', 'excel', 'pdf', 'print'
            ]
          }
          ]
          });
    table.buttons().container()
      .insertBefore( $('.toolbar', table.table().container() ) );

    $('.toptools').html('<div id="filterBtns" class="btn-group mt-3" role="group" aria-label="filter button group">\n' +
      '            <button id="btnFederal" type="button" class="btn btn-federal active">Federal</button>\n' +
      '\n' +
      '            <!-- #stateDropdown -->\n' +
      '            <select class="custom-select">\n' +
      '                <option selected>State</option>\n' +
      '                <option value="Alabama">Alabama</option>\n' +
      '                <option value="Alaska">Alaska</option>\n' +
      '                <option value="Arizona">Arizona</option>\n' +
      '            </select>\n' +
      '            <!--end state select-->\n' +
      '\n' +
      '            <!-- #careSettings -->\n' +
      '            <div class="btn-group" role="group">\n' +
      '                <button id="careSettings" type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown"\n' +
      '                    aria-haspopup="true" aria-expanded="false">\n' +
      '                    Care Settings\n' +
      '                </button>\n' +
      '                <ul id="careSettings-items" class="dropdown-menu filterDropdown px-3" aria-labelledby="careSettings">\n' +
      '                    <li>\n' +
      '                        <input type="text" placeholder="Search category..." id="careSettingsSearch" class="categorySearchInput"></li>\n' +
      '                    \n' +
      '                    <div class="dropdown-divider"></div>\n' +
      '                    <li class="filterCheckbox" role="checkbox" aria-checked="false">\n' +
      '                        <div class="radio-btn filterCheckbox-sq">\n' +
      '                            <input type="checkbox" value="settingOne">Setting One\n' +
      '                        </div>\n' +
      '                    </li>\n' +
      '                    <li class="filterCheckbox" role="checkbox" aria-checked="false">\n' +
      '                        <div class="radio-btn filterCheckbox-sq">\n' +
      '                            <input type="checkbox" value="settingTwo">Setting Two\n' +
      '                        </div>\n' +
      '                    </li>\n' +
      '                    <li class="filterCheckbox" role="checkbox" aria-checked="false">\n' +
      '                        <div class="radio-btn filterCheckbox-sq">\n' +
      '                            <input type="checkbox" value="settingThree">Setting Three\n' +
      '                        </div>\n' +
      '                    </li>\n' +
      '                </ul>\n' +
      '            </div>\n' +
      '            <!--end careSettings-->\n' +
      '\n' +
      '            <!-- #disciplines -->\n' +
      '            <div class="btn-group" role="group">\n' +
      '                <button id="disciplines" type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown"\n' +
      '                    aria-haspopup="true" aria-expanded="false">\n' +
      '                    Disciplines\n' +
      '                </button>\n' +
      '                <ul id="careSettings-items" class="dropdown-menu filterDropdown px-3" aria-labelledby="disciplines">\n' +
      '                    <li>\n' +
      '                        <input type="text" placeholder="Search category..." id="disciplineSearch" class="categorySearchInput"></li>\n' +
      '                    </li>\n' +
      '                    <div class="dropdown-divider"></div>\n' +
      '                    <li class="filterCheckbox" role="checkbox" aria-checked="false">\n' +
      '                        <div class="radio-btn filterCheckbox-sq">\n' +
      '                            <input type="checkbox" value="settingOne">Discipline One\n' +
      '                        </div>\n' +
      '                    </li>\n' +
      '                    <li class="filterCheckbox" role="checkbox" aria-checked="false">\n' +
      '                        <div class="radio-btn filterCheckbox-sq">\n' +
      '                            <input type="checkbox" value="settingTwo">Discipline Two\n' +
      '                        </div>\n' +
      '                    </li>\n' +
      '                    <li class="filterCheckbox" role="checkbox" aria-checked="false">\n' +
      '                        <div class="radio-btn filterCheckbox-sq">\n' +
      '                            <input type="checkbox" value="settingThree">Discipline Three\n' +
      '                        </div>\n' +
      '                    </li>\n' +
      '                </ul>\n' +
      '            </div>\n' +
      '            <!--end disciplines-->\n' +
      '\n' +
      '            <!-- #effectiveDate -->\n' +
      '            <div class="btn-group" role="group">\n' +
      '                <button id="effectiveDate" type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown"\n' +
      '                    aria-haspopup="true" aria-expanded="false">\n' +
      '                    Effective Date\n' +
      '                </button>\n' +
      '                <!--need to identify library for this dropdown. there is an existing pattern in another product-->\n' +
      '            </div>\n' +
      '            <!--effective date-->\n' +
      '\n' +
      '            <button id="openSideFilters" type="button" class="btn btn-viewAll">View All Filters</button>\n' +
      '        </div>');

    $('.toolbar').html('<div class="input-group">\n' +
      '                    <input class="search-blue form-control filter-search mr-0" type="search" placeholder="Search all fields"\n' +
      '                        aria-label="Search">\n' +
      '                    <div class="input-group-append">\n' +
      '                        <button class="btn btn-search" aria-label="sideNavFilters-search" type="submit">\n' +
      '                            <i class="fas fa-search" alt="all filters search"></i>\n' +
      '                        </button>\n' +
      '                    </div>\n' +
      '                </div>');


$('.categorySearchInput').keyup(function(){
    console.log('character entered');
  });

$("#btnFederal").click(function(){
    $(this).toggleClass("active");
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

$('#fedCheck1').on('click', function () {

  if( $(this).is(':checked')) {
    let $thisText = $(this).val();
    var $btnFed = $(".pillFilter").append('<button type="button" class="btn btn-labeled btn-primary">\n' +
      'Federal<span class="btn-label"><i class="fas fa-times text-white"></i></span></button>');
    $('#btnFederal').addClass('active');
  } else {
    $btnFed.remove();
    $('#btnFederal').removeClass('active')

  }
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
});

 $(function () {
    $('#datetimepicker7').datetimepicker();
    $('#datetimepicker8').datetimepicker({
        useCurrent: false,
        format: 'DD/MM/YYYY',
        pickTime: false
    });
    $("#datetimepicker7").on("change.datetimepicker", function (e) {
        $('#datetimepicker8').datetimepicker('minDate', e.date);
    });
    $("#datetimepicker8").on("change.datetimepicker", function (e) {
        $('#datetimepicker7').datetimepicker('maxDate', e.date);
    });
});

});
