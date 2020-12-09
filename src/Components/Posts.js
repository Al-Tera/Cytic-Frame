import React, {useState} from 'react'
import "./Posts.css"
import Post from "./Post"

function Posts({ posts }) {
    const [loading, setLoading] = useState(true)

    function loaded() {
        console.log("loaded")
        setLoading(false)
    }
    return (
        <div className="blank__slate">
            <div className="loading__background"></div>
            {
                loading ? (
                    <div className="post__loader">
                        <h1 className="text__loader">Loading</h1>
                        <div className="dots__container">
                    <span className="dot1 dot__loader">
                        <span className="dotL"></span>
                            </span>
                    <span className="dot2 dot__loader">
                    <span className="dotL"></span>
                        
                            </span>
                    <span className="dot3 dot__loader">
                    <span className="dotL"></span>
                        
                            </span>
                    <span className="dot4 dot__loader">
                    <span className="dotL"></span>
                        
                            </span>
                    <span className="dot5 dot__loader">
                    <span className="dotL"></span>
                        
                            </span>
                    <span className="dot6 dot__loader">
                    <span className="dotL"></span>
                        
                            </span>
                    <span className="dot7 dot__loader">
                    <span className="dotL"></span>
                        
                            </span>
                    <span className="dot8 dot__loader">
                    <span className="dotL"></span>
                        
                            </span>
                        </div>
                    </div>
                ) : ""}
            
            
            <div className={`posts__container ${loading ? "blur_effect" : ""}`}
                onLoad={() => setLoading(false)}>
            {
                posts.map((post) => (
                    <Post key={post.id} username={post.data.username} caption={post.data.caption} imageUrl={post.data.imageUrl} content={post.data.content}
                    />))
            }
            </div>
        </div>
    )
}   

export default Posts