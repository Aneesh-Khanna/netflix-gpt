import { useDispatch,useSelector } from 'react-redux';
import { onAuthStateChanged , signOut } from "firebase/auth";
import { useEffect } from "react"
import { addUser, removeUser } from "../utils/ReduxStore/userSlice"
import { auth } from "../utils/firebase"
import { useNavigate } from 'react-router-dom';
import { NETFLIX_LOGO } from '../utils/constants';
import { clearGptResults, toggleGptSearchView } from '../utils/ReduxStore/gptSlice';
import { changeLanguage , changeTheme} from "../utils/ReduxStore/configSlice";
import { Sun, Moon } from "lucide-react";
import { useLocation } from "react-router-dom"; // for detecting if login page or browse page
import { SUPPORTED_LANGUAGES } from './../utils/languageConstants';




const Header = () => {
  const dispatch = useDispatch(); // dispatch action for redux store
  const navigate = useNavigate(); // navigate, redirect between pages
  const user = useSelector((store) => store.user); // subscribe to user slice
  // for displaying user avatar in header , fetch from user slice
  const location = useLocation();
  const isBrowsePage = location.pathname === "/browse"; //used for static path
  const isWatchPage = location.pathname.startsWith("/watch"); // used for dynamic paths (depend on videokey)
  const previousPage = sessionStorage.getItem("previousPage");
   // for previous page functionality

  
  const handleGptSearchClick = () => {
    // Toggle GPT Search
    dispatch(clearGptResults()); // for clearing cards on gpt page when we come back to it
    dispatch(toggleGptSearchView());
  };

  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);

  const handleMultiLanguge = (e)=>{
      dispatch(changeLanguage(e.target.value));
    }

  const theme = useSelector((store) => store.config.theme);

  const handleThemeToggle = () => {
  const newTheme = theme === 'dark' ? 'light' : 'dark';
    dispatch(changeTheme(newTheme));
  };



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
  console.log("Header → previousPage:", previousPage);
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

          {/* Theme Feature for gpt page only  and not on watch page*/}
          {showGptSearch && !isWatchPage &&  (
          <button
          onClick={handleThemeToggle}
          className="p-2 bg-black text-white border border-white rounded-lg px-2.5 -ml-2 cursor-pointer 
               font-semibold hover:px-5 hover:bg-white hover:text-black 
               hover:font-medium hover:text-lg md:px-4 md:-ml-0 transition-all duration-200"
          >
          {theme === "light" ? (
          <Moon size={15} className="text-white border border-white rounded-full p-[2px] bg-black" />
          ) : (
          <Sun size={15} className="text-yellow-500" />
          )}
          </button>
          )}


          {/* Multi Language show for gpt page only*/}
      {showGptSearch && !isWatchPage && (
       <div>
          <select
          defaultValue=""
          onChange={handleMultiLanguge}
          className="bg-white/10 text-white px-4 py-2 rounded-md text-sm 
             border border-white/20 
             hover:bg-white/20 hover:shadow-md hover:scale-[1.03] 
             transition-all duration-200 cursor-pointer"
            >
          {/* Default Placeholder */}
          <option value="" disabled hidden>
          Language
          </option>

          {/* Dynamically generated options */}
          {SUPPORTED_LANGUAGES.map((lan) => (
          <option key={lan.identifier} value={lan.identifier} className="text-black">
          {lan.name}
          </option>
          ))}
          </select>
          </div>
          )}

          { /* GPT Toggle Button which is dynamic , shows gpt page on browse page and redirects
          to gpt page and on gpt page , it shows back to browse and redirects to browse*/ }
          {(isBrowsePage || showGptSearch) && (
          <button
          onClick={handleGptSearchClick}
          className="bg-white/10 text-white px-4 py-2 rounded-md text-sm 
             border border-white/20 
             hover:bg-white/20 hover:shadow-md hover:scale-[1.03] 
             transition-all duration-200"
          >
          {showGptSearch ? (
          <span>← Back to Browse</span>
          ) : (
          <>
          <span className="md:hidden">GPT</span>
          <span className="hidden md:inline">GPT Search</span>
          </>
          )}
          </button>
          )}

          { /* button to go back to browse page from watchpage only and to go back to gpt search if we came from there */}
          {isWatchPage && (
          <>
          {previousPage === "browse" && (
          <button
          onClick={() => navigate('/browse')}
          className="bg-white/10 text-white px-4 py-2 rounded-md text-sm 
             border border-white/20 
             hover:bg-white/20 hover:shadow-md hover:scale-[1.03] 
             transition-all duration-200"
          >
          ← Back to Browse
          </button>
          )}

        {previousPage === "gpt" && (
        <button
          onClick={() => {
          dispatch(toggleGptSearchView());
          navigate('/browse');
        }}
        className="bg-white/10 text-white px-4 py-2 rounded-md text-sm 
             border border-white/20 
             hover:bg-white/20 hover:shadow-md hover:scale-[1.03] 
             transition-all duration-200"
        >
        ← Back to GPT Search
        </button>
        )}
        </>
        )}

          {/*Sign out Button */}
          <button
            onClick={handleSignOut}
            className="bg-white/10 text-white px-4 py-2 rounded-md text-sm 
             border border-white/20 
             hover:bg-white/20 hover:shadow-md hover:scale-[1.03] 
             transition-all duration-200"
          >
          Sign Out
          </button>


          {/* User Avatar Logo */}
            <img 
            src={user?.photoURL}
            alt="user-logo"
            className="w-8 h-8 md:w-10 md:h-10 rounded-full cursor-pointer border-2 border-gray-300 shadow-md 
            transition-transform transform hover:scale-110 ml-auto md:ml-0w-7 h-7 rounded-md cursor-pointer ml-[25%] mt-2 md:ml-0 md:mt-0 w-10 md:h-10 hidden md:block"
          />
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

