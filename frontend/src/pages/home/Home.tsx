import React from "react";
import './Home.css';
import Stories from "../../components/stories/Stories";
import PostGallery from "../../components/PostGallery/PostGallery";
import {Post} from "../../model/Post";

type Props = {
    posts: Post[]
    deletePost: (id: string) => void
    userDetails: string | undefined
}

export default function Home(props: Props) {



    return (
        <div className="home">
            <Stories userDetails={props.userDetails}/>
            <PostGallery posts={props.posts} deletePost={props.deletePost}/>
        </div>
    )
}