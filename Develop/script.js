// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

$(function() {

  var saveButton = $('saveBtn');
  var currentDay = $('#currentDay');
  var currentTime = dayjs().hour();
  var timeBlocks = $('#schedule').children('.time-block');
  currentDay.text(dayjs().format('dddd, MMMM DD'));
  console.log(currentTime);



  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // When clicking on save button
  saveButton.on('click', function() {
    // Assign selectedTime to be the id for the div in which the save button is in
    selectedTime = $(this).parents('.time-block').attr('id');
    writtenTask = $(this).siblings('.description').text();
    console.log(selectedTime);
    console.log(writtenTask);
    localStorage.setItem(JSON.stringify(selectedTime), JSON.stringify(writtenTask));
  });
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // For all time blocks do:
  timeBlocks.each(function() {
    timeSlot = $(this).attr('id');
    slotHour = timeSlot.substr(5,2);
    console.log(slotHour);
    // if time block is in the past based on the current time
    if (dayjs().isBefore(dayjs().hour(slotHour), 'hour')) {
    // Make the class of the current time block be "past"
      $(this).addClass('past');
    }
    
  // if the time block is in the future based on the current time
    else if (dayjs().isAfter(dayjs().hour(slotHour), 'hour')) {
    // Make the class of the time block be "future"
      $(this).addClass('future');
    }

  // else if the time block is equal to the present time
  // Make the class of the time block be "present"
    else if (dayjs().isSame(dayjs().hour(slotHour), 'hour')) {
      $(this).addClass('present');
    }
  })
  
  
  
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.

});
