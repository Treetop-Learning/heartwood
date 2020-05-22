import React, { useState } from "react";
import { Link } from "@reach/router";

const PasswordReset = () => {
  const [email, setEmail] = useState("");
  const [emailHasBeenSent, setEmailHasBeenSent] = useState(false);
  const [error, setError] = useState(null);
  const onChangeHandler = event => {
    const { name, value } = event.currentTarget;
    if (name === "userEmail") {
      setEmail(value);
    }
  };
  const sendResetEmail = event => {
    event.preventDefault();
  };
  return (
    <div className="w-screen h-screen overflow-visible bg-base">
    <div className="pt-24 font-mono">
    <div className="w-11/12 px-4 py-8 mx-auto bg-white rounded-xl md:w-1/2 md:px-12 ">
      <h1 className="pt-4 mb-3 text-3xl font-bold text-center">
        Reset your Password
      </h1>
      <div className="w-11/12 py-8 mx-auto rounded-xl md:w-3/4 ">
        <form action="">
          {emailHasBeenSent && (
            <div className="w-full py-3 mb-3 text-center text-white bg-green-400">
              An email has been sent to you!
            </div>
          )}
          {error !== null && (
            <div className="w-full py-3 mb-3 text-center text-white bg-red-600">
              {error}
            </div>
          )}
          <label htmlFor="userEmail" className="block w-full">
            Email:
          </label>
          <input
            type="email"
            name="userEmail"
            id="userEmail"
            value={email}
            placeholder="Input your email"
            onChange={onChangeHandler}
            className="w-full px-1 py-2 mb-3"
          />
          <button
            className="w-full py-3 text-white duration-100 ease-in-out bg-blue-500 rounded-lg hover:bg-blue-400"
          >
            Send me a reset link
          </button>
        </form>
        <Link
         to ="signin"
          className="block my-2 text-center text-blue-700 hover:text-blue-800"
        >
          &larr; back to sign in page
        </Link>
      </div>
    </div>
    </div>
    </div>
  );
};
export default PasswordReset;