'use strict';

// [START imports]
var firebase = require('firebase-admin');
// [END imports]

// TODO(DEVELOPER): Change the two placeholders below.
// [START initialize]
// Initialize the app with a service account, granting admin privileges
// var serviceAccount = require('path/to/serviceAccountKey.json');

// firebase.initializeApp({
//   credential: firebase.credential.cert(serviceAccount),
//   databaseURL: 'https://ethkanproject.firebaseio.com'
// });
// [END initialize]

/**
 * Keep the likes count updated and send email notifications for new likes.
 */
function startListeners() {
  firebase.database().ref('/cards').on('value', function(postSnapshot) {
    var postReference = postSnapshot.ref;
    var uid = postSnapshot.val().uid;
    var postId = postSnapshot.key;

  });
}

// Start the server.
startListeners();
