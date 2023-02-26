import React, { Fragment, useState } from "react";

import Button from "../UI/Button";

import classes from "./RegisterForm.module.css";

const RegisterForm = (props) => {
    // Set up variable states
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [residenceCity, setResidenceCity] = useState("");
    const [residenceState, setResidenceState] = useState("");

    // Live updates text as user types
    const firstNameChangeHandler = (e) => {
        setFirstName(e.target.value);
    }
    const lastNameChangeHandler = (e) => {
        setLastName(e.target.value);
    }
    const usernameChangeHandler = (e) => {
        setUsername(e.target.value);
    }
    const passwordChangeHandler = (e) => {
        setPassword(e.target.value);
    }
    const cityChangeHandler = (e) => {
        setResidenceCity(e.target.value);
    }
    const stateChangeHandler = (e) => {
        setResidenceState(e.target.value);
    }

    const handleRegister = (e) => {
        e.preventDefault();
        let state = {
            first_name: firstName,
            last_name: lastName,
            username: username,
            password: password,
            residence_city: residenceCity,
            residence_state: residenceState
        }
        console.log(JSON.stringify(state));
        fetch("http://localhost:5000/register", {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(state)
        }).then((result) => {
            console.log(result)
        })
    }

    const buttonClick = () => {
        console.log("clicked");
    }

    return (
        <Fragment>
            <div className={classes.input}>
                <form onSubmit={handleRegister}>
                    <label htmlFor="firstName">First Name</label>
                    <input
                        id="firstName"
                        type="text"
                        placeholder="John"
                        onChange={firstNameChangeHandler}
                        value={firstName}
                    ></input>
                    <label htmlFor="lastName">Last Name</label>
                    <input
                        id="lastName"
                        type="text"
                        placeholder="Snow"
                        onChange={lastNameChangeHandler}
                        value={lastName}
                    ></input>
                    <label htmlFor="username">Username</label>
                    <input
                        id="username"
                        type="text"
                        placeholder="xXDinosaur123Xx"
                        onChange={usernameChangeHandler}
                        value={username}
                    ></input>
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="text"
                        placeholder="123456"
                        onChange={passwordChangeHandler}
                        value={password}
                    ></input>
                    <label htmlFor="residenceCity">City of Residence</label>
                    <input
                        id="residenceCity"
                        type="text"
                        placeholder="New York City"
                        onChange={cityChangeHandler}
                        value={residenceCity}
                    ></input>
                    <label htmlFor="firstName">State of Residence</label>
                    <input
                        id="residenceState"
                        type="text"
                        placeholder="NY"
                        onChange={stateChangeHandler}
                        value={residenceState}
                    ></input>
                    <Button onClick={buttonClick} type="submit">Register</Button>
                </form>
            </div>
        </Fragment>
    )
}

export default RegisterForm;