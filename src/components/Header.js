import { useDispatch,useSelector } from 'react-redux';
import { onAuthStateChanged , signOut } from "firebase/auth";
import { useEffect } from "react"
import { addUser, removeUser } from "../utils/ReduxStore/userSlice"
import { auth } from "../utils/firebase"
import { useNavigate } from 'react-router-dom';
import { NETFLIX_LOGO } from '../utils/constants';
// import { ToggleGpt } from "../utils/ReduxStore/GptSlice";
// import { SUPPORTED_LANGUAGE } from "../utils/LanguageConstants";
// import { changeLanguage } from "../utils/ReduxStore/MultiLanguageSlice";
// import { changeTheme } from "../utils/ReduxStore/ThemeSlice";
// import { Sun, Moon } from "lucide-react";



const Header = () => {
  const dispatch = useDispatch(); // dispatch action for redux store
  const navigate = useNavigate(); // navigate, redirect between pages
  const user = useSelector((store) => store.user); // subscribe to user slice

  const handleSignOut = () => {
    signOut(auth) //call signout api to sign user out
      .then(() => {}) //dont need to dispatch action and navigate, it is already done by onauthstatechanged
      .catch((error) => {
        navigate("/error");
      });
  };

      useEffect(()=>{
          const unsubscribe = onAuthStateChanged(auth, (user) => {
          if (user) {
          // User is signed in, see docs for a list of available properties

          // https://firebase.google.com/docs/reference/js/auth.user
      
          const { uid ,email ,displayName, photoURL} = user;
  
          dispatch(addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })) ;
//always redirect to browse page if user is signed in, tries to go to login page, then also redirect to browse page

          navigate("/browse");
          } else {
              // User is signed out
              dispatch(removeUser()) ;
              navigate("/");
          }});

      // Unsubscribe when component unmounts
      return () => unsubscribe();
      },[])

  // const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
  
  return (
    
    <div className="absolute">

    {/*Netflix logo */}
    <img 
        src={NETFLIX_LOGO}
        alt = "Netflix-logo"
        className='w-44 px-8 py-2'
    >
    </img>
    </div>
  )
}

export default Header
