
 var config = {
    apiKey: "AIzaSyB3SjFMYSdWDpnLkthDdKFowCFQfK19d64",
    authDomain: "train-905e0.firebaseapp.com",
    databaseURL: "https://train-905e0.firebaseio.com",
    projectId: "train-905e0",
    storageBucket: "train-905e0.appspot.com",
    messagingSenderId: "375924050842"
  };

  firebase.initializeApp(config);


  var Data = firebase.database()

  $("#Submit").on("click", function() {
    
    var trainName = $("#Train-Name")
      .val()
      .trim();
    var destination = $("#Train-Destination")
      .val()
      .trim();
    var frequency = $("#Train-Frequency")
      .val()
      .trim();
    var firstTrain = $("#Train-Time")
      .val()
      .trim();
  
    
    var newTrain = {
      name: trainName,
      destination: destination,
      firstTrain: firstTrain,
      frequency: frequency
    };
    
    Data.ref().push(newTrain);
  
    
    alert("New Train Created");
  
   
    $("#Train-Name").val("");
    $("#Train-Destination").val("");
    $("#Train-Frequency").val("");
    $("#Train-Time").val("");
  
    return false;
  });

  Data.ref().on("child_added", function(childSnapshot, prevChildKey) {
    console.log(childSnapshot.val());
  
    var tName = childSnapshot.val().name;
    var tDestination = childSnapshot.val().destination;
    var tFrequency = childSnapshot.val().frequency;
    var tFirstTrain = childSnapshot.val().firstTrain;
  
    var timeArr = tFirstTrain.split(":");
    var trainTime = moment()
      .hours(timeArr[0])
      .minutes(timeArr[1]);
    var maxMoment = moment.max(moment(), trainTime);
    var tMinutes;
    var tArrival;
  
    if (maxMoment === trainTime) {
      tArrival = trainTime.format("hh:mm A");
      tMinutes = trainTime.diff(moment(), "minutes");
    } else {

      var differenceTimes = moment().diff(trainTime, "minutes");
      var tRemainder = differenceTimes % tFrequency;
      tMinutes = tFrequency - tRemainder;
     
      tArrival = moment()
        .add(tMinutes, "m")
        .format("hh:mm A");
    }
    console.log("tMinutes:", tMinutes);
    console.log("tArrival:", tArrival);
  
 
    $("#train-table > tbody").append(
      $("<tr>").append(
        $("<td>").text(tName),
        $("<td>").text(tDestination),
        $("<td>").text(tFrequency),
        $("<td>").text(tArrival),
        $("<td>").text(tMinutes)
      )
    );
  });