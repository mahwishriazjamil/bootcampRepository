        
        // This function will send and apply the configuration of the RCS profile to the RTES backend 
        function initialize_rcs_user(variables){
            console.log("...");
        }

        // This function will delete and end the configuration of the RCS profile on the RTES backend.
        // NOTE-1: This function will trigger a user deregistration and resource free up. 
        function terminate_rcs_user(variables){
            console.log("...");
        }

        // This function will abrutly break the RTES connection with the network to simulate a data lose.
        // NOTE-1: This function  will not trigger user de-registration 
        function flight_mode(variables){
            console.log("...");
        }

        // This function will register and de-register an RCS_user_profile in the actual RCS network
        function register(variables){
            console.log("...");
        }

        // This function will trigger the RTES to send a message into a 1-to-1 conversation
        function send_message(variables){
            console.log("...");
        }

        // This function will trigger the RTES to send a notification for a specific message
        // NOTE-1 : There are two types of notifications DELIVERY (a message is received at user end), and DISPLAY( The end user actually has seen the message).
        // NOTE-2 : A DISPLAY notification cannot be sent unless a DELIVERY one is sent before.
        function send_notification(variables){
            console.log("...");
        }
        
        // This function will trigger the RTES to send a file into a 1-to-1 conversation
        function send_file(variables){
            console.log("...");
        }

        //This function will trigger the RTES to create a new Group Chat.
        // NITE-1: A Group Chat shall have a SUBJECT and a PARTICIPANT LIST. The Participant List shall contain the list of MSISDNs at least (I might also contain the "name" if it is defined).
        function create_group_chat(variables){
            console.log("...");
        }

        // This function will trigger the RTES to send a message into a Group Chat conversation
        function send_group_chat_message(variables){
            console.log("...");
        }
        

        