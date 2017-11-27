$(document).ready(function() {

    // page is now ready, initialize the calendar...

    $('#calendar').fullCalendar({
        // put your options and callbacks here
        height: 500,
        dayClick: function(date, jsEvent, view) {
        // change the day's background color just for fun
          $(this).css('background-color', 'coral');
        },


    });

});
