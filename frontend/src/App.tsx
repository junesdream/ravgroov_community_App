import React, {useEffect} from 'react';
import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import AddPost from "./components/AddPost/AddPost";
import PostDetail from "./components/PostDetail/PostDetail";
import UpdatePost from "./components/UpdatePost/UpdatePost";
import Login from "./pages/login/Login";
import useUser from "./useUser";
import usePosts from "./usePosts";
import Register from "./pages/register/Register";
import Layout from "./components/layout/Layout";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";



function App() {

    const {posts, addPost, updatePost, deletePost, loadAllPosts} = usePosts();

    const {user, checkLoggedInUser, login, createUser, logoutUser} = useUser();

    useEffect(() => {
        if (user) {
            loadAllPosts();
        }
    }, [user, loadAllPosts]);

    return (
        <div className="App">
            <BrowserRouter>
                <Routes>

                    {/*<Route element={<ProtectedRoutes user={user} isLoading={isLoading}/>}>*/}

                    <Route
                        path="/"
                        element={
                            <Layout />
                        }
                    >
                        <Route path="/" element={<Home posts={posts} deletePost={deletePost}/> }/>
                        <Route path="/profile/:id" element={<Profile/>}/>
                        <Route path="/posts/:id" element={<PostDetail deletePost={deletePost} />} />

                        <Route path="/posts/update/:id" element={<UpdatePost updatePost={updatePost}/>}/>
                        <Route path="/posts/add" element={<AddPost addPost={addPost}/>}/>

                    </ Route>

              {/*     <Route path="/posts/:id" element={<PostDetail deletePost={deletePost} />}/>
                    <Route path="/posts" element={<PostGallery posts={posts} deletePost={deletePost}/>}/>

                    <Route path="/posts/update/:id" element={<UpdatePost updatePost={updatePost}/>}/>
                    <Route path="/posts/add" element={<AddPost addPost={addPost}/>}/>
               */}
                    {/*</Route>*/}


                    <Route path="/register" element={<Register createUser={createUser}/>}/>
                    <Route path="/login" element={<Login onLogin={login}/>}/>
                </Routes>

            </BrowserRouter>
        </div>
    )

}

export default App;

