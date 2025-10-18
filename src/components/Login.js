import React from 'react'
import bgImage from '../utils/images/bg-image.jpg'
import Header from "./Header"
import {useState ,useRef} from 'react'
import {checkValidData} from '../utils/validate.js'
import { auth } from "../utils/firebase"
import { createUserWithEmailAndPassword , signInWithEmailAndPassword , updateProfile} from "firebase/auth";
import { Eye ,EyeOff } from "lucide-react" ;
import { useDispatch } from "react-redux";
import { addUser } from "../utils/ReduxStore/userSlice";
import { USER_AVATAR } from "../utils/constants";

const Login = () => {
  const [isSignInForm ,setSignInForm] = useState(true); // for using same signup signup form 
  const [errorMessage , setErrorMessage] = useState(null); // for displaying error message
  const [showPassword ,setShowPassword ] = useState(false); // for password showing(lucide)
  const dispatch = useDispatch();


  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const toggleForm = ()=>{
    setSignInForm(!isSignInForm);
  }

  const handleButtonClick = ()=>{

    //Validate the email and password sent by user.
    const message = checkValidData(email.current.value , password.current.value);
    console.log(message);

    //Set the state variable with corresponding error message
    setErrorMessage(message);

    //If invalid(some error message), dont make new account of user, rather return
    if(message) return;

    //Otherwise make account for new user or login the existing user

    //Signin Logic

    // Once a user signs in or signs up , we get a user object(details of user+ access token) from firebase
    // we need to save this data in redux store for future use
    // as well as redirect to browse page

    if(isSignInForm){
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

    else{
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
    <div className="relative min-h-screen w-full"> {/* Container for login page */}
      <Header />  {/* Header component at top */}

      {/* Background image */}
      <img 
      src={bgImage} 
      alt="background-image"
      className="h-screen w-full object-cover">
      </img>

      
      {/* SignIn/SignUp Form at middle */}

      <div className="absolute inset-0 flex justify-center items-center"> {/* FOR RESPONSIVENESS */}
        <form 
        onSubmit = {(e)=>{e.preventDefault();}}
        className="w-[90%] sm:w-[70%] md:w-[40%] lg:w-[25%] bg-black bg-opacity-80 text-white p-6 sm:p-8 rounded-lg shadow-lg">

        {/* Top heading signin/signup */}
        <h2 
        className="font-bold text-2xl sm:text-3xl py-3 text-center">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h2>

        {/* Input field for full name , only visible for signup form */}
        { !isSignInForm && (
        <input 
        ref={name}
        placeholder='Full Name' 
        type="text" 
        className="p-3 my-3 w-full bg-gray-700 rounded-md placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500">
        </input> )} 

        {/* Input field for email */}
        <input 
        ref = {email}
        placeholder='E-mail' 
        className="p-3 my-3 w-full bg-gray-700 rounded-md placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500">
        </input>


        {/* Password with Eye toggle */}
      <div className="relative my-3 w-full">  { /*make it parent so that it can become relative of eye button .*/ }
        <input
          ref={password}
          placeholder="Password"
          type={showPassword ? "text" : "password"}
          className="w-full p-3 bg-gray-700 text-white placeholder-gray-300 rounded-md 
               focus:outline-none focus:ring-2 focus:ring-red-500 pr-10"
        />

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-white"
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div> 

      {/* SignIn/SignUp Button */}
        <button onClick={handleButtonClick}
        className="p-3 sm:p-4 my-4 bg-red-700 w-full rounded-md hover:bg-red-800 active:scale-95 transition-all">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>

        {/* Error Message Display*/}
        <p className="text-red-500 font-bold text-sm sm:text-base py-2 text-center" >
          {errorMessage}
        </p>

        {/*Bottom line to toggle signin/signup form*/}
        <p className="py-3 text-sm sm:text-base text-center cursor-pointer hover:underline" onClick={toggleForm}>
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
