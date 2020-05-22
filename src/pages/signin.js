import React, { useState, useContext, useEffect } from "react";
import { Link } from "gatsby";
import firebase from "firebase/app";
import { signInWithGoogle } from "../firebase/firebase";
import { auth } from "../firebase/firebase";

import { navigate } from "@reach/router"

import {
  HeartwoodStateContext,
  HeartwoodDispatchContext,
} from "../state/HeartwoodContextProvider";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faGoogle, faGithub } from "@fortawesome/free-brands-svg-icons";

import ProfilePage from "../components/profilepage"

library.add(faGoogle, faGithub);

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const state = useContext(HeartwoodStateContext);
  const dispatch = useContext(HeartwoodDispatchContext);

  // deal with an already registered user
  const signInWithEmailAndPasswordHandler = (event, email, password) => {
    event.preventDefault();
    auth.signInWithEmailAndPassword(email, password).catch((error) => {
      setError("Error signing in with password and email");
      console.error("Error signing in with password and email", error);
    });
   
  };

  const onChangeHandler = (event) => {
    const { name, value } = event.currentTarget;

    if (name === "userEmail") {
      setEmail(value);
    } else if (name === "userPassword") {
      setPassword(value);
    }
  };

  useEffect(() => {
    firebase.auth().getRedirectResult().then(result => {
      if (result.user) {
        dispatch({ type: "LOGIN", user: result.user });
        navigate('/');
      }
     });
  }, [])

  return (
    <div className="w-screen h-screen overflow-visible bg-base">
    <div className="pt-24 font-mono">
      <div className="w-11/12 px-4 py-8 mx-auto bg-white rounded-xl md:w-2/4 md:px-12">
        <h1 className="pt-4 mb-2 text-3xl font-bold text-center">Sign in</h1>
        {error !== null && (
          <div className="w-full py-4 mb-3 text-center text-white bg-red-600 rounded-xl">
            {error}
          </div>
        )}
        <form className="">
          <label htmlFor="userEmail" className="block">
            Email:
          </label>
          <input
            type="email"
            className="w-full p-1 my-1"
            name="userEmail"
            value={email}
            placeholder="E.g: faruq123@gmail.com"
            id="userEmail"
            onChange={(event) => onChangeHandler(event)}
          />
          <label htmlFor="userPassword" className="block">
            Password:
          </label>
          <input
            type="password"
            className="w-full p-1 mt-1 mb-3"
            name="userPassword"
            value={password}
            placeholder="Your Password"
            id="userPassword"
            onChange={(event) => onChangeHandler(event)}
          />
          <button
            className="w-full py-2 text-white transition duration-100 ease-in-out rounded-md bg-base hover:bg-green-700 focus:shadow-outline-indigo"
            onClick={(event) => {
              signInWithEmailAndPasswordHandler(event, email, password);
            }}
          >
            Sign in
          </button>
        </form>
        <p className="my-3 text-center">or</p>
        <button
          className="relative flex items-center w-full py-2 text-white transition duration-100 ease-in-out bg-blue-500 rounded-md focus:shadow-outline-red hover:bg-blue-600"
          onClick={() => signInWithGoogle()}
        >
          <FontAwesomeIcon
                icon={faGoogle}
                className="absolute left-0 ml-3 text-lg align-baseline"
              />
          <p className="w-full"> Sign in with Google </p>
        </button>
        <button
          className="relative flex items-center w-full py-2 mt-2 text-white transition duration-100 ease-in-out bg-black rounded-md focus:shadow-outline-red hover:bg-gray-800"
          onClick={() => signInWithGoogle() }
        >
          <FontAwesomeIcon
                icon={faGithub}
                className="absolute left-0 ml-3 text-lg align-baseline"
              />
          <p className="w-full"> Sign in with GitHub </p>
        </button>
        <p className="my-3 text-center">
          Don't have an account?{" "}
          <Link to="signup" className="text-blue-500 hover:text-blue-600">
            Sign up here
          </Link>{" "}
          <br />{" "}
          <Link
            to="/passwordreset"
            className="text-blue-500 hover:text-blue-600"
          >
            Forgot Password?
          </Link>
        </p>
      </div>
    </div>
    </div>
  );
};
export default SignIn;
