import React from 'react'
import bgImage from '../utils/images/bg-image.jpg'
import Header from "./Header"
import { useState, useRef } from 'react'
import { checkValidData } from '../utils/validate.js'
import { auth } from "../utils/firebase"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth"
import { Eye, EyeOff , XCircle } from "lucide-react"
import { useDispatch } from "react-redux"
import { addUser } from "../utils/ReduxStore/userSlice"
import { USER_AVATAR } from "../utils/constants"



const Login = () => {
  const [isSignInForm, setSignInForm] = useState(true); // for using same signup signup form 
  const [errorMessage, setErrorMessage] = useState(null); // for displaying error message
  const [showPassword, setShowPassword] = useState(false); // for password showing(lucide)
  const dispatch = useDispatch();

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const toggleForm = () => {
    setSignInForm(!isSignInForm);
  }

  const handleButtonClick = () => {

    //Validate the email and password sent by user.
    const message = checkValidData(email.current.value, password.current.value);
    console.log(message);

    //Set the state variable with corresponding error message
    setErrorMessage(message);

    //If invalid(some error message), dont make new account of user, rather return
    if (message) return;

    //Otherwise make account for new user or login the existing user

    //Signin Logic

    // Once a user signs in or signs up , we get a user object(details of user+ access token) from firebase
    // we need to save this data in redux store for future use
    // as well as redirect to browse page

    if (isSignInForm) {
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          // Signed in  
          // Signed in succesfully, api returned good response
          // user object is returned, with a unique access token
          const user = userCredential.user;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage)
        });

    }

    // Sign up logic

    else {
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value) // Api call(function) to make a new account using email password
        .then((userCredential) => {
          // Signed up succesfully, api returned good response
          // user object is returned, with a unique access token
          // created account with email and password

          const user = userCredential.user;

          //called updateprofile api to add details like username and avatar
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: USER_AVATAR,
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser; /*reading the updated user object, not the old one.*/
              // user created with email password and added extra details like username avatar
              // save to redux store, dispatch action
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
            })
            .catch((error) => {
              setErrorMessage(error.message);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // didnt sign up,some error occurred, api returned bad response
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    }
  }

  return (
    <div className="relative min-h-screen w-full font-['Helvetica Neue','Arial','sans-serif']"> {/* Container for login page */}
      <Header />  {/* Header component at top */}

      {/* Background image */}
      <img
        src={bgImage}
        alt="background-image"
        className="h-screen w-full object-cover absolute top-0 left-0 z-0" />

      {/* SignIn/SignUp Form positioned below header */}
      <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center px-6 sm:px-12 md:px-20 lg:px-32 z-10"> {/* Centered form container */}
        <form
          onSubmit={(e) => { e.preventDefault(); }}
          className="w-full max-w-md bg-[#000000]/80 text-white p-6 sm:p-8 rounded-none shadow-[0_0_10px_rgba(0,0,0,0.75)]"> {/* Unified form layout */}

          {/* Top heading signin/signup */}
          <h2 className="font-bold text-3xl py-3 text-center">
            {isSignInForm ? "Sign In" : "Sign Up"}
          </h2>

          {/* Input field for full name , only visible for signup form */}
          {!isSignInForm && (
            <div className="relative my-6">
              <input
                ref={name}
                type="text"
                required
                className="peer w-full px-3 pt-6 pb-2 bg-[#333333] text-white border border-[#444] rounded-none placeholder-transparent focus:outline-none focus:ring-2 focus:ring-[#e50914]"
                placeholder="Full Name"
              />
              <label className="absolute left-3 top-2 text-sm text-[#b3b3b3] transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-[#aaa] peer-focus:top-2 peer-focus:text-sm peer-focus:text-[#e50914]">
                Full Name
              </label>
            </div>
          )}

          {/* Input field for email */}
          <div className="relative my-6">
            <input
              ref={email}
              type="email"
              required
              className="peer w-full px-3 pt-6 pb-2 bg-[#333333] text-white border border-[#444] rounded-none placeholder-transparent focus:outline-none focus:ring-2 focus:ring-[#e50914]"
              placeholder="E-mail"
            />
            <label className="absolute left-3 top-2 text-sm text-[#b3b3b3] transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-[#aaa] peer-focus:top-2 peer-focus:text-sm peer-focus:text-[#e50914]">
              E-mail
            </label>
          </div>

          {/* Password with Eye toggle */}
          <div className="relative my-6">
            <input
              ref={password}
              type={showPassword ? "text" : "password"}
              required
              className="peer w-full px-3 pt-6 pb-2 bg-[#333333] text-white border border-[#444] rounded-none placeholder-transparent focus:outline-none focus:ring-2 focus:ring-[#e50914] pr-10"
              placeholder="Password"
            />
            <label className="absolute left-3 top-2 text-sm text-[#b3b3b3] transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-[#aaa] peer-focus:top-2 peer-focus:text-sm peer-focus:text-[#e50914]">
              Password
            </label>
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white hover:text-[#e50914]"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* SignIn/SignUp Button */}
          <button
            onClick={handleButtonClick}
            className="py-3 my-4 bg-[#e50914] text-white w-full font-bold uppercase tracking-wide hover:bg-[#f6121d] transition-all rounded-none">
            {isSignInForm ? "Sign In" : "Sign Up"}
          </button>

          {/* Error Message Display*/}
          {errorMessage && (
            <div className="flex items-center gap-2 border border-[#b92d2b] text-[#b92d2b] px-3 py-2 text-sm font-medium mt-2 rounded">
            <XCircle size={16} className="text-[#b92d2b] flex-shrink-0" />
            <span>{errorMessage}</span>
            </div>
          )}

          {/*Bottom line to toggle signin/signup form*/}
          <p className="py-3 text-sm text-white text-center cursor-pointer hover:underline" onClick={toggleForm}>
            {isSignInForm
              ? "New to Netflix? Sign Up Now"
              : "Already registered? Sign In Now."}
          </p>

        </form>
      </div>
    </div>
  );
}

export default Login;