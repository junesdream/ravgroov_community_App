import React, {useEffect, useState} from 'react';
import './App.css';
import axios from "axios";
import {Post, NewPost} from "./model/Post";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import PostGallery from "./components/PostGallery/PostGallery";
import AddPost from "./components/AddPost/AddPost";
import PostDetail from "./components/PostDetail/PostDetail";
import UpdatePost from "./components/UpdatePost/UpdatePost";
import Login from "./pages/login/Login";
import useUser from "./useUser";
import usePosts from "./usePosts";
import Register from "./pages/register/Register";


function App() {
    const {user, login } = useUser();
    const {posts, addPost, updatePost, deletePost} = usePosts();


    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/"/>
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login onLogin={login}/>}/>

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
