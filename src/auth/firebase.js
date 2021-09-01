import firebase from 'firebase/app'
import 'firebase/auth'

let firebaseConfig = {
  apiKey: "AIzaSyBsD5Am1ApxD3DYs1rNYvo-Ehq2i3X1ATw",
  authDomain: "isfdyt93-san-vicente.firebaseapp.com",
  projectId: "isfdyt93-san-vicente",
  storageBucket: "isfdyt93-san-vicente.appspot.com",
  messagingSenderId: "87044762498",
  appId: "1:87044762498:web:caec8d0a7282ea0b963d9b"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export function loginWithGoogle(){
    const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup( googleAuthProvider )
        .then(
            snap=>snap.user
        )
  }


  export function logoutGoogle(){
    localStorage.clear()
      return firebase.auth().signOut()
  }
