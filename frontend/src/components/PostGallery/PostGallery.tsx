import React from "react";
import {Post} from "../../model/Post";
import './PostGallery.css';
import PostCard from "../PostCard/PostCard";



type Props = {
    posts: Post[]
    addPost: (post: Post) => void
}

export default function PostGallery(props: Props) {
    return (
        <div className='post_gallery'>
            <div className="post_gallery-column">
                <h2>All Posts</h2>

                {
                    props.posts.map((post) => <PostCard key={post.id} post={post} />)
                }
            </div>
        </div>
    )
}

