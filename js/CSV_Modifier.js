//_______________________________________________________________________________________
// Implementing pop up model's data for editing
$(document).ready(function () {
  $("#csvRoot").on("click", ".editbtn", function () {
    row_index = $(this).closest("tr").index();
    console.log(`ata akhn click kora button er index: ${row_index}`);
    console.log("Press Hoise EDIT");
    var $tr = $(this).closest("tr");
    console.log($tr.html());
    var data = $tr
      .children("td")
      .map(function () {
        return $(this).text();
      })
      .get();

    console.log(data);

    $("#TrackIDEdit").val(data[1]);
    $("#DeviceIDEdit").val(data[2]);
    $("#DeviceVendorEdit").val(data[3]);
    $("#deviceModelEdit").val(data[4]);
    $("#DeviceSerialEdit").val(data[5]);
    $("#MemoEdit").val(data[6]);

    /// replace with existing row when submitted
    $("#EditForm").submit(function (event) {
      event.preventDefault();
      event.stopImmediatePropagation();

      console.log("SUBMIT HOISE MAMAA");
      // var idEdit = $("input[name=IDEdit]").val();
      var TrackIDEdit = $("input[name=TrackIDEdit]").val();
      var DeviceIDEdit = $("input[name=DeviceIDEdit]").val();
      var DeviceVendorEdit = $("input[name=DeviceVendorEdit]").val();
      var deviceModelEdit = $("input[name=deviceModelEdit]").val();
      var DeviceSerialEdit = $("input[name=DeviceSerialEdit]").val();
      var MemoEdit = $("input[name=MemoEdit]").val();

      //console.log(deviceRatingEdit);

      var temp = $("#csvRoot").DataTable().row(row_index).data();
      console.log("ata data before edit-> " + temp + " -> ");
      temp[1] = TrackIDEdit;
      temp[2] = DeviceIDEdit;
      temp[3] = DeviceVendorEdit;
      temp[4] = deviceModelEdit;
      temp[5] = DeviceSerialEdit;
      temp[6] = MemoEdit;
      console.log("ata data after edit-> " + temp + " -> ");
      var tableRow = row_index; // GET TABLE ROW NUMBER
      // Updating existed row data with new data and row number
      $("#csvRoot").dataTable().fnUpdate(temp[1], [tableRow], 1, true);
      $("#csvRoot").dataTable().fnUpdate(temp[2], [tableRow], 2, true);
      $("#csvRoot").dataTable().fnUpdate(temp[3], [tableRow], 3, true);
      $("#csvRoot").dataTable().fnUpdate(temp[4], [tableRow], 4, true);
      $("#csvRoot").dataTable().fnUpdate(temp[5], [tableRow], 5, true);
      $("#csvRoot").dataTable().fnUpdate(temp[6], [tableRow], 6, true);

      $("#editModalClose").click();

      $("input[name=TrackIDEdit]").val("");
      $("input[name=DeviceIDEdit]").val("");
      $("input[name=DeviceVendorEdit]").val("");
      $("input[name=deviceModelEdit]").val("");
      $("input[name=DeviceSerialEdit]").val("");
      $("input[name=MemoEdit]").val("");
      let totalEmptyRows = $("#csvRoot tr td:nth-child(2):empty").length;
      $("#TotalNumberOfEmptyTrackID").text(totalEmptyRows);
    });
  });
});

