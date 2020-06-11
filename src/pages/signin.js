import React, { useState, useContext, useEffect } from "react"
import { Link } from "gatsby"

import { navigate } from "gatsby"

import { HeartwoodStateContext, HeartwoodDispatchContext } from "../state/HeartwoodContextProvider"

import {
  auth,
  signInWithGoogle,
  signInWithGitHub,
  prepareUserInformation,
} from "../firebase/firebase"

import gear from "../assets/gear.svg"

import LoadingAnimation from "../components/loadinganimation"

import { library } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { faGoogle, faGithub } from "@fortawesome/free-brands-svg-icons"

library.add(faGoogle, faGithub)

const SignIn = () => {
  const [form, setForm] = useState({ email: "", password: "", error: null, isLoading: true })

  const state = useContext(HeartwoodStateContext)
  const dispatch = useContext(HeartwoodDispatchContext)

  // deal with an already registered user
  const signInWithEmailAndPasswordHandler = (event, email, password) => {
    event.preventDefault()
    setForm({ ...form, isLoading: true })

    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => {
        setForm({ ...form, isLoading: false })
        setForm({ ...form, error: "Error signing in with password and email" })
        // set the current logged in user to the returning user
      })
      .then((result) => {
        if (result) {
          prepareUserInformation(result.user).then(function (res) {
            result.user.getIdToken().then((idToken) => {
              dispatch({ type: "LOGIN", user: res, idt: idToken })
              navigate("/")
            })
          })
        }
      })
  }

  const onChangeHandler = (event) => {
    const { name, value } = event.currentTarget

    if (name === "userEmail") {
      setForm({ ...form, email: value })
    } else if (name === "userPassword") {
      setForm({ ...form, password: value })
    }
  }

  const validateInputs = () => {
    if (form.email === "" || form.password === "") {
      setForm({ ...form, error: "Error signing up with email and password" })
      return false
    }
    return true
  }

  const submitForm = (event) => {
    if (validateInputs()) {
      signInWithEmailAndPasswordHandler(event, form.email, form.password)
    }
  }

  // the provider sign-in
  useEffect(() => {
    auth
      .getRedirectResult()
      .then((result) => {
        if (result.user) {
          prepareUserInformation(result.user).then(function (res) {
            result.user.getIdToken().then((idToken) => {
              dispatch({ type: "LOGIN", user: res, idt: idToken })
              navigate("/")
            })
          })
        } else {
          setForm({ ...form, isLoading: false })
        }
      })
      .catch((error) => {
        setForm({ ...form, isLoading: false })
        if (error.code === "auth/account-exists-with-different-credential") {
          setForm({ ...form, error: "An account already exists under that email address" })
        }
      })
  }, [])

  return (
    <div className="w-screen min-h-screen pb-20 bg-base">
      {form.isLoading && (
        <div className="flex self-center justify-center w-screen h-screen ">
          {" "}
          <LoadingAnimation data={gear} />
        </div>
      )}
      <div className="pt-24 font-mono">
        {!form.isLoading && (
          <div className="w-11/12 px-6 py-8 mx-auto bg-white rounded-xl md:w-3/4 lg:w-1/2 md:px-12">
            <h1 className="pt-4 mb-2 text-3xl font-bold text-center">Sign in</h1>
            {form.error !== null && (
              <div className="w-full py-4 mb-3 text-center text-white bg-red-600 rounded-lg">
                {form.error}
              </div>
            )}
            <form className="">
              <label htmlFor="userEmail" className="block">
                Email:
              </label>
              <input
                required
                type="email"
                className="w-full p-1 my-1 border rounded-md"
                name="userEmail"
                value={form.email}
                placeholder="treetoplearner@gmail.com"
                id="userEmail"
                onChange={(event) => onChangeHandler(event)}
              />
              <label htmlFor="userPassword" className="block">
                Password:
              </label>

              <input
                required
                type="password"
                className="w-full p-1 mt-1 mb-3 border rounded-md"
                name="userPassword"
                value={form.password}
                placeholder="Your Password"
                id="userPassword"
                onChange={(event) => onChangeHandler(event)}
              />

              <button
                type="submit"
                className="w-full py-2 text-white transition duration-100 ease-in-out rounded-md bg-base hover:bg-green-700 focus:shadow-outline-indigo"
                onClick={(event) => submitForm(event)}
              >
                Sign in
              </button>
            </form>
            <p className="my-3 text-center">or</p>
            <button
              className="relative flex items-center w-full py-2 text-white transition duration-100 ease-in-out bg-blue-500 rounded-md focus:shadow-outline-red hover:bg-blue-600"
              onClick={() => {
                signInWithGoogle()
              }}
            >
              <FontAwesomeIcon
                icon={faGoogle}
                className="absolute left-0 ml-3 text-lg align-baseline"
              />
              <p className="w-full"> Sign in with Google </p>
            </button>
            <button
              className="relative flex items-center w-full py-2 mt-2 text-white transition duration-100 ease-in-out bg-black rounded-md focus:shadow-outline-red hover:bg-gray-800"
              onClick={() => signInWithGitHub()}
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
              <Link to="/passwordreset" className="text-blue-500 hover:text-blue-600">
                Forgot Password?
              </Link>
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default SignIn
