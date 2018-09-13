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
        window.location.href = "./Profiles.html" 
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
  
  window.alert("RCS Profile created");     
  return firebase.database().ref().update(updates); 

  }
  function testPush(){
    firebase.database().ref("RCS_Users/").push({
      "UID":"test"
    })
  }

  