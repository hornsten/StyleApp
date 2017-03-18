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
   getUserList: function(){
        // sends get request to apiController to query database for all connected users for a room
        /// room data is currently hardcoded!!!!!!!!!!
        return axios.get('/chat/user/room1').then(function(response) {
            console.log(response);
            return response;
        })
        
   },

   getRoomList: function(){
        // sends get request to apiController to query database for all rooms
        return axios.get('/chat/rooms').then(function(response) {
            console.log(response);
            return response;
        })
        

   }
   


 };
// We export the helpers function (which contains getGithubInfo)
module.exports = helpers;