// For Inserting New Row
$(document).ready(function () {
  $("#InsertForm").submit(function (event) {
    // alert("Handler for .submit() called.");
    event.preventDefault();
    // let time = new Date($.now());
    // let id =
    //   time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds();
    let TrackID = $("input[name=TrackID]").val();
    let DeviceID = $("input[name=DeviceID]").val();
    let DeviceVendor = $("input[name=DeviceVendor]").val();
    let DeviceModel = $("input[name=DeviceModel]").val();

    let DeviceSerial = $("input[name=DeviceSerial]").val();
    let Memo = $("input[name=Memo]").val();

    var NewROW = `<td class="table-data sorting_1" contenteditable="false"></td>  
    
                              <td class="table-data" contenteditable="false">${TrackID}</td> 
                              
                              <td class="table-data" contenteditable="false">${DeviceID}</td>                                    
                              
                              <td class="table-data" contenteditable="false">${DeviceVendor}</td>                                    
                              
                              <td class="table-data" contenteditable="false">${DeviceModel}</td>                                    
                              
                              <td class="table-data" contenteditable="false">${DeviceSerial}</td>                                    
                              
                              <td class="table-data" contenteditable="false">${Memo}</td>                                    
                              
                        <td>
                          <div class="actionOptions">
                            
                              <button class="editbtn btn mr-2 btn-sm" data-toggle="modal" data-target="#editModal">Edit</button>
                            
                             
                              <button class="deleteRow btn btn-danger btn-sm">Delete</button>
                           
                          </div>
                        </td>    `;

    $("#csvRoot")
      .DataTable()
      .row.add($("<tr> " + NewROW + " </tr>"))
      .draw();

    $("#closeInsertModal").click();

    $("input[name=TrackID]").val("");
    $("input[name=DeviceID]").val("");
    $("input[name=DeviceVendor]").val("");
    $("input[name=DeviceModel]").val("");
    $("input[name=DeviceSerial]").val("");
    $("input[name=Memo]").val("");

    // scrolling to the bottom for every new row entry starts
    var $scrollBody = $($("#csvRoot").DataTable().table().node()).parent();
    $scrollBody.scrollTop($scrollBody.get(0).scrollHeight);
    // scrolling to the bottom for every new row entry ends

    // Needs to re calculate the rows number and empty rows number Starts
    let totalData = $("#csvRoot").DataTable().data().count();
    let iColumns = $("#csvRoot thead th").length;
    let totalRow = totalData / iColumns;

    $("#TotalNumberOfTrackID").text(totalRow);
    $("#TotalNumberOfEmptyTrackID").text(totalRow);

    let totalEmptyRows = $("#csvRoot tr td:nth-child(2):empty").length;
    $("#TotalNumberOfEmptyTrackID").text(totalEmptyRows);

    // Add serial No
    $("#csvRoot tr").each(function (index) {
      $(this).find("td:nth-child(1)").html(index);
    });
    // Needs to re calculate the rows number and empty rows number Ends
  });
});

// // Adding new File
// $(document).ready(function () {
//   $("#ImportAnotherFileButton").click(function () {
//     localStorage.setItem("newFile", "1");
//     location.reload();
//   });

//   if (localStorage.getItem("newFile") === "1") {
//     $("#startTrackingByFileButton").click();
//     localStorage.setItem("newFile", "0");
//     localStorage.setItem("UploadNewFile", "0");
//   }
// });

// Add serial No
// $(document).ready(function () {
//   //var addSerialNumber = function () {
//   $("#csvRoot tr").each(function (index) {
//     $(this)
//       .find("td:nth-child(1)")
//       .html(index + 1);
//   });
//   // };
//   //addSerialNumber();
// });

// Close the main modal through close button
$("#closeMainModal").on("click", function (e) {
  $("#mainModal").modal("hide");
});

//For custom Project Name input starts
$(document).ready(function () {
  const inputs = document.querySelectorAll("input");

  inputs.forEach((el) => {
    el.addEventListener("blur", (e) => {
      if (e.target.value) {
        e.target.classList.add("dirty");
      } else {
        e.target.classList.remove("dirty");
      }
    });
  });
});
//For custom Project Name input Ends

// Delete Row starts

$("#csvRoot").on("click", ".deleteRow", function () {
  // $("#csvRoot").DataTable().destroy();
  // let table = $("#csvRoot").DataTable({
  //   scrollY: 400,
  //   scrollX: true,
  //   scrollCollapse: true,
  // });
  var checkstr = confirm("Are you sure you want to delete this row?");

  if (checkstr == true) {
    // do your code
    //table.row($(this).parents("tr")).remove().draw();
    $("#csvRoot").DataTable().row($(this).parents("tr")).remove().draw();

    // Needs to create new instance of datatable as table has been updated
    // $("#csvRoot").DataTable().destroy();
    // $("#csvRoot").DataTable({
    //   bPaginate: false,
    //   destroy: true,
    //   scrollY: 300,
    //   scrollX: true,
    //   scrollCollapse: true,
    //   autoWidth: true,
    //   responsive: true,
    // });

    // Needs to re calculate the rows number and empty rows number Starts
    let totalData = $("#csvRoot").DataTable().data().count();
    let iColumns = $("#csvRoot thead th").length;
    let totalRow = totalData / iColumns;

    $("#TotalNumberOfTrackID").text(totalRow);
    $("#TotalNumberOfEmptyTrackID").text(totalRow);

    let totalEmptyRows = $("#csvRoot tr td:nth-child(2):empty").length;
    $("#TotalNumberOfEmptyTrackID").text(totalEmptyRows);
    // Add serial No
    $("#csvRoot tr").each(function (index) {
      $(this).find("td:nth-child(1)").html(index);
    });
    // Needs to re calculate the rows number and empty rows number Ends
  } else {
    return false;
  }

  //Serial no Modify
  // var addSerialNumber = function () {
  //   $("#csvRoot tr").each(function (index) {
  //     $(this)
  //       .find("td:nth-child(1)")
  //       .html(index + 1);
  //   });
  // };
  // addSerialNumber();
});

