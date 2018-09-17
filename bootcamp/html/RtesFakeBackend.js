
            // var config = {
            //     apiKey: "AIzaSyD3dPT-gwDrtBnvo9_DQwlRVFL2IQ05RzM",
            //     authDomain: "rtesbootcamp.firebaseapp.com",
            //     databaseURL: "https://rtesbootcamp.firebaseio.com",
            //     projectId: "rtesbootcamp",
            //     storageBucket: "rtesbootcamp.appspot.com",
            //     messagingSenderId: "623287477132"
            // };

            // // Initialize your Firebase app
            // firebase.initializeApp(config);
            // console.log("Firebase initialized");
			// Get a reference to the database service
			var database = firebase.database();

            /* DB table format
            // user_id, rcs_profile_id, chat_window_id, user_b_id, messages { message_id, sender, timestamp, message_text, status { status_id, value, update_timestamp } }
            */
                
            //Read from chat_window
            var chat_windows = {};

            function read_chat_window(user_id, rcs_profile_id, chat_window_id){                
                var chat_window_query = database.ref("chat_window/" + chat_window_id);
                chat_window_query.on('value', function(snapshot) {
                        console.log(snapshot);
                    });
            }

            //write in chat_window
            function write_chat_window(user_id, rcs_profile_id, chat_window_id, user_b_id, message_id, sender, timestamp, message_text, status_id, value, update_timestamp){
                
                // Get a key for a new Post.
                var newPostKey = database.ref().child("chat_window/").push().key;


                // A post entry.
                var postData = {
                    "user_id": user_id,
                    "rcs_profile_id": rcs_profile_id, 
                    "chat_window_id": newPostKey, 
                    "user_b_id": user_b_id, 
                    "messages": { 
                        "message_id": message_id, 
                        "sender": sender, 
                        "timestamp": timestamp, 
                        "message_text": message_text, 
                        "status" : { 
                            "status_id": status_id, 
                            "value": value, 
                            "update_timestamp": update_timestamp 
                        }
                    }
                };
                
                console.log("key: " + newPostKey);
                // Write the new post's data simultaneously in the posts list and the user's post list.
                var updates = {};
                updates['/chat_window/' + newPostKey] = postData;
                
                return database.ref().update(updates);
            }
			
           

			function read_agenda_contacts(rcs_profile_id){
                //var UID=firebase.auth().currentUser.uid;
                var query = database.ref("rcs_user_agenda").orderByChild("rcs_profile_id").equalTo(rcs_profile_id);

			query.on("child_added", function(snapshot){
                
                
				var name = snapshot.child("contact_name").val();
				var key = snapshot.child("agenda_entry_id").val();
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
                            "<button type='button' class='btn btn-light'><a href='webchat.html?Profile_ID="+c+"'>Chat</a></button>" +
                            "<button type='button' class='btn btn-light'><a href='editContact.html?Profile_ID="+c+"&agendaEntry="+key+ "'>Edit Contact</a></button>" +
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
                            "<button type='button' class='btn btn-light'><a href='webchat.html?Profile_ID="+c+"'>Chat</a></button>" +
                            "<button type='button' class='btn btn-light'><a href='editContact.html?Profile_ID="+c+"'>Edit Contact</a></button>" +
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

			
            //write in chat_window
            function write_agenda_contact(user_id, rcs_profile_id, agenda_entry_id, contact_name, contact_msisdn){
                
                if(agenda_entry_id == null){
                    // Get a key for a new Post.
                    console.log("New Agenda Entry");
                    agenda_entry_id = database.ref().child("rcs_user_agenda/").push().key;
                }
                // A post entry.
                var postData = {
                    "user_id": user_id,
                    "rcs_profile_id": rcs_profile_id, 
                    "agenda_entry_id": agenda_entry_id, 
                    "contact_name": contact_name, 
                    "contact_msisdn": contact_msisdn, 
                };
                
                console.log("key: " + agenda_entry_id);
                // Write the new post's data simultaneously in the posts list and the user's post list.
                var updates = {};
                updates['/rcs_user_agenda/' + agenda_entry_id] = postData;
                
                return database.ref().update(updates);
            }

            var messages = []; 

            function sendMessage(user_id, rcs_user_id, b_party, message_text){
                console.log("Sending '" + message_text + ", on Chat: "+ chat_window + ", to " + b_party);
                var message_id = Math.floor(Math.random()*10000000);
                var status = "sent";
                var timestamp = Date.now();
                
                var message = {"timestamp": timestamp, "message_id": message_id, "status": status};
                messages.push(message);

                var message_description = '{"message_id": "' + message_id + '", message_status": "' + status + '", "message_timestamp": "' + timestamp + '"}';
                return message_description;
            }
            
            function checkMessageStatus(messageId){
                var output = null;
                messages.forEach(element => {
                    console.log(element.message_id);
                    if(element.message_id == messageId){
                        console.log(element.status)
                        output = element.status;
                    }
                });
                return output;
            }

            //console.log(sendMessage("chat_1", "+3467843253", "MSG1"));
            //console.log(messages);
            //console.log(messages[0].message_id);
            //console.log(checkMessageStatus(messages[0].message_id));

            //console.log(write_chat_window("user_id", "rcs_profile_id", "chat_window_id", "user_b_id", "message_id", "sender", Date.now(), "message_text", "status_id", "sent", Date.now()));
            //read_chat_window("user_id", "rcs_profile_id", "-LMCPl7r4Jj5t-dHNB2Y");
            //console.log(chat_windows);
            //write_agenda_contact("LKIA1uhgKqWLj9yKczhPXSu9o8v2", "1235gffsutee45", null, "Test_2 VF-DE", "+4964534324412");