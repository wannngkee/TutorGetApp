var events = [];
$(".events").each(function () {
    var title = $(".title", this).text().trim();
    var start = $(".start", this).text().trim();
    var event = {
        "title": "Lesson with " + title,
        "start": start
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
        $('#myModal #eventTitle').text(calEvent.title);
        var $description = $('<div/>');
        $description.append($('<p/>').html('<b>Start:</b>' + calEvent.start.format("DD/MM/YYYY HH:mm a")));
        if (calEvent.end != null) {
            $description.append($('<p/>').html('<b>End:</b>' + calEvent.end.format("DD/MM/YYYY HH:mm a")));
        }
        $('#myModal #pDetails').empty().html($description);
        $('#myModal').modal("show");
    }
});
