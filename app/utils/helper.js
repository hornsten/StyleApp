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

//    },,
//  getClothesBin: function(store, item){


getStyleMotto: function(e,store){
    return axios.get('/updatestylemotto').then(function(result){
        if(result){
             if(result.data.type === 'stylemotto'){
              store.dispatch({
                type: 'UPDATE_STYLEMOTTO',
                stylemotto: result.data.results
              })
        }
        }
    })
},

getBlurb: function(e, store){
    return axios.get('/updateblurb').then(function(result){
        if(result){
             if(result.data.type === 'blurb'){
              store.dispatch({
                type: 'UPDATE_BLURB',
                blurb: result.data.results
              })
        }
        }
    })
},


// },

getProfileImage: function(store, item){
    return axios.get('/profile/image').then(function(result){
        if(result){
            console.log("result form profile: ", result.data.results);

            
            if(result.data.type === 'profile_image'){
              store.dispatch({
                type: 'UPDATE_PROFILEIMAGE',
                profile_image: result.data.results
              })
            }
        }
    })
},



    getImages: function(store, item){
        console.log(item, "item")
        return axios.get('/closet/image/'+item).then(function(result){
           if (result){
                console.log("results.data", result.data.results);
                // var username = result.data[0].facebook.firstName +" " + result.data[0].facebook.lastName;
                // console.log(username);
                // console.log("result images", result);
                // store.dispatch({type: "UPDATE_IMAGES", images: result.data})
                 console.log("result.type", result.data.type);
                if (result.data.type === "bottom"){
                    store.dispatch({
                        type: 'CLOSET_BOTTOM',
                        bottom: result.data.results
                    })

                } else  if (result.data.type  === "top"){
                    store.dispatch({
                        type: 'CLOSET_TOP',
                        top: result.data.results
                    })


                } else  if (result.data.type  === "bag"){
                    store.dispatch({
                        type: 'CLOSET_BAG',
                        bag: result.data.results
                    })

                } else  if (result.data.type  === "dress"){
                    store.dispatch({
                        type: 'CLOSET_DRESS',
                        dress: result.data.results
                    })

                } else  if (result.data.type  === "shoes"){
                    store.dispatch({
                        type: 'CLOSET_SHOES',
                        shoes: result.data.results
                    })

                } else  if (result.data.type  === "accessory"){
                    store.dispatch({
                        type: 'CLOSET_ACCESSORY',
                        accessory: result.data.results
                    })

                } else  if (result.data.type  === "flair"){
                    store.dispatch({
                        type: 'CLOSET_FLAIR',
                        flair: result.data.results
                    })

                }

           }

      })

    },

    /////////////////////////////   
    uploadToProfile: function(e, dispatch){
                var files = e.target.files || e.dataTransfer.files 
                if (files) {
                    //send only the first one
                    var file = files[0];
                    console.log(file);
                    //read the file content and prepare to send it
                    var reader = new FileReader();
                    console.log("reader data", reader);
                    reader.onload = function(e) {
                        var buffer = e.target.result;
                        // console.log("is there any thing buffer ??", buffer);
                        var postObj = {
                            name: file.name,
                            buffer: buffer
                        };
                        
                        return axios.post('/profileimageupload',postObj).then(function(result){
                            console.log('result From PROFILE image UPLOAD', result);
                      
                                 dispatch({
                                    type:'UPDATE_PROFILEIMAGE',
                                    profile_image: result.data.imgsrc
                                })
                            
                           
                        })
                    }//onload fn
                    reader.readAsBinaryString(file);
                }
    },
    /////////////////////////////

  uploadToCloset: function(e, type, store){
                var files = e.target.files || e.dataTransfer.files
                if (files) {
                    //send only the first one
                    var file = files[0];
                    //read the file content and prepare to send it
                    var reader = new FileReader();
                    reader.onload = function(e) {
                        console.log('Sending file...');
                        //get all content
                        var buffer = e.target.result;
                        var postObj = {
                            name: file.name,
                            buffer: buffer,
                            type: type,
                        };

                        return axios.post('/closet/image/new', postObj).then(function(result){
                            console.log("result.type", result.type);
                            if (result.data.type === "bottom"){
                                store.dispatch({
                                    type: 'CLOSET_BOTTOM',
                                    bottom: result.data.results
                                })

                            } else  if (result.data.type  === "top"){
                                store.dispatch({
                                    type: 'CLOSET_TOP',
                                    top: result.data.results
                                })


                            } else  if (result.data.type  === "bag"){
                                store.dispatch({
                                    type: 'CLOSET_BAG',
                                    bag: result.data.results
                                })

                            } else  if (result.data.type  === "dress"){
                                store.dispatch({
                                    type: 'CLOSET_DRESS',
                                    dress: result.data.results
                                })

                            } else  if (result.data.type  === "shoes"){
                                store.dispatch({
                                    type: 'CLOSET_SHOES',
                                    shoes: result.data.results
                                })

                            } else  if (result.data.type  === "accessory"){
                                store.dispatch({
                                    type: 'CLOSET_ACCESSORY',
                                    accessory: result.data.results
                                })

                            } else  if (result.data.type  === "flair"){
                                store.dispatch({
                                    type: 'CLOSET_FLAIR',
                                    flair: result.data.results
                                })

                            }

                        // reset values
                            store.dispatch({
                                type: 'CLOSET_ERROR',
                                closeterror: false
                            })

                            store.dispatch({
                                type: 'TYPE_CHANGE',
                                itemtype: ""
                            })

                            store.dispatch({
                                type: 'INPUT_FILE',
                                file: ""
                            })

                            store.dispatch({
                                type: 'SUCCESSFUL_SAVE',
                                imagesavedsuccess: true
                            })

                            store.dispatch({
                                    type: "UPDATE_IMAGES",
                                    images: result.data
                            })

                                // this.getImages(store);

                        });
                    };
                    //  reader.readAsDataURL(file);
                    reader.readAsBinaryString(file);
                }

  },



  getUserDetails: function(store){

       return axios.get('/user', { credentials : true }).then(function(result){
           if (result){
                var username = result.data[0].facebook.firstName +" " + result.data[0].facebook.lastName;
                var userid = result.data[0].facebook.id;
                 console.log("userid", userid);
                store.dispatch({type: "ADD_USERNAME", username: username})
                store.dispatch({type: "ADD_USERID", userid: userid})
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


   },

   getMagazines: function(store, userid){
        console.log("being called");
       return axios.get('/magazine/'+userid, { credentials : 'same-origin' }).then(function(response) {
            console.log("magazine", response);
            store.dispatch({type: "NEW_MAGAZINES", magazines: response.data})
            return ;
        })

   }

    // img_upload: (image, userid) => {
    //         // sourceType ="upload" or "dnd"

    //             // if (image) {
    //             //         var reader = new FileReader();
    //             //         reader.onload = function(e) {
    //             //             console.log('Sending file...');
    //             //             //get all content
    //             //             var buffer = e.target.result;

    //             //             //send the content via socket
    //             //             // socket.emit('send-file', "TEST", buffer);
    //                         var tmpfilename = userid + "_New_Look";
    //                         socket.emit('img-file', tmpfilename, userid, image);
    //             //         };
    //             //         // send the content via socket




    //             //     };s
    //             //     //  reader.readAsDataURL(file);
    //             //     reader.readAsDataURL(image);
    //     }

 };
// We export the helpers function (which contains getGithubInfo)
module.exports = helpers;