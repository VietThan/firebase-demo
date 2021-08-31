// Import React
import React from 'react';
import './App.css';

// Import Firebase SDK
import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

// Import hooks
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore'

firebase.initializeApp({
  apiKey: "AIzaSyAcXiDDWrxtTak90-OQ7Wrsrba20ZglRww",
  authDomain: "fireship-demos-67c08.firebaseapp.com",
  projectId: "fireship-demos-67c08",
  storageBucket: "fireship-demos-67c08.appspot.com",
  messagingSenderId: "959975616632",
  appId: "1:959975616632:web:343da62fe6b5594c487d8d",
  measurementId: "G-677BNMQV3P"
})

const auth = firebase.auth();
const firestone = firebase.firestore();


function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header>

      </header>

      <section>
        {user ? <ChatRoom /> : <SignIn />}
      </section>
    </div>
  );
}

function SignIn(){
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }

  return (
    <button onClick={signInWithGoogle}>Sign in with Google</button>
  )

}

function SignOut() {
  return auth.currentUser && (
    <button onClick={() => auth.SignOut()}>Sign Out</button>
  )
}

function ChatRoom(){
  const messagesRef = firestone.collection('messages');
  const query = messagesRef.orderBy('createdAt').limit(25);

  const [messages] = useCollectionData(query, {idField: 'id'});

  return (
    <>
      <div>
        {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
      </div>
    </>
  )
}

function ChatMessage(props){
  const{ text, uid } = props.message;
  return <p>{text}</p>
}


export default App;
