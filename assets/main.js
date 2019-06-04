$(document).ready(function () {
    //Firebase Initialization
    var firebaseConfig = {
        apiKey: "AIzaSyA66fjfqCnTdvSiIFWxUxvBEb1V4dunx5k",
        authDomain: "trainscheduler-99f07.firebaseapp.com",
        databaseURL: "https://trainscheduler-99f07.firebaseio.com",
        projectId: "trainscheduler-99f07",
        storageBucket: "trainscheduler-99f07.appspot.com",
        messagingSenderId: "28460999516",
        appId: "1:28460999516:web:fe41d02ad413ee8d"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    //Varibales:
    var database = firebase.database();

    console.log("JS is connected!")

    //Inputs
    //On Click
    $("#add-train-button").on("click", function (event) {
        event.preventDefault();
        //Grab values
        var trainName = $("#train-name-input").val().trim();
        var dest = $("#dest-input").val().trim();
        var freq = $("#freq-input").val().trim();
        var firstTrain = $("#first-train-input").val().trim();

        //Reference to Firebase
        var trainObj = {
            name: trainName,
            destination: dest,
            frequency: freq,
            firstTrain: firstTrain,
        }

        //Input validation
        if (
            trainName != "" &&
            dest != "" &&
            freq != "") {
            //Upload data to firebase
            database.ref().push(trainObj);
            alert("Train successfully added!")
        } else {
            alert("Error: Please check the information you are trying to add.")
        }

        //Log data to console
        console.log(trainObj.trainName)
        console.log(trainObj.dest)
        console.log(trainObj.freq)
        console.log(trainObj.firstTrain)

        //Clear input boxes
        $("#train-name-input").val("");
        $("#dest-input").val("");
        $("#first-train-input").val("");
        $("#freq-input").val("");
    });

    //Add Train Schedule - From Firebase:
    database.ref().on("child_added", function (childSnapshot) {
        console.log(childSnapshot.val());

        //Stores data in variables
        var trainName = childSnapshot.val().name;
        var dest = childSnapshot.val().destination;
        var freq = childSnapshot.val().frequency;
        var firstTrain = childSnapshot.val().firstTrain

        //Log information for troubleshooting
        console.log(trainName);
        console.log(dest);
        console.log(freq);
        console.log(firstTrain)

        //Calculate next arrival time
        var firstTrainTemp = moment(childSnapshot.val().firstTrain, "hh:mm").subtract(1, "years");
        var timeDifference = moment().diff(moment(firstTrainTemp), "minutes");
        var remainder = timeDifference % childSnapshot.val().frequency;

        //Calculate minutes away
        var minutesAway = childSnapshot.val().frequency - remainder;

        var nextArrivalTemp = moment().add(minutesAway, "minutes");
        nextArrival = moment(nextArrivalTemp).format("hh:mm");

        //create new row
        var newRow = $("<tr>").append(
            $("<td>").text(trainName),
            $("<td>").text(dest),
            $("<td>").text(freq),
            $("<td>").text(nextArrival),
            $("<td>").text(minutesAway)
        );

        $("#train-table").append(newRow);

        //error function
    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });

});