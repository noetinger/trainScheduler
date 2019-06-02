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
$("#add-train-button").on("click", function(event){
    event.preventDefault();
        //Grab values
        var trainName = $("#train-name-input").val().trim();
        var dest = $("#dest-input").val().trim();
        var freq =$("#first-train-input").val().trim() ;
        //var firstTrain = ; //firstTrain = (look up moment.js)   

    //Reference to Firebase
        var trainObj = {
            name: trainName , 
            destination: dest,
            frequency: freq,
            //firstTrain: firstTrain,
        }
    //Upload data to firebase
    database.ref().push(trainObj);

    //Log data to console
    console.log(trainObj.trainName)
    console.log(trainObj.dest)
    console.log(trainObj.freq)
    //console.log(trainObj.firstTrain)

    alert("Train successfully added!")

    //Clear input boxes
    $("#train-name-input").val("");
    $("#dest-input").val("");
    $("#first-train-input").val("") ;
    $("#freq-input").val("") ;
});

//Add Train Schedule - From Firebase:
database.ref().on("child_added", function(childSnapshot){
    console.log(childSnapshot.val());

    //Stores data in variables
    var trainName = childSnapshot.val().name;
    var dest = childSnapshot.val().destination;
    var freq = childSnapshot.val().frequency;
    //var firstTrain = childSnapshot.val().firstTrain

    //Log information for troubleshooting
    console.log(trainName);
    console.log(dest);
    console.log(freq);
    //console.log(firstTrain)

    //Calculate next arrival time

    //Calculate minutes away

    //create new row
    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(dest),
        $("<td>").text(freq),
       // $("<td>").text(nextArrival),
      //  $("<td>").text(minutesAway)
    );

    //append new row to the table
    $("#train-table > tbody").append(newRow);

});   

