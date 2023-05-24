import React, {useEffect} from 'react';
import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import AddPost from "./components/AddPost/AddPost";
import PostDetail from "./components/PostDetail/PostDetail";
import UpdatePost from "./components/UpdatePost/UpdatePost";
import Login from "./pages/login/Login";
import useUser from "./hooks/useUser";
import usePosts from "./hooks/usePosts";
import Register from "./pages/register/Register";
import Layout from "./components/layout/Layout";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import ProtectedRoutes from "./ProtectedRoutes";


function App() {

    const {posts, addPost, updatePost, deletePost, loadAllPosts} = usePosts();
    const {user, isLoggedIn, login, createUser, logoutUser, isLoading, loadUser} = useUser();

    const authenticated = user !== undefined && user !== 'anonymousUser'

    useEffect(() => {
        if (user) {
            loadAllPosts();
        }
    }, [user, loadAllPosts]);

    return (
        <div className="App">
            <BrowserRouter>
                <Routes>

                    <Route element={<ProtectedRoutes user={user} isLoading={isLoading}/>}>
                    <Route
                        path="/"
                        element={
                            <Layout logoutUser={logoutUser} userDetails={user} />
                        }
                    >
                        <Route path="/" element={<Home posts={posts} deletePost={deletePost} userDetails={user}/>  }/>
                        <Route path="/profile/:id" element={<Profile  userDetails={user}/>}/>
                        <Route path="/posts/:id" element={<PostDetail deletePost={deletePost} />} />

                        <Route path="/posts/update/:id" element={<UpdatePost updatePost={updatePost}/>}/>
                        <Route path="/posts/add" element={<AddPost addPost={addPost}  userDetails={user}/>}/>
                    </ Route>
                    </Route>

                    <Route path="/register" element={<Register createUser={createUser}/>}/>
                    <Route path="/login" element={<Login onLogin={login}/>}/>
                </Routes>

            </BrowserRouter>
        </div>
    )

}

export default App;

