var events = [];
$(".events").each(function () {
    var title = $(".title", this).text().trim();
    var start = $(".start", this).text().trim();
    var bookingid = $(".bookingid", this).text().trim();
    var event = {
        "title": "Lesson with " + title,
        "start": start,
        "bookingid" : bookingid
    };
    events.push(event);
});


$("#calendar").fullCalendar({
    locale: 'au',
    events: events,
    eventColor: '#064980',
    timeFormat: 'HH:mm',
    slotDuration: "01:00",
    eventClick: function (calEvent, jsEvent, view) {
        jQuery.noConflict();
        $('#myModal').modal("show");
        $('#myModal #eventTitle').text(calEvent.title);
        var bookingId = calEvent.bookingid;
        var $description = $('<div/>');
        $description.append($('<p/>').html('<b>Start: </b>' + calEvent.start.format("DD/MM/YYYY HH:mm")));
        $description.append($('<p/>').html('<b>Duration: 1 hour</b>'));
        $('#myModal #pDetails').empty().html($description);
        $('#myModal #edit').click(function () {
            window.location.href = '/Bookings/Edit/' + bookingId;
        })  
        $('#myModal #rating').click(function () {
            window.location.href = '/Bookings/Rate/' + bookingId;
        })
        $('#myModal #delete').click(function () {
            window.location.href = '/Bookings/Delete/' + bookingId;
        })

    }
});
