var bookings = [];
$(".bookings").each(function () {
    var tutor = $(".name", this).text().trim();
    var dateTime = $(".dateTime", this).text().trim();
    var booking = {
        "tutor": tutor,
        "dateTime": dateTime
    };
    bookings.push(booking);

});

$("#calendar").fullCalendar({
    locale: 'au',
    bookings: bookings,

    dayClick: function (date, allDay, jsBooking, view) {
        var d = new Date(date);
        var m = moment(d).format("YYYY-MM-DD");
        m = encodeURIComponent(m);
        var uri = "/Bookings/Create?date=" + m;
        $(location).attr('href', uri);

    }

});