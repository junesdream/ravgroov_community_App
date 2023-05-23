import "./Register.css";
import {Link, useNavigate} from "react-router-dom";
import React, {ChangeEvent, FormEvent, useContext, useEffect, useState} from "react";
import {User, UserModel} from "../../model/User";


type createUserProps = {
    createUser: (user: UserModel) => Promise<boolean>;
};

export default function Register(props: createUserProps) {

    const initial: UserModel = {
        username: "",
        password: ""
    };

    const [user, setUser] = useState<UserModel>(initial);

    const navigate = useNavigate();

    function onChange(event: ChangeEvent<HTMLInputElement>) {
        const targetName: string = event.target.name;
        const value: string = event.target.value;
        setUser({
            ...user,
            [targetName]: value
        });
    }


  /*     function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (user.username && user.password) {
            props.createUser(user).then((success) => {
                if (success) {
                    setUser(initial);
                    navigate("/");
                } else {
                    console.log("Invalid");
                }
            });
        }
    }
*/
    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (user.username && user.password) {
            try {
                const success = await props.createUser(user);
                if (success) {
                    setUser(initial);
                    navigate("/");
                } else {
                    console.log("Invalid");
                }
            } catch (error) {
                console.log("Error:", error);
            }
        }
    }

    return (
        <div className="register">
            <div className="reg_card">
                <div className="reg_left">
                    <h1>Rave Groove Community</h1>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero
                        cum, alias totam numquam ipsa exercitationem dignissimos, error
                        nam, consequatur.
                    </p>
                    <span>Do you have an account?</span>
                    <Link to="/login">
                        <button>Login</button>
                    </Link>
                </div>
                <div className="reg_right">
                    <h1>Register</h1>

                    <form onSubmit={onSubmit}>
                        <input
                            name="username"
                            type="text"
                            placeholder="Username"
                            value={user.username}
                            onChange={onChange}
                        />
                        <input
                            name="password"
                            type="password"
                            placeholder="Password"
                            value={user.password}
                            onChange={onChange}
                        />
                        {/*<input name="url" type="file"  placeholder="Your image"  onChange={onFileChange}/>*/}
                        <button>Register</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
