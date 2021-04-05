onload = function() {

    var date = new Date();

    var currentDate = date.getFullYear();
    var currentMonth = date.getMonth();
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    for (var i=0; i<5; i++) {
        var output = '<option value="'+ currentDate +'">'+ currentDate +'</option>';
        currentDate = currentDate + 1;
        $('#year').append(output);
    }

    for (var i=0; i<12; i++) {
        var output;
        if (i == currentMonth) {
            output = '<option value="'+ (i+1) +'" selected>'+ months[i] +'</option>';
        } else {
            output = '<option value="'+ (i+1) +'">'+ months[i] +'</option>';
        }
        $('#month').append(output);
    }

    //handle leap year constraint too
}
