import React, { useState, useEffect } from 'react'
import "./Post_Core.css"
import { db } from "../firebase"
import {ReactComponent as ThumbUp} from "../images/thumbUp.svg"
import {ReactComponent as Save} from "../images/save.svg"
import {ReactComponent as Back} from "../images/back.svg"


function Post_Core({ liked, setLiked, hidden, setHidden, postId, username, imageUrl, content, caption, likecounter, setLikecounter,
    setPostshidden }) {

    const [comments, setComments] = useState([])
    const [comment, setComment] = useState('')
    useEffect(() => {
        let unsubscribe;
        if (postId) {
            unsubscribe = db
                .collection("posts")
                .doc(postId)
                .collection("comments")
                .onSnapshot((snapshot) => {
                    setComments(snapshot.docs.map((doc) => doc.data()));
                });
        }
        return () => {
            unsubscribe();
        };
    }, [postId]);

    const postComment = (e) => {
        e.preventDefault();
    }
    const hide = (e) => {
        setHidden(true);
        setPostshidden(false);
    }
    const likedFunction = (e) => {
        e.preventDefault();
        setLiked(!liked)
        if(liked === false)
        setLikecounter(counter => counter + 1)
        else
        setLikecounter(counter => counter + -1)
            
    }

    return (
        <div>
            
            <div className={`content__core ${hidden ? "contentIndex" : "unhidden contentIndex"} `}
            >
                
                <div className="content__core__body">
                    <Back className="exit__button"  onClick={hide}/>
                    

                    <div className="header">
                        <div className="header__title">
                            <h1 className="core__caption core__text">{caption}</h1>
                        </div>
                        <div className="header__buttons">
                            <Save className={`img__button`}/>
                            <ThumbUp className={`img__button 
                                                ${liked ? "like__active" : ""}`}
                                onClick={likedFunction} />
                            <h1>{likecounter}</h1>

                        </div>
                        
                    </div>
                    <h1 className="core__content core__text">{content}</h1>

                    <div className="comment__section">
                        <div className="post__comments">
                            {comments.map((comment) => (
                            <p>    
                                <strong>{comment.username}</strong>{comment.text}
                            </p>))}
                        </div>

                        <form className="commentBox">
                            <input
                                className="comment__input"
                                type="text"
                                placeholder="Add a comment"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}/>
                            <button
                                className="comment__button"
                                disabled={!comment}
                                type="text"
                                onClick={postComment}>
                                comment</button>
                            
                        </form>
                        
                    </div>
                    
                </div>
                
            
            </div>

            </div>
            
    )
}

export default Post_Core
