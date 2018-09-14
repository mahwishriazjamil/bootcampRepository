function showConversation(chat_window_id){
          //var UID=firebase.auth().currentUser.uid;
          var query = database.ref("chat_window").orderByChild("chat_window_id").equalTo(chat_window_id);

query.on("child_added", function(snapshot){


  var name = snapshot.child("contact_name").val();
  var key = snapshot.child("user_b_id").val();
  var msisdn = snapshot.child("contact_msisdn").val();

  $("#table_body").append(
              "<div id='"+key+"' class='row' style='border:10px gray'>" +
                  "<div class='col-sm'>" +
                      "<img src='https://thumb.ibb.co/fO6ps9/514623738_612x612.jpg' alt='Louanne Gervais></div>" +
                      "<div class='col-sm'>" +
                          "<p id='name'>"+name+"</p>" +
                          "<p id='number'>"+msisdn+"</p>" +
                          "</div>" +
                  " <div class='col-sm'>" +
                      "<button type='button' class='btn btn-light'>Chat</a></button>" +
                      "<button type='button' class='btn btn-light'>Edit Contact</a></button>" +
                  "</div>" +
              "</div>"
          );

});

query.on("child_changed", function(snapshot){

var name = snapshot.child("contact_name").val();
var key = snapshot.child("agenda_entry_id").val();
var msisdn = snapshot.child("contact_msisdn").val();

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
                      "<button type='button' class='btn btn-light'><a href='webchat.html'>Chat</a></button>" +
                      "<button type='button' class='btn btn-light'><a href='editContact.html'>Edit Contact</a></button>" +
                  "</div>" +
              "</div>"
          );
});


      query.on('child_removed', function(data) {
          console.log("entry was deleted");
          read_agenda_contacts(UID, rcs_profile_id);
          return read_agenda_contacts(UID, rcs_profile_id);
          });

}
