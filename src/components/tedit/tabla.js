//Buttons
$(document).ready(function() {

    $("tr:first-child").append('<th class="actionsCol" contenteditable="false">Actions</th>');
    $("tr:not(:first-child)").append('<td class="finalActionsCol">
    <i class="fa fa-plus-circle" aria-hidden="true"></i> 
    <i class="fa fa-minus-circle" aria-hidden="true"></i> 
    <i class="fa fa-pencil-square-o" aria-hidden="true"></i> 
    </td>');
  
    $("table").on("click", ".fa-plus-circle", function() {
      $(this).closest('tr').after('<tr><td class="idRow" contenteditable="false">-</td><td contenteditable="false">-</td><td contenteditable="false">-</td><td contenteditable="false">-</td><td contenteditable="false">-</td><td contenteditable="false">-</td><td contenteditable="false">-</td><td class="finalActionsCol"><i class="fa fa-plus-circle" aria-hidden="true"></i> <i class="fa fa-minus-circle" aria-hidden="true"></i> <i class="fa fa-pencil-square-o" aria-hidden="true"></i> </td></tr>');
    });
  
    $("#addRow").on("click", function() {
      $("table").append('<tr><td class="idRow" contenteditable="false">-</td><td contenteditable="false">-</td><td contenteditable="false">-</td><td contenteditable="false">-</td><td contenteditable="false">-</td><td contenteditable="false">-</td><td contenteditable="false">-</td><td class="finalActionsCol"><i class="fa fa-plus-circle" aria-hidden="true"></i> <i class="fa fa-minus-circle" aria-hidden="true"></i> <i class="fa fa-pencil-square-o" aria-hidden="true"></i> </td></tr>');
    });
  
    $("table").on("click", ".fa-minus-circle", function() {
      if (prompt("Are You Sure You Want to Delete this Row? Type 'yes' to Confirm this") == "yes") {
        $(this).closest('tr').remove();
      } else {}
    });
  
    $("table").on("click", ".fa-pencil-square-o, .fa-floppy-o", function() {
      var thisRow = $(this).parent().siblings();
      var editOn = $(this).hasClass("editMode");
  
      $('td:last-child').attr('contenteditable', 'false');
      $('td:last-child').css('background-color', 'transparent');
  
      if (editOn == false) {
        $(thisRow).attr('contenteditable', 'true');
        $(thisRow).css('background-color', '#ffc9c9');
        $(this).removeClass("fa-pencil-square-o");
        $(this).addClass("fa-floppy-o editMode");
      } else if (editOn == true) {
        $(thisRow).attr('contenteditable', 'false');
        $(thisRow).css('background-color', 'transparent');
        $(this).removeClass("fa-floppy-o editMode");
        $(this).addClass("fa-pencil-square-o");
      }
    });
  
    $('th', this).dblclick(function() {
      $(this).attr("contenteditable", "true");
    });
    $('th', this).mouseout(function() {
      $(this).attr("contenteditable", "false");
    });
  
  });