import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBUDvCjUKu6Rfy4fpvXaGLPD3mg9unE4CE",
    authDomain: "salck-clone-793d4.firebaseapp.com",
    projectId: "salck-clone-793d4",
    storageBucket: "salck-clone-793d4.appspot.com",
    messagingSenderId: "520248850716",
    appId: "1:520248850716:web:94daaea0f28d52876662d9"
  };

  const firebaseApp=firebase.initializeApp(firebaseConfig);
  const db=firebaseApp.firestore();
  const auth=firebase.auth();
  const provider=new firebase.auth.GoogleAuthProvider();

  export{auth,provider,db};