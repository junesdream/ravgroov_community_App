import React, {useEffect, useState} from 'react';
import './App.css';
import axios from "axios";
import {Post, NewPost} from "./model/Post";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import PostGallery from "./components/PostGallery/PostGallery";
import AddPost from "./components/AddPost/AddPost";
import PostDetail from "./components/PostDetail/PostDetail";
import UpdatePost from "./components/UpdatePost/UpdatePost";


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

    function deletePost(id: string) {
        axios.delete("/api/posts/" + id)
            .then(() => {
                setPosts(posts.filter((post) => post.id !== id))
            })
            .catch((r) => {
                console.error(r)
            })
    }

    function updatePost(post: Post) {
        axios.put(`/api/posts/${post.id}`, post)
            .then((putPostResponse) => {
                setPosts(posts.map(currentPost => {
                    if (currentPost.id === post.id) {
                        return putPostResponse.data
                    } else {
                        return currentPost
                    }
                }))
            })
            .catch(console.error)
    }


    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/"/>

                    <Route path="/posts/:id" element={<PostDetail/>}/>
                    <Route path="/posts" element={<PostGallery posts={posts} deletePost={deletePost}/>}/>

                    <Route path="/posts/update/:id" element={<UpdatePost updatePost={updatePost}/>}/>
                    <Route path="/posts/add" element={<AddPost addPost={addPost}/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );

}

export default App;
