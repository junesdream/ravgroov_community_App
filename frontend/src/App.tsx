import React, {useEffect, useState} from 'react';
import './App.css';
import axios from "axios";
import {Post} from "./model/Post";

function App() {

    const [posts, setPosts] = useState<Post[]>([]);

    function allPosts() {
        axios.get("api/posts")
            .then((response => {
                setPosts(response.data)
            }))
            .catch((error) => {
                console.error(error)
            })
    }

    useEffect(() => {
        allPosts()
    }, []);


    return (
        <div className="App">

            <div className="post-list">
                <h2>Post</h2>
                {posts.map((post) => (
                    <div key={post.id}>
                        <p>{post.title} </p>
                        <p>{post.userId} </p>
                        <p>{post.userName} </p>
                        <p>{post.postImg} </p>
                        <p>{post.like} </p>
                    </div>
                ))}
            </div>

        </div>
    );

}

export default App;
