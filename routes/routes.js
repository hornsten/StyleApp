var request = require('request'); 
var path = require('path');
var React = require('react');
var fs = require('fs');
var cloudinary = require('cloudinary');
// var cloudinary_keys = require('../auth/cloudinary_keys');

// for heroku
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_NAME, 
  api_key: process.env.CLOUDINARY_API, 
  api_secret: process.env.CLOUDINARY_SECRET
});


// cloudinary.config(cloudinary_keys);

module.exports = function(app, passport, models){
    //route for facebook logout
var path = require('path');

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
                console.log(req.user.username);
                
            //successful auth  , redirect home 
            res.redirect('/');
            // res.sendFile(__dirname + "../../public/Home.html");
            // res.sendFile(path.resolve('public/profile.html'));
        }
        );


//    app.post('/img', function(req, res){
//         console.log(req.body, "req.body");
//         var fs = require('fs');
//             // fs.writeFile('ARRRRRRRRRRR.jpg', req.body, {encoding: 'base64'});
//             fs.open("ARRRRRRRTEST.png", 'a', 0755, function(err, fd) {
//             if (err) throw err;

//             fs.write(fd, req.body, {encoding: 'base64'}, 'Binary', function(err, written, buff) {
//                 fs.close(fd, function() {})
//    })

//             //  var data = img.replace(/^data:image\/\w+;base64,/, "");
//             // var buf = new Buffer(data, 'base64');
//             // fs.writeFile('image.png', buf);

//    })
//     })

   app.get('/auth/facebook/callback', passport.authenticate('facebook',{
            failureRedirect: '/'}), function(req,res, next){
                console.log(req.user.username);
                
            //successful auth  , redirect home 
            res.redirect('/');
            // res.sendFile(__dirname + "../../public/Home.html");
            // res.sendFile(path.resolve('public/profile.html'));
        }
        );


    // app.use(function(req, res, next) {
    //     res.header("Access-Control-Allow-Origin", "*");
    //     res.header('Access-Control-Allow-Methods', 'GET');
    //     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    //     next();
    // });

// removed this path from FB auth - cors issue
	app.get('/chat/rooms', function(req, res, next){
        //to allow CORS
        
		models.Room.find({}, function(err, results){
		console.log("rooms", results); 
		if (err) return console.log(err);
			res.json(results)
		});
	});

  
   app.get('/closet/image/:item', function(req, res, next){
        if ( req.isAuthenticated()){
            var type = req.params.item;
            // console.log("in here item" , type);
             models.User.findOne({_id: req.session.passport.user}).exec(function(err, results){
                
                // return results.facebook.id;
                // console.log(userid, "userid", results.facebook.id, "results.facebook.id");
                // need to query the database here for images for requesting user
            //    console.log("in here???? tooo", results);
            var userid =  results.facebook.id;
            models.Closet.find({"userid": userid, "type" : type}).exec(function(err, items){
                                    if (err) return console.log(err); 
                                        var returnObj= {type: type,
                                        results: items}
                                        console.log(returnObj);
                                    // console.log("or in here???? ", items);
                                        res.json(returnObj);
                })
                
             })
        }
   });

   app.get('/magazine/:userid', function(req, res,next){
       if ( req.isAuthenticated()){
            var userid = req.params.userid;
            console.log("in here mag");
             models.Magazine.find({"userid": userid}).exec(function(err, results){
                 console.log("in router", results);
                 res.json(results)      
             })
        }

   })

//     app.get('/image/:filename', function(req, res){
//        if ( req.isAuthenticated()){
//             var filename = req.params.filename;
            
//              models.User.findOne({_id: req.session.passport.user}).exec(function(err, results){
//                 var userid = results.facebook.id;
//                 console.log(userid," and ", filename);
//                 models.Closet.findOne({"userid": userid, "filename": filename }).exec(function(err, image){
//                     console.log("in router", image.src);
//                     // res.type('png');  
//                     // res.json(image.src) 

//                     var imageDownload = cloudinary.image(filename);
//                         console.log(imageDownload);
//                     // res.sendFile(imageDownload);
//                 })
//              })
//         }

//    })

    app.post('/closet/image/new/', function(req, res,next){
       if ( req.isAuthenticated()){
            models.User.findOne({_id: req.session.passport.user}, function(err, results){
                console.log(results, "results");
                var userid = results.facebook.id;
                var usernameNoSpaces = results.facebook.firstName+'_'+results.facebook.lastName;
                // create a unique name for the file
                var uniqueFileName = usernameNoSpaces + '_' + Date.now() + '_' + req.body.name;
                //path to store uploaded files (NOTE: presumed you have created the folders)
                // stored in temp area before being pushed to cloud
                var fileName = __dirname + '/../public/assets/img/' + uniqueFileName;
                // remove .png extension
                var publicFileName = uniqueFileName.slice(0, -4);
                console.log("new filename", fileName);
                
                fs.open(fileName, 'a', 0755, function(err, fd) {
                if (err) throw err;

                fs.write(fd, req.body.buffer, null, 'Binary', function(err, written, buff) {
                    fs.close(fd, function() {
                        console.log('File saved successful!');
                        // var filePath = '/../public/assets/img/' + uniqueFileName;
                        cloudinary.uploader.upload( fileName, function(result) { 


                            console.log("result",result);
                            // var filelocation = result.url;
                            // save to the database
                            var newClosetItem = new models.Closet({ userid: userid, imageid: uniqueFileName, filename: uniqueFileName, type: req.body.type, src: result.secure_url, created_at:  Date.now()});
                            newClosetItem.save().then(function(){
                                if (err) return console.log(err); 
                                console.log("saving item to db");
                                return;
                            		// need to updaet user closet too *****
                            }).then(function(){
                                //reqquer
                                models.Closet.find({"userid": userid, type: req.body.type}).exec(function(err, items){
                                    if (err) return console.log(err); 
                                        returnObj= {type: req.body.type,
                                        results: items}
                                    // console.log("or in here???? ", items);
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
    //    res.end();
})

    app.get('/user', function(req, res, next){
                //to allow CORS
        // res.header("Access-Control-Allow-Origin", "*");
        // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        // var userdetails = req.session.passport.user;
		// models.Room.find({}, function(err, results){
	   if ( req.isAuthenticated()){
            models.User.find({_id: req.session.passport.user}, function(err, results){
                    console.log("user detaiks", results); 
                    
                    res.json(results);
                    // if (err) return console.log(err);
                        
                    });
       } else {
            
            res.json({})
       }
		
        // res.json(req.session.passport.user);
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