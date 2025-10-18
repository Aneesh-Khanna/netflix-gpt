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
import { useLocation } from "react-router-dom"; // for detecting if login page or browse page



const Header = () => {
  const dispatch = useDispatch(); // dispatch action for redux store
  const navigate = useNavigate(); // navigate, redirect between pages
  const user = useSelector((store) => store.user); // subscribe to user slice
  // for displaying user avatar in header , fetch from user slice
  const location = useLocation();
  const isBrowsePage = location.pathname === "/browse"; //used for static path
  const isWatchPage = location.pathname.startsWith("/watch"); // used for dynamic paths (depend on videokey)




  
  // const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
  // const handleToggle = ()=>{
  //     dispatch(ToggleGpt());
  //   }
  
  // const handleGptSearchClick = () => {
  //   // Toggle GPT Search
  //   dispatch(toggleGptSearchView());
  // };
  // // these handle toggle and handlegptsearch click might be same ! if same then use handle toggle, remove below function

  //   const check = useSelector((store)=>{
  //     return store.GptSearch;
  //   }) // this may be same as showgpt search above, if so then use this instead of above


  //const handleMultiLanguge = (e)=>{
    //   console.log(e.target.value);
    //   dispatch(changeLanguage(e.target.value));
    // }

    // const checkTheme = useSelector((store)=>{
    //     return store.theme.theme;
    //   })

    //   const c = checkTheme || "dark";

    // const ToggleTheme = ()=>{
    //     if(c === "dark"){
    //       dispatch(changeTheme("light"));
    //     }else{
    //       dispatch(changeTheme("dark"));
    //     }  
    // }


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
// only do if user tries to go to login page, if he goes to watch page then dont redirect
          if (location.pathname === "/") {
            navigate("/browse");
          }

          } else {
              // User is signed out
              dispatch(removeUser()) ;
              navigate("/");
          }});

      // Unsubscribe when component unmounts
      return () => unsubscribe();
      },[])

  return (
    <div
  className={`absolute top-0 left-0 w-screen z-20 transition-colors duration-500 
  ${isBrowsePage 
    ? "bg-gradient-to-b from-gray-900 via-black/95 to-transparent"  // darker gradient for browse
    : "bg-gradient-to-b from-black/90 to-transparent"               // softer gradient for login
  }`}
> 
    {/* darker header for browse and lighter for login page (use backticks so we can write js code inside strings*/}

      {/*Outer div controlling controls position, width, stacking order, and the gradient. of header container */}

      <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row items-center justify-between px-6 py-4">
        {/* Inner div controlling layout of the items inside the header (logo, nav links, avatar, buttons).*/}

        {/*Netflix logo at left*/}
        <img 
            src={NETFLIX_LOGO}
            alt = "Netflix-logo"
            className="w-32 sm:w-36 md:w-44 cursor-pointer mx-5"
        />

        {/*Right section (to right of logo)*/}
        {/* only show right section if user is logged in*/}
        {user && (<div className="flex mt-4 gap-4 md:items-center md:mt-0 flex-nowrap md:flex-wrap">


          {/* more features */}

          { /* button to go back to browse page from watchpage only */}
          {isWatchPage && (
          <button
          onClick={() => navigate('/browse')}
          className="bg-white/10 text-white px-4 py-2 rounded-md text-sm hover:bg-white/20 transition shadow-sm"
          >
          ← Back to Browse
          </button> )}


          {/* User Avatar Logo */}
            <img 
            src={user?.photoURL}
            alt="user-logo"
            className="w-8 h-8 md:w-10 md:h-10 rounded-full cursor-pointer border-2 border-gray-300 shadow-md 
            transition-transform transform hover:scale-110 ml-auto md:ml-0w-7 h-7 rounded-md cursor-pointer ml-[25%] mt-2 md:ml-0 md:mt-0 w-10 md:h-10 hidden md:block"
          />
          
          {/*Sign out Button */}
          <button 
          className="text-white font-medium bg-red-600  hover:bg-red-500 transition-colors rounded-lg 
          px-4 py-1 md:px-3 md:py-1.5 shadow-lg hover:shadow-xl cursor-pointer ml-3 text-sm md:text-base hover:scale-105 
          active:scale-95 transition-transform duration-200 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 border border-red-400/40 "
          onClick = {handleSignOut}>Sign Out
          </button>

          </div>
        )}
        {/*End of right section*/}

        </div>
      {/* end of inner div */}

    {/* end of outer div */}
    </div>
  )
}

export default Header

// Header -> outer div (whole container) --> inner div --> left section(logo) + right section div --> right section div elements

