import React, { useState } from "react";
import { Link } from "@reach/router";
import { signInWithGoogle, generateUserDocument } from "../firebase/firebase";
import { auth } from "../firebase/firebase";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faGoogle, faGithub } from "@fortawesome/free-brands-svg-icons";

library.add(faGoogle, faGithub);

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState(null);

  // generate a new document for a new user
  const createUserWithEmailAndPasswordHandler = async (
    event,
    email,
    password
  ) => {
    event.preventDefault();
    try {
      console.log(email, password);
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      generateUserDocument(user, { displayName });
    } catch (error) {
      setError("Error Signing up with email and password");
    }
    setEmail("");
    setPassword("");
    setDisplayName("");
  };

  const onChangeHandler = (event) => {
    const { name, value } = event.currentTarget;
    if (name === "userEmail") {
      setEmail(value);
    } else if (name === "userPassword") {
      setPassword(value);
    } else if (name === "displayName") {
      setDisplayName(value);
    }
  };
  return (
    <div className="w-screen h-screen overflow-visible bg-base">
      
      <div className="pt-24 font-mono">
        <div className="w-11/12 px-4 py-8 mx-auto bg-white rounded rounded-xl md:w-2/4 md:px-12">
          <h1 className="mb-2 text-3xl font-bold text-center">Sign Up</h1>
          {error !== null && (
            <div className="w-full py-4 mb-3 text-center text-white bg-red-600 rounded-lg">
              {error}
            </div>
          )}
          <form className="">
            <label htmlFor="displayName" className="block">
              Display Name:
            </label>
            <input
              type="text"
              className="w-full p-1 my-1 "
              name="displayName"
              value={displayName}
              placeholder="E.g: Faruq"
              id="displayName"
              onChange={(event) => onChangeHandler(event)}
            />
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
              className="w-full py-2 text-white duration-100 ease-in-out rounded-md bg-base hover:bg-green-700 focus:shadow-outline-indigo"
              onClick={(event) => {
                createUserWithEmailAndPasswordHandler(event, email, password);
              }}
            >
              Sign up
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
            onClick={() => signInWithGoogle()}
          >
            <FontAwesomeIcon
                icon={faGithub}
                className="absolute left-0 ml-3 text-lg align-baseline"
              />
          <p className="w-full"> Sign up with GitHub </p>
          </button>
          <p className="my-3 text-center">
            Already have an account?{" "}
            <Link to="signin" className="text-blue-500 hover:text-blue-600">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
export default SignUp;
