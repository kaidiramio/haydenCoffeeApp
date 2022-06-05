const user = require("./models/user");

module.exports = function(app, passport, db) {

const {ObjectId} = require('mongodb') //gives access to _id in mongodb
//Collection variable
const collectionName = 'orders'
// normal routes ===============================================================

    // show the home page (will also have our login links)
    app.get('/', function(req, res) {
        res.render('index.ejs');
    });

    // PROFILE SECTION =========================
         //req.user if user is logged in and makigng a request, you can see everything bout that user also passed in.. Good for making profile pgs
    app.get('/profile', isLoggedIn, function(req, res) {
        db.collection(collectionName).find().toArray((err, result) => {
          if (err) return console.log(err)
          console.log(result)

          
          res.render('profile.ejs', {
            user : req.user
          })
        })
    });


  // {name: req.user.local.email}
    // barista SECTION =================================
    app.get('/barista', isLoggedIn, function(req, res) {
      db.collection(collectionName).find().toArray((err, result) => {
        if (err) return console.log(err)
        console.log('result', result)

        //update find to filter out/
        // let myWorkLogs = result.filter(doc => doc.name === req.user.local.email)
        // console.log('myWorkLogs', myWorkLogs)

        res.render('barista.ejs', {
          user : req.user, 
          orders: result
        })
      })
  });

    // LOGOUT ==============================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

// barista Page Routes ===============================================================

    app.put('/addChecked', (req, res) => {
        db.collection(collectionName)
        .findOneAndUpdate({ _id: ObjectId(req.body.postObjectID)}, 
        {
          $set: {
            complete: true,
            thisUser: req.user.local.firstName
          }
        },
         {
          sort: {_id: -1}, //Sorts documents in db ascending (1) or descending (-1)
          upsert: true
        }, (err, result) => {
          if (err) return res.send(err)
          res.send(result)
        })
      })

      app.put('/removeChecked', (req, res) => {
        db.collection(collectionName)
        .findOneAndUpdate({ _id: ObjectId(req.body.postObjectID)}, 
        {
          $set: {
            complete: false,

          }
        },
         {
          sort: {_id: -1}, //Sorts documents in db ascending (1) or descending (-1)
          upsert: true
        }, (err, result) => {
          if (err) return res.send(err)
          res.send(result)
        })
      })


      app.delete('/deleteOrder', (req, res) => {
        db.collection(collectionName).findOneAndDelete({ _id: ObjectId(req.body.postObjectID)}, (err, result) => {
          if (err) return res.send(500, err)
          res.send('Message deleted!')
        })
      })

//Order System Routes ===============================================================

app.get('/orderSystem', function(req, res) {
  res.render('orderSystem.ejs');
});

app.post('/submitOrder', (req, res) => {
  db.collection(collectionName)
  .insertOne({customerName: req.body.customerName, 
    size: req.body.size, 
    beverage: req.body.beverage, 
    temperature: req.body.temperature,
    espresso: req.body.espresso,
    sugar: req.body.sugar, 
    flavor: req.body.flavor, 
    milkOptions: req.body.milkOptions, 
    note: req.body.note, 
    complete: false}, (err, result) => {
    if (err) return console.log(err)
    //console.log(result)
    console.log('saved to database')
    res.redirect('/orderSystem')
  })
})
   

// =============================================================================
// AUTHENTICATE (FIRST LOGIN) ==================================================
// =============================================================================

    // locally --------------------------------
        // LOGIN ===============================
        // show the login form
        app.get('/login', function(req, res) {
            res.render('login.ejs', { message: req.flash('loginMessage') });
        });

        // process the login form
        app.post('/login', passport.authenticate('local-login', {
            successRedirect : '/barista', // redirect to the secure profile section
            failureRedirect : '/login', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

        // SIGNUP =================================
        // show the signup form
        app.get('/signup', function(req, res) {
            res.render('signup.ejs', { message: req.flash('signupMessage') });
        });

        // process the signup form
        app.post('/signup', passport.authenticate('local-signup', {
            successRedirect : '/barista', // redirect to the secure profile section
            failureRedirect : '/signup', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

// =============================================================================
// UNLINK ACCOUNTS =============================================================
// =============================================================================
// used to unlink accounts. for social accounts, just remove the token
// for local account, remove email and password
// user account will stay active in case they want to reconnect in the future

    // local -----------------------------------
    app.get('/unlink/local', isLoggedIn, function(req, res) {
        let user            = req.user;
        user.local.email    = undefined;
        user.local.password = undefined;
        user.save(function(err) {
            res.redirect('/profile');
        });
    });

};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}
