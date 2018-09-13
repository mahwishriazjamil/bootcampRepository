8// TODO: Replace with your project's config object. You can find this
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


//var playersRef = firebase.database().ref("RCS_Users/");

//playersRef.on('value',gotData,errData);

//function gotData(data){
  //  console.log(data.val());
    //}
//function errData(err){
  //  console.log('Error!');
//}
firebase.database().ref("rcs_user_agenda/").on('value', function(snap){

    snap.forEach(function(childNodes){
    
 
       //This loop iterates over children of user_id
       //childNodes.key is key of the children of userid such as (20170710)
       var user = childNodes.val().user_id;
       var rcs_profile = childNodes.val().rcs_profile_id;
       var contact_name = childNodes.val().contact_name;
       var contact_msisdn = childNodes.val().contact_msisdn;

       data = {user, rcs_profile,contact_name,contact_msisdn};



       console.log(data)

 
   });
 });

//console.log(data)




