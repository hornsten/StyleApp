var axios = require("axios");

// Helper Functions 
var helpers = {
    // e.g. functions below
    // runQuery: function(queryURL) {

    //     return axios.get(queryURL).then(function(response) {

    //     return response.data;
    //     })
    // },

    // querySaved: function(count) {

    //     return axios.get('/api/saved').then(function(response) {
    //         return response.data;
    //     })
        
    // } 
//    getUserList: function(room){
//         // sends get request to apiController to query database for all connected users for a room
//         return axios.get('/chat/user/'+room).then(function(response) {
//             console.log(response);
//             return response;
//         })
        
//    },


        

  getUserDetails: function(store){

       return axios.get('/user', { credentials : 'same-origin' }).then(function(result){
           if (result){
                console.log("result", result.data[0]);
                var username = result.data[0].facebook.firstName +" " + result.data[0].facebook.lastName;
                console.log(username);
                console.log(store);
                store.dispatch({type: "ADD_USERNAME", username: username})
                store.dispatch({type: "IS_LOGGED_IN", loggedin: "true"})

           }

      })
  
        
  },


   getRoomList: function(){
        // sends get request to apiController to query database for all rooms
        return axios.get('/chat/rooms', { credentials : 'same-origin' }).then(function(response) {
            console.log("rooms", response);
            return response;
        })
        

   }
   


 };
// We export the helpers function (which contains getGithubInfo)
module.exports = helpers;
