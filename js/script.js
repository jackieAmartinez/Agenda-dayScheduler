// function--
// establish immediate function of presenting current date and time

$(document).ready(function () {
    // variables within the wrapped call function
    let timeCount = dayjs().format("H:mm");
    // function to set & show the current date & time on the HTML
    function currentDateTime() {
        // pulls in the "real" date/time from dayjs for input into HTML
        let realDate = dayjs().format("dddd, MMMM D, YYYY");
        let realTime = dayjs().format("H:mm");
        showDate = $("#currentDay").text(realDate);
        showTime = $("#currentTime").text(realTime);
    };

    // function--
    // reviews id hour; define and apply respective colors' class - past, present, future
    function ppfColoration() {
        $(".time-block").each(function () {
            let schedule = parseInt(this.id);
            timeCount = timeCount.split(":")[0]
            if (schedule > timeCount) {
                $(this).addClass("future");
                $(this).removeClass("present");
                $(this).removeClass("past");
            } else if (schedule < timeCount) {
                $(this).addClass("past");
                $(this).removeClass("present");
                $(this).removeClass("future");
            } else {
                $(this).addClass("present");
                $(this).removeClass("past");
                $(this).removeClass("future");
            }
        })
    };


    // function--
    // save user input of activities in the time blocks into local storage
    function addActivity() {
        $(".saveBtn").on("click", function () {
            let svbtn = document.querySelector(".saveBtn");
            svbtn.addEventListener("click", addActivity)
            let activityPeriod = $(this).parent().attr("id");
            let activityContent = $(this).siblings(".description").val();
            localStorage.setItem(activityPeriod, activityContent);
        })
    };


    // function
    // apply the local storage to the html elements
    function writeActivity() {
        $(".time-block").on("click", function () {
            $(this).attr("id") = localStorage.getItem(activityPeriod);
            $(this).children(".description").val(activityContent);
        })
    };


    // function--
    // load saved local storage
    $(".time-block").each(function () {
        let activityPeriod = $(this).attr("id");
        let activityContent = localStorage.getItem(activityPeriod);
        $(this).children(".description").val(activityContent);
    });


    // call to activate functions
    currentDateTime();
    setInterval(currentDateTime, 1000);
    ppfColoration();
    writeActivity();
    addActivity();
});

