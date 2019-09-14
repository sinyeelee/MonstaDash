 import firebase from 'firebase/app'
 import 'firebase/firestore'
 import 'firebase/auth'


 var firebaseConfig = {
    apiKey: "AIzaSyBDtXXf82jVh3i2kffwGk7Xs3hE7GLQxEg",
    authDomain: "monstadashboard-9f9e4.firebaseapp.com",
    databaseURL: "https://monstadashboard-9f9e4.firebaseio.com",
    projectId: "monstadashboard-9f9e4",
    storageBucket: "monstadashboard-9f9e4.appspot.com",
    messagingSenderId: "901695744568",
    appId: "1:901695744568:web:86748f870842a687"
  };

  firebase.initializeApp(firebaseConfig);
  firebase.firestore().settings({ timestampsInSnapshots: true });

  export default firebase