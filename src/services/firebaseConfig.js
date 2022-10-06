import firebase from "firebase/app";
import 'firebase/auth'
import 'firebase/database'

const firebaseConfig = {
    apiKey: "AIzaSyCbjwhEQk1h35V0O0DMOmisvSicHxpFlNQ",
    authDomain: "todolist-fb9a9.firebaseapp.com",
    projectId: "todolist-fb9a9",
    storageBucket: "todolist-fb9a9.appspot.com",
    messagingSenderId: "94500181567",
    appId: "1:94500181567:web:2c87048783d5ea6d958a8a"
};

if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig)
}

export default firebase