// Delete row ends
//______________________________________________________________________________________________________

// Table downloader: Download table as csv/xlsx/text formate starts
jQuery(document).ready(function () {
  let clicked = true;
  $("#csv-export-btn").on("click", function (e) {
    $(".tableexport-caption").show();
    $(".tableexport-caption").prepend("<p>Test</p>");
    e.preventDefault();
    if (clicked) {
      ResultsToTable();

      clicked = false;
    }
  });

  function ResultsToTable() {
    // scrolling to the bottom for every new row entry starts
    // var $scrollBody = $($("#csvRoot").DataTable().table().node()).parent();
    // $scrollBody.scrollTop($scrollBody.get(0).scrollHeight);
    // scrolling to the bottom for every new row entry ends
    var uploadedFileName = $("#csvFileInput").val().split("\\").pop();
    uploadedFileName = uploadedFileName.split(".").slice(0, -1).join(".");
    var lastIndex = $("#csvRoot tr:nth-child(1) td:last").index(); // This will get the last column index num so that action column is not downloaded

    $("#csvRoot").tableExport({
      headers: true, // (Boolean), display table headers (th or td elements) in the <thead>, (default: true)
      footers: true, // (Boolean), display table footers (th or td elements) in the <tfoot>, (default: false)
      formats: ["xlsx", "csv", "txt"], // (String[]), filetype(s) for the export, (default: ['xlsx', 'csv', 'txt'])
      filename: uploadedFileName, // (id, String), filename for the downloaded file, (default: 'id')
      // bootstrap: false,                   // (Boolean), style buttons using bootstrap, (default: true)
      //exportButtons: true,                // (Boolean), automatically generate the built-in export buttons for each of the specified formats (default: true)
      position: "top", // (top, bottom), position of the caption element relative to table, (default: 'bottom')
      ignoreRows: null, // (Number, Number[]), row indices to exclude from the exported file(s) (default: null)
      ignoreCols: [0, lastIndex], // (Number, Number[]), column indices to exclude from the exported file(s) (default: null)
      trimWhitespace: true, // (Boolean), remove all leading/trailing newlines, spaces, and tabs from cell text in the exported file(s) (default: false)
      RTL: false, // (Boolean), set direction of the worksheet to right-to-left (default: false)
      sheetname: uploadedFileName, // (id, String), sheet name for the exported spreadsheet, (default: 'id')
    });
    //<i class="fas fa-times"></i>
    //$(".tableexport-caption").prepend(`<button id="clk">X</button>`);
    $(".tableexport-caption").prepend(
      `<button id="donwload-Modal"><i class="fas fa-times"></i></button>`
    );
    $("#donwload-Modal").on("click", function (e) {
      //console.log(`clikkkkkk mamaa`);
      //$("#mainModal").modal("hide");
      var container = $(".tableexport-caption");
      container.remove();
      container.hide();
    });

    tableExport().reset(); // Reset tableExport for updated table
  }
});

$(document).mouseup(function (e) {
  var container = $(".tableexport-caption");

  // if the target of the click isn't the container nor a descendant of the container
  if (!container.is(e.target) && container.has(e.target).length === 0) {
    container.remove();
    container.hide();
  }
});

// Showing the download button when file uploaded
$("#csvFileInput").on("input", function () {
  $(".csv-export-btn-div").show();
});

// Setting the file name in the top bar
function fileSelect(e) {
  console.log(e.target.files[0].name);
  let csvFilename = e.target.files[0].name;
  $("#csvName").html("File Name: " + csvFilename + "&nbsp;&nbsp;");
}

// Table downloader: Download table as csv/xlsx/text formate ends
//_____________________________________________________________________________________________________________

// Showing table modal controller button click starts
$(document).ready(function () {
  $("#showModal").on("click", function (e) {
    if (document.getElementById("csvFileInput").files.length == 0) {
      alert("No File Selected");
    } else {
      $("#modalButton").click();
    }
  });
});
// Showing table modal controller button click ends
