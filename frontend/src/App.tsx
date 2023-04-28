import React, {useEffect, useState} from 'react';
import './App.css';
import axios from "axios";
import {Post, NewPost} from "./model/Post";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import PostGallery from "./components/PostGallery/PostGallery";
import AddPost from "./components/AddPost/AddPost";
import PostDetail from "./components/PostDetail/PostDetail";


function App() {

    const [posts, setPosts] = useState<Post[]>([]);

    function allPosts() {
        axios.get("/api/posts")
            .then((response => {
                setPosts(response.data)
            }))
            .catch((error) => {
                console.error(error)
            })
    }

    function addPost(postToAdd: NewPost) {

        axios.post("/api/posts", postToAdd)
            .then((addPostResponse) => {

                setPosts([...posts, addPostResponse.data])
            })
            .catch((error) => {
                error("Unknown Error, try again later! " + error.response.statusText, {autoClose: 10000})
            })
    }

    useEffect(() => {
        allPosts()
    }, []);


    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/"/>

                    <Route path="/posts/:id" element={<PostDetail />} />
                    <Route path="/posts" element={<PostGallery posts={posts} addPost={addPost}/>}/>
                    <Route path="/posts/add" element={<AddPost addPost={addPost}/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );

}

export default App;
