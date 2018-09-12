
function
readDataBase(){
var database = firebase.database();
   let
rcsUsers = database.ref('RCS_Users');
   
console.log(rcsUsers);
            rcsUsers.once('value',function(snapshot) 
          { snapshot.forEach(function(childSnapshot)
{
console.log(childSnapshot.key)
 console.log(childSnapshot.val());
 });
 });









