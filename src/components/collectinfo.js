import React, { useState, useContext, useEffect } from "react"

import { HeartwoodStateContext, HeartwoodDispatchContext } from "../state/HeartwoodContextProvider"
import { isLoggedIn } from "../utils/utils"
import { firestore } from "../firebase/firebase"

const CollectInfo = () => {
  const dispatch = useContext(HeartwoodDispatchContext)
  const state = useContext(HeartwoodStateContext)

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    dateOfBirth: "",
    message: null,
  })

  const onChangeHandler = (event) => {
    const { name, value } = event.currentTarget

    if (name === "userFirstName") {
      setForm({ ...form, firstName: value })
    } else if (name === "userLastName") {
      setForm({ ...form, lastName: value })
    } else if (name === "userName") {
      setForm({ ...form, userName: value })
    } else if (name === "dateOfBirth") {
      setForm({ ...form, dateOfBirth: value })
    }
  }

  // Read all inputs and update the user in session state and in the firestore
  const updateProfile = () => {
    // update the information in firestore
    try {
      firestore.collection("users").doc(state.user.uid).update({
        firstName: form.firstName,
        lastName: form.lastName,
        userName: form.userName,
        dateOfBirth: form.dateOfBirth,
      })

      // update the user that will be stored in state then save the user
      const updatedUser = {
        ...state.user,
        firstName: form.firstName,
        lastName: form.lastName,
        userName: form.userName,
        dateOfBirth: form.dateOfBirth,
      }

      dispatch({ type: "UPDATE", user: updatedUser })
    } catch (error) {
      setForm({ ...form, error: error })
    }

    // Hide the successfully sent notification after 3 seconds
    setTimeout(() => {
      setForm({ ...form, message: null })
    }, 3000)
  }

  const validateInputs = () => {
    if (
      form.firstName === "" ||
      form.lastName === "" ||
      form.userName === "" ||
      form.dateOfBirth === ""
    ) {
      setForm({ ...form, message: "Please fill out all required fields" })
      return false
    }
    return true
  }

  const submitForm = (event) => {
    if (validateInputs()) {
      updateProfile()
    }
  }

  useEffect(() => {
    if (isLoggedIn(state.user)) {
      // On load, set all the inputs to the user's current preferences
      setForm({
        ...form,
        firstName: state.user.firstName,
        lastName: state.user.lastName,
        userName: state.user.userName,
        dateOfBirth: state.user.dateOfBirth,
      })
    }
  }, [state.user])

  return (
    <div className="flex flex-col w-auto h-auto bg-base">
      <div className="pt-24 font-mono">
        <div className="w-11/12 px-6 py-8 mx-auto bg-white rounded-xl md:w-3/4 lg:w-1/2 md:px-12">
          <h1 className="pt-4 mb-2 text-3xl font-bold text-center">Additional Information</h1>
          {form.message && (
            <div className="w-full py-4 mb-3 text-center text-white bg-red-600 rounded-lg">
              {form.message}
            </div>
          )}
          <h1 className="w-full py-4 mb-3 text-center ">
            Welcome to Treetop Learning! Before continuing we need a little bit more information...
          </h1>

          <form className="">
            <label htmlFor="userFirstName" className="block">
              First name:
            </label>
            <input
              required
              type="text"
              className="w-full p-1 my-1 border rounded-md"
              name="userFirstName"
              id="userFirstName"
              value={form.firstName}
              onChange={(event) => onChangeHandler(event)}
            />
            <label htmlFor="userLastName" className="block">
              Last name:
            </label>

            <input
              required
              type="text"
              className="w-full p-1 my-1 border rounded-md"
              name="userLastName"
              id="userLastName"
              value={form.lastName}
              onChange={(event) => onChangeHandler(event)}
            />
            <label htmlFor="userName" className="block">
              Username:
            </label>

            <input
              required
              type="text"
              className="w-full p-1 my-1 border rounded-md"
              name="userName"
              id="userName"
              value={form.userName}
              onChange={(event) => onChangeHandler(event)}
            />

            <label htmlFor="dateOfBirth" className="block">
              Date of birth:
            </label>

            <input
              required
              type="date"
              className="w-full p-1 mt-1 mb-10 border rounded-md"
              name="dateOfBirth"
              id="dateOfBirth"
              value={form.dateOfBirth}
              onChange={(event) => onChangeHandler(event)}
            />

            <button
              type="submit"
              className="w-full py-2 text-white transition duration-100 ease-in-out rounded-md bg-base hover:bg-green-700 focus:shadow-outline-indigo"
              onClick={(event) => submitForm(event)}
            >
              Continue
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CollectInfo
