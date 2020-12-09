import React, {useState} from 'react'
import "./Post.css"
import PostCore from "./Post_Core"
import {ReactComponent as ThumbUp} from "../images/thumbUp.svg"
import useFitText from "use-fit-text";
import {Avatar} from "@material-ui/core" 

function Post({ postId, username, caption, imageUrl, content}) {

    const { fontSize, ref } = useFitText();
    const [liked, setLiked] = useState(false);
    const [likecounter, setLikecounter] = useState(10);
    const [hidden, setHidden] = useState(true);
    const [postshidden, setPostshidden] = useState(false)

    const unhide = (e) => {
        e.preventDefault();
        setHidden(false);
        setPostshidden(true);
    }
    const likedFunction = (e) => {
        e.preventDefault();
        setLiked(!liked)

        if(liked === false)
        setLikecounter(counter => counter + 1)
        else
        setLikecounter(counter => counter + -1)
    }
    function animend(){
        setPostshidden(false)
    }

    return (
        <div className={`post ${postshidden ? "postAnim": ""}`}
            onAnimationEnd={animend}>
            {/* Profile Name & Image */}
            <div className="profile__image">

                <div className="user__persona">
                    <Avatar />
                    {/* <img src={imageUrl} alt="pekkkoooo" srcSet=""/> */}
                </div>
                <h1 className="user__name">{username.substring(0, 7)}{username.length > 7 ? " . . ." : ""}</h1>
            </div>
                    
            {/* Content Beside Profile Name & Image */}
            <div className="content" onDoubleClick={unhide}>
                <div className="left__dot"></div>
                <div className="right__dot"></div>
                <div className="text__et__like" ref={ref} style={{fontSize}}>
                    <div className="caption" style={{display: imageUrl!== null ? "grid" : "" }}>
                        {
                            (imageUrl !== null) ?
                                <div className="caption__image">
                                    <img className="image__container"
                                        src={imageUrl} alt=""
                                    />
                                    
                            </div> : ""
                        }
                        <h1 className="caption__text">{caption.substring(0, 100)}
                            {
                                caption.length > 100 ? (" . . .")
                                    : ("")
                            }
                        </h1>
                    </div>
                    <div className="like__container">
                        <ThumbUp className={`img__button1 like__et__counter 
                                            ${liked ? "like__active1" : ""}`}
                            onClick={likedFunction}/>
                        <h1 className="like__counter like__et__counter">{likecounter}</h1>
                    </div>
                </div>
            </div>

            {/* If Post is Clicked Twice */}
            <PostCore liked={liked} setLiked={setLiked}
                hidden={hidden} setHidden={setHidden}
                postId={postId} username={username}
                imageUrl={imageUrl} content={content}
                caption={caption} likecounter={likecounter}
                setLikecounter={setLikecounter}
                postshidden={postshidden} setPostshidden={setPostshidden}
            />
            </div>
        
    )
}

export default Post