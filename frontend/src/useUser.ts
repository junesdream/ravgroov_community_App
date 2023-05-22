import {useState, useEffect} from "react";
import axios from "axios";
import {toast} from "react-toastify";
import {User, UserModel} from "./model/User";



export default function useUser() {
    const [user, setUser] = useState<string>();
    const [checkLoggedInUser, setCheckLoggedInUser] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [loadUser, setLoadUser] = useState<User>();

    useEffect(() => {
        function checkLoggedInUser() {
            axios
                .get("/api/users/me")
                .then((response) => {
                    if (response.data && response.data !== "anonymousUser") {
                        setUser(response.data);
                    }
                })
                .catch((r) => {
                    toast.error("Error checking logged-in user:");
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }

        checkLoggedInUser();
    }, []);


    useEffect(() => {
        if (user) {
            getLoadUser(user);
        }
    }, [user]);


  function login(username: string, password: string) {
        return axios.post("/api/users/login", undefined, {auth: {username, password}})
            .then(response => {
                setUser(response.data);
                toast.success("Login Successful!");
            })
            .catch((error) => {
                toast.error("Login Failed: Please check your username and password.");
        });
    }



    function logout() {
        axios.post("/api/users/logout")
            .then(() => {
                setUser(undefined);
                toast.success("Logout Successful!");
            })
            .catch((error) => {
                toast.error("Logout failed:");
            });
    }

    const createUser = async (newUser: UserModel) => {
        return await axios.post("/api/users/signup", newUser, {
            withCredentials: true
        }).then((response) => {
            setUser(response.data)
            return true;
        }).catch((error) => {
            console.error(error);
            return false;
        })
    }

    const getLoadUser = async (username: string) => {
        return await axios.get("/api/users/${username}", {
            withCredentials: true
        }).then((response) => {
            setUser(response.data)

        }).catch((error) => {
            console.error(error);
        })
    }

    function logoutUser() {
        return new Promise<void>((resolve) => {
            logout();
            resolve();
        });
    }



    return {user, login, checkLoggedInUser, isLoading, createUser, loadUser, logoutUser}
}