// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.


  //function to append suffix to date based on the day
  const nth = function(d) {
    if (d > 3 && d < 21) return 'th';
    switch (d % 10) {
      case 1:  return "st";
      case 2:  return "nd";
      case 3:  return "rd";
      default: return "th";
    }
  } 

  //Set header date as current date
  $('#currentDay').text(dayjs().format('dddd, MMMM D') + nth(dayjs().format('D')) )

  let workingHours = [10,11,12,1,2,3,4,5]

  for (let index = 0; index < workingHours.length; index++) {
    let nextHrElement = $('#hour-9').clone()[0];
    let hourIndex=workingHours[index] ;
    let id='hour-'+hourIndex;
    let hour=(8 < hourIndex && hourIndex < 13) ? hourIndex+'AM': hourIndex+'PM'
    $(nextHrElement).attr('id',id)
    $($(nextHrElement).children('.col-2').first()[0]).text(hour)

    let cssClass = '';
    let currentHour = dayjs().format('H')
    console.log (currentHour)
    console.log (hourIndex)

    if (hourIndex <= 5)
      hourIndex += 12 

    if (currentHour > hourIndex) {
      cssClass = 'past'
    } else if (currentHour == hourIndex) {
      cssClass = 'present'
    } else {
      cssClass = 'future'
    }

    console.log (cssClass)

    $(nextHrElement).removeClass('past').addClass(cssClass)
    $('#container').append(nextHrElement)
  }


});

