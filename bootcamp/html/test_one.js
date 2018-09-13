// TODO: Replace with your project's config object. You can find this
// by navigating to your project's console overview page
// (https://console.firebase.google.com/project/your-project-id/overview)
// and clicking "Add Firebase to your web app"
var config = {
    apiKey: "AIzaSyD3dPT-gwDrtBnvo9_DQwlRVFL2IQ05RzM",
    authDomain: "rtesbootcamp.firebaseapp.com",
    databaseURL: "https://rtesbootcamp.firebaseio.com",
    projectId: "rtesbootcamp",
    storageBucket: "rtesbootcamp.appspot.com",
    messagingSenderId: "623287477132"
  };

// Initialize your Firebase app
firebase.initializeApp(config);
console.log()

// Save a new recommendation to the database, using the input in the form


var playersRef = firebase.database().ref("RCS_Users/").push();
var newPostKey = firebase.database().ref().child("RCS_Users/").push().key;





//reference to the recommendations object in your database 
//var recommendations = firebase.database().ref("recommendations");

// Save a new recommendation to the database, using the input in the form
var submitRecommendation = function () {

  // Get input values from each of the form elements
  
  var name = $("#Name").val();
  var msisdn = $("#MSISDN").val();
  var mcc = $("#MCC").val();
  var mnc = $("#MNC").val();
  var ims_domain = $("#IMS-Domain").val();
  var realm = $("#Realm").val();
  var ims_password = $("#IMS-Password").val();
  var grch_uri = $("#GrCh-Conference-URI").val();
  var file_transfer_http_url = $("#File-Transfer-HTTP-URL").val();
  var file_transfer_alias= $("#File-Transfer-Alias").val();
  var server_ip = $("#Server-IP").val();
  var file_transfer_token = $("#File-Transfer-Token").val();
  var server_tcp_port= $("#Server-TCP-Port").val();
  var ims_username = $("#IMS-Username").val();
  var unique_id = $("#UID").val();


  // Push a new recommendation to the database using those values
  var runtime = ({
    "unique_key":newPostKey,
    "name": name,
    "msisdn":msisdn,
    "mcc":mcc,
    "mnc":mnc,
    "ims_domain":ims_domain,
    "realm":realm,
    "ims_password":ims_password,
    "grch_uri":grch_uri,
    "file_transfer_http_url":file_transfer_http_url,
    "file_transfer_aias":file_transfer_alias,
    "server_ip":server_ip,
    "file_transfer_token":file_transfer_token,
    "server_port":server_tcp_port,
    "ims_username":ims_username,
    "UID":unique_id

  });
  console.log(runtime);
  var updates = {};
     updates['RCS_Users/' + newPostKey] = runtime;
  
  return firebase.database().ref().update(updates);

};

// When the window is fully loaded, call this function.
// Note: because we are attaching an event listener to a particular HTML element
// in this function, we can't do that until the HTML element in question has
// been loaded. Otherwise, we're attaching our listener to nothing, and no code
// will run when the submit button is clicked.
$(window).load(function () {

  // Find the HTML element with the id recommendationForm, and when the submit
  // event is triggered on that element, call submitRecommendation.
  $("#recommendationForm").submit(submitRecommendation);

});