// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

$(function() {

  var saveButton = $('.saveBtn');
  var currentDay = $('#currentDay');
  var currentTime = dayjs().hour();
  var timeBlocks = $('#schedule').children('.time-block');
  currentDay.text(dayjs().format('dddd, MMMM DD'));
  console.log(saveButton);
  console.log(localStorage);
  
  // When clicking on save button
  saveButton.on('click', function() {
    // Assign selectedTime to be the id for the div in which the save button is in
    selectedTime = $(this).parents('.time-block').attr('id');
    writtenTask = $(this).siblings('.description').val();
    console.log('clicked save');
    console.log(selectedTime);
    console.log(writtenTask);
    localStorage.setItem(JSON.stringify(selectedTime), JSON.stringify(writtenTask));
  });

  // For all time blocks do:
  timeBlocks.each(function() {
    var timeSlot = $(this).attr('id');
    var slotHour = timeSlot.substr(5,2);
    
    // Load in the previously saved tasks that are saved in local storage
    var storedTask = JSON.parse(localStorage.getItem(JSON.stringify(timeSlot)));
    console.log(storedTask);
    if (storedTask !== null) {
      $(this).children('.description').val(storedTask);
    }

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
