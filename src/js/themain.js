"use strict";

// let $ = require('jquery');

// placeholder log. need to write to filter on the this ID list
$(document).ready(function () {

  var table = $('#compass').DataTable({
    "dom": '<"toptools"><"container-fluid px-0 d-flex mt-3 justify-content-between" <"d-flex" i> <"d-flex"B>>t<"row py-2 text-white bg-secondary" <"col-4 mr-auto" i><"col-6 ml-auto mt-2 text-right" B>>',
    ajax: {
      url: 'c_data.json',
      dataSrc: 'data'
    },
    initComplete: function () {
      this.api().columns(['.filter-search']).every( function () {
        var column = this;
        var select = $('<br><select><option value="Governing Body"></option></select>')
          .appendTo( $('.filter-search') )
          .on( 'change', function () {
            var val = $.fn.dataTable.util.escapeRegex(
              $(this).val()
            );

            column
              .search( val ? val : '', false, true )
              .draw();
          } );

        column.data().unique().sort().each( function ( d, j ) {
          select.append( '<option value="'+d+'">'+d+'</option>' )
        } );
      } );
    },

    //scrollY: '550px',
    //deferRender:    true,
    //scroller: true,

    columns: [
      {"data": "course_title"},
      {"data": "course_summary"},
      {"data": "effective_date"},
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
          return '<h4><a href="details.html">' + data + '</a></h4><span>' + summary + '</span><div> <a href="#" data-target="#modal-goal-add" style="margin:auto;" class="related" data-toggle="modal"> Related Courses</a></div>'
        }
      },
      {targets: 1, data: 'course_summary', visible: false, searchable: true},
      {targets: 2, data: 'effective_date'},
      {targets: 3, data: 'governing_body', searchable: true},
      {targets: 4, data: 'care_settings', visible: false, searchable: true},
      {targets: 5, data: 'disciplines', visible: false, searchable: true},
      {
        targets: 6,
        data: 'course_citation',
        render: function (data, type, row, meta) {
          return '<div class="text-center"><button class="btn btn-lg btn-default">More Details</button></div>'
        }
      },
      {order: [0, 2, 3]},
      {orderable: false, targets: [1, 3, 4, 5, 6]}
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


  $('.toptools').html('<div class="filters">\n' +
    '   <div id="filterBtns" class="flex flex-row" role="group" aria-label="filter button group">\n' +
    '      <h3>Filters</h3>\n' +
    '<p><span class="text-warning">Default settings:</span> Initially the results show Federal, all Care Settings and all Disciplines.<br>\n' +
    '<span class="text-warning">Note:</span> The Federal or a State selection and at least one Care Setting and one Discipline is required for any search.</p>\n' +
    '               <ul class="tg-list">\n' +
    '                  <li class="tg-list-item">\n' +
    '                    Federal:\n' +
    '                    <input id="cb2" type="checkbox"  checked class="tgl tgl-ios">\n' +
    '                    <label for="cb2" class="tgl-btn"></label>\n' +
    '                  </li>\n' +
    '                </ul>\n' +
    '                <div class="btn-group pt-2" role="group">\n' +
    '                    <span class="mx-2 align-self-center">State:</span>\n' +
    '                    <button id="stateDropdown" type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown"\n' +
    '                        aria-haspopup="true" aria-expanded="false">\n' +
    '                        State\n' +
    '                    </button>\n' +
    '                    <ul id="state-items" class="dropdown-menu filterDropdown px-3" aria-labelledby="stateSettings">\n' +
    '                    <li><em class="text-muted">Note you can filter by one state at a time</em></li>                 \n' +
    '                        <li class="filterCheckbox">\n' +
    '                            <div class="custom-control custom-radio">\n' +
    '                              <input type="radio" id="customRadio1" name="customRadio" class="custom-control-input">\n' +
    '                              <label class="custom-control-label" for="customRadio1">Alabama</label>\n' +
    '                            </div>\n' +
    '                        </li>\n' +
    '                        <li class="filterCheckbox">\n' +
    '                            <div class="custom-control custom-radio">\n' +
    '                              <input type="radio" id="customRadio1" name="customRadio" class="custom-control-input">\n' +
    '                              <label class="custom-control-label" for="customRadio1">California</label>\n' +
    '                            </div>\n' +
    '                        </li>\n' +
    '                        <li class="filterCheckbox">\n' +
    '                            <div class="custom-control custom-radio">\n' +
    '                              <input type="radio" id="customRadio1" name="customRadio" class="custom-control-input">\n' +
    '                              <label class="custom-control-label" for="customRadio1">Florida</label>\n' +
    '                            </div>\n' +
    '                        </li>\n' +
    '                        <li class="filterCheckbox">\n' +
    '                            <div class="custom-control custom-radio">\n' +
    '                              <input type="radio" id="customRadio1" name="customRadio" class="custom-control-input">\n' +
    '                              <label class="custom-control-label" for="customRadio1">Alabama</label>\n' +
    '                            </div>\n' +
    '                        </li>\n' +
    '                        \n' +
    '                    </ul>\n' +
    '                </div>\n' +
    '                <!--end state select-->\n' +
    '\n' +
    '                <!-- #careSettings-->\n' +
    '                <div class="btn-group" role="group">\n' +
    '                <span class="mx-2 align-self-center">Care Settings:</span>\n' +
    '                    <button id="careSettings" type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown"\n' +
    '                        aria-haspopup="true" aria-expanded="false">\n' +
    '                        All\n' +
    '                    </button>\n' +
    '                    <ul id="careSettings-items" class="dropdown-menu filterDropdown px-3" aria-labelledby="careSettings">\n' +
    '                        <li>\n' +
    '                            <input type="text" placeholder="Search category..." id="careSettingsSearch" class="categorySearchInput"></li>\n' +
    '                        \n' +
    '                        <div class="dropdown-divider"></div>\n' +
    '                       \n' +
    '                        <li class="filterCheckbox" role="checkbox" aria-checked="false">\n' +
    '                            <div class="radio-btn filterCheckbox-sq">\n' +
    '                                <input type="checkbox" class="column-filter" aria-selected="true" value="All">Select All\n' +
    '                            </div>\n' +
    '                        </li>\n' +
    '                        <li class="filterCheckbox" role="checkbox" aria-checked="false">\n' +
    '                            <div class="radio-btn filterCheckbox-sq">\n' +
    '                                <input type="checkbox" class="column-filter" value="Academic Setting">Academic Setting\n' +
    '                            </div>\n' +
    '                        </li>\n' +
    '                        <li class="filterCheckbox" role="checkbox" aria-checked="false">\n' +
    '                            <div class="radio-btn filterCheckbox-sq">\n' +
    '                                <input type="checkbox" class="column-filter"  value="Ambulatory Care Facility">Ambulatory Care Facility\n' +
    '                            </div>\n' +
    '                        </li>\n' +
    '                        <li class="filterCheckbox" role="checkbox" aria-checked="false">\n' +
    '                            <div class="radio-btn filterCheckbox-sq">\n' +
    '                                <input type="checkbox" class="column-filter"  value="Assisted Living">Assisted Living\n' +
    '                            </div>\n' +
    '                        </li>\n' +
    '                                 <li class="filterCheckbox" role="checkbox" aria-checked="false">\n' +
    '                            <div class="radio-btn filterCheckbox-sq">\n' +
    '                                <input type="checkbox" class="column-filter"  value="Billing/Management/Consulting">Billing/Management/Consulting\n' +
    '                            </div>\n' +
    '                        </li>\n' +
    '                        <li class="filterCheckbox" role="checkbox" aria-checked="false">\n' +
    '                            <div class="radio-btn filterCheckbox-sq">\n' +
    '                                <input type="checkbox" class="column-filter"  value="Rehabilitation Center">Rehabilitation Center\n' +
    '                            </div>\n' +
    '                        </li>\n' +
    '                        <li class="filterCheckbox" role="checkbox" aria-checked="false">\n' +
    '                            <div class="radio-btn filterCheckbox-sq">\n' +
    '                                <input type="checkbox" class="column-filter"  value="Ambulatory Care Facility">Ambulatory Care Facility\n' +
    '                            </div>\n' +
    '                        </li>\n' +
    '                        <li class="filterCheckbox" role="checkbox" aria-checked="false">\n' +
    '                            <div class="radio-btn filterCheckbox-sq">\n' +
    '                                <input type="checkbox" class="column-filter"  value="Rural Health Center">Rural Health Center\n' +
    '                            </div>\n' +
    '                        </li>\n' +
    '                        <li class="filterCheckbox" role="checkbox" aria-checked="false">\n' +
    '                            <div class="radio-btn filterCheckbox-sq">\n' +
    '                                <input type="checkbox" class="column-filter" value="Trauma Center">Trauma Center\n' +
    '                            </div>\n' +
    '                        </li>\n' +
    '                        <li class="filterCheckbox" role="checkbox" aria-checked="false">\n' +
    '                            <div class="radio-btn filterCheckbox-sq">\n' +
    '                                <input type="checkbox" class="column-filter"  value="Urgent Care">Urgent Care\n' +
    '                            </div>\n' +
    '                        </li>\n' +
    '                    </ul>\n' +
    '                </div>\n' +
    '                <!--end careSettings-->\n' +
    '    \n' +
    '                <!-- #disciplines--> \n' +
    '                <div class="btn-group" role="group">\n' +
    '                    &nbsp;Disciplines\n' +
    '                    <button id="disciplines" type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown"\n' +
    '                        aria-haspopup="true" aria-expanded="false">\n' +
    '                        All\n' +
    '                    </button>\n' +
    '                    <ul id="careSettings-items" class="dropdown-menu filterDropdown px-3" aria-labelledby="disciplines">\n' +
    '                        <li>\n' +
    '                            <input type="text" placeholder="Search category..." id="disciplineSearch" class="categorySearchInput"></li>\n' +
    '                        </li>\n' +
    '                        <div class="dropdown-divider d-inline-block"></div>\n' +
    '                        <li>\n' +
    '                            <div class="custom-control custom-checkbox">\n' +
    '                              <input type="checkbox" class="custom-control-input" id="selectAll">\n' +
    '                              <label class="custom-control-label" for="selectAll">Select All</label>\n' +
    '                            </div>\n' +
    '                        \n' +
    '                        </li>\n' +
    '                        <li class="filterCheckbox" role="checkbox" aria-checked="false">\n' +
    '                             <div class="custom-control custom-checkbox">\n' +
    '                              <input type="checkbox" class="custom-control-input" id="selectAll">\n' +
    '                              <label class="custom-control-label" for="selectAll">Select All</label>\n' +
    '                            </div>\n' +
    '                        </li>\n' +
    '                        <li class="filterCheckbox" role="checkbox" aria-checked="false">\n' +
    '                            <div class="radio-btn filterCheckbox-sq">\n' +
    '                                <input type="checkbox" value="settingTwo">Discipline Two\n' +
    '                            </div>\n' +
    '                        </li>\n' +
    '                        <li class="filterCheckbox" role="checkbox" aria-checked="false">\n' +
    '                            <div class="radio-btn filterCheckbox-sq">\n' +
    '                                <input type="checkbox" value="settingThree">Discipline Three\n' +
    '                            </div>\n' +
    '                        </li>\n' +
    '                    </ul>\n' +
    '                </div>\n' +
    '                <!--end disciplines-->\n' +
    '              <!--  <div class="border-sep d-inline-block">&nbsp;</div>\n' +
    '                <button class="btn btn-lg btn-default ml-2">Apply Filters</button>-->\n' +
    '                <div class="border-sep mr-2 d-inline-block">&nbsp;</div>\n' +
    ' <button class="btn btn-lg btn-default ml-2">Apply Filters</button>\n' +
    '               <div class="border-sep mr-3 d-inline-block">&nbsp;</div>\n' +
    '                <div class="resetDiv"><a href="#" class="reset my-2"> Reset All</a></div></div>\n' +
    '            </div><div class="mt-3"><h4 class="float-left mt-2">Applied Filters</h4>\n' +
    '               <div class="border-sep mr-3 d-inline-block">&nbsp;</div>\n' +
    '   <a href="#" class="reset my-2 showAll" role="button"> All Applied Filters</a></div>\n' +
    '            <div id="showFilter" class="pillFilter  border-bottom"><div><button type="button" data-label="federal" class="btn btn-labeled pillbutton btn-primary"><span class="font-weight-light">Federal:</span><span> Yes<span class="btn-label"><i id="close" class="fas fa-times"></i></span></button>\n' +
    '            <button type="button" data-label="state" class="btn btn-labeled pillbutton btn-primary"><span class="font-weight-light">State:</span> <span>California<span class="btn-label"><i id="close" class="fas fa-times"></i></span></button>\n' +
    '            <button type="button" data-label="care-setting" class="btn btn-labeled pillbutton btn-primary"><span class="font-weight-light">Care Setting:</span> <span>Rehabilitation Center<span class="btn-label"><i id="close" class="fas fa-times"></i></span></button>\n' +
    '            <button type="button" data-label="discipline" class="btn btn-labeled pillbutton btn-primary"><span class="font-weight-light">Discipline:</span>' +
    ' <span>Anesthesiologist<span class="btn-label"><i id="close" class="fas fa-times"></i></span></button>\n' +
    '            <button type="button" data-label="discipline" class="btn btn-labeled pillbutton btn-primary"><span class="font-weight-light">Discipline:</span> <span>Clinical Manager<span class="btn-label"><i id="close" class="fas fa-times"></i></span></button>\n' +
    '                <button type="button" data-label="care-setting" class="btn btn-labeled pillbutton btn-primary"><span class="font-weight-light">Care Setting:</span> <span>Rehabilitation Center<span class="btn-label"><i id="close" class="fas fa-times"></i></span></button>\n' +
    '            <button type="button" data-label="discipline" class="btn btn-labeled pillbutton btn-primary"><span class="font-weight-light">Discipline:</span> <span>Anesthesiologist<span class="btn-label"><i id="close" class="fas fa-times"></i></span></button>\n' +
    '            <button type="button" data-label="discipline" class="btn btn-labeled pillbutton btn-primary">Discipline: Clinical Manager<span class="btn-label"><i id="close" class="fas fa-times"></i></span></button>\n' +
   ' <button type="button" data-label="discipline" class="btn btn-labeled pillbutton btn-primary"><span class="font-weight-light">Discipline:</span> <span>Clinical Manager</span><span class="btn-label"><i id="close" class="fas fa-times"></i></span></button>\n' +
  '<button type="button" data-label="discipline" class="btn btn-labeled pillbutton btn-primary"><span class="font-weight-light">Discipline:</span> <span>Athletic Trainer<span class="btn-label"><i id="close" class="fas fa-times"></i></span></button>\n' +
 ' <button type="button" data-label="discipline" class="btn btn-labeled pillbutton btn-primary"><span class="font-weight-light">Discipline:</span> <span>Audiologist<span class="btn-label"><i id="close" class="fas fa-times"></i></span></button>\n' +
 ' <button type="button" data-label="discipline" class="btn btn-labeled pillbutton btn-primary"><span class="font-weight-light">Discipline:</span> <span>Billing Personnel<span class="btn-label"><i id="close" class="fas fa-times"></i></span></button>\n' +
    ' <button type="button" data-label="discipline" class="btn btn-labeled pillbutton btn-primary">Discipline: Audiologist<span class="btn-label"><i id="close" class="fas fa-times"></i></span></button>\n' +
    ' <button type="button" data-label="discipline" class="btn btn-labeled pillbutton btn-primary">Discipline: Billing Personnel<span class="btn-label"><i id="close" class="fas fa-times"></i></span></button>\n' +
  '<button type="button" data-label="discipline" class="btn btn-labeled pillbutton btn-primary">Discipline: Biomedical Engineer<span class="btn-label"><i id="close" class="fas fa-times"></i></span></button>');

  //$('.toolbar').html(``);

  $('.toptools').find('#btnFederal').on('click', function () {
    //$(this).attr("disabled", "disabled");
    $('<div class="pillFilter"><button type="button" data-label="federal" class="btn btn-labeled pillbutton btn-primary">Federal: Yes<span class="btn-label"><i id="close" class="fas fa-times text-white"></i></span></button></div>').insertAfter('.toptools');
  });

  $('.toptools').find('#stateDropdown').on("change", function () {
    var theText = $(this).val();
    if (theText !== 'State') {
      table.column().search(theText, false, false).draw();
    } else {
      table.column().search("", false, false).draw();
    }

    $('#stateDropdown option:selected').each(function () {
      var stateBtn = $('<button type="button" value="" data-label="state" class="btn btn-labeled pillbutton btn-primary">').text(theText).appendTo('.pillFilter:first');
      var stateClose = $('<span class="btn-label"><i id="close" class="fas fa-times text-white"></i></span></button>').appendTo(stateBtn);
      //$('.pillFilter').append(stateBtn);
      $(this).addClass('active');

    })
  });
/*  console.log(table);
  table.columns( '.filter-search' ).every( function () {
    var that = this;

    // Create the select list and search operation
    var select = $('<select><option value="Governing Body"></option></select>')
      .appendTo(
        this.header()
      )
      .on( 'change', function () {
        that
          .search( $(this).val() )
          .draw();
      } );

    // Get the search data for the first column and add to the select list
    this
      .cache( 'search' )
      .sort()
      .unique()
      .each( function ( d ) {
        select.append( $('<option value="'+d+'">'+d+'</option>') );
      } );
  } );*/

  $('.compass_wrapper').on('click', '#close', function () {
    var pillButton = $('.pillbutton');

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
/*
  $('#openSideFilters, .closebtn').on('click', function (event) {
    event.preventDefault();
    $('.filter-chooser').toggleClass('opened');
  });
*/


/*  $("#btn-filters").click(function () {
    $("#sideNavFilters").css("width", "350px");
    $("#main").css("marginLeft", "350px");
    $("#cover").removeClass("d-none");
  });*/

  // $(".closebtn").click(function () {
  //   $("#sideNavFilters").css("width", "0px");
  //   $("#main").css("marginLeft", "0px");
  //   $("#cover").addClass("d-none");
  // });

  $(document).on('click', '.sideNavFilters-search', function () {
    if ($(this).is(':checked')) {
      var $thisText = $(this).val();
      var btnFed = $(".pillFilter").append('<button type="button" class="btn btn-labeled btn-primary">\n' +
        'Federal<span class="btn-label"><i class="fas fa-times text-white"></i></span></button>');
      $('#btnFederal').addClass('active');
    } else {
      btnFed.remove();
      $('#btnFederal').removeClass('active')
    }

  });

  $('.filterDrawer ').on('click', '.clickable', function (e) {
    e.preventDefault();
    var $this = $(this);
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

  $('.showAll').on('click', function (e) {
    e.preventDefault();
    var $this = $(this);
    console.log($this);

    var pillWrapper = $this.parent().next('#showFilter');
    pillWrapper.toggleClass('openAll');

  });


  $('.careSettings', '.disciplines').on('click', '.more', function (e) {
      e.preventDefault();
      var $this = $(this);

     // var filterer = $('.filters');
      //let filtered = $('.filtered');
      var notFiltered = $this.next('.allnotFiltered');
      var more = $('<a href="#" class="more">More <i class="fa fa-angle-down"></i></a>');
      var less = $('<a href="#" class="less">Less <i class="fa fa-angle-up"></i></a>');
      console.log(less);

      if (notFiltered.css('display', 'none')) {
        notFiltered.css('display', 'block');
        $this.replaceWith(less);
      }
    });

  $('.careSettings', '.disciplines').on('click', '.less', function (e) {
    e.preventDefault();
    var $this = $(this);

    var notFiltered = $this.next('.allnotFiltered');
    var more = $('<a href="#" class="more">More <i class="fa fa-angle-down"></i></a>');
    var less = $('<a href="#" class="less">Less <i class="fa fa-angle-up"></i></a>');
    console.log(less);

    if (notFiltered.css('display', 'block')) {
      //$this.prev().find(filtered).css('font-weight', 'bold');
      notFiltered.css('display', 'none');
      $this.replaceWith(more);
    }
  });




});
