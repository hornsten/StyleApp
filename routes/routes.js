var request = require('request'); 
var path = require('path');
var React = require('react');
var fs = require('fs');
var cloudinary = require('cloudinary');
var cloudinary_keys = require('../auth/cloudinary_keys');
cloudinary.config(cloudinary_keys);
// // for heroku
// cloudinary.config({ 
//   cloud_name: process.env.CLOUDINARY_NAME, 
//   api_key: process.env.CLOUDINARY_API, 
//   api_secret: process.env.CLOUDINARY_SECRET
// });




module.exports = function(app, passport, models){
    //route for facebook logout
var path = require('path');


// moved get all magazines route here before authentication
 app.get('/magazine/all', function(req, res,next){
       console.log("is this router being ")
            console.log("in here ALLL mags");
   
            // get today's new magazines in date order
            var cutoff = new Date();
            cutoff.setDate(cutoff.getDate());

             models.Magazine.aggregate([
                    {
               $lookup:
                            {
                            from: "users",
                            localField: "userid",
                            foreignField: "facebook.id",
                            as: "magazine_profile"
                            }
                }
                ]).exec(function(err, results){

                 res.json(results)      
             })
   })



app.get('/', function(req, res){
    res.sendFile(__dirname + "../../public/index.html");
})


    app.get('/logout', isLoggedIn, function(req, res, next){
        req.logout();
        res.redirect('/');
    })
  //route for fb authentication and login
    app.get('/auth/facebook', passport.authenticate('facebook', {scope: ['public_profile', 'email'] }));


   app.get('/auth/facebook/callback', passport.authenticate('facebook',{
            failureRedirect: '/'}), function(req,res, next){
                
            //successful auth  , redirect home 
            res.redirect('/');

        }
        );


   app.get('/auth/facebook/callback', passport.authenticate('facebook',{
            failureRedirect: '/'}), function(req,res, next){

                
            //successful auth  , redirect home 
            res.redirect('/');

        }
        );


// removed this path from FB auth - cors issue
	app.get('/chat/rooms', function(req, res, next){
        //to allow CORS
        
		models.Room.find({}, function(err, results){
 
		if (err) return console.log(err);
			res.json(results)
		});
	});

  
   app.get('/closet/image/:item', function(req, res, next){
        if ( req.isAuthenticated()){
            var type = req.params.item;

             models.User.findOne({_id: req.session.passport.user}).exec(function(err, results){              

            var userid =  results.facebook.id;
            models.Closet.find({"userid": userid, "type" : type}).exec(function(err, items){
                                    if (err) return console.log(err); 
                                        var returnObj= {type: type,
                                        results: items}

                                        res.json(returnObj);
                })
                
             })
        }
   });

   // userprofileid is optional
   app.get('/profile/image/:userprofileid?', function(req, res, next){
  
        if ((req.isAuthenticated()) && (!req.params.userprofileid)){
            var src = req.body.name;
            models.User.findOne({_id: req.session.passport.user}).exec(function(err, results){ 
                res.json(results.imgsrc)             
                       
             })
        } else if (req.params.userprofileid){

            models.User.findOne({"facebook.id": req.params.userprofileid}).exec(function(err, results){ 
                console.log("userid: ",req.params.userprofileid);
                console.log("results: ",req.params.results)
                res.json(results.imgsrc)             
                       
             })
        }
   });

app.get('/updatestylemotto/:userprofileid?', function(req, res){
    if((req.isAuthenticated()) && (!req.params.userprofileid)){
        models.User.findOne({_id: req.session.passport.user}).exec(function(err, userInfo){             
            if (err) return console.log(err); 

                res.json(userInfo.stylemotto);
        })
    } else if (req.params.userprofileid){

            models.User.findOne({"facebook.id": req.params.userprofileid}).exec(function(err, results){ 

                res.json(results.stylemotto)             
                       
             })
        }
})

app.get('/profile/:userprofileid', function(req, res){
    if (req.params.userprofileid !== ''){
            models.User.findOne({"facebook.id": req.params.userprofileid}).exec(function(err, results){ 
                  var name = results.facebook.firstName + " " + results.facebook.lastName
                res.json(name);            
                       
             })
        }
})


    app.get('/updateblurb/:userprofileid?', function(req, res){
        if ((req.isAuthenticated()) && (!req.params.userprofileid)){
            models.User.findOne({_id: req.session.passport.user}).exec(function(err, userInfo){             
                if (err) return console.log(err); 
                    res.json(userInfo.blurb);
            })
        } else if (req.params.userprofileid){

                models.User.findOne({"facebook.id": req.params.userprofileid}).exec(function(err, results){ 
                    res.json(results.blurb)             
                        
                })
            }
    })

        app.get('/updatedesigner/:userprofileid?', function(req, res){
        if ((req.isAuthenticated()) && (!req.params.userprofileid)){
            models.User.findOne({_id: req.session.passport.user}).exec(function(err, userInfo){             
                if (err) return console.log(err); 
                    res.json(userInfo.designer);
            })
        } else if (req.params.userprofileid){

                models.User.findOne({"facebook.id": req.params.userprofileid}).exec(function(err, results){ 
                    res.json(results.designer)             
                        
                })
            }
    })

        app.get('/updateinspiration/:userprofileid?', function(req, res){
        if ((req.isAuthenticated()) && (!req.params.userprofileid)){
            models.User.findOne({_id: req.session.passport.user}).exec(function(err, userInfo){             
                if (err) return console.log(err); 
                    res.json(userInfo.inspiration);
            })
        } else if (req.params.userprofileid){

                models.User.findOne({"facebook.id": req.params.userprofileid}).exec(function(err, results){ 
                    res.json(results.inspiration)             
                        
                })
            }
    })

    app.get('/magazine/profile/:userid', function(req, res,next){

                var userid = req.params.userid;
                models.Magazine.find({"userid": userid}).sort({'date': -1}).limit(12).exec(function(err, results){
                    res.json(results)      
                })

    })
   app.get('/magazine/:userid', function(req, res,next){
       if ( req.isAuthenticated()){
            var userid = req.params.userid;
             models.Magazine.find({"userid": userid}).exec(function(err, results){
                 res.json(results)      
             })
        }

   })

 app.get('/magazine/keywords/:userid/:search', function(req, res,next){
            

       if ( req.isAuthenticated()){
            var searchTerm = req.params.search;
            var userid = req.params.userid;

            models.Magazine.find({userid: userid, description: {$regex: searchTerm, $options: 'i'}}).exec(function(err, results){
                    res.json(results)      
            })
        }

 })

 app.get('/magazine/keywords/:search', function(req, res,next){
            var searchTerm = req.params.search;
             models.Magazine.aggregate([
                    {
               $lookup:
                            {
                            from: "users",
                            localField: "userid",
                            foreignField: "facebook.id",
                            as: "magazine_profile"
                            }
                },  { $match: { 'description' : {$regex: searchTerm, $options: 'i'} } }
                ]).exec(function(err, results){
                 res.json(results)      
             })


 })






app.post('/profileimageupload', function(req, res,next){
       if ( req.isAuthenticated()){
            models.User.findOne({_id: req.session.passport.user}, function(err, results){
                var filepath = '/../public/assets/img/' + req.body.name;
                var fileName = __dirname + '/../public/assets/img/' + req.body.name;
                var userid = results.facebook.id;
                // remove .png extension
                var publicFileName = req.body.name.slice(0,-4);
                fs.open(fileName, 'a', 0755, function(err, fd) {
                if (err) throw err;

                fs.write(fd, req.body.buffer, null, 'Binary', function(err, written, buff) {
                    fs.close(fd, function() {

                        cloudinary.uploader.upload( fileName, function(result) { 
                            // remove old tmp file
                            fs.unlinkSync(fileName);
                            // save to the database
                            models.User.findOneAndUpdate({_id: req.session.passport.user}, {$set: {imgsrc: result.secure_url}}).exec(function(err, userInfo){             
                                    if (err) return console.log(err); 
                                        res.json(result.secure_url);
                            })
                        }, {
                            public_id: publicFileName, 
                            crop: 'limit',
                            width: 2000,
                            height: 2000,
                            eager: [
                            { width: 200, height: 200, crop: 'thumb',
                                radius: 20 },
                            { width: 100, height: 150, crop: 'fit', format: 'png' }
                            ],                                     
                        } );
                    })
                })

        })
                                
        });

        } 
    })





app.post('/updatestylemotto', function(req, res){
    if(req.isAuthenticated()){
        models.User.findOneAndUpdate({_id: req.session.passport.user}, {$set: {stylemotto: req.body.stylemotto}}).exec(function(err, userInfo){             
            if (err) return console.log(err); 
                res.end();
        })
    }
})

app.post('/updateblurb', function(req, res){
    if(req.isAuthenticated()){
        models.User.findOneAndUpdate({_id: req.session.passport.user}, {$set: {blurb: req.body.blurb}}).exec(function(err, userInfo){             
            if (err) return console.log(err); 
                res.end();
        })
    }
})


app.post('/updateinspiration', function(req, res){
    if(req.isAuthenticated()){
        models.User.findOneAndUpdate({_id: req.session.passport.user}, {$set: {inspiration: req.body.inspiration}}).exec(function(err, userInfo){             
            if (err) return console.log(err); 
                res.end();
        })
    }
})

app.post('/updatedesigner', function(req, res){
    if(req.isAuthenticated()){
        models.User.findOneAndUpdate({_id: req.session.passport.user}, {$set: {designer: req.body.designer}}).exec(function(err, userInfo){             
            if (err) return console.log(err); 
                res.end();
        })
    }
})



    app.post('/closet/image/new/', function(req, res,next){
       if ( req.isAuthenticated()){
            models.User.findOne({_id: req.session.passport.user}, function(err, results){

                var userid = results.facebook.id;
                var usernameNoSpaces = results.facebook.firstName+'_'+results.facebook.lastName;
                // create a unique name for the file
                var uniqueFileName = usernameNoSpaces + '_' + Date.now() + '_' + req.body.name;
                //path to store uploaded files (NOTE: presumed you have created the folders)
                // stored in temp area before being pushed to cloud
                var fileName = __dirname + '/../public/assets/img/' + uniqueFileName;
                // remove .png extension
                var publicFileName = uniqueFileName.slice(0, -4);
                
                fs.open(fileName, 'a', 0755, function(err, fd) {
                if (err) throw err;

                fs.write(fd, req.body.buffer, null, 'Binary', function(err, written, buff) {
                    fs.close(fd, function() {
                        cloudinary.uploader.upload( fileName, function(result) { 
                            fs.unlinkSync(fileName);
                            // save to the database
                            var newClosetItem = new models.Closet({ userid: userid, imageid: uniqueFileName, 
                                filename: uniqueFileName, type: req.body.type, 
                                src: result.secure_url, created_at:  Date.now()});
                            newClosetItem.save().then(function(){
                                if (err) return console.log(err); 
                                return;
                            		// need to updaet user closet too *****
                            }).then(function(){
                                //reqquer
                                models.Closet.find({"userid": userid, type: req.body.type}).exec(function(err, items){
                                    if (err) return console.log(err); 
                                        returnObj= {type: req.body.type,
                                        results: items}
                                        res.json(returnObj);
                                    })
                            })
                            // // remove file from from tmp area


                        }, {
                            public_id: publicFileName, 
                            crop: 'limit',
                            width: 2000,
                            height: 2000,
                            eager: [
                            { width: 200, height: 200, crop: 'thumb',
                                radius: 20 },
                            { width: 100, height: 150, crop: 'fit', format: 'png' }
                            ],                                     
                            // tags: ['special', 'for_homepage']
                        } );
                    })
                })

        })
                                
        });

        } 

})

    app.get('/user', function(req, res, next){
	   if ( req.isAuthenticated()){
            models.User.find({_id: req.session.passport.user}, function(err, results){
                    
                    res.json(results);
                    // if (err) return console.log(err);
                        
                    });
       } else {
            
            res.json({})
       }
		

	});
 // to allow CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
////
}

function isLoggedIn(req, res,next){
    if(req.isAuthenticated())

        return next();
        //if not logged in redirect to home page
    res.redirect('/');
}
