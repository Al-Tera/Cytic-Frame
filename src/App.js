import React, {useState, useEffect} from "react";
import "./App.css";
import { auth, db } from "./firebase";
import ModalComp from "./Components/Modal_Comp"
import Posts from "./Components/Posts";
import Form from "./Components/Form";

function App() {
  const [open, setOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [username, setUsername] = useState('');
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      }
      else {
        setUser(null);
      }
    })

    return () => {
      unsubscribe();
    }
}, [user, username]);


  useEffect(() => {
    db.collection('posts').orderBy('timestamp', 'desc')
      .onSnapshot(snapshot => {
      setPosts(snapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data()
      })));
    })

  }, []);

  return (
    <div className="App">
      <ModalComp open={open} setOpen={setOpen}
                openSignIn={openSignIn} setOpenSignIn={setOpenSignIn}
                username={username} setUsername={setUsername}
                user={user} setUser={setUser}
      />
      
      {
        user ? (
          <div>
            <button className= "logout" onClick={() => auth.signOut()}>LOGOUT</button>
            <Form posts={posts} setPosts={setPosts} username={user.displayName} />
          </div>
        ) : (
          <div className="signer">
            <button className="inner__signer" onClick={() => setOpenSignIn(true)}>SIGN IN</button>
            <button className="inner__signer" onClick={() => setOpen(true)}>SIGN UP</button>
          </div>)
      }
      
      
      <Posts posts={posts}/>

      </div>
  );
}

export default App;
