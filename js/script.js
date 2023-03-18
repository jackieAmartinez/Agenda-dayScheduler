// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

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



$(document).ready(function () {
    // variables within the wrapped call function
    let timeCount = dayjs().format("H:mm"); /* console.log(timeCount); */
    // function to set & show the current date & time on the HTML
    function currentDateTime() {
        // pulls in the "real" date/time from dayjs for input into HTML
        let realDate = dayjs().format("dddd, MMMM D, YYYY"); /* console.log(realDate); */
        let realTime = dayjs().format("H:mm"); 
        showDate = $("#currentDay").text(realDate);
        showTime = $("#currentTime").text(realTime);
    };


    // function to review the id hour and apply past, present, future class and set the color associated with each
    function ppfColoration() {
        $(".time-block").each(function () {
            let schedule = parseInt(this.id); /* console.log(schedule); */
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


    // function to save user input of activities in the time blocks into local storage
    function addActivity() {
        $(".saveBtn").on("click", function () {
            let svbtn = document.querySelector(".saveBtn");
            svbtn.addEventListener("click", addActivity)
            let activityPeriod = $(this).parent().attr("id"); /* console.log(activityPeriod); */
            let activityContent = $(this).siblings(".description").val(); /* console.log(activityContent); */
            localStorage.setItem(activityPeriod, activityContent);
        })
    };


    // function to write the local storage to the html elements
    function writeActivity() {
        $(".time-block").on("click", function () {
            $(this).attr("id") = localStorage.getItem(activityPeriod);
            $(this).children(".description").val(activityContent);
        })
    };


    // load saved local storage when open page/refreshing
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

