import React, { useState } from 'react'
import "./Form.css"
import { storage, db } from "../firebase"
import firebase from "firebase"
import insertphoto from "../images/insert_photo.svg"
import {ReactComponent as Exclamation} from "../images/exclamation.svg"
import {ReactComponent as Create} from "../images/create.svg"

function Form({ username }) {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState('');
  const [content, setContent] = useState('');
  const [eyeopen, setEyeOpen] = useState(false);
  const [formopen, setFormOpen] = useState(false);
  const [imagepreview, setImagePreview] = useState(null);
  const [progress, setProgress] = useState(0);
  const [posting, setPosting] = useState(false)
  const imageSelector = (e) => {
      setImage(e.target.files[0]);
      setImagePreview(URL.createObjectURL(e.target.files[0]))
  };
  // NOTICE: IMAGE ERROR 12/7/20
  const addPost = (e) => {
    e.preventDefault();
    const fileInput = document.getElementById("file")
    if (caption !== ''){ 
    if (image === null) {
      e.preventDefault();
      db.collection("posts").add({
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        caption: caption,
        imageUrl: image,
        username: username,
        content: content
      })
        .catch(function (error) {
          console.error("Error writing document: ", error);
        });
      setContent("")
      setCaption("")
      setFormOpen(false)
    }
    
    else {
      const postTask = storage.ref(`images/${image.name}`).put(image);
      postTask.on(
        "state_changed",
        (snapshot) => {
          setPosting(true)
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100)
          setProgress(progress);
        },
        (error) => {
          alert(error.message);
        },
        () => {
          storage
            .ref("images")
            .child(image.name)
            .getDownloadURL()
            .then(url => {
              db.collection("posts").add({
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                caption: caption,
                imageUrl: url,
                username: username,
                content: content
                 
              })
              
              setContent("")
              setCaption("")
              fileInput.value = null;
              setImage(null)
              setFormOpen(false)
              setPosting(false)
            })
        })
      }
    }
    else {
      console.log("Inputs are needed")
    }
  }
  function eyeOpened(){
    setEyeOpen(!eyeopen)
    if (eyeopen === true) {
      setFormOpen(false)
    }
  }
    
  return (
    <div className={`form__container`}
    >

      { formopen ?
        (<div className="backgroundclear"
        onClick={() => setFormOpen(false)}></div>)
        : ("")
      }
      <div className={`design__form ${eyeopen ? "form_hover" : ""}`}
      onClick={eyeOpened}>
      
      <div className={`design1__square ${eyeopen? "form_designHover" : ""}`}>
        <div className={`design2__square ${eyeopen ? "form_designHover2" : ""}`}>

            <div className={`period ${eyeopen? "period__remove" : ""}`}></div>
          <Exclamation className={`question ${eyeopen ? "form_designQuestion" : ""}`}/>
          {/* <img className="question" src={Question} alt=""></img> */}
        </div>
        </div>
      </div>
      <div className="form__buttons">
        <div className={`create__post ${eyeopen ? "form__buttons_hover" : ""}`}
          onMouseUp={() => setFormOpen(!formopen)}
        >
          <Create className="button__create"/>
        </div>
        <div className={`unknown1 ${eyeopen ? "form__buttons_hover" : ""}`}></div>
        <div className={`unknown2 ${eyeopen ? "form__buttons_hover" : ""}`}></div>
      </div>
      {/* // create ? ( */}
      <div className={`form__border ${formopen ? "showing" : ""}`}>
        <div className="form__top__dot">
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
        <div className="form__bottom__dot">
        <div className="dot"></div>
          <div className="dot"></div>
        </div>
        <div className={`App__header ${formopen ? "showing" : ""}`}>
            
          <input type="text"
            className="text__caption textfield"
            placeholder="Insert Title Here"
            value={caption}
            onChange={(e) => setCaption(e.target.value)} />
          <textarea className="text__content textfield"
            placeholder="What is on thy mind?"
            value={content}
            onChange={(e) => setContent(e.target.value)} />
          <input type="file"
            name="file"
            id="file"
            className="inputfile"
            onChange={imageSelector} />
          <label htmlFor="file" className="labelfile">
            <img src={insertphoto} className="file__Image" alt=""></img> 
          </label>
      
          <button className={`post__button ${posting ? "unclickable" : ""}`}>
            <div className="mask1 mask"></div>
            <div className="mask2 mask"></div>
            <div className="mask3 mask"></div>
            <div className="mask4 mask"></div>
            <label className="post__label">POST</label>
            <div className="post__background"
              onClick={addPost}
            >
              <div className={`jail ${posting ? "jailed" : ""}`}>
                <span className="line"></span>
                <span className="line"></span>
                <span className="line"></span>
                <span className="line"></span>
            </div>
              
            </div>
          </button>
          {posting ?
            (<progress className="form__progress" value={progress} max="100" />)
            : ("")
            
          }
          </div>
      </div>
    </div>
    
  )
}

export default Form
