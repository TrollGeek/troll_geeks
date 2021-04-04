
function _(el) {
    return document.getElementById(el);
}

var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

onload = function() {
    /*const firebaseConfig = {
        apiKey: "AIzaSyDwJboZxT5qmMm8uMbLohXZNs7r40p7WOg",
        authDomain: "trollgeeks-f87d2.firebaseapp.com",
        databaseURL: "https://trollgeeks-f87d2-default-rtdb.firebaseio.com",
        projectId: "trollgeeks-f87d2",
        storageBucket: "trollgeeks-f87d2.appspot.com",
        messagingSenderId: "67306848167",
        appId: "1:67306848167:web:af7ae0fb0d0f54f88c4082",
        measurementId: "G-X2R0DKTBH5"
      };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);*/
    var date = new Date();
    var currentYear =  date.getFullYear();
    var currentMonth = date.getMonth();
    var currentDay = date.getDate();
    console.log(currentDay);
    $('#year').append('<option value="'+currentYear+'">'+currentYear+'</option>');
    $('#month').append('<option value="'+currentMonth+'">'+months[currentMonth]+'</option>');
    $('#day').append('<option value="'+currentDay+'">'+currentDay+'</option>');

    console.log("fetching...");
    _("progress").style.display = 'block';
    _("fetcher").style.display = "none";

    getMonths(currentYear,currentMonth);
    getDays(currentYear, currentMonth,currentDay);
    database.ref("archive").once('value', function(snapshot) {
        snapshot.forEach(function(childSbnapShot) {
            var availableyears = childSbnapShot.key;
            console.log(availableyears);
            if (availableyears != currentYear) {
                $('#year').append('<option value="'+availableyears+'">'+availableyears+'</option>');
            }
            console.log("completed");
            _("progress").style.display = "none";
            _("fetcher").style.display = "block";
        });
    });
}

function getMonths(currentYear,currentMonth) {
    _("progress").style.display = 'block';
    _("fetcher").style.display = "none";
    console.log("cur mon " + currentMonth);
    database.ref("archive/" + currentYear).once('value', function(snapshot) {
        snapshot.forEach(function(childSbnapShot) {
            var availableMonths = childSbnapShot.key;
            
            if (availableMonths-1 != currentMonth) {
                $('#month').append('<option value="'+availableMonths+'">'+months[availableMonths-1]+'</option>');
            }
            console.log("completed");
            _("progress").style.display = "none";
            _("fetcher").style.display = "block";
        });
    });
}

function getDays(currentYear,currentMonth, currentDay) {
    _("progress").style.display = 'block';
    _("fetcher").style.display = "none";
    database.ref("archive/" + currentYear + "/" + (currentMonth+1)).once('value', function(snapshot) {
        snapshot.forEach(function(childSbnapShot) {
            var availableyears = childSbnapShot.key;
            console.log(availableyears);
            if (availableyears != currentDay) {
                $('#day').append('<option value="'+availableyears+'">'+availableyears+'</option>');
            }
            console.log("completed");
            _("progress").style.display = "none";
            _("fetcher").style.display = "block";
        });
    });
}

function changeYear() {
    var changedYear = _('year').value;
    console.log("year : " + changedYear);
    var currentMonth = _('month').value;
    var currentDay = _("day").value;
    $('#month').empty();
    $('#day').empty();
    getMonths(changedYear, currentMonth);
    getDays(changedYear, currentMonth, currentDay);
}

function changeMonth() {
    var changedYear = _('year').value;
    var changedMonth = _('month').value;
    var changedDate = _("day").value;
    $('#month').empty();
    $('#day').empty();
    getDays(changedYear, changedMonth, changedDate);
}

