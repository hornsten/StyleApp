var axios = require("axios");

// Helper Functions
var helpers = {


    // getStyleMotto(store, userprofileid){
    // return axios.get('/updatestylemotto/'+userprofileid).then(function(result){

    //             if(result.data){
    //                 store.dispatch({
    //                     type: 'UPDATE_STYLEMOTTO',
    //                     stylemotto: result.data
    //                 })
    //             } else {
    //                  store.dispatch({
    //                     type: 'UPDATE_STYLEMOTTO',
    //                     stylemotto: "click to add style motto"
    //                 })
    //             }
    //         })
    // },
        
    // getBlurb(store, userprofileid){
    // return axios.get('/updateblurb/'+userprofileid).then(function(result){
    //             if(result.data){
    //                 store.dispatch({
    //                     type: 'UPDATE_BLURB',
    //                     blurb: result.data
    //                 })
    //             } else {
    //                 store.dispatch({
    //                     type: 'UPDATE_BLURB',
    //                     blurb: "click to add style story"
    //                 })
    //             }
    //         })
    // },

    // getInspiration(store, userprofileid){
    // return axios.get('/updateinspiration/'+userprofileid).then(function(result){

    //             if(result.data){
    //                 store.dispatch({
    //                     type: 'UPDATE_INSPIRATION',
    //                     inspiration: result.data
    //                 })
    //             }  else {
    //                 store.dispatch({
    //                     type: 'UPDATE_INSPIRATION',
    //                     inspiration: "click to add style inspiration"
    //                 })
    //             }
    //         })
    // },
        
    // getDesigner(store, userprofileid){
    // return axios.get('/updatedesigner/'+userprofileid).then(function(result){
    //             if(result.data){
    //                 store.dispatch({
    //                     type: 'UPDATE_DESIGNER',
    //                     designer: result.data
    //                 })
    //             } else {
    //                 store.dispatch({
    //                     type: 'UPDATE_DESIGNER',
    //                     designer: "click to add fav designers"
    //                 })

    //             }
    //         })
    // },
    
        
    getProfileData(store, userprofileid){
    return axios.get('/profile/attributes/'+userprofileid).then(function(result){
                if(result.data.designer){
                    store.dispatch({
                        type: 'UPDATE_DESIGNER',
                        designer: result.data.designer
                    })
                } else {
                    store.dispatch({
                        type: 'UPDATE_DESIGNER',
                        designer: "click to add fav designers"
                    })
                }

                 if(result.data.blurb){
                    store.dispatch({
                        type: 'UPDATE_BLURB',
                        blurb: result.data.blurb
                    })
                } else {
                    store.dispatch({
                        type: 'UPDATE_BLURB',
                        blurb: "click to add style story"
                    })
                }

                 if(result.data.inspiration){
                    
                    store.dispatch({
                        type: 'UPDATE_INSPIRATION',
                        inspiration: result.data.inspiration
                    })
                } else {

                    store.dispatch({
                        type: 'UPDATE_INSPIRATION',
                        inspiration: "click to add style inspiration"
                    })
                }

                 if(result.data.stylemotto){
                  store.dispatch({
                        type: 'UPDATE_STYLEMOTTO',
                        stylemotto: result.data.stylemotto
                    })
                } else {
                  store.dispatch({
                        type: 'UPDATE_STYLEMOTTO',
                        stylemotto: "click to add style motto"
                    })
                }
                if (result.data.imgsrc){
                    store.dispatch({
                        type: 'UPDATE_PROFILEIMAGE',
                        profile_image: result.data.imgsrc
                    })
                } else {
                  store.dispatch({
                        type: 'UPDATE_PROFILEIMAGE',
                        profile_image: '../../assets/img/Blank_Profile.png'
                    })
                }
            })
    },

// use this to get all profile data not just image
    getProfileImage: function(store, userprofileid){
        return axios.get('/profile/image/'+userprofileid).then(function(result){
            if(result){
                store.dispatch({
                    type: 'UPDATE_PROFILEIMAGE',
                    profile_image: result.data
                })

   
            }
        })
    },

    getProfileUsername(store, userprofileid){
        return axios.get('/profile/'+userprofileid).then(function(result){
                if(result.data){
                    store.dispatch({
                        type: 'UPDATE_PROFILE_NAME',
                        profileusername: result.data
                    })
                }
            })
    },


    setStyleMotto: function(e,store){
        var mottoObj = {stylemotto: e}
        return axios.post('/updatestylemotto', mottoObj).then(function(result){

        })
    },

    setBlurb: function(e, store){
        var blurbObj = {blurb: e}
        return axios.post('/updateblurb', blurbObj).then(function(result){

        })
    },

    setInspiration: function(e,store){
        var inspirationObj = {inspiration: e}
        return axios.post('/updateinspiration', inspirationObj).then(function(result){

        })
    },

    setDesigner: function(e, store){
        var designerObj = {designer: e}
        return axios.post('/updatedesigner', designerObj).then(function(result){

        })
    },







    getImages: function(store, item){
        return axios.get('/closet/image/'+item).then(function(result){
           if (result){
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

    uploadToProfile: function(e, store){
                var files = e.target.files || e.dataTransfer.files 
                if (files) {
                    //send only the first one
                    var file = files[0];
                    //read the file content and prepare to send it
                    var reader = new FileReader();
                    reader.onload = function(e) {
                        var buffer = e.target.result;
                        var postObj = {
                            name: file.name,
                            buffer: buffer
                        };
                        
                        return axios.post('/profileimageupload',postObj).then(function(result){
                            console.log("sercure", result);
                                store.dispatch({
                                    type: 'UPDATE_PROFILEIMAGE',
                                    profile_image: result.data
                                })
                                console.log("waht is this value", result.data.imgsrc);
                                console.log("profile iage",store.getState())
                        })
                    }//onload fn
                    reader.readAsBinaryString(file);
                }
    },

  uploadToCloset: function(e, type, store){
                var files = e.target.files || e.dataTransfer.files
                if (files) {
                    //send only the first one
                    var file = files[0];
                    //read the file content and prepare to send it
                    var reader = new FileReader();
                    reader.onload = function(e) {
                        //get all content
                        var buffer = e.target.result;
                        var postObj = {
                            name: file.name,
                            buffer: buffer,
                            type: type,
                        };

                        return axios.post('/closet/image/new', postObj).then(function(result){

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


                        });
                    };
                    //  reader.readAsDataURL(file);
                    reader.readAsBinaryString(file);
                }

  },



  getUserDetails: function(store){

       return axios.get('/user', { credentials : true }).then(function(result){
           if (result !== ""){
                var username = result.data[0].facebook.firstName +" " + result.data[0].facebook.lastName;
                var userid = result.data[0].facebook.id;
                store.dispatch({type: "ADD_USERNAME", username: username})
                store.dispatch({type: "ADD_USERID", userid: userid})
                store.dispatch({type: "IS_LOGGED_IN", loggedin: "true"})

           }

      })


  },


   getRoomList: function(){
        // sends get request to apiController to query database for all rooms
        return axios.get('/chat/rooms', { credentials : 'same-origin' }).then(function(response) {
            return response;
        })


   },

   getMagazines: function(store, userid){
       return axios.get('/magazine/'+userid, { credentials : 'same-origin' }).then(function(response) {
            store.dispatch({type: "NEW_MAGAZINES", magazines: response.data})
            return ;
        })

   },

    getProfileMagazines: function(store, userid){
        return axios.get('/magazine/profile/'+userid, { credentials : 'same-origin' }).then(function(response) {
                store.dispatch({type: "NEW_PROFILE_MAGAZINES", profilemagazines: response.data})
                return ;
            })

    },

   getAllMagazines: function(store){
        console.log("before magazines");
       return axios.get('/magazine/all', { credentials : 'same-origin' }).then(function(response) {
           console.log("magazines response", response);
            store.dispatch({type: "ALL_MAGAZINES", allmagazines: response.data})
            return ;
        })

   },

searchMagazinesUserid: function(store, searchTerm, userid){

    if (searchTerm === ""){
             // if user just hits enter return default view
             this.getMagazines(store, userid);
    } else{
        return axios.get('/magazine/keywords/'+userid+"/"+searchTerm, { credentials : 'same-origin' }).then(function(response) {
        store.dispatch({type: "NEW_MAGAZINES", magazines: response.data})
        return ;
        })
    }

},

    searchMagazines: function(store, searchTerm){
         
         if (searchTerm === ""){
             // if user just hits enter return default view
             this.getAllMagazines(store);
         } else{
            return axios.get('/magazine/keywords/'+searchTerm, { credentials : 'same-origin' }).then(function(response) {
            store.dispatch({type: "ALL_MAGAZINES", allmagazines: response.data})
            return ;
            })

         }
  

        
    }

 };
// We export the helpers function (which contains getGithubInfo)
module.exports = helpers;