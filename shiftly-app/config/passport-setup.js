const passport = require("passport");
// const FbStrategy = require("passport-facebook").Strategy;
// const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

const UserModel = require("../models/user-model");


// serialize (what user information do we save to the session?)
// ------------------------------------------------------------
// gets called when a user logs in
passport.serializeUser( (userFromDb, callback) => {
    //      null is for saying "no errors occurred"
    //        |
    callback(null, userFromDb._id);
            //                 |
            // save only the "_id" of the user
});

// deserialize (how do we retrieve the user details from the session?)
// -------------------------------------------------------------------
// gets called EVERY TIME you visit a page on the site while you are logged in
// (this is so we can personalize all pages for the user)
passport.deserializeUser( (idFromSession, callback) => {
    UserModel.findById(idFromSession)
        .then( (userFromDb) => {
            callback(null, userFromDb);
            // send Passport the logged in user's info
            // null is saying "no errors occurred" during the deserialize process
        })
        .catch( (err) => {
            callback(err);
        });
});

// STRATEGIES (npm packages that enable additional methods of logging in)

// Login with facebook

// passport.use(
//   new FbStrategy(
//     //1st argument of FbStrategy --> settings object
//     {
//         // Facebook credentials
//         clientID: "????", // App ID
//         clientSecret: "????", // App Secret
//         // where to go after the log in is successful (one of our routes)
//         callbackURL: "/facebook/success"
//     },
//
//     //2nd argument of FbStrategy --> callback
//     (accessToken, refreshToken, profile, callback) => {
//         // profile contains the user info we get from facebook
//         console.log('FACEBOOK profile ----------------------');
//         console.log(profile);
//
//         // Check if there's already a document in the database for this user
//         UserModel.findOne({ facebookID: profile.id})
//         .then( (userFromDb) => {
//             // if there's already a user account...
//             if (userFromDb) {
//                 // tell Passport to use that user account
//                 callback(null, userFromDb);
//                 return;
//             }
//             // create a user account if there is none
//             const theUser = new UserModel({
//                 facebookID: profile.id,
//                 fullName: profile.displayName,
//
//             });
//
//             return theUser.save();
//         })
//         .then( (newUser) => {
//             // tell Passport to use the new user account
//             callback(null, newUser);
//         })
//         .catch( (err) => {
//             // tell Passport there was an error in the login process
//             callback(err);
//         });
//     }
//   ) // new FbStrategy()
// ); // passport.use()
//
// // Log in with Google
//
// passport.use(
//   new GoogleStrategy(
//     // 1st argument of GoogleStrategy -> settings object
//     {
//       clientID: "????",
//       clientSecret: "????",
//
//       // where to go after log in is successful (one of our routes)
//       callbackURL: "/google/success",
//
//       // fixes Google log in for production
//       proxy: true
//     },
//
//     // 2nd argument of GoogleStrategy -> callback
//     (accessToken, refreshToken, profile, callback) => {
//         console.log('GOOGLE profile --------------------------');
//         console.log(profile);
//
//         // check to see if there's already a document in the database for this user
//         UserModel.findOne({ googleID: profile.id })
//         .then( (userFromDb) => {
//             // if there's already a user account...
//             if (userFromDb) {
//                 // tell Passport to use that user account
//                 callback(null, userFromDb);
//                 return;
//             }
//
//             // create a user account if there is none
//             const theUser = new UserModel({
//                 googleID: profile.id,
//                 // use the email as their name because Google doesn't give name
//                 fullName: profile.displayName
//             });
//
//             return theUser.save();
//         })
//         .then( (newUser) => {
//             // tell Passport to use the new user account
//             callback(null, newUser);
//         })
//         .catch( (err) => {
//             callback(err);
//         });
//     }
//   ) // new GoogleStrategy
// ); // passport.use()
