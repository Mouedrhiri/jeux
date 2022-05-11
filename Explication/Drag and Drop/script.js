$(document).ready(function () {
  $("#drag").draggable();
  $("#non-drop").draggable();
  $("#drop").droppable({
    accept: "#drag",
    drop: function () {
      if ($("#drop").attr("data-name") == "test2") {
        console.log(true);
      } else {
        console.log(false);
      }
    },
  });
  $("#drop2").droppable({
    accept: "#drag",
    drop: function () {
      if ($("#drag").attr("data-name") != "test2") {
        console.log(false);
      } else {
        console.log(true);
      }
    },
  });
});
