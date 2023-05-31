// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

$(function () {
  // TODO: Add code to display the current date in the header of the page.

  //function to append suffix to date based on the day
  const nth = function (d) {
    if (d > 3 && d < 21) return "th";
    switch (d % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  //Set header date as current date
  $("#currentDay").text(
    dayjs().format("dddd, MMMM D") + nth(dayjs().format("D"))
  );

  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //

  let currentHour = dayjs().format("H");
  //let currentHour = 11

  //Hours Time block
  let workingHours = [10, 11, 12, 1, 2, 3, 4, 5];

  // Loop to dynamically create hour block elements
  for (let index = 0; index < workingHours.length; index++) {
    let nextHrElement = $("#hour-9").clone()[0];
    let hourIndex = workingHours[index];
    let id = "hour-" + hourIndex;
    let hour =
      8 < hourIndex && hourIndex < 13 ? hourIndex + "AM" : hourIndex + "PM";
    //Set id based hour block
    $(nextHrElement).attr("id", id);
    //Set time block
    $($(nextHrElement).children(".col-2").first()[0]).text(hour);


    //Convert hour index to military for diff calculation
    console.log(hourIndex);
    if (hourIndex <= 5) hourIndex += 12;

    //Set css present, past, future based on current time
    let cssClass = "";

    const blockTime = dayjs().hour(hourIndex)

    if (blockTime.diff(dayjs(), "hours") < 0) {
      cssClass = "past";
    } else if (blockTime.diff(dayjs(), "hours") === 0 ) {
      cssClass = "present";
    } else {
      cssClass = "future";
    }

    console.log(cssClass);

    $(nextHrElement).removeClass("past").addClass(cssClass);
    $("#container").append(nextHrElement);
  }

  //Update css present, past, future for first element (9-hour) time block
  var blockTimeAt9 = dayjs().hour(9)

  if ( blockTimeAt9.diff(dayjs(), "hours") === 0 )  {
    $("#hour-9").removeClass("past").addClass("present");
  } else if (blockTimeAt9.diff(dayjs(), "hours") > 0) {
    $("#hour-9").removeClass("past").addClass("future");
  }

  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //

  //Get localstorage and set already persisted time block entries
  let timeBlockData = JSON.parse(localStorage.getItem("timeBlockData"));
  if (timeBlockData) {
    $(".time-block").each(function () {
      let timeBlockID = $(this).attr("id");
      console.log(timeBlockID);
      console.log(timeBlockData[timeBlockID]);
      $($(this).children(".description")[0]).val(timeBlockData[timeBlockID]);
    });
  }

  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //

  //Save Button Event Listener
  $(".saveBtn").on("click", function () {
    let timeBlockSaveData = {};
    $(".time-block").each(function () {
      let timeBlockID = $(this).attr("id");
      timeBlockSaveData[timeBlockID] = $(
        $(this).children(".description")[0]
      ).val();
    });
    localStorage.setItem("timeBlockData", JSON.stringify(timeBlockSaveData));
  });
});
