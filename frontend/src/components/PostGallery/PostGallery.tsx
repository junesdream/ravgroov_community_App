import React from "react";
import {Post} from "../../model/Post";
import './PostGallery.css';
import PostCard from "../PostCard/PostCard";
import {Link} from "react-router-dom";


type Props = {
    posts: Post[]
    deletePost: (id: string) => void
}

export default function PostGallery(props: Props) {
    return (
        <div className='post_gallery'>

            <div className="post_gallery_container">
            <h1>What's NEW? <br/> Tell us something! </h1>
            <Link className="post_gallery_Btn" to="/posts/add">
                <button >Add Post</button>
            </Link>
            </div>

            {
                props.posts.map((post) => <PostCard key={post.id} post={post} deletePost={props.deletePost}/>)
            }

        </div>
    )
}