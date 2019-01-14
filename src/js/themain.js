"use strict";

// let $ = require('jquery');

// placeholder log. need to write to filter on the this ID list
$(document).ready(function () {

  var table = $('#compass').DataTable({
    "dom": '<"toptools"><"container-fluid p-0 d-flex justify-content-between" <"d-flex" li> <"d-flex" <"toolbar">>>t<"row py-2 text-white bg-secondary" <"col-3 mr-auto" li><"col-6 ml-auto text-right" B>>',
    ajax: {
      url: 'c_data.json',
      dataSrc: 'data'
    },
    scrollY:        '550px',
    //deferRender:    true,
    scroller:       true,
    lengthMenu: [
      [10, 25, 50, -1],
      ['10', '25', '50', 'All']
    ],
    columns: [
      {"data": "course_title"},
      {"data": "course_summary"},
      {"data": "effective_date"},
      {"data": "penalties"},
      {"data": "governing_body"},
      {"data": "care_settings"},
      {"data": "disciplines"},
      {"data": "course_citation"}
    ],
    //"bStateSave": true,
    /*fixedHeader: {
      header: true,
      footer: true
    },*/
    //cache: true,
    columnDefs: [
      {
        targets: 0,
        width: "50%",
        data: null,
        render: function (data, columns, row, meta) {
          var summary = row.course_summary;
          var title = row.course_title;
          return '<h4><a href="details.html">' + data + '</a></h4><span>' + summary + '</span></div>'
        }
      },
      {targets: 1, data: 'course_summary', visible: false, searchable: true},
      {targets: 2, data: 'effective_date'},
      {targets: 3,
        data: 'penalties',
        render: function (data, columns, row, meta) {
          return  '<a href="#" data-target="#modal-goal-add" style="margin:auto;" class="related" data-toggle="modal"> Related Courses</a>'
        }
      },
      {targets: 4, data: 'governing_body'},
      {targets: 5, data: 'care_settings', visible: false, searchable: true},
      {targets: 6, data: 'disciplines', visible: false, searchable: true},
      {
        targets: 7,
        data: 'course_citation',
        render: function (data, type, row, meta) {
          return '<div class="text-center"><button class="btn btn-lg btn-default">More Details</button></div>'
        }
      },
      {order: [0, 2, 3]},
      {orderable: false, targets: [1, 4, 5, 6, 7]}
    ],
    language: {
      sLengthMenu: "Show _MENU_ regulations",
      "info": "_START_ &ndash; _END_ of _TOTAL_ matching regulations"
    },
    pagingType: "full_numbers",
    buttons: {
      buttons: [
        {
          extend: 'collection',
          text: '<i class="fas fa-download"> <span class="sans">Download</span></i>',
          buttons: [
            'pdf', 'excel'
          ]
        }
      ]
    },
  });

  /*table.buttons().container()
    .appendTo($(table.table().container()));*/


  $('.toptools').html(`<div class="card py-2 px-4"><div class="card-body p-0"><h2 class="card-title p-0">Filters</h2>
<span class="text-warning font-weight-bold">Default settings: </span>Initially the results shows Federal, all Care Settings and all Disciplines. <span class="text-warning font-weight-bold">Note </span>: The Federal or State setting and at least one Care Setting and one Discipline is required for any search.</p><div id="filterBtns" class="flex flex-row" role="group" aria-label="filter button group">
              <span class="mx-2 align-self-center">Federal:</span>  
              <div class="material-switch d-inline-block pull-right">
                  <input id="btnFederal" name="federal-switch" data-btn="federal" checked type="checkbox"/>
                  <label for="btnFederal" class="label-info"></label>
              </div>
                <!--<select id="stateDropdown" data-btn="state" class="custom-select">
                    <option value="State">State</option>
                    <option value="California">California</option>
                    <option value="Florida">Florida</option>
                    <option value="Alabama">Alabama</option>
                </select>-->
                <div class="btn-group" role="group">
                    <span class="mx-2 align-self-center">State:</span>
                    <button id="stateDropdown" type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown"
                        aria-haspopup="true" aria-expanded="false">
                        State
                    </button>
                    <ul id="state-items" class="dropdown-menu filterDropdown px-3" aria-labelledby="stateSettings">
                    <li><span class="text-muted">Note you can filter by one state at a time</span></li>                 
                        <li class="filterCheckbox">
                            <div class="custom-control custom-radio">
                              <input type="radio" id="customRadio1" name="customRadio" class="custom-control-input">
                              <label class="custom-control-label" for="customRadio1">Alabama</label>
                            </div>
                        </li>
                        <li class="filterCheckbox">
                            <div class="custom-control custom-radio">
                              <input type="radio" id="customRadio1" name="customRadio" class="custom-control-input">
                              <label class="custom-control-label" for="customRadio1">California</label>
                            </div>
                        </li>
                        <li class="filterCheckbox">
                            <div class="custom-control custom-radio">
                              <input type="radio" id="customRadio1" name="customRadio" class="custom-control-input">
                              <label class="custom-control-label" for="customRadio1">Florida</label>
                            </div>
                        </li>
                        <li class="filterCheckbox">
                            <div class="custom-control custom-radio">
                              <input type="radio" id="customRadio1" name="customRadio" class="custom-control-input">
                              <label class="custom-control-label" for="customRadio1">Alabama</label>
                            </div>
                        </li>
                        
                    </ul>
                </div>
                <!--end state select-->

                <!-- #careSettings 
                <div class="btn-group" role="group">
                <span class="mx-2 align-self-center">Care Settings:</span>
                    <button id="careSettings" type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown"
                        aria-haspopup="true" aria-expanded="false">
                        All
                    </button>
                    <ul id="careSettings-items" class="dropdown-menu filterDropdown px-3" aria-labelledby="careSettings">
                        <li>
                            <input type="text" placeholder="Search category..." id="careSettingsSearch" class="categorySearchInput"></li>
                        
                        <div class="dropdown-divider"></div>
                       
                        <li class="filterCheckbox" role="checkbox" aria-checked="false">
                            <div class="radio-btn filterCheckbox-sq">
                                <input type="checkbox" class="column-filter" aria-selected="true" value="All">Select All
                            </div>
                        </li>
                        <li class="filterCheckbox" role="checkbox" aria-checked="false">
                            <div class="radio-btn filterCheckbox-sq">
                                <input type="checkbox" class="column-filter" value="Academic Setting">Academic Setting
                            </div>
                        </li>
                        <li class="filterCheckbox" role="checkbox" aria-checked="false">
                            <div class="radio-btn filterCheckbox-sq">
                                <input type="checkbox" class="column-filter"  value="Ambulatory Care Facility">Ambulatory Care Facility
                            </div>
                        </li>
                        <li class="filterCheckbox" role="checkbox" aria-checked="false">
                            <div class="radio-btn filterCheckbox-sq">
                                <input type="checkbox" class="column-filter"  value="Assisted Living">Assisted Living
                            </div>
                        </li>
                                 <li class="filterCheckbox" role="checkbox" aria-checked="false">
                            <div class="radio-btn filterCheckbox-sq">
                                <input type="checkbox" class="column-filter"  value="Billing/Management/Consulting">Billing/Management/Consulting
                            </div>
                        </li>
                        <li class="filterCheckbox" role="checkbox" aria-checked="false">
                            <div class="radio-btn filterCheckbox-sq">
                                <input type="checkbox" class="column-filter"  value="Rehabilitation Center">Rehabilitation Center
                            </div>
                        </li>
                        <li class="filterCheckbox" role="checkbox" aria-checked="false">
                            <div class="radio-btn filterCheckbox-sq">
                                <input type="checkbox" class="column-filter"  value="Ambulatory Care Facility">Ambulatory Care Facility
                            </div>
                        </li>
                        <li class="filterCheckbox" role="checkbox" aria-checked="false">
                            <div class="radio-btn filterCheckbox-sq">
                                <input type="checkbox" class="column-filter"  value="Rural Health Center">Rural Health Center
                            </div>
                        </li>
                        <li class="filterCheckbox" role="checkbox" aria-checked="false">
                            <div class="radio-btn filterCheckbox-sq">
                                <input type="checkbox" class="column-filter" value="Trauma Center">Trauma Center
                            </div>
                        </li>
                        <li class="filterCheckbox" role="checkbox" aria-checked="false">
                            <div class="radio-btn filterCheckbox-sq">
                                <input type="checkbox" class="column-filter"  value="Urgent Care">Urgent Care
                            </div>
                        </li>
                    </ul>
                </div>-->
                <!--end careSettings-->
    
                <!-- #disciplines 
                <div class="btn-group" role="group">
                    <span class="mx-2 align-self-center">Disciplines:</span>
                    <button id="disciplines" type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown"
                        aria-haspopup="true" aria-expanded="false">
                        All
                    </button>
                    <ul id="careSettings-items" class="dropdown-menu filterDropdown px-3" aria-labelledby="disciplines">
                        <li>
                            <input type="text" placeholder="Search category..." id="disciplineSearch" class="categorySearchInput"></li>
                        </li>
                        <div class="dropdown-divider d-inline-block"></div>
                        <li>
                            <div class="custom-control custom-checkbox">
                              <input type="checkbox" class="custom-control-input" id="selectAll">
                              <label class="custom-control-label" for="selectAll">Select All</label>
                            </div>
                        
                        </li>
                        <li class="filterCheckbox" role="checkbox" aria-checked="false">
                             <div class="custom-control custom-checkbox">
                              <input type="checkbox" class="custom-control-input" id="selectAll">
                              <label class="custom-control-label" for="selectAll">Select All</label>
                            </div>
                        </li>
                        <li class="filterCheckbox" role="checkbox" aria-checked="false">
                            <div class="radio-btn filterCheckbox-sq">
                                <input type="checkbox" value="settingTwo">Discipline Two
                            </div>
                        </li>
                        <li class="filterCheckbox" role="checkbox" aria-checked="false">
                            <div class="radio-btn filterCheckbox-sq">
                                <input type="checkbox" value="settingThree">Discipline Three
                            </div>
                        </li>
                    </ul>
                </div>-->
                <!--end disciplines-->
                <div class="border-sep d-inline-block">&nbsp;</div>
                <button class="btn btn-lg btn-default ml-2">Apply Filters</button>
                <div class="border-sep d-inline-block">&nbsp;</div>
                <button class="btn btn-lg btn-default reset my-2">Reset Filters</a></button>

                <!--button id="openSideFilters" type="button" class="btn btn-viewAll">View All Filters</button-->
            </div><div class="pillFilter"><button type="button" data-label="federal" class="btn btn-labeled pillbutton btn-primary">Federal: Yes<span class="btn-label"><i id="close" class="fas fa-times"></i></span></button></div></div></div>`);

  $('.toolbar').html(`<div class="input-group mt-2">
                        <input class="search-blue form-control filter-search mr-0" type="search" placeholder="Search all fields"
                            aria-label="Search">
                        <div class="input-group-append">
                            <button class="btn btn-search" aria-label="sideNavFilters-search" type="submit">
                                <i class="fas fa-search text-white" alt="all filters search"></i>
                            </button>
                        </div>
                    </div></div>`);

  $('.toptools').find('#btnFederal').on('click', function () {
    //$(this).attr("disabled", "disabled");
    $('<div class="pillFilter"><button type="button" data-label="federal" class="btn btn-labeled pillbutton btn-primary">Federal: Yes<span class="btn-label"><i id="close" class="fas fa-times text-white"></i></span></button></div>').insertAfter('.toptools');
  });

  $('.toptools').find('#stateDropdown').on("change", function () {
    var theText = $(this).val();
    if (theText != 'State') {
      table.column().search(theText, false, false).draw();
    } else {
      table.column().search("", false, false).draw();
    }

    $('#stateDropdown option:selected').each(function () {
      var stateBtn = $(`<button type="button" value="" data-label="state" class="btn btn-labeled pillbutton btn-primary">`).text(theText).appendTo('.pillFilter:first');
      var stateClose = $(`<span class="btn-label"><i id="close" class="fas fa-times text-white"></i></span></button>`).appendTo(stateBtn);
      //$('.pillFilter').append(stateBtn);
      $(this).addClass('active');

    })
  });


  $('.compass_wrapper').on('click', '#close', function () {
    let pillButton = $('.pillbutton');

    console.log($(this));

    if ($(pillButton).data('label' === 'state')) {
      console.log($(this));
      /*  ('click',  function () {
          console.log($(this));*/
    }
  });

  /*   $('#compass_wrapper').on('click', '#close', function () {
       let pillName = $(this).parents().parents().attr('data-label');
       var pillButtons = $('#filterBtns').children().each().data('btn');
       var dataAtr = pillButtons.attr('data-btn');//.removeAttr("disabled").removeClass('active');
       if (pillName === dataAtr) {
         $('.pillFilter').attr(pillName).remove();
         $(pillButtons).attr(pillName).removeAttr('disabled').removeClass('active');
         console.log(pillName);
         console.log(this);
         console.log($(this));
       }
       if ((pillName === 'state')) {
         console.log('got it');
         $("#stateDropdown option:eq(0)").attr('selected', 'selected')
       }
     });*/

  $('.filter-search').on('keyup change', function () {
    table.search(this.value).draw();
  });

/*
  $('#careSettingsSearch').on('keyup', function () {
    table
      .columns(1)
      .search(this.value)
      .draw();
  });
*/

/*
  $('.column-filter').on('keyup click', function () {
    if (table.column(1).search() !== this.value) {
      table
        .column(1)
        .search(this.value)
        .draw();
    }
  });

  $('.pillFilter').on('click', '.reset', function () {
    let pillButtons = $('#filterBtns button');

    table.column().search("", false, false).draw();
    if ('.pillFilter') {
      $('.pillFilter').remove();
    }
    if ((pillButtons).attr('disabled')) {
      $(pillButtons).removeAttr('disabled')
      console.log($(this))
    }
    if ((pillButtons.hasClass('active'))) {
      $(pillButtons).removeClass('active')
    }
    if ((pillButtons).data('label' === 'state')) {
      console.log('got it');
      $("#stateDropdown option:eq(0)").attr('selected', 'selected')
    }
  });
*/

/*
  $("#btnFederal").click(function () {
    $(this).toggleClass("active");
  });
*/


  /* ========== Side filterbar functions ==========*/
  $('.filter-chooser .toggler, .closebtn').on('click', function(event){
    event.preventDefault();
    $(this).closest('.filter-chooser').toggleClass('opened');
  });



  $("#btn-filters").click(function () {
      $("#sideNavFilters").css("width", "350px");
      $("#main").css("marginLeft", "350px");
      $("#cover").removeClass("d-none");
    });

    // $(".closebtn").click(function () {
    //   $("#sideNavFilters").css("width", "0px");
    //   $("#main").css("marginLeft", "0px");
    //   $("#cover").addClass("d-none");
    // });

    $(document).on('click', '.sideNavFilters-search', function () {

      if ($(this).is(':checked')) {
        let $thisText = $(this).val();
        let $btnFed = $(".pillFilter").append('<button type="button" class="btn btn-labeled btn-primary">\n' +
          'Federal<span class="btn-label"><i class="fas fa-times text-white"></i></span></button>');
        $('#btnFederal').addClass('active');
      } else {
        $btnFed.remove();
        $('#btnFederal').removeClass('active')
      }
    });

    $(document).on('click', '.clickable', function (e) {
      let $this = $(this);
      if (!$this.hasClass('card-collapsed')) {
        $this.parents('.card').find('.card-body').slideUp();
        $this.addClass('card-collapsed');
        $this.find('i').removeClass('fa fa-minus').addClass('fa fa-plus');

      } else {
        $this.parents('.card').find('.card-body').slideDown();
        $this.removeClass('card-collapsed');
        $this.find('i').removeClass('fa fa-plus').addClass('fa fa-minus');

      }
    });

});
