import React from "react";
import './Profile.css'
import {Link} from "react-router-dom";
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PostGallery from "../../components/PostGallery/PostGallery";
import usePosts from "../../hooks/usePosts";

export default function Profile() {

    const {posts, deletePost} = usePosts();

    return (
        <div className="profile">
            <div className="profile_images">
                <img
                    src="https://images.pexels.com/photos/1190299/pexels-photo-1190299.jpeg?auto=compress&cs=tinysrgb&w=1200"
                    alt=""
                    className="cover"
                />
                <img
                    src="https://images.pexels.com/photos/3903092/pexels-photo-3903092.jpeg?auto=compress&cs=tinysrgb&w=1200"
                    alt="DJ"
                    className="profilePic"
                />
            </div>
            <div className="profile_container">
                <div className="profile_info">
                    <div className="profile_info_left">
                        <a href="https://facebook.com://facebook.com">
                            <FacebookTwoToneIcon fontSize="large"/>
                        </a>
                        <a href="https://instagram.com">
                            <InstagramIcon fontSize="large"/>
                        </a>
                        <a href="https://twitter.com">
                            <TwitterIcon fontSize="large"/>
                        </a>
                        <a href="https://linkedin.com">
                            <LinkedInIcon fontSize="large"/>
                        </a>
                    </div>
                    <div className="profile_center">
                        <span>Beat Life</span>
                        <div className="profile_center_info">
                            <div className="profile_center_item">
                                <PlaceIcon/>
                                <span>Germany</span>
                            </div>
                            <div className="profile_center_item">
                                <LanguageIcon/>
                                <span>RA</span>
                            </div>
                        </div>
                        <div className="profile_add_post_btn">
                        <button>Follow</button>

                            <Link to="/posts/add">
                                <button>Add Post</button>
                            </Link>
                        </div>
                    </div>

                    <div className="profile_right">
                        <EmailOutlinedIcon/>
                        <MoreVertIcon/>

                    </div>

                </div>
                <PostGallery posts={posts} deletePost={deletePost}/>
            </div>
        </div>
    )
}