function getArchiveData() {
    /*
        types:
            1. program
            2. poll
    */
    var currentYear = _("year").value;
    var currentMonth = _("month").value;
    var currentDay = _("day").value;
    $('#archiveData').empty();
    currentMonth = parseInt(currentMonth) + 1;
    console.log(currentMonth);
    _("archiveProgress").style.display = "block";

    database.ref("archive/" + currentYear + "/" + currentMonth + "/" + currentDay).on('value',(snap)=> {
        var totalRecords = snap.numChildren();
        if (totalRecords > 0) {

            database.ref("archive/" + currentYear + "/" + currentMonth + "/" + currentDay).once('value', function(snapshot) {
                snapshot.forEach(function(childSbnapShot) {
                    var availableyears = childSbnapShot.val();
                    var type = availableyears.type;

                    var output;

                    if (type == 1) {

                        console.log(availableyears.heading);
                        
                        output = '<div class="card archive">';
                        output += '<div class="card-header bg-transparent">';
                        output += '<h5>' + availableyears.heading + '</h5>'
                        output += '</div>';
                        output += '<div class="card-body">';
                        output += '<p class="lead">' + availableyears.description + '</p>';
                        if (availableyears.url != "-") {
                            output += '<br><a class="btn btn-sm btn-success" href="' + availableyears.url + '" target="_blank">Try this Now</a>';
                        }
                        output += '</div>';
                        output += '<div class="card-footer bg-transparent float-right">';
                        output += '<small>' + currentDay + '-' + months[currentMonth-1] + '-' + currentYear + '&emsp;' + childSbnapShot.key + '</small>';
                        output += '</div>';
                        output += '</div>';

                    } else if (type == 2) {
                        var bgOne = "";
                        var bgTwo = "";
                        var bgThree = "";
                        var bgFour = "";
                        var selectedOne = "";
                        var selectedTwo = "";
                        var selectedThree = "";
                        var selectedFour = "";
                        var solution = availableyears.answer;
                        if (solution == "1") {
                            bgOne = "bg-green";
                            selectedOne = "checked";
                        } else if (solution == "2") {
                            bgTwo = "bg-green";
                            selectedTwo = "checked";
                        } else if (solution == "3") {
                            bgThree = "bg-green";
                            selectedThree = "checked";
                        } else {
                            bgFour = "bg-green";
                            selectedFour = "checked";
                        }
                        output = '<div class="card archive">';
                        output += '<div class="card-header bg-transparent">';
                        output += '<h5>' + availableyears.heading + '</h5>'
                        output += '</div>';
                        output += '<div class="card-body">';
                        output += '<p class="lead">' + availableyears.description + '</p>';
                        output += '<div class="card mcq-card ' + bgOne + '"><div class="card-body"><input class="form-check-input" type="radio" id="optionOne" ' + selectedOne + ' disabled>&emsp;<label for="optionOne">'+availableyears.a+'</label></div></div>';
                        output += '<div class="card mcq-card ' + bgTwo + '"><div class="card-body"><input class="form-check-input" type="radio" id="optionTwo" ' + selectedTwo + ' disabled>&emsp;<label for="optionOne">'+availableyears.b+'</label></div></div>';
                        output += '<div class="card mcq-card ' + bgThree + '"><div class="card-body"><input class="form-check-input" type="radio" id="optionThree" ' + selectedThree + ' disabled>&emsp;<label for="optionOne">'+availableyears.c+'</label></div></div>';
                        output += '<div class="card mcq-card ' + bgFour + '"><div class="card-body"><input class="form-check-input" type="radio" id="optionFour" ' + selectedFour + ' disabled>&emsp;<label for="optionOne">'+availableyears.d+'</label></div></div>';
                        output += '</div>';
                        output += '<div class="card-footer bg-transparent float-right">';
                        output += '<small>' + currentDay + '-' + months[currentMonth-1] + '-' + currentYear + '&emsp;' + childSbnapShot.key + '</small>';
                        output += '</div>';
                        output += '</div>';
                    }
                    $('#archiveData').append(output);
                    _("archiveProgress").style.display = "none";
                });
            });

        } else {
            $('#exampleModalCenter').modal('toggle')
            _("archiveProgress").style.display = "none";
        }
    });
    
}