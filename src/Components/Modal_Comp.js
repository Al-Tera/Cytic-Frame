import React, {useState} from 'react'
import Modal from "@material-ui/core/Modal";
import { auth } from "../firebase";
import "./Modal_Comp.css"
import {ReactComponent as User} from "../images/user.svg" 
import {ReactComponent as Email} from "../images/email.svg" 
import {ReactComponent as Lock} from "../images/lock.svg" 


function Modal_Comp({open, setOpen, openSignIn, setOpenSignIn, username, setUsername, user, setUser}) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const signUp = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: username,
        })
      })
      .catch((error) => alert(error.message));
      setOpen(false);
    }
  
    const signIn = (e) => {
      e.preventDefault();
      auth
        .signInWithEmailAndPassword(email, password)
  
        .catch((error) => alert(error.message))
      setOpenSignIn(false);
    }
  
  return (
    <div>
      <Modal 
        open={open}
        onClose={()=> setOpen(false)}
        >
        <div
          // style={modalStyle}
          // className={classes.paper}
          className="modal"
        >
          <form >
            <input type="text"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="modal__text"/>
            <input type="text"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="modal__text"/>
            <input type="text"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="modal__text"/>
            <button onClick={signUp}
              className="sign__button"
            >Sign Up</button>
            <div className="userimage modal__images">
              <User /></div>
            <div className="emailimage modal__images">
              <Email /></div>
            <div className="lockimage modal__images">
              <Lock /></div>
            <div className="userimage__tail modal__images__tail"></div>
            <div className="emailimage__tail modal__images__tail"></div>
            <div className="lockimage__tail modal__images__tail"></div>

          </form>
        </div>
      </Modal>

      <Modal 
          open={openSignIn}
          onClose={()=> setOpenSignIn(false)}
          >
        <div
          // style={modalStyle} className={classes.paper}
          className="modal">
          <form>
            <input type="text"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="modal__text"
            />
          
            <input type="text"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="modal__text"
            />
            <button onClick={signIn}
              className="sign__button"
            
            >Sign In</button>
            <div className="emailimageIN modal__images">
              <Email /></div>
            <div className="lockimageIN modal__images">
              <Lock /></div>
            <div className="emailimage__tailIN modal__images__tail"></div>
            <div className="lockimage__tailIN modal__images__tail"></div>

          </form>
        </div>
      </Modal>
      
    </div>
  )
}

export default Modal_Comp
