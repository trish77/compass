"use strict";

// let $ = require('jquery');

// placeholder log. need to write to filter on the this ID list
$(document).ready(function() {
  var table = $("#compass").DataTable({
    dom:
      '<"toptools"><"pillFilter"><"row" <"col-3 mr-auto" l><"col-6 ml-auto text-right" ip>>t<lpi>',
    lengthMenu: [[5, 10, 25, 50, -1], ["5", "10", "25", "50", "All"]],
    bStateSave: true,
    fixedHeader: {
      header: true,
      footer: true
    },
    columnDefs: [
      { width: "80%", targets: "0" },
      { orderable: false, targets: "nosort" }
    ],
    language: {
      sLengthMenu: "Show _MENU_ regulations",
      info: "_START_ &ndash; _END_ of _TOTAL_ matching regulations"
    },
    buttons: {
      buttons: [
        {
          extend: "print",
          text: "Print",
          className: "btn-download"
        },
        {
          extend: "collection",
          text: "Download",
          buttons: ["pdf", "excel"]
        }
      ]
    }
  });

  table
    .buttons()
    .container()
    .insertBefore($(table.table().container()));

  $(".pillFilter").html(
    '<div class="pillFilter"><button type="button" class="btn btn-labeled btn-primary">Federal: Yes<span class="btn-label"><i class="fas fa-times text-white"></i></span></button></div>'
  );

  $(".toptools").html(`<div id="filterBtns" class="btn-group mt-3" role="group" aria-label="filter button group">
             <button id="btnFederal" type="button" class="btn btn-federal active">Federal</button>
              <!-- #stateDropdown -->
                <select id="stateDropdown" class="custom-select">
                    <option selected>State</option>
                    <option value="Alabama">California</option>
                    <option value="Alaska">Florida</option>
                </select>
                <!--end state select-->

                <!-- #careSettings -->
                <div class="btn-group" role="group">
                    <button id="careSettings" type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown"
                        aria-haspopup="true" aria-expanded="false">
                        Care Settings
                    </button>
                    <ul id="careSettings-items" class="dropdown-menu filterDropdown px-3" aria-labelledby="careSettings">
                        <li>
                            <input type="text" placeholder="Search category..." id="careSettingsSearch" class="categorySearchInput"></li>
                        
                        <div class="dropdown-divider"></div>
                        <li class="filterCheckbox" role="checkbox" aria-checked="false">
                            <div class="radio-btn filterCheckbox-sq">
                                <input type="checkbox" value="settingOne">Select All
                            </div>
                        </li>
                        <li class="filterCheckbox" role="checkbox" aria-checked="false">
                            <div class="radio-btn filterCheckbox-sq">
                                <input type="checkbox" value="settingOne">Setting One
                            </div>
                        </li>
                        <li class="filterCheckbox" role="checkbox" aria-checked="false">
                            <div class="radio-btn filterCheckbox-sq">
                                <input type="checkbox" value="settingTwo">Setting Two
                            </div>
                        </li>
                        <li class="filterCheckbox" role="checkbox" aria-checked="false">
                            <div class="radio-btn filterCheckbox-sq">
                                <input type="checkbox" value="settingThree">Setting Three
                            </div>
                        </li>
                    </ul>
                </div>
                <!--end careSettings-->
    
                <!-- #disciplines -->
                <div class="btn-group" role="group">
                    <button id="disciplines" type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown"
                        aria-haspopup="true" aria-expanded="false">
                        Disciplines
                    </button>
                    <ul id="careSettings-items" class="dropdown-menu filterDropdown px-3" aria-labelledby="disciplines">
                        <li>
                            <input type="text" placeholder="Search category..." id="disciplineSearch" class="categorySearchInput"></li>
                        </li>
                        <div class="dropdown-divider"></div>
                        <li class="filterCheckbox" role="checkbox" aria-checked="false">
                            <div class="radio-btn filterCheckbox-sq">
                                <input type="checkbox" value="settingOne">Select All
                            </div>
                        </li>
                        <li class="filterCheckbox" role="checkbox" aria-checked="false">
                            <div class="radio-btn filterCheckbox-sq">
                                <input type="checkbox" value="settingOne">Discipline One
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
                </div>
                <!--end disciplines-->
                <a href="" class="reset">Reset Filters</a>
                <!--button id="openSideFilters" type="button" class="btn btn-viewAll">View All Filters</button-->
            </div>`);

  $(".toolbar").html(`<div class="input-group">
                        <input class="search-blue form-control filter-search mr-0" type="search" placeholder="Search all fields"
                            aria-label="Search">
                        <div class="input-group-append">
                            <button class="btn btn-search" aria-label="sideNavFilters-search" type="submit">
                                <i class="fas fa-search" alt="all filters search"></i>
                            </button>
                        </div>
                    </div>`);

  $(".toptools")
    .find("#btnFederal")
    .on("click", function() {
      $(".pillFilter").html(
        '<button type="button" class="btn btn-labeled btn-primary">Federal: Yes<span class="btn-label"><i id="close" class="fas fa-times text-white"></i></span></button>'
      );
      $(this).attr("disabled", "disabled");
      $("#close").click(function() {
        $(".pillFilter").html("");
        $("#btnFederal")
          .removeClass("active")
          .removeAttr("disabled");
      });
    });
  $(".toptools")
    .find("#stateDropdown")
    .change(function() {
      var theText = "";
      console.log(`theText`);
      $("#stateDropdown option:selected").each(function() {
        theText += $(this).text() + " ";
        var stateBtn = $("#stateBtn");

        stateBtn
          .html(
            '<div class="state"><button type="button" value="" class="btn btn-labeled btn-primary"><span class="btn-label"><i id="close" class="fas fa-times text-white"></i></span></button></div>'
          )
          .attr("value", $(this).val());
        $(this).addClass("active");
        $("#close").click(function() {
          stateBtn.html("");
          $("#state").removeClass("active");
        });
      });
    });


  yadcf.initMultipleColumns(table, [{
    column_number: [0, 1,2,3],
    filter_container_id: 'stateDropdown',
    filter_default_label: 'State'
  }]);

  $(".filter-search").on("keyup change", function() {
    table.search(this.value).draw();
  });

  $(".categorySearchInput").keyup(function() {
    console.log("character entered");
  });

  $("#btnFederal").click(function() {
    $(this).toggleClass("active");
  });

  $("#openSideFilters").click(function() {
    $("#sideNavFilters").css("width", "450px");
    $("#main").css("marginLeft", "450px");
    $("#cover").removeClass("d-none");
  });

  $(".closebtn").click(function() {
    $("#sideNavFilters").css("width", "0px");
    $("#main").css("marginLeft", "0px");
    $("#cover").addClass("d-none");
  });

  $("document").on("click", ".sideNavFilters-search", function() {
    if ($(this).is(":checked")) {
      var $thisText = $(this).val();
      var $btnFed = $(".pillFilter").append(
        '<button type="button" class="btn btn-labeled btn-primary">\n' +
          'Federal<span class="btn-label"><i class="fas fa-times text-white"></i></span></button>'
      );
      $("#btnFederal").addClass("active");
    } else {
      $btnFed.remove();
      $("#btnFederal").removeClass("active");
    }
  });

  $(document).on("click", ".clickable", function(e) {
    var $this = $(this);
    if (!$this.hasClass("card-collapsed")) {
      $this
        .parents(".card")
        .find(".card-body")
        .slideUp();
      $this.addClass("card-collapsed");
      $this
        .find("i")
        .removeClass("fa fa-plus")
        .addClass("fa fa-minus");
    } else {
      $this
        .parents(".card")
        .find(".card-body")
        .slideDown();
      $this.removeClass("card-collapsed");
      $this
        .find("i")
        .removeClass("fa fa-minus")
        .addClass("fa fa-plus");
    }
  });
});
