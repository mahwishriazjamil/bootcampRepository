// Initialize Firebase
function initializeFirebase(){
  var config = {
      apiKey: "AIzaSyD3dPT-gwDrtBnvo9_DQwlRVFL2IQ05RzM",
      authDomain: "rtesbootcamp.firebaseapp.com",
      databaseURL: "https://rtesbootcamp.firebaseio.com",
      projectId: "rtesbootcamp",
      storageBucket: "rtesbootcamp.appspot.com",
      messagingSenderId: "623287477132"
  };
  firebase.initializeApp(config);
  console.log("Firebase initialized");
  
  }
  function signOut(){
      firebase.auth().signOut();
      window.location.href= "./index.html"
    }
  
   function autoSignOut(){
       firebase.auth().onAuthStateChanged(function(user) {
          
           if (!user) {
             // User is signed out
              window.location.href = "./index.html"
            } 
          
         });
       
       }
  
    function newSignOut(){
      if (firebase.auth().currentUser == null){
        signOut();
      }
      else{}
    }
  
    function testPull(uid){
      var ref = firebase.database().ref("rcs_user_agenda");
      ref.orderByChild("user_id").equalTo(uid).on("child_added", function(snapshot) {
  
      console.log(snapshot.key)
      console.log(snapshot)
      ;});
    }
  
    function newTestPull(){
      var app = angular.module("myApp", []);
        app.controller("myCtrl", function($scope) {
          read_agenda_contacts('LKIA1uhgKqWLj9yKczhPXSu9o8v2', '1235gffsutee45');
        });
        console.log(agenda_entries);
    }
  
  // function sendMessage(input){
  // messageJSON =sendNewMessage(input,getRecipent())
  // return messageJSON;
  // }
  
  
  // function getUser(){
  //     //placeholder code.
  //     return "Joshua"
  // }
  
  // function getRecipent(){
  //     //placeholder
  //     return "Brandon"
  // }
  
  // function sendNewMessage (input, newRecipient){
  // var currentDate = new Date(),
  // out = { user: getUser() , message: input, time: currentDate.getTime() ,recipient: newRecipient  }
  // messageJSON = JSON.stringify(out);
  // return messageJSON;
  // }
  function toggleSignIn() {
      if (firebase.auth().currentUser) {
        // [START signout]
        firebase.auth().signOut();
        // [END signout]
      } else {
        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;
        if (email.length < 4) {
          alert('Please enter an email address.');
          return;
        }
        if (password.length < 4) {
          alert('Please enter a password.');
          return;
        }
        // Sign in with email and pass.
        // [START authwithemail]
        firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // [START_EXCLUDE]
          if (errorCode === 'auth/wrong-password') {
            alert('Wrong password.');
          } else {
            alert(errorMessage);
          }
          console.log(error);
          document.getElementById('quickstart-sign-in').disabled = false;
          // [END_EXCLUDE]
        });
        // [END authwithemail]
      }
      document.getElementById('quickstart-sign-in').disabled = true;
    }
    /**
     * Handles the sign up button press.
     */
     function handleSignUp() {
      var email = document.getElementById('email').value;
      var password = document.getElementById('password').value;
      //new stuff 
      var rePassword = document.getElementById('rePassword').value;
      if (email.length < 4) {
        alert('Please enter an email address.');
        return;
      }
      if (password.length < 4) {
        alert('Please enter a password.');
        return;
      }
      //new here
      if (!(password===rePassword) ){
        alert('Your passwords need to match');
        return;
      }
      // Sign in with email and pass.
      // [START createwithemail]
      firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode == 'auth/weak-password') {
          alert('The password is too weak.');
        } else {
          alert(errorMessage);
        }
        console.log(error);
        // [END_EXCLUDE]
      });
      // [END createwithemail]
    }
    /**
     * Sends an email verification to the user.
     */
    function sendEmailVerification() {
      // [START sendemailverification]
      firebase.auth().currentUser.sendEmailVerification().then(function() {
        // Email Verification sent!
        // [START_EXCLUDE]
        alert('Email Verification Sent!');
        // [END_EXCLUDE]
      });
      // [END sendemailverification]
    }
    function sendPasswordReset() {
      var email = document.getElementById('email').value;
      // [START sendpasswordemail]
      firebase.auth().sendPasswordResetEmail(email).then(function() {
        // Password Reset Email Sent!
        // [START_EXCLUDE]
        alert('Password Reset Email Sent!');
        // [END_EXCLUDE]
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode == 'auth/invalid-email') {
          alert(errorMessage);
        } else if (errorCode == 'auth/user-not-found') {
          alert(errorMessage);
        }
        console.log(error);
        // [END_EXCLUDE]
      });
      // [END sendpasswordemail];
    }
    /**
     * initApp handles setting up UI event listeners and registering Firebase auth listeners:
     *  - firebase.auth().onAuthStateChanged: This listener is called when the user is signed in or
     *    out, and that is where we update the UI.
     */
    function initApp() {
      // Listening for auth state changes.
      // [START authstatelistener]
      firebase.auth().onAuthStateChanged(function(user) {
        // [START_EXCLUDE silent]
        //document.getElementById('quickstart-verify-email').disabled = true;
        //document.getElementById('quickstart-')
        // [END_EXCLUDE]
        if (user && firebase.auth().currentUser.emailVerified) {
          // User is signed in. 
          window.location.href ="./profilesV2.html"// "./Profiles.html" 
          var displayName = user.displayName;
          var email = user.email;
          var emailVerified = user.emailVerified;
          var photoURL = user.photoURL;
          var isAnonymous = user.isAnonymous;
          var uid = user.uid;
          var providerData = user.providerData;
          // [START_EXCLUDE]
          document.getElementById('quickstart-sign-in-status').textContent = 'Signed in';
          document.getElementById('quickstart-sign-in').textContent = 'Sign out';
          document.getElementById('quickstart-account-details').textContent = JSON.stringify(user, null, '  ');
          if (!emailVerified) {
            document.getElementById('quickstart-verify-email').disabled = false;
          }
          // [END_EXCLUDE]
        } else {
          // User is signed out.
          // [START_EXCLUDE]
          
          document.getElementById('quickstart-sign-in-status').textContent = 'Signed out';
          document.getElementById('quickstart-sign-in').textContent = 'Sign in';
          document.getElementById('quickstart-account-details').textContent = 'null';
          // [END_EXCLUDE]
        }
        // [START_EXCLUDE silent]
        document.getElementById('quickstart-sign-in').disabled = false;
        // [END_EXCLUDE]
      });
      // [END authstatelistener]
      document.getElementById('quickstart-sign-in').addEventListener('click', toggleSignIn, false);
      //document.getElementById('quickstart-sign-up').addEventListener('click', handleSignUp, false);
      //document.getElementById('quickstart-verify-email').addEventListener('click', sendEmailVerification, false);
      //document.getElementById('quickstart-password-reset').addEventListener('click', sendPasswordReset, false);
    }
  
  
  
    function myPasswordReset(){
      var email =document.getElementById('email').value
      firebase.auth().sendPasswordResetEmail(email).then(function() {
       alert("Password reset sent to: " +email);
      })
      
    }
    
    function customSignUp(){
      handleSignUp();
      document.getElementById("verify").disabled = false;
    }
  
    function testInput(email){
        window.alert(email)
    }
  
    function getUID(){
      firebase.auth().onAuthStateChanged( user => {
        if (user) { this.userId = user.uid }
      });
      return userId;
    }
  
    function customPush() {
    
    var unique_key = firebase.database().ref().child("RCS_Users/").push().key;
    
    var name = document.getElementById('Name').value;
    var msisdn = document.getElementById('MSISDN').value;
    var mcc = document.getElementById('MCC').value;
    var mnc = document.getElementById('MNC').value;
    var ims_domain =document.getElementById('IMS-Domain').value;
    var realm = document.getElementById('Realm').value;
    var ims_password = document.getElementById('IMS-Password').value;
    var grch_uri = document.getElementById('GrCh-Conference-URI').value;
    var file_transfer_http_url = document.getElementById('File-Transfer-HTTP-URL').value;
    var file_transfer_alias= document.getElementById('File-Transfer-Alias').value;
    var server_ip = document.getElementById('Server-IP').value;
    var file_transfer_token = document.getElementById('File-Transfer-Token').value;
    var server_tcp_port= document.getElementById('Server-TCP-Port').value;
    var ims_username = document.getElementById('IMS-Username').value;
    var unique_id = firebase.auth().currentUser.uid;
    
    
    //firebase.database().ref("RCS_Users/").push(
      var runtime = {
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
      "UID":unique_id,
      "Profile_Id":unique_key
    }//)
    var updates = {};
       updates['RCS_Users/' + unique_key ] = runtime;
    
        
    firebase.database().ref().update(updates); 
    window.alert("RCS Profile created"); 
    }
  
    function customContactPush(profid) {
    
      var agendaEntryId = firebase.database().ref().child("rcs_user_agenda/").push().key;
      
      var name = document.getElementById('name').value;
      var msisdn = document.getElementById('msisdn').value;
      var profile_id =profid// "placeholder";//pass profile id in here.
      var unique_id = firebase.auth().currentUser.uid;
      
      
      //firebase.database().ref("RCS_Users/").push(
        var runtime = {
        "contact_name": name,
        "contact_msisdn":msisdn,
        "rcs_profile_id":profile_id,
        "user_id":unique_id,
        "agenda_entry_id":agendaEntryId
      }//)
      var updates = {};
         updates['rcs_user_agenda/' + agendaEntryId ] = runtime;
      
          
      firebase.database().ref().update(updates); 
      window.alert("New user added"); 
      }
  
    function testPush(){
      firebase.database().ref("RCS_Users/").push({
        "UID":"test"
      }) 
    }
  
    function testDelete(profile_id){
      var db = firebase.database();                   
      var path = profile_id;
      var survey=db.ref('RCS_Users'+'/');    //Eg path is company/employee                
      survey.child(path).remove();
      window.alert("Profile with id: "+profile_id+", has been deleted.")   
    }
  
    function rcsUserEdit(entryId,newValue1,newValue2){
      var db = firebase.database();
      db.ref("rcs_user_agenda/"+entryId+"/contact_msisdn").set(newValue2);
      db.ref("rcs_user_agenda/"+entryId+"/contact_name").set(newValue1);
      window.alert("details changed");
    }
  
    
    function read_profiles(){
      var UID=firebase.auth().currentUser.uid;
      var query = database.ref("RCS_Users/").orderByChild("UID").equalTo(UID);
  
  query.on("child_added", function(snapshot){
      
      
  var name = snapshot.child("name").val();
  var key = snapshot.child("Profile_Id").val();
  var msisdn = snapshot.child("msisdn").val();
  
  $("#table_body").append(
          "<div id='"+key+"' class='row' style='border:10px gray'>" +
              "<div class='col-sm'>" +
                  "<img src='https://thumb.ibb.co/fO6ps9/514623738_612x612.jpg' alt='Louanne Gervais></div>" +
                  "<div class='col-sm'>" +
                      "<p id='name'>"+name+"</p>" +
                      "<p id='number'>"+msisdn+"</p>" +
                      "</div>" + 
              " <div class='col-sm'>" +
                  "<button type='button' class='btn btn-light'><a href='webchat.html?Profile_ID="+key+"'>Chat</a></button>" +
                  "<button type='button' class='btn btn-light'><a href='editRCSProfile.html'>Edit Profile</a></button>" +
              "</div>" +
          "</div>"
      );
      
  });
  
  query.on("child_changed", function(snapshot){
  console.log("entry was changed")
  var name = snapshot.child("name").val();
  var key = snapshot.child("Profile_Id").val();
  var msisdn = snapshot.child("msisdn").val();
  
  $("#"+key).replaceWith(
      "<div id='"+key+"' class='row' style='border:10px gray'>" +
              "<div class='col-sm'>" +
                  "<img src='https://thumb.ibb.co/fO6ps9/514623738_612x612.jpg' alt='Louanne Gervais>" +
              "</div>" +
              "<div class='col-sm'>" +
                  "<p id='name'>"+name+"</p>" +
                  "<p id='number'>"+msisdn+"</p>" +
              "</div>" + 
              " <div class='col-sm'>" +
              "<button type='button' class='btn btn-light'><a href='webchat.html?Profile_ID="+key+"'>Contacts</a></button>" +
              "<button type='button' class='btn btn-light'><a href='editRCSProfile.html'>Edit Profile</a></button>" +
              "</div>" +
          "</div>"
      );
  });
  
  
  query.on('child_removed', function(data) {
      console.log("entry was deleted");
      window.location.reload(true);
      //read_profiles();
      //return read_profiles();
      });
  
  }	
  
  function create(){
    
    $("#newButton").append(
     
          " <div class='col-sm'>" +
              "<button type='button' class='btn btn-light'><a href='newContact.html?Profile_ID="+c+"'>New Conctact</a></button>" +
             
          "</div>" 
      
  );
  ;}
  
  function webchatButton(){
    $("#Button2").replaceWith(
     
      " <div class='col-sm'>" +
          "<button type='button' class='btn btn-light'><a href='agenda.html?Profile_ID="+c+"'>Agenda</a></button>" +
         
      "</div>" 
  
  );
  }

  function doneButton(){
    $("#doneButton").replaceWith(
     
      
          "<button type='button' class='btn btn-light'><a href='agenda.html?Profile_ID="+c+"'>Back</a></button>")
         
     
  }
  
  function editPlaceholderGen(){

    var database=firebase.database()
    var query = database.ref("rcs_user_agenda").orderByChild("agenda_entry_id").equalTo(ag);

    query.on("child_added", function(snapshot){
              
              
      var name = snapshot.child("contact_name").val();
      var msisdn = snapshot.child("contact_msisdn").val();
    $("#name").replaceWith(
     
      
      "<input type='name' class='form-control' id='name' placeholder="+name+">")

      $("#msisdn").replaceWith(
     
      
        "<input type='tel' class='form-control' id='msisdn' placeholder="+msisdn+">")
  
     
    })
}
