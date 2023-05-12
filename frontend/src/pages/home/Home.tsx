import React from "react";
import './Home.css';
import Stories from "../../components/stories/Stories";
import PostGallery from "../../components/PostGallery/PostGallery";
import usePosts from "../../usePosts";


export default function Home() {

    const {posts, addPost, updatePost, deletePost, loadAllPosts} = usePosts();

    return (
        <div className="home">
            <Stories/>
            <PostGallery posts={posts} deletePost={deletePost}/>
        </div>
    )
}